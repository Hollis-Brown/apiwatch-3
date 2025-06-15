import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useAPI } from '@/contexts/APIContext';
import { Alert } from '@/lib/types';

const getAlertColor = (type: Alert['type']) => {
  switch (type) {
    case 'critical':
      return 'bg-status-red/20 text-status-red border-status-red/30';
    case 'warning':
      return 'bg-status-yellow/20 text-status-yellow border-status-yellow/30';
    case 'info':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  }
};

export default function AlertCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { alerts, markAlertAsRead } = useAPI();

  const unreadCount = alerts.filter((alert: Alert) => !alert.isRead).length;

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className="relative p-2 text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BellIcon className="w-6 h-6" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-status-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {unreadCount}
              </motion.div>
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 mt-2 w-96 rounded-lg bg-gray-800 shadow-lg border border-gray-700">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Alerts</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {alerts.map((alert: Alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-4 rounded-lg border ${getAlertColor(alert.type)} ${
                          !alert.isRead ? 'ring-2 ring-white/10' : ''
                        }`}
                        onClick={() => markAlertAsRead(alert.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{alert.title}</h4>
                            <p className="text-sm mt-1 opacity-90">{alert.description}</p>
                          </div>
                          <span className="text-xs opacity-75">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                        </div>

                        {alert.affectedEndpoints && (
                          <div className="mt-2">
                            <p className="text-xs font-medium">Affected Endpoints:</p>
                            <ul className="text-xs mt-1 space-y-1">
                              {alert.affectedEndpoints.map((endpoint: string) => (
                                <li key={endpoint}>{endpoint}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-3">
                          <p className="text-xs font-medium">Recommended Action:</p>
                          <p className="text-xs mt-1">{alert.recommendedAction}</p>
                        </div>

                        {alert.predictionDate && (
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="text-xs">Predicted for:</span>
                            <span className="text-xs font-medium">{alert.predictionDate}</span>
                            <span className="text-xs">({alert.confidence}% confidence)</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
} 