import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PlayIcon,
  ForwardIcon,
} from '@heroicons/react/24/outline';

// Tour steps data
const tourSteps = [
  {
    id: 'dashboard',
    title: 'Welcome to APIWatch',
    description: 'Monitor and optimize your APIs in one place',
    target: '#dashboard',
    position: 'bottom',
  },
  {
    id: 'monitoring',
    title: 'Real-time Monitoring',
    description: 'Track API performance, uptime, and errors in real-time',
    target: '#monitoring',
    position: 'right',
  },
  {
    id: 'alerts',
    title: 'Smart Alerts',
    description: 'Get instant notifications when issues arise',
    target: '#alerts',
    position: 'left',
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Deep insights into API usage and performance',
    target: '#analytics',
    position: 'top',
  },
  {
    id: 'marketplace',
    title: 'API Marketplace',
    description: 'Discover and integrate new APIs easily',
    target: '#marketplace',
    position: 'bottom',
  },
];

export default function ProductTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Check if user has completed tour before
    const hasCompletedTour = localStorage.getItem('hasCompletedTour');
    if (!hasCompletedTour) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsOpen(false);
    localStorage.setItem('hasCompletedTour', 'true');
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleReplay = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      {/* Tour Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
          >
            {/* Tour Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg"
            >
              <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {currentTourStep.title}
                  </h3>
                  <button
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-white"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6">
                  {currentTourStep.description}
                </p>

                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
                    >
                      <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
                    >
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-400">
                    Step {currentStep + 1} of {tourSteps.length}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-700 rounded-full mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStep + 1) / tourSteps.length) * 100}%`,
                    }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleReplay}
                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                  >
                    <PlayIcon className="w-5 h-5" />
                    <span>Replay Tour</span>
                  </button>
                  <button
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-white"
                  >
                    Skip Tour
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour Trigger Button */}
      <button
        onClick={handleReplay}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
      >
        <ForwardIcon className="w-6 h-6" />
      </button>
    </>
  );
} 