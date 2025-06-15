import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SunIcon,
  MoonIcon,
  CommandLineIcon,
  PrinterIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Keyboard shortcuts
const shortcuts = [
  {
    key: '⌘ + K',
    description: 'Open command palette',
  },
  {
    key: '⌘ + /',
    description: 'Show keyboard shortcuts',
  },
  {
    key: '⌘ + D',
    description: 'Toggle dark mode',
  },
  {
    key: '⌘ + P',
    description: 'Print current view',
  },
];

// Loading animation variants
const loadingVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-semibold text-white">
                Something went wrong
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function FinalTouches() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle theme toggle
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        // Open command palette
      } else if (e.metaKey && e.key === '/') {
        e.preventDefault();
        setShowShortcuts(true);
      } else if (e.metaKey && e.key === 'd') {
        e.preventDefault();
        setIsDarkMode(!isDarkMode);
      } else if (e.metaKey && e.key === 'p') {
        e.preventDefault();
        window.print();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isDarkMode]);

  return (
    <ErrorBoundary>
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white">Loading APIWatch...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white"
      >
        {isDarkMode ? (
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6" />
        )}
      </button>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CommandLineIcon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">
                    Keyboard Shortcuts
                  </h2>
                </div>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50"
                  >
                    <span className="text-gray-400">{shortcut.description}</span>
                    <kbd className="px-2 py-1 rounded bg-gray-600 text-white text-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="fixed bottom-4 left-4 p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white"
      >
        <PrinterIcon className="w-6 h-6" />
      </button>

      {/* Print Styles */}
      <style>
        {`
          @media print {
            body {
              background: white;
              color: black;
            }
            .no-print {
              display: none;
            }
            .print-only {
              display: block;
            }
          }
        `}
      </style>
    </ErrorBoundary>
  );
} 