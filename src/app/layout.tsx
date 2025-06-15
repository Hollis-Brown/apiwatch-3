'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import './globals.css';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/register'];

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isPublicRoute = pathname ? publicRoutes.includes(pathname) : false;
  const router = useRouter();

  // Show loading state while checking auth, but with a timeout
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on a public route, redirect to login
  if (!session && !isPublicRoute) {
    router.push('/login');
    return null;
  }

  // If authenticated and on a public route, redirect to dashboard
  if (session && isPublicRoute) {
    router.push('/dashboard');
    return null;
  }

  // For public routes (login/register), don't show the app layout
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For authenticated routes, show the full app layout
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </SessionProvider>
      </body>
    </html>
  );
} 