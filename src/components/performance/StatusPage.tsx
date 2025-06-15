import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  BellIcon,
  ChartBarIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';

// Sample data
const systemComponents = [
  {
    id: 1,
    name: 'API Gateway',
    status: 'operational',
    uptime: '99.99%',
    lastIncident: '30 days ago',
    icon: ServerIcon,
  },
  {
    id: 2,
    name: 'Database',
    status: 'operational',
    uptime: '99.95%',
    lastIncident: '15 days ago',
    icon: ServerIcon,
  },
  {
    id: 3,
    name: 'Authentication',
    status: 'operational',
    uptime: '99.98%',
    lastIncident: '45 days ago',
    icon: ServerIcon,
  },
  {
    id: 4,
    name: 'CDN',
    status: 'operational',
    uptime: '99.99%',
    lastIncident: '60 days ago',
    icon: ServerIcon,
  },
];

const incidents = [
  {
    id: 1,
    title: 'Database Performance Degradation',
    status: 'resolved',
    impact: 'minor',
    startTime: '2024-03-15 14:30:00',
    endTime: '2024-03-15 15:45:00',
    description:
      'Increased query latency affecting some API endpoints. Implemented query optimization and increased connection pool size.',
  },
  {
    id: 2,
    title: 'CDN Cache Issues',
    status: 'resolved',
    impact: 'minor',
    startTime: '2024-03-10 09:15:00',
    endTime: '2024-03-10 10:30:00',
    description:
      'Cache invalidation issues causing stale content delivery. Fixed cache configuration and implemented better cache control headers.',
  },
  {
    id: 3,
    title: 'API Gateway Timeout',
    status: 'resolved',
    impact: 'major',
    startTime: '2024-03-05 16:00:00',
    endTime: '2024-03-05 17:30:00',
    description:
      'Increased load causing timeouts in the API gateway. Scaled up gateway instances and implemented better load balancing.',
  },
];

const metrics = [
  {
    id: 1,
    name: 'Response Time',
    value: '150ms',
    change: '-10%',
    status: 'improved',
    icon: ChartBarIcon,
  },
  {
    id: 2,
    name: 'Error Rate',
    value: '0.1%',
    change: '-5%',
    status: 'improved',
    icon: ChartBarIcon,
  },
  {
    id: 3,
    name: 'Uptime',
    value: '99.99%',
    change: '+0.1%',
    status: 'improved',
    icon: ChartBarIcon,
  },
];

export default function StatusPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            System Status
          </h1>
          <p className="text-gray-400 mb-6">
            Real-time system status and incident history.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-status-green" />
              <span>All Systems Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>Last Updated: 2 minutes ago</span>
            </div>
            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
              <BellIcon className="w-5 h-5" />
              <span>Subscribe to Updates</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Components */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          System Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemComponents.map((component) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <component.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{component.name}</span>
                </div>
                <span className="text-status-green text-sm">Operational</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-white">{component.uptime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Last Incident</span>
                  <span className="text-white">{component.lastIncident}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric) => (
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
                    metric.status === 'improved'
                      ? 'text-status-green'
                      : 'text-status-red'
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-semibold text-white">
                {metric.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Incident History */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Incident History</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
            <ArrowPathIcon className="w-5 h-5" />
            Refresh
          </button>
        </div>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      incident.impact === 'major'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {incident.impact.toUpperCase()}
                  </span>
                  <span className="text-white font-medium">
                    {incident.title}
                  </span>
                </div>
                <span className="text-status-green text-sm">Resolved</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                {incident.description}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>Started: {incident.startTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>Resolved: {incident.endTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 