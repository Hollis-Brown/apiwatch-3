import { NextResponse } from 'next/server';
import { z } from 'zod';
import { diagnosticLogger, checkEnvironment } from '@/lib/diagnostics';
import { supabaseAdmin } from '@/lib/supabase';
import { hashPassword } from '@/lib/hash';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  // Clear previous diagnostics
  diagnosticLogger.clear();

  try {
    // Log initial request
    diagnosticLogger.log({
      step: 'api_request',
      request: {
        method: req.method,
        headers: Object.fromEntries(req.headers.entries()),
      },
    });

    // Check environment
    const envCheck = checkEnvironment();
    if (!envCheck.valid) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Missing required environment variables',
          meta: { missing: envCheck.missing },
        }],
      });
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    diagnosticLogger.log({
      step: 'server_validation',
      request: {
        body: { ...body, password: '[REDACTED]' },
      },
    });

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Validation failed',
          meta: result.error.errors,
        }],
      });
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Check for existing user
    const { data: existingUsers, error: checkError } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .eq('email', email);

    diagnosticLogger.log({
      step: 'db_check',
      dbState: {
        before: existingUsers,
      },
    });

    if (checkError) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Database check failed',
          meta: checkError,
        }],
      });
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (existingUsers && existingUsers.length > 0) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Email already registered',
        }],
      });
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    try {
      const hashedPassword = await hashPassword(password);
      diagnosticLogger.log({
        step: 'password_hash',
        timing: {
          hashStart: Date.now(),
        },
      });

      // Create user
      const { data: user, error: createError } = await supabaseAdmin
        .from('users')
        .insert({
          email,
          name,
          password: hashedPassword,
          subscription_plan: 'free',
          notification_preferences: {},
        })
        .select()
        .single();

      if (createError) {
        console.error('CREATE ERROR:', createError);
        throw createError;
      }

      // Verify user creation
      const { data: createdUser, error: verifyError } = await supabaseAdmin
        .from('users')
        .select('id, email, name')
        .eq('id', user.id)
        .single();

      if (verifyError) {
        throw verifyError;
      }

      diagnosticLogger.log({
        step: 'user_creation',
        dbState: {
          after: [createdUser],
        },
        response: {
          status: 201,
          body: {
            message: 'User registered successfully',
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          },
        },
      });

      return NextResponse.json(
        {
          message: 'User registered successfully',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
        { status: 201 }
      );
    } catch (error: any) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: error.message,
          code: error.code,
          stack: error.stack,
          meta: error.meta,
        }],
      });

      return NextResponse.json(
        {
          error: 'Failed to create user',
          details: error.message,
          code: error.code,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: error.message,
        code: error.code,
        stack: error.stack,
      }],
    });

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
} 