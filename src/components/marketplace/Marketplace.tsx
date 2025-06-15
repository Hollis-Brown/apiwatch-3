import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FireIcon,
  StarIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

// Sample data
const trendingApis = [
  {
    id: 1,
    name: 'Stripe',
    category: 'Payments',
    popularity: 98,
    rating: 4.8,
    users: 12500,
    description: 'Payment processing and financial infrastructure',
    logo: 'https://logo.clearbit.com/stripe.com',
  },
  {
    id: 2,
    name: 'Twilio',
    category: 'Communication',
    popularity: 95,
    rating: 4.7,
    users: 9800,
    description: 'Cloud communications platform',
    logo: 'https://logo.clearbit.com/twilio.com',
  },
  {
    id: 3,
    name: 'OpenAI',
    category: 'AI/ML',
    popularity: 97,
    rating: 4.9,
    users: 15000,
    description: 'Artificial intelligence platform',
    logo: 'https://logo.clearbit.com/openai.com',
  },
];

const categories = [
  { name: 'Payments', count: 45, icon: '💳' },
  { name: 'Communication', count: 38, icon: '📱' },
  { name: 'AI/ML', count: 52, icon: '🤖' },
  { name: 'Social', count: 29, icon: '👥' },
  { name: 'Analytics', count: 41, icon: '📊' },
  { name: 'Storage', count: 33, icon: '💾' },
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Discover and Monitor APIs
          </h1>
          <p className="text-gray-400 mb-6">
            Join thousands of developers monitoring and sharing insights about
            their favorite APIs.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5" />
              <span>2,847 developers trust APIWatch</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              <span>150+ APIs monitored</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>24/7 monitoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending APIs */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Trending APIs</h2>
          <button className="text-primary hover:text-primary/80">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingApis.map((api) => (
            <motion.div
              key={api.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={api.logo}
                    alt={api.name}
                    className="w-10 h-10 rounded-lg"
                  />
                  <div>
                    <h3 className="text-white font-medium">{api.name}</h3>
                    <span className="text-sm text-gray-400">{api.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <StarIcon className="w-4 h-4 fill-current" />
                  <span className="text-sm">{api.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">{api.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <UserGroupIcon className="w-4 h-4" />
                  <span>{api.users.toLocaleString()} users</span>
                </div>
                <div className="flex items-center gap-2 text-status-green">
                  <FireIcon className="w-4 h-4" />
                  <span>{api.popularity}% popularity</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedCategory(category.name)}
              className={`p-4 rounded-lg text-left transition-colors ${
                selectedCategory === category.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
              <div className="text-sm opacity-75">
                {category.count} APIs
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-white">2,847</p>
            </div>
            <UserGroupIcon className="w-8 h-8 text-primary" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">APIs Monitored</p>
              <p className="text-2xl font-bold text-white">150+</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-status-green" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Growth Rate</p>
              <p className="text-2xl font-bold text-white">+15%</p>
            </div>
            <ArrowTrendingUpIcon className="w-8 h-8 text-status-yellow" />
          </div>
        </motion.div>
      </div>
    </div>
  );
} 