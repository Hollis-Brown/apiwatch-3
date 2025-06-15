import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabaseAdmin } from "./supabase";
import { comparePassword } from "./hash";
import { diagnosticLogger } from "./diagnostics";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        diagnosticLogger.log({
          step: 'sign_in',
          request: {
            body: { email: credentials?.email },
          },
        });

        if (!credentials?.email || !credentials?.password) {
          diagnosticLogger.log({
            step: 'error',
            errors: [{
              message: 'Missing email or password',
            }],
          });
          throw new Error("Missing email or password");
        }

        const { data: user, error } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error) {
          diagnosticLogger.log({
            step: 'error',
            errors: [{
              message: 'Failed to fetch user',
              meta: error,
            }],
          });
          throw new Error("Database error");
        }

        if (!user) {
          diagnosticLogger.log({
            step: 'error',
            errors: [{
              message: 'No user found',
            }],
          });
          throw new Error("No user found");
        }

        const isValid = await comparePassword(credentials.password, user.password);
        if (!isValid) {
          diagnosticLogger.log({
            step: 'error',
            errors: [{
              message: 'Invalid password',
            }],
          });
          throw new Error("Invalid password");
        }

        diagnosticLogger.log({
          step: 'sign_in',
          response: {
            status: 200,
            body: {
              id: user.id,
              email: user.email,
              name: user.name,
            },
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
}; 