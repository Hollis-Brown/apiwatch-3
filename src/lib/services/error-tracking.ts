import { errorTrackingConfig } from '../config';

type ErrorEvent = {
  id: string;
  message: string;
  stack?: string;
  timestamp: number;
  level: 'error' | 'warning' | 'info';
  context?: Record<string, any>;
  user?: {
    id: string;
    email?: string;
    name?: string;
  };
};

class LocalErrorTracking {
  private errors: ErrorEvent[] = [];
  private maxErrors: number = 1000;

  captureException(error: Error, context?: Record<string, any>) {
    if (!errorTrackingConfig.sentry.enabled) {
      console.error('Error:', error);
      if (context) {
        console.error('Context:', context);
      }
      return;
    }

    const errorEvent: ErrorEvent = {
      id: Math.random().toString(36).substring(7),
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      level: 'error',
      context,
    };

    this.errors.push(errorEvent);

    // Keep only the last maxErrors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }
  }

  captureMessage(message: string, level: 'error' | 'warning' | 'info' = 'info', context?: Record<string, any>) {
    if (!errorTrackingConfig.sentry.enabled) {
      console.log(`[${level.toUpperCase()}] ${message}`);
      if (context) {
        console.log('Context:', context);
      }
      return;
    }

    const errorEvent: ErrorEvent = {
      id: Math.random().toString(36).substring(7),
      message,
      timestamp: Date.now(),
      level,
      context,
    };

    this.errors.push(errorEvent);

    // Keep only the last maxErrors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }
  }

  setUser(user: { id: string; email?: string; name?: string } | null) {
    // In local mode, we just log the user change
    if (user) {
      console.log('User set:', user);
    } else {
      console.log('User cleared');
    }
  }

  setTag(key: string, value: string) {
    // In local mode, we just log the tag
    console.log(`Tag set: ${key}=${value}`);
  }

  setExtra(key: string, value: any) {
    // In local mode, we just log the extra data
    console.log(`Extra data set: ${key}=`, value);
  }

  getErrors(): ErrorEvent[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
  }
}

class SentryErrorTracking {
  // Sentry implementation will be added when needed
  captureException(error: Error, context?: Record<string, any>) {
    throw new Error('Sentry error tracking not implemented');
  }

  captureMessage(message: string, level: 'error' | 'warning' | 'info' = 'info', context?: Record<string, any>) {
    throw new Error('Sentry error tracking not implemented');
  }

  setUser(user: { id: string; email?: string; name?: string } | null) {
    throw new Error('Sentry error tracking not implemented');
  }

  setTag(key: string, value: string) {
    throw new Error('Sentry error tracking not implemented');
  }

  setExtra(key: string, value: any) {
    throw new Error('Sentry error tracking not implemented');
  }

  getErrors(): ErrorEvent[] {
    throw new Error('Sentry error tracking not implemented');
  }

  clearErrors() {
    throw new Error('Sentry error tracking not implemented');
  }
}

export const errorTracking = errorTrackingConfig.sentry.enabled
  ? new SentryErrorTracking()
  : new LocalErrorTracking(); 