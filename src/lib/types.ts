export interface API {
  id: string;
  name: string;
  version: string;
  baseUrl: string;
  docsUrl: string;
  status: 'stable' | 'warning' | 'deprecated' | 'changes';
  isMonitoring: boolean;
  lastChecked: string;
  checkFrequency: '15min' | '1hr' | '6hr' | 'daily';
  healthScore: number;
  deprecationRisk: {
    current: number;
    sixMonths: number;
    twelveMonths: number;
  };
  lastMajorUpdate: string;
  communityActivity: number;
  officialStatements: string[];
}

export interface APIChange {
  id: string;
  apiId: string;
  timestamp: string;
  changeType: 'rate-limit' | 'auth' | 'deprecation' | 'feature' | 'breaking';
  impactLevel: 'low' | 'medium' | 'high';
  description: string;
}

export interface MonitoringStatus {
  totalApis: number;
  activeAlerts: number;
  deprecatedThisMonth: number;
  stableApis: number;
  lastUpdated: string;
}

export interface PopularAPI {
  name: string;
  baseUrl: string;
  docsUrl: string;
  currentVersion: string;
}

export interface Alert {
  id: string;
  apiId: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  affectedEndpoints?: string[];
  recommendedAction: string;
  isRead: boolean;
  confidence: number;
  predictionDate?: string;
}

export interface NotificationSettings {
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

export interface MigrationPlan {
  apiId: string;
  currentVersion: string;
  targetVersion: string;
  steps: {
    order: number;
    description: string;
    codeSnippet?: string;
    estimatedTime: string;
  }[];
  timeline: {
    startDate: string;
    endDate: string;
    milestones: {
      date: string;
      description: string;
    }[];
  };
}

export type DiagnosticStep = 
  | 'form_submission'
  | 'api_request'
  | 'server_validation'
  | 'db_check'
  | 'password_hash'
  | 'user_creation'
  | 'sign_in'
  | 'email_send'
  | 'error'
  | 'unknown';

export interface DiagnosticEntry {
  step: DiagnosticStep;
  timestamp: string;
  request?: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
  };
  response?: {
    status?: number;
    body?: any;
  };
  dbState?: {
    before?: any[] | null;
    after?: any[] | null;
  };
  timing?: Record<string, number>;
  errors?: Array<{
    message: string;
    code?: string;
    stack?: string;
    meta?: any;
  }>;
  environment?: {
    nodeEnv: string;
    supabaseUrl?: string;
    nextAuthUrl?: string;
  };
} 