import { useState } from 'react';
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
  Filler,
} from 'chart.js';
import { motion } from 'framer-motion';
import { ArrowTrendingUpIcon, ExclamationTriangleIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const metrics = [
  {
    name: 'Average Response Time',
    value: '245ms',
    change: '+12ms',
    trend: 'up',
    icon: ClockIcon,
  },
  {
    name: 'Uptime',
    value: '99.98%',
    change: '+0.02%',
    trend: 'up',
    icon: ChartBarIcon,
  },
  {
    name: 'Error Rate',
    value: '0.02%',
    change: '-0.01%',
    trend: 'down',
    icon: ExclamationTriangleIcon,
  },
  {
    name: 'Total Requests',
    value: '1.2M',
    change: '+15%',
    trend: 'up',
    icon: ArrowTrendingUpIcon,
  },
];

// Sample data for charts
const responseTimeData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Response Time (ms)',
      data: [230, 245, 240, 235, 250, 245, 245],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const errorRateData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Error Rate (%)',
      data: [0.03, 0.02, 0.02, 0.01, 0.02, 0.02, 0.02],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
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
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
};

export default function PerformanceMetrics() {
  const [selectedMetric, setSelectedMetric] = useState('responseTime');

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className="w-5 h-5 text-gray-400" />
              <span
                className={`text-xs font-medium ${
                  metric.trend === 'up' ? 'text-status-green' : 'text-status-red'
                }`}
              >
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-sm text-gray-400">{metric.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Response Time Trend</h3>
          <Line data={responseTimeData} options={chartOptions} />
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Error Rate Trend</h3>
          <Line data={errorRateData} options={chartOptions} />
        </div>
      </div>

      {/* API Performance Table */}
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-4">API Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-3">API</th>
                <th className="pb-3">Response Time</th>
                <th className="pb-3">Uptime</th>
                <th className="pb-3">Error Rate</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-gray-700">
                <td className="py-3">Stripe API</td>
                <td>245ms</td>
                <td>99.99%</td>
                <td>0.01%</td>
                <td>
                  <span className="px-2 py-1 rounded-full text-xs bg-status-green/20 text-status-green">
                    Healthy
                  </span>
                </td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="py-3">GitHub API</td>
                <td>180ms</td>
                <td>99.95%</td>
                <td>0.05%</td>
                <td>
                  <span className="px-2 py-1 rounded-full text-xs bg-status-green/20 text-status-green">
                    Healthy
                  </span>
                </td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="py-3">Twitter API</td>
                <td>320ms</td>
                <td>99.90%</td>
                <td>0.10%</td>
                <td>
                  <span className="px-2 py-1 rounded-full text-xs bg-status-yellow/20 text-status-yellow">
                    Warning
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 