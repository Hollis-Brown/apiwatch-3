import { supabaseAdmin } from '@/lib/supabase';
import { diagnosticLogger } from '../diagnostics';

export async function sendDiscordMessage(webhookUrl: string, message: any) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    return response.ok;
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Error sending Discord message',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return false;
  }
}

export async function sendAlertToDiscord(userId: string, alert: any) {
  const { data: notification, error } = await supabaseAdmin
    .from('notifications')
    .select('config')
    .eq('user_id', userId)
    .eq('type', 'discord')
    .single();

  if (error || !notification?.config?.webhookUrl) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch Discord notification config',
        meta: error,
      }],
    });
    return false;
  }

  const message = {
    embeds: [
      {
        title: '🚨 API Alert',
        color: 0xFF0000,
        fields: [
          {
            name: 'API',
            value: alert.api.name,
            inline: true,
          },
          {
            name: 'Monitor',
            value: alert.monitor.name,
            inline: true,
          },
          {
            name: 'Status',
            value: alert.status,
            inline: true,
          },
          {
            name: 'Response Time',
            value: `${alert.responseTime}ms`,
            inline: true,
          },
          {
            name: 'Timestamp',
            value: new Date(alert.timestamp).toLocaleString(),
            inline: true,
          },
        ],
        url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      },
    ],
  };

  return sendDiscordMessage(notification.config.webhookUrl, message);
}

export async function sendReportToDiscord(userId: string, report: any) {
  const { data: notification, error } = await supabaseAdmin
    .from('notifications')
    .select('config')
    .eq('user_id', userId)
    .eq('type', 'discord')
    .single();

  if (error || !notification?.config?.webhookUrl) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch Discord notification config',
        meta: error,
      }],
    });
    return false;
  }

  const message = {
    embeds: [
      {
        title: `📊 ${report.type} Report`,
        color: 0x00FF00,
        fields: [
          {
            name: 'Summary',
            value: [
              `Total APIs: ${report.summary.totalApis}`,
              `Active Monitors: ${report.summary.activeMonitors}`,
              `Total Alerts: ${report.summary.totalAlerts}`,
              `Average Response Time: ${report.summary.avgResponseTime}ms`,
              `Uptime: ${report.summary.uptime}%`,
            ].join('\n'),
          },
          {
            name: 'Top Issues',
            value: report.topIssues
              .map((issue: any) => `• ${issue.api.name}: ${issue.description}`)
              .join('\n'),
          },
        ],
        url: `${process.env.NEXT_PUBLIC_APP_URL}/reports/${report.id}`,
      },
    ],
  };

  return sendDiscordMessage(notification.config.webhookUrl, message);
} 