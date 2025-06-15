import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { diagnosticLogger } from '@/lib/diagnostics';

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: settings, error: fetchError } = await supabaseAdmin
      .from('notification_settings')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to fetch notification settings',
          meta: fetchError,
        }],
      });
      return NextResponse.json(
        { error: 'Failed to fetch notification settings' },
        { status: 500 }
      );
    }

    if (!settings) {
      // Create default settings if they don't exist
      const { data: defaultSettings, error: createError } = await supabaseAdmin
        .from('notification_settings')
        .insert({
          user_id: session.user.id,
          email: true,
          slack: false,
          discord: false,
          frequency: 'instant',
          severity_levels: {
            critical: true,
            warning: true,
            info: false,
          },
        })
        .select()
        .single();

      if (createError) {
        diagnosticLogger.log({
          step: 'error',
          errors: [{
            message: 'Failed to create default notification settings',
            meta: createError,
          }],
        });
        return NextResponse.json(
          { error: 'Failed to create notification settings' },
          { status: 500 }
        );
      }

      return NextResponse.json(defaultSettings);
    }

    return NextResponse.json(settings);
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch notification settings',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return NextResponse.json(
      { error: 'Failed to fetch notification settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { data: settings, error } = await supabaseAdmin
      .from('notification_settings')
      .upsert({
        user_id: session.user.id,
        ...body,
      })
      .select()
      .single();

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to update notification settings',
          meta: error,
        }],
      });
      return NextResponse.json(
        { error: 'Failed to update notification settings' },
        { status: 500 }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to update notification settings',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return NextResponse.json(
      { error: 'Failed to update notification settings' },
      { status: 500 }
    );
  }
} 