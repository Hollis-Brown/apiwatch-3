import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { diagnosticLogger } from '@/lib/diagnostics';

export async function POST(request: Request) {
  diagnosticLogger.log({
    step: 'api_request',
    request: {
      method: 'POST',
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
    const { channelId } = data;

    // Get user's notification preferences
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('notification_preferences')
      .eq('email', session.user.email)
      .single();

    if (userError) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to fetch user preferences',
          meta: userError,
        }],
      });
      throw userError;
    }

    if (!user?.notification_preferences) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Notification preferences not found',
        }],
      });
      return new NextResponse('Notification preferences not found', {
        status: 404,
      });
    }

    const channel = user.notification_preferences.channels.find(
      (c: any) => c.id === channelId
    );

    if (!channel) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Channel not found',
          meta: { channelId },
        }],
      });
      return new NextResponse('Channel not found', { status: 404 });
    }

    // Send test notification based on channel type
    switch (channelId) {
      case 'email':
        // Send test email
        // TODO: Implement email sending
        break;
      case 'sms':
        // Send test SMS
        // TODO: Implement SMS sending
        break;
      case 'slack':
        // Send test Slack message
        // TODO: Implement Slack integration
        break;
      case 'webhook':
        // Send test webhook
        // TODO: Implement webhook sending
        break;
      default:
        diagnosticLogger.log({
          step: 'error',
          errors: [{
            message: 'Invalid channel',
            meta: { channelId },
          }],
        });
        return new NextResponse('Invalid channel', { status: 400 });
    }

    diagnosticLogger.log({
      step: 'api_request',
      response: {
        status: 200,
        body: { success: true },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Test notification error',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 