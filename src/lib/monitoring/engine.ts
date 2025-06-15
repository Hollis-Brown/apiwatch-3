import { supabaseAdmin } from '@/lib/supabase';
import { diagnosticLogger } from '../diagnostics';
import axios from 'axios';

interface CheckResult {
  status: 'success' | 'failure';
  response?: any;
  duration: number;
  error?: string;
}

interface Monitor {
  id: string;
  status: string;
  method: string;
  endpoint: string;
  headers: Record<string, string>;
  body: any;
  timeout: number;
  api: {
    baseUrl: string;
    headers: Record<string, string>;
  };
}

interface Alert {
  id: string;
  userId: string;
  monitorId: string;
  status: string;
  condition: 'status' | 'response_time' | 'error_rate';
  threshold: number;
}

interface Check {
  id: string;
  status: string;
  response: any;
  duration: number;
  monitorId: string;
  createdAt: Date;
}

export class MonitoringEngine {
  private static instance: MonitoringEngine;
  private isRunning: boolean = false;
  private checkInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): MonitoringEngine {
    if (!MonitoringEngine.instance) {
      MonitoringEngine.instance = new MonitoringEngine();
    }
    return MonitoringEngine.instance;
  }

  async start() {
    if (this.isRunning) return;
    this.isRunning = true;

    // Run initial checks
    await this.runChecks();

    // Set up interval for periodic checks
    this.checkInterval = setInterval(() => {
      this.runChecks();
    }, 60000); // Check every minute
  }

  async stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.isRunning = false;
  }

  private async runChecks() {
    try {
      // Get all active monitors
      const { data: monitors, error } = await supabaseAdmin
        .from('monitors')
        .select(`
          *,
          api:apis(*)
        `)
        .eq('status', 'active');

      if (error) {
        throw error;
      }

      // Run checks for each monitor
      for (const monitor of monitors) {
        await this.checkMonitor(monitor);
      }
    } catch (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Error running checks',
          meta: error instanceof Error ? error.message : 'Unknown error',
        }],
      });
    }
  }

  private async checkMonitor(monitor: Monitor) {
    const startTime = Date.now();
    let result: CheckResult;

    try {
      // Prepare request
      const config = {
        method: monitor.method,
        url: `${monitor.api.baseUrl}${monitor.endpoint}`,
        headers: {
          ...(monitor.headers as Record<string, string>),
          ...(monitor.api.headers as Record<string, string>),
        },
        data: monitor.body,
        timeout: monitor.timeout,
      };

      // Make request
      const response = await axios(config);
      const duration = Date.now() - startTime;

      result = {
        status: 'success',
        response: response.data,
        duration,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      result = {
        status: 'failure',
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Save check result
    const { error: checkError } = await supabaseAdmin
      .from('checks')
      .insert({
        status: result.status,
        response: result.response,
        duration: result.duration,
        monitor_id: monitor.id,
      });

    if (checkError) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to save check result',
          meta: checkError,
        }],
      });
      return;
    }

    // Check alerts
    await this.checkAlerts(monitor, result);
  }

  private async checkAlerts(monitor: Monitor, checkResult: CheckResult) {
    const { data: alerts, error } = await supabaseAdmin
      .from('alerts')
      .select('*')
      .eq('monitor_id', monitor.id)
      .eq('status', 'active');

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to fetch alerts',
          meta: error,
        }],
      });
      return;
    }

    for (const alert of alerts) {
      let shouldTrigger = false;

      switch (alert.condition) {
        case 'status':
          shouldTrigger = checkResult.status === 'failure';
          break;
        case 'response_time':
          shouldTrigger = checkResult.duration > alert.threshold;
          break;
        case 'error_rate':
          // Calculate error rate from recent checks
          const { data: recentChecks, error: checksError } = await supabaseAdmin
            .from('checks')
            .select('*')
            .eq('monitor_id', monitor.id)
            .gte('created_at', new Date(Date.now() - 3600000).toISOString()); // Last hour

          if (checksError) {
            diagnosticLogger.log({
              step: 'error',
              errors: [{
                message: 'Failed to fetch recent checks',
                meta: checksError,
              }],
            });
            continue;
          }

          const errorRate =
            recentChecks.filter((check: Check) => check.status === 'failure').length /
            recentChecks.length;
          shouldTrigger = errorRate > alert.threshold;
          break;
      }

      if (shouldTrigger) {
        await this.triggerAlert(alert, checkResult);
      }
    }
  }

  private async triggerAlert(alert: Alert, checkResult: CheckResult) {
    // Get user's notification preferences
    const { data: notifications, error } = await supabaseAdmin
      .from('notifications')
      .select('*')
      .eq('user_id', alert.userId);

    if (error) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to fetch notifications',
          meta: error,
        }],
      });
      return;
    }

    // Send notifications
    for (const notification of notifications) {
      switch (notification.type) {
        case 'email':
          // Send email notification
          break;
        case 'slack':
          // Send Slack notification
          break;
        case 'discord':
          // Send Discord notification
          break;
        case 'webhook':
          // Send webhook notification
          break;
      }
    }
  }
} 