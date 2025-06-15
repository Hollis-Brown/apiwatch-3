import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Other configuration
export const config = {
  // Add your other configuration here
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  email: {
    from: process.env.EMAIL_FROM,
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  slack: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
  },
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  },
};

// Storage
export const storageConfig = {
  type: process.env.STORAGE_TYPE || 'local',
  localPath: process.env.LOCAL_STORAGE_PATH || './storage',
  s3: {
    enabled: process.env.STORAGE_TYPE === 's3',
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_REGION,
  },
};

// Email
export const emailConfig = {
  enabled: process.env.SMTP_HOST !== undefined,
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '1025'),
  secure: process.env.SMTP_SECURE === 'true',
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  from: process.env.SMTP_FROM || 'noreply@apiwatch.local',
};

// Monitoring
export const monitoringConfig = {
  interval: parseInt(process.env.MONITORING_INTERVAL || '60000'),
  enableMetrics: process.env.ENABLE_METRICS === 'true',
  cloudWatch: {
    enabled: process.env.ENABLE_METRICS === 'true',
    namespace: process.env.CLOUDWATCH_NAMESPACE,
  },
};

// Queue
export const queueConfig = {
  type: process.env.QUEUE_TYPE || 'memory',
  redis: {
    enabled: process.env.QUEUE_TYPE === 'redis',
    url: process.env.REDIS_URL,
  },
};

// Notifications
export const notificationConfig = {
  slack: {
    enabled: process.env.ENABLE_SLACK === 'true',
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
  },
  discord: {
    enabled: process.env.ENABLE_DISCORD === 'true',
    webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  },
};

// Error Tracking
export const errorTrackingConfig = {
  sentry: {
    enabled: process.env.ENABLE_SENTRY === 'true',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
};

// Payments
export const paymentConfig = {
  enabled: process.env.ENABLE_PAYMENTS === 'true',
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    priceId: process.env.STRIPE_PRICE_ID,
  },
};

// Feature Flags
export const features = {
  auth: {
    enabled: true,
    providers: ['github'],
  },
  monitoring: {
    enabled: true,
    checks: ['status', 'response-time', 'content'],
  },
  notifications: {
    enabled: true,
    channels: ['email', 'slack', 'discord'],
  },
  storage: {
    enabled: true,
    types: ['local', 's3'],
  },
  payments: {
    enabled: process.env.ENABLE_PAYMENTS === 'true',
  },
}; 