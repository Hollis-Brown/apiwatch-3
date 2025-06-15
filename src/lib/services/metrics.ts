import { monitoringConfig } from '../config';

type Metric = {
  name: string;
  value: number;
  timestamp: number;
  dimensions: Record<string, string>;
};

class LocalMetrics {
  private metrics: Metric[] = [];
  private maxMetrics: number = 1000;

  async putMetricData(namespace: string, metricName: string, value: number, dimensions: Record<string, string> = {}) {
    if (!monitoringConfig.enableMetrics) {
      return;
    }

    const metric: Metric = {
      name: metricName,
      value,
      timestamp: Date.now(),
      dimensions: {
        namespace,
        ...dimensions,
      },
    };

    this.metrics.push(metric);

    // Keep only the last maxMetrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  async getMetricData(
    namespace: string,
    metricName: string,
    dimensions: Record<string, string> = {},
    startTime: Date,
    endTime: Date
  ): Promise<Metric[]> {
    return this.metrics.filter(metric => {
      if (metric.name !== metricName) return false;
      if (metric.dimensions.namespace !== namespace) return false;

      for (const [key, value] of Object.entries(dimensions)) {
        if (metric.dimensions[key] !== value) return false;
      }

      const timestamp = new Date(metric.timestamp);
      return timestamp >= startTime && timestamp <= endTime;
    });
  }

  async getMetricStatistics(
    namespace: string,
    metricName: string,
    dimensions: Record<string, string> = {},
    startTime: Date,
    endTime: Date
  ): Promise<{
    average: number;
    maximum: number;
    minimum: number;
    sum: number;
    count: number;
  }> {
    const metrics = await this.getMetricData(namespace, metricName, dimensions, startTime, endTime);
    const values = metrics.map(m => m.value);

    if (values.length === 0) {
      return {
        average: 0,
        maximum: 0,
        minimum: 0,
        sum: 0,
        count: 0,
      };
    }

    return {
      average: values.reduce((a, b) => a + b, 0) / values.length,
      maximum: Math.max(...values),
      minimum: Math.min(...values),
      sum: values.reduce((a, b) => a + b, 0),
      count: values.length,
    };
  }
}

class CloudWatchMetrics {
  // CloudWatch implementation will be added when needed
  async putMetricData(namespace: string, metricName: string, value: number, dimensions: Record<string, string> = {}) {
    throw new Error('CloudWatch metrics not implemented');
  }

  async getMetricData(
    namespace: string,
    metricName: string,
    dimensions: Record<string, string> = {},
    startTime: Date,
    endTime: Date
  ): Promise<Metric[]> {
    throw new Error('CloudWatch metrics not implemented');
  }

  async getMetricStatistics(
    namespace: string,
    metricName: string,
    dimensions: Record<string, string> = {},
    startTime: Date,
    endTime: Date
  ): Promise<{
    average: number;
    maximum: number;
    minimum: number;
    sum: number;
    count: number;
  }> {
    throw new Error('CloudWatch metrics not implemented');
  }
}

export const metrics = monitoringConfig.cloudWatch.enabled
  ? new CloudWatchMetrics()
  : new LocalMetrics(); 