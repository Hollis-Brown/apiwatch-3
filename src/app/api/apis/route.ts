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
    const { data: apis, error } = await supabaseAdmin
      .from('apis')
      .select(`
        *,
        monitors(*)
      `)
      .eq('user_id', session.user.id);

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to fetch APIs',
          meta: error,
        }],
      });
      return NextResponse.json({ error: 'Failed to fetch APIs' }, { status: 500 });
    }

    return NextResponse.json(apis);
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch APIs',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return NextResponse.json({ error: 'Failed to fetch APIs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { data: api, error } = await supabaseAdmin
      .from('apis')
      .insert({
        ...body,
        user_id: session.user.id,
      })
      .select()
      .single();

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to create API',
          meta: error,
        }],
      });
      return NextResponse.json({ error: 'Failed to create API' }, { status: 500 });
    }

    return NextResponse.json(api, { status: 201 });
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to create API',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return NextResponse.json({ error: 'Failed to create API' }, { status: 500 });
  }
} 