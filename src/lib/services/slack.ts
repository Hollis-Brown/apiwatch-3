import { supabaseAdmin } from '@/lib/supabase';
import { diagnosticLogger } from '../diagnostics';

export async function sendSlackMessage(webhookUrl: string, message: any) {
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
        message: 'Error sending Slack message',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return false;
  }
}

export async function sendAlertToSlack(userId: string, alert: any) {
  const { data: notification, error } = await supabaseAdmin
    .from('notifications')
    .select('config')
    .eq('user_id', userId)
    .eq('type', 'slack')
    .single();

  if (error || !notification?.config?.webhookUrl) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch Slack notification config',
        meta: error,
      }],
    });
    return false;
  }

  const message = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🚨 API Alert',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*API:*\n${alert.api.name}`,
          },
          {
            type: 'mrkdwn',
            text: `*Monitor:*\n${alert.monitor.name}`,
          },
          {
            type: 'mrkdwn',
            text: `*Status:*\n${alert.status}`,
          },
          {
            type: 'mrkdwn',
            text: `*Response Time:*\n${alert.responseTime}ms`,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Timestamp: ${new Date(alert.timestamp).toLocaleString()}`,
          },
        ],
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View Dashboard',
              emoji: true,
            },
            url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          },
        ],
      },
    ],
  };

  return sendSlackMessage(notification.config.webhookUrl, message);
}

export async function sendReportToSlack(userId: string, report: any) {
  const { data: notification, error } = await supabaseAdmin
    .from('notifications')
    .select('config')
    .eq('user_id', userId)
    .eq('type', 'slack')
    .single();

  if (error || !notification?.config?.webhookUrl) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch Slack notification config',
        meta: error,
      }],
    });
    return false;
  }

  const message = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `📊 ${report.type} Report`,
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Total APIs:*\n${report.summary.totalApis}`,
          },
          {
            type: 'mrkdwn',
            text: `*Active Monitors:*\n${report.summary.activeMonitors}`,
          },
          {
            type: 'mrkdwn',
            text: `*Total Alerts:*\n${report.summary.totalAlerts}`,
          },
          {
            type: 'mrkdwn',
            text: `*Average Response Time:*\n${report.summary.avgResponseTime}ms`,
          },
          {
            type: 'mrkdwn',
            text: `*Uptime:*\n${report.summary.uptime}%`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Top Issues:*',
        },
      },
      ...report.topIssues.map((issue: any) => ({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `• ${issue.api.name}: ${issue.description}`,
        },
      })),
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View Full Report',
              emoji: true,
            },
            url: `${process.env.NEXT_PUBLIC_APP_URL}/reports/${report.id}`,
          },
        ],
      },
    ],
  };

  return sendSlackMessage(notification.config.webhookUrl, message);
} 