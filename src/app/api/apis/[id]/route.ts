import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { diagnosticLogger } from '@/lib/diagnostics';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: api, error } = await supabaseAdmin
      .from('apis')
      .select(`
        *,
        monitors(*)
      `)
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to fetch API',
          meta: error,
        }],
      });
      return NextResponse.json({ error: 'Failed to fetch API' }, { status: 500 });
    }

    if (!api) {
      return NextResponse.json({ error: 'API not found' }, { status: 404 });
    }

    return NextResponse.json(api);
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch API',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return NextResponse.json({ error: 'Failed to fetch API' }, { status: 500 });
  }
}

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
    const { data: api, error } = await supabaseAdmin
      .from('apis')
      .update(body)
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to update API',
          meta: error,
        }],
      });
      return NextResponse.json({ error: 'Failed to update API' }, { status: 500 });
    }

    return NextResponse.json(api);
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to update API',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return NextResponse.json({ error: 'Failed to update API' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { error } = await supabaseAdmin
      .from('apis')
      .delete()
      .eq('id', params.id)
      .eq('user_id', session.user.id);

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to delete API',
          meta: error,
        }],
      });
      return NextResponse.json({ error: 'Failed to delete API' }, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to delete API',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return NextResponse.json({ error: 'Failed to delete API' }, { status: 500 });
  }
} 