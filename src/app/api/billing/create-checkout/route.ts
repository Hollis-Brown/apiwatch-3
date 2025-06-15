import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import {
  createStripeCustomer,
  createStripeCheckoutSession,
  SUBSCRIPTION_PLANS,
} from '@/lib/stripe';
import { diagnosticLogger } from '@/lib/diagnostics';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await request.json();
    const { planId } = data;

    // Validate plan
    const plan = Object.values(SUBSCRIPTION_PLANS).find((p) => p.id === planId);
    if (!plan || plan.id === 'free') {
      return new NextResponse('Invalid plan', { status: 400 });
    }

    // Get or create Stripe customer
    const { data: user, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('stripe_customer_id')
      .eq('email', session.user.email)
      .single();

    if (fetchError) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to fetch user',
          meta: fetchError,
        }],
      });
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    let stripeCustomerId = user?.stripe_customer_id;

    if (!stripeCustomerId) {
      const customer = await createStripeCustomer(
        session.user.email,
        session.user.name || ''
      );
      
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ stripe_customer_id: customer.id })
        .eq('email', session.user.email);

      if (updateError) {
        diagnosticLogger.log({
          step: 'error',
          errors: [{
            message: 'Failed to update user with Stripe customer ID',
            meta: updateError,
          }],
        });
        return new NextResponse('Internal Server Error', { status: 500 });
      }

      stripeCustomerId = customer.id;
    }

    // Create checkout session
    const checkoutSession = await createStripeCheckoutSession(
      stripeCustomerId,
      plan.stripePriceId!,
      `${process.env.NEXTAUTH_URL}/settings?success=true`,
      `${process.env.NEXTAUTH_URL}/settings?canceled=true`
    );

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Checkout session error',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 