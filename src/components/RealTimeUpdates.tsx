'use client';

import { motion } from 'framer-motion';
import { useAPI } from '@/contexts/APIContext';
import { useEffect, useState } from 'react';

export default function RealTimeUpdates() {
  const { apis, status } = useAPI();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPulseColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-status-green';
      case 'warning':
        return 'bg-status-yellow';
      case 'deprecated':
      case 'changes':
        return 'bg-status-red';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Real-time Updates</h2>
        <span className="text-sm text-gray-400">
          {mounted ? `Last updated: ${currentTime}` : 'Loading...'}
        </span>
      </div>

      <div className="space-y-4">
        {apis
          .filter((api) => api.isMonitoring)
          .map((api) => (
            <motion.div
              key={api.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-700/50"
            >
              <div className="relative">
                <div
                  className={`w-2 h-2 rounded-full ${getPulseColor(api.status)}`}
                />
                <motion.div
                  className={`absolute inset-0 rounded-full ${getPulseColor(
                    api.status
                  )}`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{api.name}</span>
                  <span className="text-sm text-gray-400">
                    {mounted ? new Date(api.lastChecked).toLocaleTimeString() : '--:--:--'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Status: {api.status.charAt(0).toUpperCase() + api.status.slice(1)}
                </p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
} 