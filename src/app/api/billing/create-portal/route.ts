import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { createStripePortalSession } from '@/lib/stripe';
import { diagnosticLogger } from '@/lib/diagnostics';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user's Stripe customer ID
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('stripe_customer_id')
      .eq('email', session.user.email)
      .single();

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to fetch user',
          meta: error,
        }],
      });
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    if (!user?.stripe_customer_id) {
      return new NextResponse('No subscription found', { status: 404 });
    }

    // Create portal session
    const portalSession = await createStripePortalSession(
      user.stripe_customer_id,
      `${process.env.NEXTAUTH_URL}/settings`
    );

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Portal session error',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 