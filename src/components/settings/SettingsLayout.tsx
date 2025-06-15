'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  KeyIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface SettingsLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  {
    id: 'profile',
    name: 'Profile',
    icon: UserCircleIcon,
    description: 'Manage your account information and preferences',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: BellIcon,
    description: 'Configure how you receive alerts and updates',
  },
  {
    id: 'security',
    name: 'Security',
    icon: ShieldCheckIcon,
    description: 'Manage your password and security settings',
  },
  {
    id: 'billing',
    name: 'Billing',
    icon: CreditCardIcon,
    description: 'Manage your subscription and payment methods',
  },
  {
    id: 'api-keys',
    name: 'API Keys',
    icon: KeyIcon,
    description: 'Manage your API keys and access tokens',
  },
  {
    id: 'usage',
    name: 'Usage',
    icon: ChartBarIcon,
    description: 'View your API monitoring usage and limits',
  },
];

export default function SettingsLayout({
  children,
  activeSection,
  onSectionChange,
}: SettingsLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${
                      isActive
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-primary' : 'text-gray-400'
                    }`}
                  />
                  {section.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="mt-8 lg:mt-0 lg:col-span-9">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white">
                {sections.find((s) => s.id === activeSection)?.name}
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                {sections.find((s) => s.id === activeSection)?.description}
              </p>
            </div>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 