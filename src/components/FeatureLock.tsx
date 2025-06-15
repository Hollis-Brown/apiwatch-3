import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface FeatureLockProps {
  isLocked: boolean;
  onUpgrade: () => void;
  children: React.ReactNode;
}

export default function FeatureLock({ isLocked, onUpgrade, children }: FeatureLockProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div className={`${isLocked ? 'blur-sm' : ''}`}>
        {children}
      </div>
      {isLocked && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="flex flex-col items-center">
            <LockClosedIcon className="w-6 h-6 text-status-yellow mb-1" />
            <span className="text-xs text-status-yellow font-semibold">Upgrade Required</span>
          </div>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg"
            >
              Upgrade to unlock this feature
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
} 