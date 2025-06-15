import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, ChartPieIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Sample data for risk scores
const riskScores = [
  {
    category: 'Overall Risk',
    score: 72,
    trend: 'down',
    change: '-5%',
    details: 'Based on API stability and update frequency',
  },
  {
    category: 'Diversification',
    score: 65,
    trend: 'up',
    change: '+10%',
    details: 'Your stack relies heavily on Google services',
  },
  {
    category: 'Dependency Health',
    score: 88,
    trend: 'up',
    change: '+2%',
    details: 'Most dependencies are up to date',
  },
];

// Sample data for dependency mapping
const dependencies = [
  {
    name: 'Google Services',
    apis: ['Maps API', 'Analytics API', 'Cloud Storage'],
    risk: 'High',
    impact: 'Critical',
  },
  {
    name: 'Payment Services',
    apis: ['Stripe API', 'PayPal API'],
    risk: 'Medium',
    impact: 'High',
  },
  {
    name: 'Social Media',
    apis: ['Twitter API', 'Facebook API'],
    risk: 'Low',
    impact: 'Medium',
  },
];

export default function PortfolioHealth() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Risk Scores */}
      <div className="grid grid-cols-3 gap-4">
        {riskScores.map((score) => (
          <motion.div
            key={score.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
              <span
                className={`text-xs font-medium ${
                  score.trend === 'up' ? 'text-status-green' : 'text-status-red'
                }`}
              >
                {score.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{score.score}</div>
            <div className="text-sm text-gray-400 mb-1">{score.category}</div>
            <div className="text-xs text-gray-500">{score.details}</div>
          </motion.div>
        ))}
      </div>

      {/* Dependency Mapping */}
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400">Dependency Mapping</h3>
          <select
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm text-white"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
        <div className="space-y-4">
          {dependencies.map((dep) => (
            <motion.div
              key={dep.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">{dep.name}</h4>
                  <div className="flex gap-2 mt-1">
                    {dep.apis.map((api) => (
                      <span
                        key={api}
                        className="px-2 py-1 rounded-full text-xs bg-gray-600 text-gray-300"
                      >
                        {api}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      dep.risk === 'High'
                        ? 'bg-status-red/20 text-status-red'
                        : dep.risk === 'Medium'
                        ? 'bg-status-yellow/20 text-status-yellow'
                        : 'bg-status-green/20 text-status-green'
                    }`}
                  >
                    {dep.risk} Risk
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      dep.impact === 'Critical'
                        ? 'bg-status-red/20 text-status-red'
                        : dep.impact === 'High'
                        ? 'bg-status-yellow/20 text-status-yellow'
                        : 'bg-status-green/20 text-status-green'
                    }`}
                  >
                    {dep.impact} Impact
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risk Concentration Warnings */}
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Risk Concentration Warnings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <ChartPieIcon className="w-5 h-5 text-status-yellow" />
              <div>
                <div className="text-white font-medium">Google Services Dependency</div>
                <div className="text-sm text-gray-400">
                  70% of your APIs are from Google services
                </div>
              </div>
            </div>
            <ArrowPathIcon className="w-5 h-5 text-status-yellow" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <ChartPieIcon className="w-5 h-5 text-status-red" />
              <div>
                <div className="text-white font-medium">Critical Payment APIs</div>
                <div className="text-sm text-gray-400">
                  Multiple payment APIs with high risk scores
                </div>
              </div>
            </div>
            <ArrowPathIcon className="w-5 h-5 text-status-red" />
          </div>
        </div>
      </div>
    </div>
  );
} 