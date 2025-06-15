import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

// Sample data
const apiDetails = {
  name: 'Stripe',
  category: 'Payments',
  description: 'Payment processing and financial infrastructure for the internet.',
  logo: 'https://logo.clearbit.com/stripe.com',
  rating: 4.8,
  users: 12500,
  reliability: 99.9,
  uptime: 99.95,
  integrationDifficulty: 'Medium',
  pricing: {
    free: true,
    plans: [
      { name: 'Starter', price: '$0', features: ['Basic payment processing', 'Standard support'] },
      { name: 'Growth', price: '$49/mo', features: ['Advanced features', 'Priority support'] },
      { name: 'Enterprise', price: 'Custom', features: ['Custom solutions', 'Dedicated support'] },
    ],
  },
  documentation: 'https://stripe.com/docs',
  alternatives: ['PayPal', 'Square', 'Adyen'],
  communityStats: {
    totalDiscussions: 1250,
    activeUsers: 850,
    helpfulVotes: 3200,
  },
};

export default function APIProfile() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="flex items-start gap-6">
          <img
            src={apiDetails.logo}
            alt={apiDetails.name}
            className="w-20 h-20 rounded-xl"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {apiDetails.name}
                </h1>
                <p className="text-gray-400">{apiDetails.description}</p>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <StarIcon className="w-5 h-5 fill-current" />
                <span className="text-lg font-medium">{apiDetails.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5" />
                <span>{apiDetails.users.toLocaleString()} users</span>
              </div>
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5" />
                <span>{apiDetails.reliability}% reliability</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>{apiDetails.uptime}% uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex gap-4 mb-6">
          {['overview', 'documentation', 'pricing', 'community'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-status-green" />
                  <h3 className="font-medium text-white">Reliability</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Overall Score</span>
                    <span className="text-white">{apiDetails.reliability}%</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full">
                    <div
                      className="h-full bg-status-green rounded-full"
                      style={{ width: `${apiDetails.reliability}%` }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CodeBracketIcon className="w-6 h-6 text-primary" />
                  <h3 className="font-medium text-white">Integration</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Difficulty</span>
                    <span className="text-white">{apiDetails.integrationDifficulty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Documentation</span>
                    <a
                      href={apiDetails.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Docs
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CurrencyDollarIcon className="w-6 h-6 text-status-yellow" />
                  <h3 className="font-medium text-white">Pricing</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Free Tier</span>
                    <span className="text-white">{apiDetails.pricing.free ? 'Available' : 'None'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Starting Price</span>
                    <span className="text-white">{apiDetails.pricing.plans[0].price}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Alternatives */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="font-medium text-white mb-4">Popular Alternatives</h3>
              <div className="flex flex-wrap gap-2">
                {apiDetails.alternatives.map((alt) => (
                  <span
                    key={alt}
                    className="px-3 py-1 bg-gray-600 rounded-full text-sm text-gray-300"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'documentation' && (
          <div className="space-y-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <DocumentTextIcon className="w-6 h-6 text-primary" />
                <h3 className="font-medium text-white">API Documentation</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Comprehensive documentation and guides for integrating with {apiDetails.name}.
              </p>
              <a
                href={apiDetails.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                View Documentation
                <ArrowTrendingUpIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {apiDetails.pricing.plans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/50 rounded-lg p-4"
              >
                <h3 className="font-medium text-white mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-white mb-4">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <UserGroupIcon className="w-6 h-6 text-primary" />
                  <h3 className="font-medium text-white">Community Activity</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Discussions</span>
                    <span className="text-white">{apiDetails.communityStats.totalDiscussions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Active Users</span>
                    <span className="text-white">{apiDetails.communityStats.activeUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Helpful Votes</span>
                    <span className="text-white">{apiDetails.communityStats.helpfulVotes}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 