import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ClockIcon,
  ServerIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  CpuChipIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data
const responseTimeData = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
  datasets: [
    {
      label: 'API Response Time (ms)',
      data: [120, 150, 180, 140, 160, 130],
      borderColor: 'rgb(99, 102, 241)',
      tension: 0.4,
    },
  ],
};

const errorRateData = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
  datasets: [
    {
      label: 'Error Rate (%)',
      data: [0.5, 0.8, 1.2, 0.7, 0.9, 0.6],
      borderColor: 'rgb(239, 68, 68)',
      tension: 0.4,
    },
  ],
};

const systemMetrics = [
  {
    id: 1,
    name: 'API Response Time',
    value: '145ms',
    change: '+5ms',
    status: 'warning',
    icon: ClockIcon,
  },
  {
    id: 2,
    name: 'Error Rate',
    value: '0.8%',
    change: '-0.2%',
    status: 'success',
    icon: ExclamationTriangleIcon,
  },
  {
    id: 3,
    name: 'Server Load',
    value: '65%',
    change: '+10%',
    status: 'warning',
    icon: ServerIcon,
  },
  {
    id: 4,
    name: 'Database Queries',
    value: '1.2k/s',
    change: '+200/s',
    status: 'success',
    icon: CircleStackIcon,
  },
];

const userMetrics = [
  {
    id: 1,
    name: 'Page Load Time',
    value: '1.2s',
    change: '-0.3s',
    status: 'success',
    icon: ClockIcon,
  },
  {
    id: 2,
    name: 'Active Users',
    value: '2.8k',
    change: '+150',
    status: 'success',
    icon: UserGroupIcon,
  },
  {
    id: 3,
    name: 'Feature Usage',
    value: '85%',
    change: '+5%',
    status: 'success',
    icon: ChartBarIcon,
  },
  {
    id: 4,
    name: 'User Satisfaction',
    value: '4.8/5',
    change: '+0.2',
    status: 'success',
    icon: ArrowTrendingUpIcon,
  },
];

export default function PerformanceDashboard() {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            System Performance
          </h1>
          <p className="text-gray-400 mb-6">
            Monitor and optimize APIWatch's performance in real-time.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <ServerIcon className="w-5 h-5" />
              <span>99.99% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>145ms Avg Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5" />
              <span>2.8k Active Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Performance Metrics</h2>
          <div className="flex gap-2">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-4"
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            API Response Time
          </h3>
          <Line
            data={responseTimeData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                },
                x: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              },
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Error Rate</h3>
          <Line
            data={errorRateData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                },
                x: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              },
            }}
          />
        </motion.div>
      </div>

      {/* User Experience Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userMetrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-4"
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
    </div>
  );
} 