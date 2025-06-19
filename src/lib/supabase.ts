import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Validate environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Create Supabase client for browser usage
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Create Supabase admin client for server-side operations
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Helper to check Supabase connection
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('users').select('count').single();
    if (error) throw error;
    return {
      connected: true,
      userCount: data.count,
    };
  } catch (error: any) {
    return {
      connected: false,
      error: {
        message: error.message,
        code: error.code,
      },
    };
  }
} 

