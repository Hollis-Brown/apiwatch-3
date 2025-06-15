'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  enabled: boolean;
  config: Record<string, any>;
}

interface NotificationPreferences {
  channels: NotificationChannel[];
  alertTypes: {
    downtime: boolean;
    performance: boolean;
    security: boolean;
    custom: boolean;
  };
}

export default function NotificationsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    channels: [
      {
        id: 'email',
        name: 'Email',
        icon: EnvelopeIcon,
        description: 'Receive notifications via email',
        enabled: true,
        config: { email: '' },
      },
      {
        id: 'sms',
        name: 'SMS',
        icon: DevicePhoneMobileIcon,
        description: 'Receive notifications via SMS',
        enabled: false,
        config: { phone: '' },
      },
      {
        id: 'slack',
        name: 'Slack',
        icon: ChatBubbleLeftRightIcon,
        description: 'Receive notifications in Slack',
        enabled: false,
        config: { webhook: '' },
      },
      {
        id: 'webhook',
        name: 'Webhook',
        icon: CommandLineIcon,
        description: 'Send notifications to your own endpoint',
        enabled: false,
        config: { url: '', secret: '' },
      },
    ],
    alertTypes: {
      downtime: true,
      performance: true,
      security: true,
      custom: false,
    },
  });

  const handleChannelToggle = (channelId: string) => {
    setPreferences((prev) => ({
      ...prev,
      channels: prev.channels.map((channel) =>
        channel.id === channelId
          ? { ...channel, enabled: !channel.enabled }
          : channel
      ),
    }));
  };

  const handleChannelConfig = (
    channelId: string,
    key: string,
    value: string
  ) => {
    setPreferences((prev) => ({
      ...prev,
      channels: prev.channels.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              config: { ...channel.config, [key]: value },
            }
          : channel
      ),
    }));
  };

  const handleAlertTypeToggle = (type: keyof typeof preferences.alertTypes) => {
    setPreferences((prev) => ({
      ...prev,
      alertTypes: {
        ...prev.alertTypes,
        [type]: !prev.alertTypes[type],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) throw new Error('Failed to update notification preferences');

      toast.success('Notification preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update notification preferences');
      console.error('Notification preferences update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testNotification = async (channelId: string) => {
    try {
      const response = await fetch('/api/user/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId }),
      });

      if (!response.ok) throw new Error('Failed to send test notification');

      toast.success('Test notification sent successfully');
    } catch (error) {
      toast.error('Failed to send test notification');
      console.error('Test notification error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Notification Channels */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-white">Notification Channels</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {preferences.channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.id}
                className="rounded-lg border border-gray-700 bg-gray-800 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        {channel.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={channel.enabled}
                      onChange={() => handleChannelToggle(channel.id)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary"></div>
                  </label>
                </div>

                {channel.enabled && (
                  <div className="mt-4 space-y-3">
                    {Object.entries(channel.config).map(([key, value]) => (
                      <div key={key}>
                        <label
                          htmlFor={`${channel.id}-${key}`}
                          className="block text-xs font-medium text-gray-400"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                          type={key === 'secret' ? 'password' : 'text'}
                          id={`${channel.id}-${key}`}
                          value={value}
                          onChange={(e) =>
                            handleChannelConfig(channel.id, key, e.target.value)
                          }
                          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => testNotification(channel.id)}
                      className="w-full rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600"
                    >
                      Send Test Notification
                    </motion.button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Alert Types</h3>
        <div className="space-y-3">
          {Object.entries(preferences.alertTypes).map(([type, enabled]) => (
            <div
              key={type}
              className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4"
            >
              <div>
                <h4 className="text-sm font-medium text-white">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Alerts
                </h4>
                <p className="text-xs text-gray-400">
                  Receive notifications for {type} related events
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() =>
                    handleAlertTypeToggle(type as keyof typeof preferences.alertTypes)
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </motion.button>
      </div>
    </form>
  );
} 