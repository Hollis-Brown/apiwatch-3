import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CreditCardIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import TeamManagement from './TeamManagement';
import UsageAnalytics from './UsageAnalytics';
import APIGovernance from './APIGovernance';
import SecuritySettings from './SecuritySettings';
import ComplianceReporting from './ComplianceReporting';
import BillingManagement from './BillingManagement';

const tabs = [
  { name: 'Team', icon: UserGroupIcon, component: TeamManagement },
  { name: 'Analytics', icon: ChartBarIcon, component: UsageAnalytics },
  { name: 'Governance', icon: ShieldCheckIcon, component: APIGovernance },
  { name: 'Security', icon: ShieldCheckIcon, component: SecuritySettings },
  { name: 'Compliance', icon: DocumentTextIcon, component: ComplianceReporting },
  { name: 'Billing', icon: CreditCardIcon, component: BillingManagement },
];

export default function AdminDashboard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const SelectedComponent = tabs[selectedIndex].component;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your team, monitor usage, and configure enterprise settings
          </p>
        </div>

        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-1 rounded-xl bg-gray-800 p-1 mb-8">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) => `
                  flex items-center gap-2 w-full rounded-lg py-2.5 px-4 text-sm font-medium leading-5
                  ${
                    selected
                      ? 'bg-primary text-white shadow'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SelectedComponent />
              </motion.div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
} 