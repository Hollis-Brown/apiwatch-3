'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  GiftIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface Milestone {
  id: number;
  title: string;
  description: string;
  reward: string;
  completed: boolean;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'First API Added',
    description: `You've added your first API to monitor`,
    reward: '7-day trial extension',
    completed: true,
  },
  {
    id: 2,
    title: '5 APIs Monitored',
    description: `You're monitoring 5 APIs`,
    reward: 'Premium features unlocked',
    completed: false,
  },
  {
    id: 3,
    title: 'First Alert Created',
    description: `You've set up your first alert`,
    reward: 'Custom alert templates',
    completed: false,
  },
];

const referralRewards = [
  {
    id: 1,
    title: 'Refer 3 Friends',
    description: 'Get 1 month of premium features',
    progress: 2,
    target: 3,
  },
  {
    id: 2,
    title: 'Refer 5 Friends',
    description: 'Get 3 months of premium features',
    progress: 2,
    target: 5,
  },
  {
    id: 3,
    title: 'Refer 10 Friends',
    description: 'Get 6 months of premium features',
    progress: 2,
    target: 10,
  },
];

export default function ConversionOptimization() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<number | null>(null);

  // Handle exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Simulate milestone completion
  useEffect(() => {
    const interval = setInterval(() => {
      const nextMilestone = milestones.find((m) => !m.completed);
      if (nextMilestone) {
        setCurrentMilestone(nextMilestone.id);
        setShowMilestone(true);
        setTimeout(() => setShowMilestone(false), 5000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Wait! Don't Miss Out
                </h3>
                <button
                  onClick={() => setShowExitPopup(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-400 mb-6">
                Get 50% off your first 3 months when you sign up today!
              </p>
              <button className="w-full py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                Claim Offer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone Celebration */}
      <AnimatePresence>
        {showMilestone && currentMilestone && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-gray-800 rounded-xl p-4 shadow-xl z-40"
          >
            <div className="flex items-center gap-3">
              <GiftIcon className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="text-white font-medium">Milestone Achieved!</h4>
                <p className="text-gray-400 text-sm">
                  {milestones.find((m) => m.id === currentMilestone)?.title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestones Section */}
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Your Progress
          </h2>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-gray-700/50"
              >
                <div
                  className={`p-2 rounded-lg ${
                    milestone.completed
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-600/20 text-gray-400'
                  }`}
                >
                  <ChartBarIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{milestone.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {milestone.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <GiftIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-yellow-400">
                      Reward: {milestone.reward}
                    </span>
                  </div>
                </div>
                {milestone.completed && (
                  <div className="text-green-400">Completed</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Referral Program */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserGroupIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              Referral Program
            </h2>
          </div>
          <div className="space-y-4">
            {referralRewards.map((reward) => (
              <div
                key={reward.id}
                className="p-4 rounded-lg bg-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{reward.title}</h3>
                  <span className="text-sm text-gray-400">
                    {reward.progress}/{reward.target}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  {reward.description}
                </p>
                <div className="h-2 bg-gray-600 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${(reward.progress / reward.target) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            Invite Friends
          </button>
        </div>

        {/* Limited Time Offer */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <ClockIcon className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-semibold text-white">
              Limited Time Offer
            </h2>
          </div>
          <p className="text-gray-400 mb-6">
            Upgrade to Premium now and get 3 months free!
          </p>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">$29/mo</div>
            <button className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
              Claim Offer
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 