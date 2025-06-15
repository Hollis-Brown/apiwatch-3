'use client';

import { useState } from 'react';

export default function BillingManagement() {
  const [subscription] = useState({
    plan: 'Pro',
    status: 'Active',
    nextBilling: '2024-04-01',
    amount: '$49.99',
  });

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Current Plan</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Plan</p>
            <p className="text-white font-medium">{subscription.plan}</p>
          </div>
          <div>
            <p className="text-gray-400">Status</p>
            <p className="text-white font-medium">{subscription.status}</p>
          </div>
          <div>
            <p className="text-gray-400">Next Billing</p>
            <p className="text-white font-medium">{subscription.nextBilling}</p>
          </div>
          <div>
            <p className="text-gray-400">Amount</p>
            <p className="text-white font-medium">{subscription.amount}/month</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Manage Subscription
        </button>
      </div>
    </div>
  );
} 