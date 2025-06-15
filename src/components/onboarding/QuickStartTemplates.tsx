import { motion } from 'framer-motion';
import {
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

// Template data
const templates = [
  {
    id: 'ecommerce',
    name: 'E-commerce Starter',
    description: 'Monitor payment gateways and e-commerce platforms',
    icon: ShoppingCartIcon,
    apis: [
      { name: 'Stripe', status: 'ready' },
      { name: 'PayPal', status: 'ready' },
      { name: 'Shopify', status: 'ready' },
    ],
    features: [
      'Payment processing monitoring',
      'Order status tracking',
      'Inventory sync alerts',
    ],
  },
  {
    id: 'social',
    name: 'Social App Starter',
    description: 'Track social media API performance and engagement',
    icon: ChatBubbleLeftRightIcon,
    apis: [
      { name: 'Twitter', status: 'ready' },
      { name: 'Facebook', status: 'ready' },
      { name: 'Instagram', status: 'ready' },
    ],
    features: [
      'Post engagement tracking',
      'User authentication monitoring',
      'Content delivery optimization',
    ],
  },
  {
    id: 'ai',
    name: 'AI/ML Starter',
    description: 'Monitor AI service performance and costs',
    icon: CpuChipIcon,
    apis: [
      { name: 'OpenAI', status: 'ready' },
      { name: 'Anthropic', status: 'ready' },
      { name: 'Hugging Face', status: 'ready' },
    ],
    features: [
      'Model performance tracking',
      'Cost optimization alerts',
      'Response time monitoring',
    ],
  },
];

export default function QuickStartTemplates() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Quick Start Templates
          </h1>
          <p className="text-gray-400">
            Get started quickly with pre-configured monitoring for popular API
            stacks.
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            {/* Template Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <template.icon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {template.name}
                </h3>
                <p className="text-gray-400">{template.description}</p>
              </div>
            </div>

            {/* APIs List */}
            <div className="space-y-3 mb-6">
              {template.apis.map((api) => (
                <div
                  key={api.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50"
                >
                  <span className="text-white">{api.name}</span>
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-2 mb-6">
              {template.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <CheckCircleIcon className="w-4 h-4 text-green-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
              <span>Use Template</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Custom Template */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              Custom Template
            </h3>
            <p className="text-gray-400">
              Create your own template with custom API configurations
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
            <span>Create Template</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
} 