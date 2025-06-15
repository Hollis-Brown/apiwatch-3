import { motion } from 'framer-motion';
import {
  LightBulbIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CodeBracketIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// Sample data
const stackRecommendations = [
  {
    id: 1,
    title: 'Stripe + PayPal Integration',
    description: 'Add PayPal as a backup payment processor for redundancy',
    type: 'stack',
    icon: CurrencyDollarIcon,
    priority: 'high',
  },
  {
    id: 2,
    title: 'Auth0 + Okta',
    description: 'Consider Okta as a backup authentication provider',
    type: 'stack',
    icon: ShieldCheckIcon,
    priority: 'medium',
  },
  {
    id: 3,
    title: 'MongoDB + Redis',
    description: 'Add Redis for caching to improve performance',
    type: 'stack',
    icon: ChartBarIcon,
    priority: 'low',
  },
];

const riskRecommendations = [
  {
    id: 1,
    title: 'Twitter API v1 Deprecation',
    description: 'Migrate to Twitter API v2 before v1 is deprecated',
    type: 'risk',
    icon: ExclamationTriangleIcon,
    priority: 'high',
    deadline: '2024-06-30',
  },
  {
    id: 2,
    title: 'Stripe API Version Update',
    description: 'Update to the latest Stripe API version for new features',
    type: 'risk',
    icon: ArrowPathIcon,
    priority: 'medium',
    deadline: '2024-05-15',
  },
];

const performanceTips = [
  {
    id: 1,
    title: 'Implement Caching',
    description: 'Add Redis caching for frequently accessed data',
    type: 'performance',
    icon: ChartBarIcon,
    impact: 'high',
  },
  {
    id: 2,
    title: 'Optimize Database Queries',
    description: 'Add indexes to improve query performance',
    type: 'performance',
    icon: CodeBracketIcon,
    impact: 'medium',
  },
];

const securityAlerts = [
  {
    id: 1,
    title: 'API Key Rotation',
    description: 'Rotate your API keys every 90 days',
    type: 'security',
    icon: ShieldCheckIcon,
    severity: 'high',
  },
  {
    id: 2,
    title: 'Rate Limiting',
    description: 'Implement rate limiting to prevent abuse',
    type: 'security',
    icon: ShieldCheckIcon,
    severity: 'medium',
  },
];

export default function IntelligentRecommendations() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Intelligent Recommendations
          </h1>
          <p className="text-gray-400 mb-6">
            Personalized suggestions and alerts based on your API usage.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <LightBulbIcon className="w-5 h-5" />
              <span>Stack Recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <span>Risk Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              <span>Performance Tips</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stack Recommendations */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Stack Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stackRecommendations.map((recommendation) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <recommendation.icon className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h3 className="text-white font-medium">
                    {recommendation.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {recommendation.description}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                      recommendation.priority === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : recommendation.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {recommendation.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risk Recommendations */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Risk Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskRecommendations.map((recommendation) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <recommendation.icon className="w-5 h-5 text-red-400 mt-1" />
                <div>
                  <h3 className="text-white font-medium">
                    {recommendation.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {recommendation.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        recommendation.priority === 'high'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {recommendation.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <ClockIcon className="w-4 h-4" />
                      Due: {recommendation.deadline}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Tips */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Performance Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {performanceTips.map((tip) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <tip.icon className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <h3 className="text-white font-medium">{tip.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {tip.description}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                      tip.impact === 'high'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {tip.impact.toUpperCase()} IMPACT
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Alerts */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Security Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <alert.icon className="w-5 h-5 text-red-400 mt-1" />
                <div>
                  <h3 className="text-white font-medium">{alert.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {alert.description}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                      alert.severity === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {alert.severity.toUpperCase()} SEVERITY
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 