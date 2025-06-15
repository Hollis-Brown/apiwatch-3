import { Fragment } from 'react';
import { Dialog, Transition, Switch } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAPI } from '@/contexts/APIContext';
import { motion } from 'framer-motion';

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSettings({ isOpen, onClose }: NotificationSettingsProps) {
  const { notificationSettings, updateNotificationSettings } = useAPI();

  const handleToggle = (key: keyof typeof notificationSettings) => {
    updateNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  const handleSeverityToggle = (severity: keyof typeof notificationSettings.severityLevels) => {
    updateNotificationSettings({
      ...notificationSettings,
      severityLevels: {
        ...notificationSettings.severityLevels,
        [severity]: !notificationSettings.severityLevels[severity],
      },
    });
  };

  const handleFrequencyChange = (frequency: typeof notificationSettings.frequency) => {
    updateNotificationSettings({
      ...notificationSettings,
      frequency,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold">
                    Notification Settings
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Integration Toggles */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-4">Integrations</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-400">Receive alerts via email</p>
                        </div>
                        <Switch
                          checked={notificationSettings.email}
                          onChange={() => handleToggle('email')}
                          className={`${
                            notificationSettings.email ? 'bg-status-green' : 'bg-gray-600'
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                          <span
                            className={`${
                              notificationSettings.email ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Slack Integration</p>
                          <p className="text-sm text-gray-400">Send alerts to Slack channel</p>
                        </div>
                        <Switch
                          checked={notificationSettings.slack}
                          onChange={() => handleToggle('slack')}
                          className={`${
                            notificationSettings.slack ? 'bg-status-green' : 'bg-gray-600'
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                          <span
                            className={`${
                              notificationSettings.slack ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Discord Integration</p>
                          <p className="text-sm text-gray-400">Send alerts to Discord channel</p>
                        </div>
                        <Switch
                          checked={notificationSettings.discord}
                          onChange={() => handleToggle('discord')}
                          className={`${
                            notificationSettings.discord ? 'bg-status-green' : 'bg-gray-600'
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                          <span
                            className={`${
                              notificationSettings.discord ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>
                    </div>
                  </div>

                  {/* Alert Frequency */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-4">Alert Frequency</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {(['instant', 'daily', 'weekly'] as const).map((frequency) => (
                        <motion.button
                          key={frequency}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleFrequencyChange(frequency)}
                          className={`p-2 rounded-lg text-sm font-medium ${
                            notificationSettings.frequency === frequency
                              ? 'bg-status-green text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Severity Levels */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-4">Alert Severity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Critical Alerts</p>
                          <p className="text-sm text-gray-400">Immediate action required</p>
                        </div>
                        <Switch
                          checked={notificationSettings.severityLevels.critical}
                          onChange={() => handleSeverityToggle('critical')}
                          className={`${
                            notificationSettings.severityLevels.critical
                              ? 'bg-status-red'
                              : 'bg-gray-600'
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                          <span
                            className={`${
                              notificationSettings.severityLevels.critical
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Warning Alerts</p>
                          <p className="text-sm text-gray-400">Action required soon</p>
                        </div>
                        <Switch
                          checked={notificationSettings.severityLevels.warning}
                          onChange={() => handleSeverityToggle('warning')}
                          className={`${
                            notificationSettings.severityLevels.warning
                              ? 'bg-status-yellow'
                              : 'bg-gray-600'
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                          <span
                            className={`${
                              notificationSettings.severityLevels.warning
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Info Alerts</p>
                          <p className="text-sm text-gray-400">Updates and announcements</p>
                        </div>
                        <Switch
                          checked={notificationSettings.severityLevels.info}
                          onChange={() => handleSeverityToggle('info')}
                          className={`${
                            notificationSettings.severityLevels.info
                              ? 'bg-blue-500'
                              : 'bg-gray-600'
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                          <span
                            className={`${
                              notificationSettings.severityLevels.info
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>
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