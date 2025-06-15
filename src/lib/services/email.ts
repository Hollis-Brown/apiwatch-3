import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase';
import { emailConfig } from '../config';
import { diagnosticLogger } from '../diagnostics';

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure,
  auth: emailConfig.user ? {
    user: emailConfig.user,
    pass: emailConfig.pass,
  } : undefined,
});

export async function sendEmail(to: string, subject: string, html: string) {
  diagnosticLogger.log({
    step: 'email_send',
    request: {
      body: { to, subject },
    },
  });

  if (!emailConfig.enabled) {
    diagnosticLogger.log({
      step: 'email_send',
      response: {
        status: 200,
        body: { message: 'Email disabled' },
      },
    });
    return true;
  }

  try {
    await transporter.sendMail({
      from: emailConfig.from,
      to,
      subject,
      html,
    });

    diagnosticLogger.log({
      step: 'email_send',
      response: {
        status: 200,
        body: { message: 'Email sent successfully' },
      },
    });

    return true;
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Error sending email',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return false;
  }
}

export async function sendAlertEmail(userId: string, alert: any) {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('email')
    .eq('id', userId)
    .single();

  if (error || !user?.email) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch user for alert email',
        meta: error,
      }],
    });
    return false;
  }

  const html = `
    <h1>API Alert</h1>
    <p>An alert has been triggered for your API:</p>
    <ul>
      <li><strong>API:</strong> ${alert.api.name}</li>
      <li><strong>Monitor:</strong> ${alert.monitor.name}</li>
      <li><strong>Status:</strong> ${alert.status}</li>
      <li><strong>Response Time:</strong> ${alert.responseTime}ms</li>
      <li><strong>Timestamp:</strong> ${new Date(alert.timestamp).toLocaleString()}</li>
    </ul>
    <p>Please check your dashboard for more details.</p>
  `;

  return sendEmail(user.email, `API Alert: ${alert.api.name}`, html);
}

export async function sendReportEmail(userId: string, report: any) {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('email')
    .eq('id', userId)
    .single();

  if (error || !user?.email) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch user for report email',
        meta: error,
      }],
    });
    return false;
  }

  const html = `
    <h1>API Report</h1>
    <p>Here's your ${report.type} report:</p>
    <h2>Summary</h2>
    <ul>
      <li><strong>Total APIs:</strong> ${report.summary.totalApis}</li>
      <li><strong>Active Monitors:</strong> ${report.summary.activeMonitors}</li>
      <li><strong>Total Alerts:</strong> ${report.summary.totalAlerts}</li>
      <li><strong>Average Response Time:</strong> ${report.summary.avgResponseTime}ms</li>
      <li><strong>Uptime:</strong> ${report.summary.uptime}%</li>
    </ul>
    <h2>Top Issues</h2>
    <ul>
      ${report.topIssues.map((issue: any) => `
        <li>${issue.api.name}: ${issue.description}</li>
      `).join('')}
    </ul>
    <p>View the full report in your dashboard.</p>
  `;

  return sendEmail(user.email, `API Report: ${report.type}`, html);
}

export async function sendWelcomeEmail(userId: string) {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('email, name')
    .eq('id', userId)
    .single();

  if (error || !user?.email) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch user for welcome email',
        meta: error,
      }],
    });
    return false;
  }

  const html = `
    <h1>Welcome to APIWatch!</h1>
    <p>Hi ${user.name},</p>
    <p>Thank you for joining APIWatch. We're excited to help you monitor and optimize your APIs.</p>
    <h2>Getting Started</h2>
    <ol>
      <li>Add your first API</li>
      <li>Set up monitors</li>
      <li>Configure alerts</li>
      <li>Invite team members</li>
    </ol>
    <p>If you have any questions, our support team is here to help.</p>
  `;

  return sendEmail(user.email, 'Welcome to APIWatch', html);
}

export async function sendPasswordResetEmail(userId: string, resetToken: string) {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('email, name')
    .eq('id', userId)
    .single();

  if (error || !user?.email) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Failed to fetch user for password reset email',
        meta: error,
      }],
    });
    return false;
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  const html = `
    <h1>Reset Your Password</h1>
    <p>Hi ${user.name},</p>
    <p>You requested to reset your password. Click the link below to set a new password:</p>
    <p><a href="${resetUrl}">Reset Password</a></p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  `;

  return sendEmail(user.email, 'Reset Your Password', html);
} 