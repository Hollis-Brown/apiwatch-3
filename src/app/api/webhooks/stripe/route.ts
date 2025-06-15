import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { handleStripeWebhook, SUBSCRIPTION_PLANS } from '@/lib/stripe';
import { diagnosticLogger } from '@/lib/diagnostics';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature')!;

    const event = await handleStripeWebhook(
      Buffer.from(body),
      signature
    );

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0].price.id;

        // Find the plan that matches the price ID
        const plan = Object.values(SUBSCRIPTION_PLANS).find(
          (p) => p.stripePriceId === priceId
        );

        if (!plan) {
          throw new Error(`No plan found for price ID: ${priceId}`);
        }

        // Update user's subscription
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({
            subscription_plan: plan.id,
            subscription_status: subscription.status,
            subscription_current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        if (updateError) {
          diagnosticLogger.log({
            step: 'error',
            errors: [{
              message: 'Failed to update user subscription',
              meta: updateError,
            }],
          });
          throw updateError;
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        // Reset user to free plan
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({
            subscription_plan: 'free',
            subscription_status: 'canceled',
            subscription_current_period_end: null,
          })
          .eq('stripe_customer_id', customerId);

        if (updateError) {
          diagnosticLogger.log({
            step: 'error',
            errors: [{
              message: 'Failed to update user subscription',
              meta: updateError,
            }],
          });
          throw updateError;
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        // Record successful payment
        const { error: insertError } = await supabaseAdmin
          .from('payments')
          .insert({
            user_id: customerId,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'succeeded',
            stripe_invoice_id: invoice.id,
          });

        if (insertError) {
          diagnosticLogger.log({
            step: 'error',
            errors: [{
              message: 'Failed to record successful payment',
              meta: insertError,
            }],
          });
          throw insertError;
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        // Record failed payment
        const { error: insertError } = await supabaseAdmin
          .from('payments')
          .insert({
            user_id: customerId,
            amount: invoice.amount_due,
            currency: invoice.currency,
            status: 'failed',
            stripe_invoice_id: invoice.id,
          });

        if (insertError) {
          diagnosticLogger.log({
            step: 'error',
            errors: [{
              message: 'Failed to record failed payment',
              meta: insertError,
            }],
          });
          throw insertError;
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Webhook error',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return new NextResponse('Webhook error', { status: 400 });
  }
} 