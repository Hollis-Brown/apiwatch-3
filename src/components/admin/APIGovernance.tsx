import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

// Sample data
const policies = [
  {
    id: 1,
    name: 'Rate Limiting',
    description: 'Enforce rate limits on all API endpoints',
    status: 'Active',
    lastUpdated: '2 days ago',
    compliance: 98,
  },
  {
    id: 2,
    name: 'Authentication',
    description: 'Require API key authentication for all requests',
    status: 'Active',
    lastUpdated: '1 week ago',
    compliance: 100,
  },
  {
    id: 3,
    name: 'Data Encryption',
    description: 'Encrypt all sensitive data in transit',
    status: 'Warning',
    lastUpdated: '3 days ago',
    compliance: 85,
  },
  {
    id: 4,
    name: 'Versioning',
    description: 'Maintain API versioning standards',
    status: 'Active',
    lastUpdated: '5 days ago',
    compliance: 95,
  },
];

const complianceChecks = [
  {
    id: 1,
    name: 'GDPR Compliance',
    status: 'Compliant',
    lastChecked: '1 day ago',
    nextCheck: '29 days',
  },
  {
    id: 2,
    name: 'SOC 2',
    status: 'Compliant',
    lastChecked: '2 weeks ago',
    nextCheck: '2 weeks',
  },
  {
    id: 3,
    name: 'HIPAA',
    status: 'Non-Compliant',
    lastChecked: '1 month ago',
    nextCheck: '2 months',
  },
  {
    id: 4,
    name: 'PCI DSS',
    status: 'In Progress',
    lastChecked: '3 days ago',
    nextCheck: '27 days',
  },
];

export default function APIGovernance() {
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Policies</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <ShieldCheckIcon className="w-8 h-8 text-status-green" />
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
              <p className="text-sm text-gray-400">Overall Compliance</p>
              <p className="text-2xl font-bold text-white">94.5%</p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-primary" />
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
              <p className="text-sm text-gray-400">Pending Reviews</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
            <ClockIcon className="w-8 h-8 text-status-yellow" />
          </div>
        </motion.div>
      </div>

      {/* Policies */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">API Policies</h2>
        <div className="space-y-4">
          {policies.map((policy) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedPolicy === policy.id
                  ? 'bg-primary/20 border border-primary'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedPolicy(policy.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{policy.name}</h3>
                  <p className="text-sm text-gray-400">{policy.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      policy.status === 'Active'
                        ? 'bg-status-green/20 text-status-green'
                        : 'bg-status-yellow/20 text-status-yellow'
                    }`}
                  >
                    {policy.status}
                  </span>
                  <div className="w-24">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Compliance</span>
                      <span className="text-white">{policy.compliance}%</span>
                    </div>
                    <div className="h-2 bg-gray-600 rounded-full">
                      <div
                        className={`h-full rounded-full ${
                          policy.compliance >= 90
                            ? 'bg-status-green'
                            : policy.compliance >= 70
                            ? 'bg-status-yellow'
                            : 'bg-status-red'
                        }`}
                        style={{ width: `${policy.compliance}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliance Checks */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Compliance Checks
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="pb-4">Standard</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Last Check</th>
                <th className="pb-4">Next Check</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {complianceChecks.map((check) => (
                <tr key={check.id}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-white">{check.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        check.status === 'Compliant'
                          ? 'bg-status-green/20 text-status-green'
                          : check.status === 'In Progress'
                          ? 'bg-status-yellow/20 text-status-yellow'
                          : 'bg-status-red/20 text-status-red'
                      }`}
                    >
                      {check.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">{check.lastChecked}</td>
                  <td className="py-4 text-gray-400">{check.nextCheck}</td>
                  <td className="py-4">
                    <button className="text-primary hover:text-primary/80">
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Policy Details Modal */}
      {selectedPolicy && (
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
            className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-white">
                Policy Details
              </h3>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Description</h4>
                <p className="text-white mt-1">
                  {policies.find((p) => p.id === selectedPolicy)?.description}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">
                  Implementation Status
                </h4>
                <div className="mt-2 space-y-2">
                  {['Documentation', 'Testing', 'Deployment', 'Monitoring'].map(
                    (step) => (
                      <div key={step} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-status-green" />
                        <span className="text-white">{step}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Actions</h4>
                <div className="flex gap-3 mt-2">
                  <button className="px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90">
                    Edit Policy
                  </button>
                  <button className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600">
                    View History
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 