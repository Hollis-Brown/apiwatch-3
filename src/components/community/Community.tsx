import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftIcon,
  UserCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  BellIcon,
  BookmarkIcon,
  ShareIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';

// Sample data
const discussions = [
  {
    id: 1,
    title: 'Stripe API v2.0 Migration Guide',
    author: 'John Doe',
    category: 'Guides',
    replies: 24,
    views: 1250,
    lastActivity: '2 hours ago',
    tags: ['stripe', 'migration', 'guide'],
  },
  {
    id: 2,
    title: 'Twilio Webhook Issues - Help Needed',
    author: 'Jane Smith',
    category: 'Support',
    replies: 15,
    views: 850,
    lastActivity: '4 hours ago',
    tags: ['twilio', 'webhook', 'support'],
  },
  {
    id: 3,
    title: 'OpenAI API Rate Limiting Best Practices',
    author: 'Mike Johnson',
    category: 'Best Practices',
    replies: 32,
    views: 2100,
    lastActivity: '1 day ago',
    tags: ['openai', 'rate-limiting', 'best-practices'],
  },
];

const apiChanges = [
  {
    id: 1,
    api: 'Stripe',
    type: 'Deprecation',
    description: 'PaymentIntent API v1 will be deprecated on June 1, 2024',
    reportedBy: 'Sarah Wilson',
    reportedAt: '3 days ago',
    severity: 'high',
  },
  {
    id: 2,
    api: 'Twilio',
    type: 'New Feature',
    description: 'New Webhook Signature Verification Method',
    reportedBy: 'Alex Brown',
    reportedAt: '1 day ago',
    severity: 'medium',
  },
  {
    id: 3,
    api: 'OpenAI',
    type: 'Breaking Change',
    description: 'GPT-4 API Response Format Update',
    reportedBy: 'Chris Lee',
    reportedAt: '5 hours ago',
    severity: 'high',
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('discussions');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            APIWatch Community
          </h1>
          <p className="text-gray-400 mb-6">
            Join the discussion, share your experiences, and help others succeed
            with their API integrations.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <UserCircleIcon className="w-5 h-5" />
              <span>2,847 active members</span>
            </div>
            <div className="flex items-center gap-2">
              <ChatBubbleLeftIcon className="w-5 h-5" />
              <span>1,250 discussions</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowTrendingUpIcon className="w-5 h-5" />
              <span>3,200 helpful votes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex gap-4 mb-6">
          {['discussions', 'changes', 'guides'].map((tab) => (
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

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-medium mb-2">
                      {discussion.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.category}</span>
                      <span>•</span>
                      <span>{discussion.lastActivity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <ChatBubbleLeftIcon className="w-4 h-4" />
                      <span>{discussion.replies}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                      <span>{discussion.views}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {discussion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-600 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Changes Tab */}
        {activeTab === 'changes' && (
          <div className="space-y-4">
            {apiChanges.map((change) => (
              <motion.div
                key={change.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          change.severity === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {change.type}
                      </span>
                      <span className="text-white font-medium">{change.api}</span>
                    </div>
                    <p className="text-gray-400">{change.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white">
                      <BellIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <BookmarkIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="w-4 h-4" />
                    <span>Reported by {change.reportedBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{change.reportedAt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-white mb-2">
              Coming Soon: Community Guides
            </h3>
            <p className="text-gray-400">
              We're working on a comprehensive collection of community-written
              guides and tutorials.
            </p>
          </div>
        )}
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
              <p className="text-sm text-gray-400">Active Members</p>
              <p className="text-2xl font-bold text-white">2,847</p>
            </div>
            <UserCircleIcon className="w-8 h-8 text-primary" />
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
              <p className="text-sm text-gray-400">Discussions</p>
              <p className="text-2xl font-bold text-white">1,250</p>
            </div>
            <ChatBubbleLeftIcon className="w-8 h-8 text-status-green" />
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
              <p className="text-sm text-gray-400">Helpful Votes</p>
              <p className="text-2xl font-bold text-white">3,200</p>
            </div>
            <ArrowTrendingUpIcon className="w-8 h-8 text-status-yellow" />
          </div>
        </motion.div>
      </div>
    </div>
  );
} 