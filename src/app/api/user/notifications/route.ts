import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { diagnosticLogger } from '@/lib/diagnostics';

export async function PUT(request: Request) {
  diagnosticLogger.log({
    step: 'api_request',
    request: {
      method: 'PUT',
      headers: Object.fromEntries(request.headers.entries()),
    },
  });

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Unauthorized: No session or email',
        }],
      });
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await request.json();
    const { channels, alertTypes } = data;

    // Update notification preferences
    const { data: updatedUser, error } = await supabaseAdmin
      .from('users')
      .update({
        notification_preferences: {
          channels,
          alertTypes,
        },
        updated_at: new Date().toISOString(),
      })
      .eq('email', session.user.email)
      .select()
      .single();

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to update notification preferences',
          meta: error,
        }],
      });
      throw error;
    }

    diagnosticLogger.log({
      step: 'user_creation',
      dbState: {
        after: [updatedUser],
      },
      response: {
        status: 200,
        body: updatedUser,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Notification preferences update error',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 