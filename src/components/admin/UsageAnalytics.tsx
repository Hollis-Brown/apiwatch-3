import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Sample data
const apiUsageData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'API Calls',
      data: [1200, 1900, 3000, 5000, 4000, 6000],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
    },
  ],
};

const endpointUsageData = {
  labels: ['Stripe', 'Twilio', 'SendGrid', 'AWS', 'Google Cloud'],
  datasets: [
    {
      label: 'Requests',
      data: [3000, 2000, 1500, 1000, 800],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ],
    },
  ],
};

const responseTimeData = {
  labels: ['0-100ms', '100-200ms', '200-500ms', '500ms+'],
  datasets: [
    {
      data: [65, 20, 10, 5],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgb(156, 163, 175)',
      },
    },
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(75, 85, 99, 0.2)',
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      },
    },
    x: {
      grid: {
        color: 'rgba(75, 85, 99, 0.2)',
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgb(156, 163, 175)',
      },
    },
  },
};

export default function UsageAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Usage Analytics</h2>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <p className="text-sm text-gray-400">Total API Calls</p>
          <p className="text-2xl font-bold text-white">21,100</p>
          <p className="text-sm text-status-green">↑ 12% from last period</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <p className="text-sm text-gray-400">Avg Response Time</p>
          <p className="text-2xl font-bold text-white">145ms</p>
          <p className="text-sm text-status-green">↓ 8% from last period</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <p className="text-sm text-gray-400">Success Rate</p>
          <p className="text-2xl font-bold text-white">99.9%</p>
          <p className="text-sm text-status-green">↑ 0.1% from last period</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <p className="text-sm text-gray-400">Active Endpoints</p>
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-sm text-status-green">↑ 2 from last period</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">API Usage Trend</h3>
          <Line data={apiUsageData} options={chartOptions} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Endpoint Usage Distribution
          </h3>
          <Bar data={endpointUsageData} options={chartOptions} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Response Time Distribution
          </h3>
          <Doughnut data={responseTimeData} options={doughnutOptions} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Usage by Team Member
          </h3>
          <div className="space-y-4">
            {[
              { name: 'John Doe', usage: '45%' },
              { name: 'Sarah Smith', usage: '30%' },
              { name: 'Mike Johnson', usage: '15%' },
              { name: 'Others', usage: '10%' },
            ].map((member, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{member.name}</span>
                  <span className="text-white">{member.usage}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: member.usage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 