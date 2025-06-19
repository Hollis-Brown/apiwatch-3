import { createClient } from '@supabase/supabase-js';
// import type { DiagnosticEntry, DiagnosticStep } from './types';

// Initialize Supabase client for diagnostics
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export type DiagnosticStep = 
  | 'form_submission'
  | 'api_request'
  | 'server_validation'
  | 'db_check'
  | 'password_hash'
  | 'user_creation'
  | 'sign_in'
  | 'error'
  | 'unknown';

export interface DiagnosticEntry {
  step: DiagnosticStep;
  timestamp: string;
  request?: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
  };
  response?: {
    status?: number;
    body?: any;
  };
  dbState?: {
    before?: any[] | null;
    after?: any[] | null;
  };
  timing?: Record<string, number>;
  errors?: Array<{
    message: string;
    code?: string;
    stack?: string;
    meta?: any;
  }>;
  environment?: {
    nodeEnv: string;
    databaseUrl?: string;
    nextAuthUrl?: string;
  };
}

class DiagnosticLogger {
  private logs: DiagnosticEntry[] = [];
  private readonly maxLogs = 100;

  log(entry: Omit<DiagnosticEntry, 'timestamp'>) {
    const timestamp = new Date().toISOString();
    this.logs.unshift({ ...entry, timestamp });
    
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Diagnostic] ${entry.step}:`, entry);
    }
  }

  getLogs() {
    return this.logs;
  }

  clear() {
    this.logs = [];
  }
}

export const diagnosticLogger = new DiagnosticLogger();

export function checkEnvironment() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
  ];

  const missing = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  return {
    valid: missing.length === 0,
    missing,
  };
}

export async function checkDatabase() {
  if (!supabase) {
    return {
      status: 'error',
      message: 'Supabase client not initialized',
    };
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .single();

    if (error) throw error;

    return {
      status: 'ok',
      message: 'Database connection successful',
      userCount: data.count,
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
} 