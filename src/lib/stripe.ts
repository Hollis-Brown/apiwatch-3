import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    description: 'Basic API monitoring for small projects',
    price: 0,
    features: [
      'Up to 5 API endpoints',
      'Basic monitoring',
      'Email notifications',
      '24-hour data retention',
    ],
    limits: {
      endpoints: 5,
      checksPerMinute: 1,
      retentionDays: 1,
    },
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced monitoring for growing teams',
    price: 29,
    features: [
      'Up to 50 API endpoints',
      'Advanced monitoring',
      'Multiple notification channels',
      '7-day data retention',
      'Custom alert rules',
      'Team collaboration',
    ],
    limits: {
      endpoints: 50,
      checksPerMinute: 5,
      retentionDays: 7,
    },
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Full-featured monitoring for large organizations',
    price: 99,
    features: [
      'Unlimited API endpoints',
      'Enterprise-grade monitoring',
      'All notification channels',
      '30-day data retention',
      'Advanced alert rules',
      'Team management',
      'Priority support',
      'Custom integrations',
    ],
    limits: {
      endpoints: -1, // Unlimited
      checksPerMinute: 10,
      retentionDays: 30,
    },
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  },
} as const;

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;
export type SubscriptionPlanId = typeof SUBSCRIPTION_PLANS[SubscriptionPlan]['id'];

export async function createStripeCustomer(email: string, name: string) {
  return stripe.customers.create({
    email,
    name,
  });
}

export async function createStripeCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

export async function createStripePortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

export async function handleStripeWebhook(
  payload: Buffer,
  signature: string
): Promise<Stripe.Event> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
} 