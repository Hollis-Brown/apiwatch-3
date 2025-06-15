'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, MigrationPlan } from '@/lib/types';
import { useSession } from 'next-auth/react';

interface API {
  id: string;
  name: string;
  url: string;
  version: string;
  baseUrl: string;
  docsUrl: string;
  status: 'up' | 'down' | 'degraded' | 'stable';
  lastChecked: Date;
  responseTime: number;
  isMonitoring: boolean;
  checkFrequency: string;
}

interface APIChange {
  id: string;
  apiId: string;
  timestamp: string;
  changeType: string;
  impactLevel: string;
  description: string;
}

interface MonitoringStatus {
  totalApis: number;
  activeAlerts: number;
  deprecatedThisMonth: number;
  stableApis: number;
  lastUpdated: string;
}

interface PopularAPI {
  name: string;
  baseUrl: string;
  docsUrl: string;
  currentVersion: string;
}

interface NotificationSettings {
  email: boolean;
  slack: boolean;
  discord: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
  severityLevels: {
    critical: boolean;
    warning: boolean;
    info: boolean;
  };
}

interface APIContextType {
  apis: API[];
  changes: APIChange[];
  status: MonitoringStatus;
  popularApis: PopularAPI[];
  selectedApi: API | null;
  setSelectedApi: (api: API | null) => void;
  addApi: (api: Omit<API, 'id' | 'status' | 'lastChecked'>) => Promise<void>;
  updateApi: (id: string, data: Partial<API>) => Promise<void>;
  deleteApi: (id: string) => Promise<void>;
  toggleMonitoring: (apiId: string) => Promise<void>;
  updateCheckFrequency: (apiId: string, frequency: string) => Promise<void>;
  alerts: Alert[];
  markAlertAsRead: (alertId: string) => Promise<void>;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: NotificationSettings) => Promise<void>;
  getMigrationPlan: (apiId: string) => Promise<MigrationPlan | null>;
  isLoading: boolean;
  error: string | null;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

export function APIContextProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [apis, setApis] = useState<API[]>([]);
  const [changes, setChanges] = useState<APIChange[]>([]);
  const [selectedApi, setSelectedApi] = useState<API | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    slack: false,
    discord: false,
    frequency: 'instant',
    severityLevels: {
      critical: true,
      warning: true,
      info: false,
    },
  });

  const [status, setStatus] = useState<MonitoringStatus>({
    totalApis: 0,
    activeAlerts: 0,
    deprecatedThisMonth: 0,
    stableApis: 0,
    lastUpdated: new Date().toISOString(),
  });

  // Fetch APIs on mount and when session changes
  useEffect(() => {
    if (session) {
      fetchApis();
    }
  }, [session]);

  const fetchApis = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/apis');
      if (!response.ok) throw new Error('Failed to fetch APIs');
      const data = await response.json();
      setApis(data);
      setStatus(prev => ({
        ...prev,
        totalApis: data.length,
        stableApis: data.filter((api: API) => api.status === 'stable').length,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch APIs');
    } finally {
      setIsLoading(false);
    }
  };

  const addApi = async (newApi: Omit<API, 'id' | 'status' | 'lastChecked'>) => {
    try {
      const response = await fetch('/api/apis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApi),
      });
      if (!response.ok) throw new Error('Failed to create API');
      const api = await response.json();
      setApis(prev => [...prev, api]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create API');
      throw err;
    }
  };

  const updateApi = async (id: string, data: Partial<API>) => {
    try {
      const response = await fetch(`/api/apis/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update API');
      const updatedApi = await response.json();
      setApis(prev => prev.map(api => api.id === id ? updatedApi : api));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update API');
      throw err;
    }
  };

  const deleteApi = async (id: string) => {
    try {
      const response = await fetch(`/api/apis/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete API');
      setApis(prev => prev.filter(api => api.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete API');
      throw err;
    }
  };

  const toggleMonitoring = async (apiId: string) => {
    try {
      const api = apis.find(a => a.id === apiId);
      if (!api) throw new Error('API not found');
      await updateApi(apiId, { isMonitoring: !api.isMonitoring });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle monitoring');
      throw err;
    }
  };

  const updateCheckFrequency = async (apiId: string, frequency: string) => {
    try {
      await updateApi(apiId, { checkFrequency: frequency });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update check frequency');
      throw err;
    }
  };

  const markAlertAsRead = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
      if (!response.ok) throw new Error('Failed to mark alert as read');
      setAlerts(prev => prev.map(alert => alert.id === alertId ? { ...alert, isRead: true } : alert));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark alert as read');
      throw err;
    }
  };

  const getMigrationPlan = async (apiId: string): Promise<MigrationPlan | null> => {
    try {
      const response = await fetch(`/api/apis/${apiId}/migration-plan`);
      if (!response.ok) throw new Error('Failed to fetch migration plan');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch migration plan');
      return null;
    }
  };

  return (
    <APIContext.Provider
      value={{
        apis,
        changes,
        status,
        popularApis: [], // This will be populated from the marketplace API
        selectedApi,
        setSelectedApi,
        addApi,
        updateApi,
        deleteApi,
        toggleMonitoring,
        updateCheckFrequency,
        alerts,
        markAlertAsRead,
        notificationSettings,
        updateNotificationSettings: async (settings) => {
          try {
            const response = await fetch('/api/settings/notifications', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(settings),
            });
            if (!response.ok) throw new Error('Failed to update notification settings');
            setNotificationSettings(settings);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update notification settings');
            throw err;
          }
        },
        getMigrationPlan,
        isLoading,
        error,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('useAPI must be used within an APIContextProvider');
  }
  return context;
} 