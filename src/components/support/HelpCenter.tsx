import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  PlayCircleIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

// Sample data
const categories = [
  {
    id: 1,
    name: 'Getting Started',
    articles: [
      {
        id: 1,
        title: 'Quick Start Guide',
        description: 'Learn how to set up APIWatch in minutes',
        video: true,
      },
      {
        id: 2,
        title: 'Adding Your First API',
        description: 'Step-by-step guide to monitoring your first API',
        video: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Monitoring',
    articles: [
      {
        id: 3,
        title: 'Setting Up Alerts',
        description: 'Configure notifications for API issues',
        video: false,
      },
      {
        id: 4,
        title: 'Performance Metrics',
        description: 'Understanding API performance data',
        video: true,
      },
    ],
  },
  {
    id: 3,
    name: 'Troubleshooting',
    articles: [
      {
        id: 5,
        title: 'Common Issues',
        description: 'Solutions to frequent problems',
        video: false,
      },
      {
        id: 6,
        title: 'Debugging Tools',
        description: 'Using APIWatch debugging features',
        video: true,
      },
    ],
  },
];

const faqs = [
  {
    id: 1,
    question: 'How do I add a new API to monitor?',
    answer:
      'You can add a new API by going to the Dashboard and clicking "Add API". Enter your API endpoint and authentication details, and APIWatch will start monitoring it immediately.',
  },
  {
    id: 2,
    question: 'What types of APIs can I monitor?',
    answer:
      'APIWatch supports REST, GraphQL, and WebSocket APIs. We also support various authentication methods including API keys, OAuth, and JWT.',
  },
  {
    id: 3,
    question: 'How are alerts delivered?',
    answer:
      'Alerts can be delivered via email, SMS, Slack, Discord, or webhook. You can configure multiple notification channels for each alert.',
  },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Help Center
          </h1>
          <p className="text-gray-400 mb-6">
            Find answers to common questions and learn how to use APIWatch
            effectively.
          </p>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Categories and Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              {category.name}
            </h2>
            <div className="space-y-4">
              {category.articles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-700/50"
                >
                  {article.video ? (
                    <PlayCircleIcon className="w-6 h-6 text-blue-400 mt-1" />
                  ) : (
                    <DocumentTextIcon className="w-6 h-6 text-gray-400 mt-1" />
                  )}
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {article.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-700 rounded-lg"
            >
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                }
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-start gap-3">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-blue-400 mt-1" />
                  <span className="text-white font-medium">{faq.question}</span>
                </div>
                {expandedFaq === faq.id ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 text-gray-400"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Need More Help?
            </h2>
            <p className="text-gray-400">
              Our support team is here to help you 24/7
            </p>
          </div>
          <button className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
} 