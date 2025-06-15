import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

// Sample data for the heatmap
const heatmapData = [
  { api: 'Stripe API', changes: 12, category: 'Payment', volatility: 'Low' },
  { api: 'GitHub API', changes: 8, category: 'Development', volatility: 'Medium' },
  { api: 'Twitter API', changes: 15, category: 'Social', volatility: 'High' },
  { api: 'Weather API', changes: 5, category: 'Weather', volatility: 'Low' },
  { api: 'Google Maps API', changes: 10, category: 'Maps', volatility: 'Medium' },
];

// Sample data for seasonal patterns
const seasonalPatterns = [
  {
    category: 'Payment APIs',
    pattern: '3x more volatile than weather APIs',
    trend: 'up',
    change: '+15%',
  },
  {
    category: 'Social Media APIs',
    pattern: 'Most changes occur in Q4',
    trend: 'up',
    change: '+20%',
  },
  {
    category: 'Weather APIs',
    pattern: 'Stable throughout the year',
    trend: 'down',
    change: '-5%',
  },
];

export default function ChangePatterns() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="space-y-6">
      {/* Change Frequency Heatmap */}
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400">Change Frequency Heatmap</h3>
          <select
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm text-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="payment">Payment</option>
            <option value="social">Social</option>
            <option value="weather">Weather</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {heatmapData.map((api) => (
            <motion.div
              key={api.api}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">{api.api}</h4>
                  <p className="text-sm text-gray-400">{api.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-white font-medium">{api.changes} changes</div>
                    <div className="text-sm text-gray-400">Last 30 days</div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      api.volatility === 'High'
                        ? 'bg-status-red/20 text-status-red'
                        : api.volatility === 'Medium'
                        ? 'bg-status-yellow/20 text-status-yellow'
                        : 'bg-status-green/20 text-status-green'
                    }`}
                  >
                    {api.volatility} Volatility
                  </div>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-status-green"
                  style={{ width: `${(api.changes / 15) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seasonal Patterns */}
      <div className="grid grid-cols-3 gap-4">
        {seasonalPatterns.map((pattern) => (
          <motion.div
            key={pattern.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <span
                className={`text-xs font-medium ${
                  pattern.trend === 'up' ? 'text-status-green' : 'text-status-red'
                }`}
              >
                {pattern.change}
              </span>
            </div>
            <div className="text-lg font-bold text-white mb-1">{pattern.category}</div>
            <div className="text-sm text-gray-400">{pattern.pattern}</div>
          </motion.div>
        ))}
      </div>

      {/* Industry Trends */}
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Industry Trends</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-white font-medium">Payment APIs</div>
                <div className="text-sm text-gray-400">3x more volatile than weather APIs</div>
              </div>
            </div>
            <ArrowTrendingUpIcon className="w-5 h-5 text-status-green" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-white font-medium">Social Media APIs</div>
                <div className="text-sm text-gray-400">Most changes occur in Q4</div>
              </div>
            </div>
            <ArrowTrendingUpIcon className="w-5 h-5 text-status-green" />
          </div>
        </div>
      </div>
    </div>
  );
} 