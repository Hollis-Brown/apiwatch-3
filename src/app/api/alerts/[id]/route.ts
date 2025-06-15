import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { diagnosticLogger } from '@/lib/diagnostics';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { data: alert, error } = await supabaseAdmin
      .from('alerts')
      .update(body)
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to update alert',
          meta: error,
        }],
      });
      return NextResponse.json({ error: 'Failed to update alert' }, { status: 500 });
    }

    return NextResponse.json(alert);
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to update alert',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return NextResponse.json({ error: 'Failed to update alert' }, { status: 500 });
  }
} 