import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  ArrowPathIcon,
  ClockIcon,
  ServerIcon,
  CloudIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

// Sample data
const systemStatus = [
  {
    id: 1,
    name: 'Primary Server',
    status: 'operational',
    uptime: '99.99%',
    lastCheck: '2 minutes ago',
    icon: ServerIcon,
  },
  {
    id: 2,
    name: 'Backup Server',
    status: 'operational',
    uptime: '99.95%',
    lastCheck: '2 minutes ago',
    icon: ServerIcon,
  },
  {
    id: 3,
    name: 'Database Cluster',
    status: 'operational',
    uptime: '99.98%',
    lastCheck: '2 minutes ago',
    icon: CloudIcon,
  },
  {
    id: 4,
    name: 'CDN Network',
    status: 'operational',
    uptime: '99.99%',
    lastCheck: '2 minutes ago',
    icon: CloudIcon,
  },
];

const backupStatus = [
  {
    id: 1,
    name: 'Database Backup',
    status: 'success',
    lastBackup: '2 hours ago',
    size: '2.5 GB',
    icon: DocumentCheckIcon,
  },
  {
    id: 2,
    name: 'File System Backup',
    status: 'success',
    lastBackup: '6 hours ago',
    size: '15 GB',
    icon: DocumentCheckIcon,
  },
  {
    id: 3,
    name: 'Configuration Backup',
    status: 'success',
    lastBackup: '12 hours ago',
    size: '500 MB',
    icon: DocumentCheckIcon,
  },
];

const failoverTests = [
  {
    id: 1,
    name: 'Database Failover',
    status: 'success',
    lastTest: '24 hours ago',
    recoveryTime: '45 seconds',
    icon: ArrowPathIcon,
  },
  {
    id: 2,
    name: 'Server Failover',
    status: 'success',
    lastTest: '24 hours ago',
    recoveryTime: '30 seconds',
    icon: ArrowPathIcon,
  },
  {
    id: 3,
    name: 'CDN Failover',
    status: 'success',
    lastTest: '24 hours ago',
    recoveryTime: '15 seconds',
    icon: ArrowPathIcon,
  },
];

const dataConsistency = [
  {
    id: 1,
    name: 'Database Replication',
    status: 'healthy',
    lag: '0 seconds',
    icon: CheckCircleIcon,
  },
  {
    id: 2,
    name: 'Cache Consistency',
    status: 'healthy',
    lag: '0 seconds',
    icon: CheckCircleIcon,
  },
  {
    id: 3,
    name: 'File System Sync',
    status: 'healthy',
    lag: '0 seconds',
    icon: CheckCircleIcon,
  },
];

export default function Reliability() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            System Reliability
          </h1>
          <p className="text-gray-400 mb-6">
            Monitor system redundancy, failover status, and data consistency.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>99.99% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowPathIcon className="w-5 h-5" />
              <span>30s Recovery Time</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>Last Backup: 2h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStatus.map((status) => (
            <motion.div
              key={status.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <status.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{status.name}</span>
                </div>
                <span className="text-status-green text-sm">Operational</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-white">{status.uptime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Last Check</span>
                  <span className="text-white">{status.lastCheck}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Backup Status */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Backup Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {backupStatus.map((backup) => (
            <motion.div
              key={backup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <backup.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{backup.name}</span>
                </div>
                <span className="text-status-green text-sm">Success</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Last Backup</span>
                  <span className="text-white">{backup.lastBackup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Size</span>
                  <span className="text-white">{backup.size}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Failover Tests */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Failover Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {failoverTests.map((test) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <test.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{test.name}</span>
                </div>
                <span className="text-status-green text-sm">Success</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Last Test</span>
                  <span className="text-white">{test.lastTest}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Recovery Time</span>
                  <span className="text-white">{test.recoveryTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Consistency */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Data Consistency
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dataConsistency.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span className="text-status-green text-sm">Healthy</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Replication Lag</span>
                  <span className="text-white">{item.lag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 