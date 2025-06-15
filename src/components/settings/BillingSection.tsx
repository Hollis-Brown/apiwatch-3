'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BillingSection() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (planId: string) => {
    if (!session?.user?.email) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) throw new Error('Failed to create checkout session');

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to start subscription process');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!session?.user?.email) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/billing/create-portal', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to create portal session');

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Portal session error:', error);
      toast.error('Failed to open billing portal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h3 className="text-lg font-medium text-white">Current Plan</h3>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">You are currently on the</p>
            <p className="text-xl font-semibold text-white">Free Plan</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleManageSubscription}
            disabled={isLoading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            Manage Subscription
          </motion.button>
        </div>
      </div>

      {/* Available Plans */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
          <div
            key={plan.id}
            className="rounded-lg border border-gray-700 bg-gray-800 p-6"
          >
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{plan.description}</p>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-white">
                ${plan.price}
              </span>
              <span className="text-gray-400">/month</span>
            </div>

            <ul className="mb-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm">
                  <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubscribe(plan.id)}
              disabled={isLoading || plan.id === 'free'}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
            >
              {plan.id === 'free' ? 'Current Plan' : 'Upgrade'}
            </motion.button>
          </div>
        ))}
      </div>

      {/* Billing History */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h3 className="text-lg font-medium text-white">Billing History</h3>
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Your billing history will appear here once you subscribe to a paid plan.
          </p>
        </div>
      </div>
    </div>
  );
} 