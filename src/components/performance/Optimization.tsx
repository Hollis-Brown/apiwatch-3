import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowPathIcon,
  CloudIcon,
  GlobeAltIcon,
  ServerIcon,
  ChartBarIcon,
  ClockIcon,
  BoltIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

// Sample data
const cacheMetrics = [
  {
    id: 1,
    name: 'Cache Hit Ratio',
    value: '92%',
    change: '+2%',
    status: 'success',
    icon: ArrowPathIcon,
  },
  {
    id: 2,
    name: 'CDN Performance',
    value: '98%',
    change: '+1%',
    status: 'success',
    icon: CloudIcon,
  },
  {
    id: 3,
    name: 'Browser Cache',
    value: '85%',
    change: '+5%',
    status: 'success',
    icon: GlobeAltIcon,
  },
  {
    id: 4,
    name: 'API Cache',
    value: '78%',
    change: '-2%',
    status: 'warning',
    icon: ServerIcon,
  },
];

const loadMetrics = [
  {
    id: 1,
    name: 'Auto-scaling Status',
    value: 'Active',
    status: 'success',
    icon: ChartBarIcon,
    details: '3 instances running',
  },
  {
    id: 2,
    name: 'Rate Limiting',
    value: 'Enabled',
    status: 'success',
    icon: ClockIcon,
    details: '1000 req/min per user',
  },
  {
    id: 3,
    name: 'Queue Depth',
    value: 'Low',
    status: 'success',
    icon: BoltIcon,
    details: '5 tasks pending',
  },
  {
    id: 4,
    name: 'Resource Usage',
    value: '65%',
    status: 'warning',
    icon: CpuChipIcon,
    details: 'High CPU utilization',
  },
];

const optimizationTips = [
  {
    id: 1,
    title: 'Enable Browser Caching',
    description: 'Configure longer cache TTLs for static assets',
    impact: 'High',
    difficulty: 'Low',
  },
  {
    id: 2,
    title: 'Optimize API Response Caching',
    description: 'Implement cache headers for frequently accessed endpoints',
    impact: 'Medium',
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'Enable CDN Compression',
    description: 'Compress static assets before delivery',
    impact: 'High',
    difficulty: 'Low',
  },
  {
    id: 4,
    title: 'Implement Rate Limiting',
    description: 'Add rate limiting for high-traffic endpoints',
    impact: 'Medium',
    difficulty: 'Medium',
  },
];

export default function Optimization() {
  const [activeTab, setActiveTab] = useState('caching');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            System Optimization
          </h1>
          <p className="text-gray-400 mb-6">
            Monitor and optimize caching, load management, and resource usage.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <ArrowPathIcon className="w-5 h-5" />
              <span>92% Cache Hit Ratio</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudIcon className="w-5 h-5" />
              <span>98% CDN Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <ServerIcon className="w-5 h-5" />
              <span>3 Active Instances</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex gap-4 mb-6">
          {['caching', 'load', 'tips'].map((tab) => (
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

        {/* Caching Tab */}
        {activeTab === 'caching' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cacheMetrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700/50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-400">{metric.name}</span>
                    </div>
                    <span
                      className={`text-sm ${
                        metric.status === 'success'
                          ? 'text-status-green'
                          : 'text-status-yellow'
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Cache Controls
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">API Response Cache</p>
                    <p className="text-sm text-gray-400">
                      Cache API responses for 5 minutes
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Browser Cache</p>
                    <p className="text-sm text-gray-400">
                      Enable browser caching for static assets
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Load Management Tab */}
        {activeTab === 'load' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loadMetrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700/50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-400">{metric.name}</span>
                    </div>
                    <span
                      className={`text-sm ${
                        metric.status === 'success'
                          ? 'text-status-green'
                          : 'text-status-yellow'
                      }`}
                    >
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{metric.details}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Load Management Controls
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Auto-scaling</p>
                    <p className="text-sm text-gray-400">
                      Automatically scale based on load
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Rate Limiting</p>
                    <p className="text-sm text-gray-400">
                      Limit requests per user
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Optimization Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-4">
            {optimizationTips.map((tip) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-medium mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-400">{tip.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tip.impact === 'High'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {tip.impact} Impact
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tip.difficulty === 'Low'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {tip.difficulty} Difficulty
                    </span>
                  </div>
                </div>
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Apply Optimization
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 