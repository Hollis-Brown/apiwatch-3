import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BugAntIcon,
  BeakerIcon,
  CommandLineIcon,
  DocumentTextIcon,
  PlayIcon,
  StopIcon,
  ArrowPathIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

// Sample data
const testCases = [
  {
    id: 1,
    name: 'API Authentication',
    status: 'passed',
    duration: '1.2s',
    lastRun: '5 minutes ago',
  },
  {
    id: 2,
    name: 'Rate Limiting',
    status: 'passed',
    duration: '0.8s',
    lastRun: '5 minutes ago',
  },
  {
    id: 3,
    name: 'Data Validation',
    status: 'passed',
    duration: '1.5s',
    lastRun: '5 minutes ago',
  },
];

const debugLogs = [
  {
    id: 1,
    timestamp: '2024-03-20 10:15:23',
    level: 'info',
    message: 'API request received',
    details: {
      method: 'GET',
      endpoint: '/api/v1/users',
      status: 200,
    },
  },
  {
    id: 2,
    timestamp: '2024-03-20 10:15:24',
    level: 'debug',
    message: 'Processing request',
    details: {
      userId: '123',
      action: 'fetch',
    },
  },
  {
    id: 3,
    timestamp: '2024-03-20 10:15:25',
    level: 'info',
    message: 'Request completed',
    details: {
      duration: '150ms',
      cache: 'hit',
    },
  },
];

export default function DeveloperTools() {
  const [activeTab, setActiveTab] = useState('debug');
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Developer Tools
          </h1>
          <p className="text-gray-400 mb-6">
            Debug, test, and optimize your API integrations.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <BugAntIcon className="w-5 h-5" />
              <span>Debug Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <BeakerIcon className="w-5 h-5" />
              <span>Test Suite</span>
            </div>
            <div className="flex items-center gap-2">
              <CommandLineIcon className="w-5 h-5" />
              <span>API Console</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('debug')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'debug'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Debug Console
          </button>
          <button
            onClick={() => setActiveTab('test')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'test'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Test Suite
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'console'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            API Console
          </button>
        </div>

        {/* Debug Console */}
        {activeTab === 'debug' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Debug Logs</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
                >
                  {isRunning ? (
                    <>
                      <StopIcon className="w-5 h-5" />
                      Stop
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-5 h-5" />
                      Start
                    </>
                  )}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
                  <ArrowPathIcon className="w-5 h-5" />
                  Clear
                </button>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              {debugLogs.map((log) => (
                <div key={log.id} className="mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{log.timestamp}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        log.level === 'info'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4 text-gray-300">{log.message}</div>
                  <div className="ml-4 text-gray-400">
                    {JSON.stringify(log.details, null, 2)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Test Suite */}
        {activeTab === 'test' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Test Cases</h2>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                <PlayIcon className="w-5 h-5" />
                Run All Tests
              </button>
            </div>
            <div className="space-y-4">
              {testCases.map((test) => (
                <div
                  key={test.id}
                  className="bg-gray-700/50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CodeBracketIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-white">{test.name}</span>
                    </div>
                    <span className="text-status-green text-sm">Passed</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Duration: {test.duration}</span>
                    <span>Last Run: {test.lastRun}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* API Console */}
        {activeTab === 'console' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">API Console</h2>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                <DocumentTextIcon className="w-5 h-5" />
                Documentation
              </button>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4">
                <select className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter API endpoint"
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg"
                />
                <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                  Send
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Request Body
                  </h3>
                  <textarea
                    className="w-full h-32 bg-gray-800 text-white p-2 rounded-lg font-mono text-sm"
                    placeholder="Enter request body (JSON)"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Response
                  </h3>
                  <div className="w-full h-32 bg-gray-800 text-white p-2 rounded-lg font-mono text-sm">
                    No response yet
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 