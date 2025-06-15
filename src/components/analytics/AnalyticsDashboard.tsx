import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import PerformanceMetrics from './PerformanceMetrics';
import ChangePatterns from './ChangePatterns';
import PortfolioHealth from './PortfolioHealth';
import { ChartBarIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const tabs = [
  {
    name: 'Performance',
    icon: ChartBarIcon,
    component: PerformanceMetrics,
  },
  {
    name: 'Change Patterns',
    icon: ClockIcon,
    component: ChangePatterns,
  },
  {
    name: 'Portfolio Health',
    icon: ShieldCheckIcon,
    component: PortfolioHealth,
  },
];

export default function AnalyticsDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-sm text-gray-400">Monitor and analyze your API ecosystem</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
          <button className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white hover:bg-gray-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-2 mb-6">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium focus:outline-none ${
                  selected
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`
              }
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        {/* Tab Panels */}
        <Tab.Panels className="flex-1">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.name} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <tab.component />
              </motion.div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
} 