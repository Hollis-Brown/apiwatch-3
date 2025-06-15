import { useState } from 'react';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: 0,
    features: [
      'Monitor 5 APIs',
      'Daily checks',
      'Email alerts',
    ],
    value: 'free',
    highlight: 'Best for getting started',
  },
  {
    name: 'Pro',
    price: 19,
    features: [
      'Monitor 50 APIs',
      'Hourly checks',
      'Slack integration',
    ],
    value: 'pro',
    highlight: 'Most popular',
  },
  {
    name: 'Enterprise',
    price: 99,
    features: [
      'Unlimited APIs',
      'Real-time monitoring',
      'Team features',
    ],
    value: 'enterprise',
    highlight: 'For large teams',
  },
];

interface PlanSelectorProps {
  currentPlan: 'free' | 'pro' | 'enterprise';
  onUpgrade: (plan: 'pro' | 'enterprise') => void;
}

export default function PlanSelector({ currentPlan, onUpgrade }: PlanSelectorProps) {
  return (
    <div className="w-full p-4 bg-gray-900 rounded-xl shadow-inner mt-8">
      <h3 className="text-xs font-semibold text-gray-400 mb-2">Your Plan</h3>
      <div className="space-y-4">
        {plans.map(plan => (
          <motion.div
            key={plan.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: plan.value === 'free' ? 0 : plan.value === 'pro' ? 0.1 : 0.2 }}
            className={`relative p-4 rounded-lg border transition-all ${
              currentPlan === plan.value
                ? 'border-status-green bg-gray-800'
                : 'border-gray-700 bg-gray-800/80'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white text-sm">{plan.name}</span>
              {currentPlan === plan.value ? (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-status-green text-xs text-white font-semibold">
                  <CheckCircleIcon className="w-4 h-4" /> Current
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-white">
                {plan.price === 0 ? 'Free' : `$${plan.price}/mo`}
              </span>
              {plan.highlight && (
                <span className="text-xs text-status-green font-medium bg-status-green/10 px-2 py-0.5 rounded">
                  {plan.highlight}
                </span>
              )}
            </div>
            <ul className="text-xs text-gray-300 mb-3 space-y-1">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4 text-status-green" /> {f}
                </li>
              ))}
            </ul>
            {currentPlan !== plan.value && (
              <button
                className="w-full py-1.5 rounded-lg bg-status-green text-white font-semibold hover:bg-green-600 transition text-xs mt-1"
                onClick={() => onUpgrade(plan.value as 'pro' | 'enterprise')}
              >
                Upgrade
              </button>
            )}
            {plan.value !== 'free' && currentPlan === 'free' && (
              <div className="absolute inset-0 rounded-lg bg-black/60 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <LockClosedIcon className="w-6 h-6 text-status-yellow mb-1" />
                  <span className="text-xs text-status-yellow font-semibold">Upgrade Required</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 