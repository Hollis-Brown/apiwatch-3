import { queueConfig } from '../config';

type Job = {
  id: string;
  data: any;
  timestamp: number;
  attempts: number;
  maxAttempts: number;
};

type QueueOptions = {
  name: string;
  maxAttempts?: number;
  backoff?: {
    type: 'fixed' | 'exponential';
    delay: number;
  };
};

interface Queue {
  add(data: any): Promise<string>;
  process(handler: (job: Job) => Promise<void>): Promise<void>;
  remove(id: string): Promise<boolean>;
  clear(): Promise<void>;
}

class LocalQueue implements Queue {
  private jobs: Map<string, Job[]> = new Map();
  private processing: Map<string, boolean> = new Map();
  private options: QueueOptions;

  constructor(options: QueueOptions) {
    this.options = {
      maxAttempts: options.maxAttempts || 3,
      backoff: options.backoff || {
        type: 'exponential',
        delay: 1000,
      },
      ...options,
    };
  }

  async add(data: any): Promise<string> {
    const id = Math.random().toString(36).substring(7);
    const job: Job = {
      id,
      data,
      timestamp: Date.now(),
      attempts: 0,
      maxAttempts: this.options.maxAttempts!,
    };

    if (!this.jobs.has(this.options.name)) {
      this.jobs.set(this.options.name, []);
    }

    this.jobs.get(this.options.name)!.push(job);
    return id;
  }

  async process(handler: (job: Job) => Promise<void>): Promise<void> {
    if (this.processing.get(this.options.name)) {
      return;
    }

    this.processing.set(this.options.name, true);

    while (true) {
      const jobs = this.jobs.get(this.options.name) || [];
      const job = jobs.find(j => j.attempts < j.maxAttempts);

      if (!job) {
        this.processing.set(this.options.name, false);
        break;
      }

      try {
        await handler(job);
        jobs.splice(jobs.indexOf(job), 1);
      } catch (error) {
        console.error('Job failed:', error);
        job.attempts++;

        if (job.attempts >= job.maxAttempts) {
          jobs.splice(jobs.indexOf(job), 1);
        } else {
          const delay = this.options.backoff!.type === 'exponential'
            ? this.options.backoff!.delay * Math.pow(2, job.attempts - 1)
            : this.options.backoff!.delay;

          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
  }

  async remove(id: string): Promise<boolean> {
    const jobs = this.jobs.get(this.options.name) || [];
    const index = jobs.findIndex(j => j.id === id);
    if (index === -1) return false;
    jobs.splice(index, 1);
    return true;
  }

  async clear(): Promise<void> {
    this.jobs.set(this.options.name, []);
  }
}

class RedisQueue implements Queue {
  async add(data: any): Promise<string> {
    throw new Error('Redis queue not implemented');
  }

  async process(handler: (job: Job) => Promise<void>): Promise<void> {
    throw new Error('Redis queue not implemented');
  }

  async remove(id: string): Promise<boolean> {
    throw new Error('Redis queue not implemented');
  }

  async clear(): Promise<void> {
    throw new Error('Redis queue not implemented');
  }
}

export function createQueue(options: QueueOptions): Queue {
  return queueConfig.type === 'redis'
    ? new RedisQueue()
    : new LocalQueue(options);
}

// Create default queues
export const monitoringQueue = createQueue({
  name: 'monitoring',
  maxAttempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
});

export const notificationQueue = createQueue({
  name: 'notifications',
  maxAttempts: 5,
  backoff: {
    type: 'fixed',
    delay: 5000,
  },
});

export const reportQueue = createQueue({
  name: 'reports',
  maxAttempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000,
  },
}); 