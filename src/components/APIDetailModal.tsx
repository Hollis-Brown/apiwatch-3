import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAPI } from '@/contexts/APIContext';
import { Switch } from '@headlessui/react';
import { motion } from 'framer-motion';

export default function APIDetailModal() {
  const { selectedApi, setSelectedApi, toggleMonitoring, updateCheckFrequency } = useAPI();

  if (!selectedApi) return null;

  const getImpactColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-status-red/20 text-status-red';
      case 'medium':
        return 'bg-status-yellow/20 text-status-yellow';
      case 'low':
        return 'bg-status-green/20 text-status-green';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <Transition appear show={!!selectedApi} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setSelectedApi(null)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold">
                    {selectedApi.name}
                  </Dialog.Title>
                  <button
                    onClick={() => setSelectedApi(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* API Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Version</p>
                      <p className="font-medium">{selectedApi.version}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Last Checked</p>
                      <p className="font-medium">
                        {new Date(selectedApi.lastChecked).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Monitoring Controls */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Monitoring Status</h4>
                        <p className="text-sm text-gray-400">
                          {selectedApi.isMonitoring ? 'Active' : 'Paused'}
                        </p>
                      </div>
                      <Switch
                        checked={selectedApi.isMonitoring}
                        onChange={() => toggleMonitoring(selectedApi.id)}
                        className={`${
                          selectedApi.isMonitoring ? 'bg-status-green' : 'bg-gray-600'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      >
                        <span
                          className={`${
                            selectedApi.isMonitoring ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>

                    <div className="mt-4">
                      <label className="text-sm text-gray-400">Check Frequency</label>
                      <select
                        value={selectedApi.checkFrequency}
                        onChange={(e) => updateCheckFrequency(selectedApi.id, e.target.value as any)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                      >
                        <option value="15min">Every 15 minutes</option>
                        <option value="1hr">Every hour</option>
                        <option value="6hr">Every 6 hours</option>
                        <option value="daily">Daily</option>
                      </select>
                    </div>
                  </div>

                  {/* Change History */}
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="font-medium mb-4">Change History</h4>
                    <div className="space-y-4">
                      {[
                        {
                          date: '2024-02-15',
                          type: 'Rate Limit',
                          impact: 'medium',
                          description: 'Rate limit changed 1000→500/hour',
                        },
                        {
                          date: '2024-02-10',
                          type: 'Authentication',
                          impact: 'high',
                          description: 'Authentication method updated',
                        },
                        {
                          date: '2024-02-01',
                          type: 'Deprecation',
                          impact: 'high',
                          description: 'Endpoint deprecated',
                        },
                      ].map((change, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4 p-3 rounded-lg bg-gray-700/50"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">{change.date}</span>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(
                                  change.impact
                                )}`}
                              >
                                {change.impact.toUpperCase()}
                              </span>
                            </div>
                            <p className="font-medium mt-1">{change.type}</p>
                            <p className="text-sm text-gray-400 mt-1">{change.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 