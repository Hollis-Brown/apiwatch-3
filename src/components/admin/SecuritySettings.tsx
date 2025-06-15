import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  KeyIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

// Sample data
const apiKeys = [
  {
    id: 1,
    name: 'Production API Key',
    key: 'pk_live_1234567890abcdef',
    created: '2024-01-15',
    lastUsed: '2 hours ago',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Development API Key',
    key: 'pk_test_0987654321fedcba',
    created: '2024-02-01',
    lastUsed: '5 days ago',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Legacy API Key',
    key: 'pk_old_abcdef1234567890',
    created: '2023-12-01',
    lastUsed: '1 month ago',
    status: 'Inactive',
  },
];

const securitySettings = [
  {
    id: 1,
    name: 'IP Whitelist',
    description: 'Restrict API access to specific IP addresses',
    enabled: true,
  },
  {
    id: 2,
    name: 'Rate Limiting',
    description: 'Limit API requests per minute',
    enabled: true,
  },
  {
    id: 3,
    name: 'Two-Factor Authentication',
    description: 'Require 2FA for admin access',
    enabled: false,
  },
  {
    id: 4,
    name: 'Audit Logging',
    description: 'Log all API access attempts',
    enabled: true,
  },
];

export default function SecuritySettings() {
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [showKey, setShowKey] = useState<number | null>(null);
  const [newKeyName, setNewKeyName] = useState('');

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle key creation logic here
    setShowNewKeyModal(false);
    setNewKeyName('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active API Keys</p>
              <p className="text-2xl font-bold text-white">2</p>
            </div>
            <KeyIcon className="w-8 h-8 text-primary" />
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
              <p className="text-sm text-gray-400">Security Score</p>
              <p className="text-2xl font-bold text-white">92/100</p>
            </div>
            <ShieldCheckIcon className="w-8 h-8 text-status-green" />
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
              <p className="text-sm text-gray-400">Active Security Rules</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
            <LockClosedIcon className="w-8 h-8 text-status-yellow" />
          </div>
        </motion.div>
      </div>

      {/* API Keys */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">API Keys</h2>
          <button
            onClick={() => setShowNewKeyModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90"
          >
            <PlusIcon className="w-5 h-5" />
            New API Key
          </button>
        </div>
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <motion.div
              key={apiKey.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{apiKey.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm text-gray-400">
                      {showKey === apiKey.id
                        ? apiKey.key
                        : '•'.repeat(apiKey.key.length)}
                    </code>
                    <button
                      onClick={() =>
                        setShowKey(showKey === apiKey.id ? null : apiKey.id)
                      }
                      className="text-gray-400 hover:text-white"
                    >
                      {showKey === apiKey.id ? (
                        <EyeSlashIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="text-gray-400 hover:text-white"
                    >
                      <ClipboardIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      apiKey.status === 'Active'
                        ? 'bg-status-green/20 text-status-green'
                        : 'bg-status-red/20 text-status-red'
                    }`}
                  >
                    {apiKey.status}
                  </span>
                  <div className="text-sm text-gray-400">
                    <p>Created: {apiKey.created}</p>
                    <p>Last used: {apiKey.lastUsed}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Security Settings
        </h2>
        <div className="space-y-4">
          {securitySettings.map((setting) => (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
            >
              <div>
                <h3 className="text-white font-medium">{setting.name}</h3>
                <p className="text-sm text-gray-400">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={setting.enabled}
                  onChange={() => {
                    // Handle toggle logic here
                  }}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </motion.div>
          ))}
        </div>
      </div>

      {/* New API Key Modal */}
      {showNewKeyModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Create New API Key
            </h3>
            <form onSubmit={handleCreateKey} className="space-y-4">
              <div>
                <label
                  htmlFor="keyName"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Key Name
                </label>
                <input
                  type="text"
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewKeyModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90"
                >
                  Create Key
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 