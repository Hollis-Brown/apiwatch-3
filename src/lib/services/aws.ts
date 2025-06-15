import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { CloudWatchClient, PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const cloudWatchClient = new CloudWatchClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  bucket: string,
  key: string,
  body: Buffer | string,
  contentType?: string
) {
  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return false;
  }
}

export async function getSignedDownloadUrl(bucket: string, key: string, expiresIn = 3600) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return null;
  }
}

export async function putMetricData(
  namespace: string,
  metricName: string,
  value: number,
  dimensions: Record<string, string> = {}
) {
  try {
    const command = new PutMetricDataCommand({
      Namespace: namespace,
      MetricData: [
        {
          MetricName: metricName,
          Value: value,
          Dimensions: Object.entries(dimensions).map(([Name, Value]) => ({
            Name,
            Value,
          })),
          Timestamp: new Date(),
        },
      ],
    });

    await cloudWatchClient.send(command);
    return true;
  } catch (error) {
    console.error('Error putting metric data:', error);
    return false;
  }
}

export async function uploadReport(report: any) {
  const key = `reports/${report.id}.json`;
  const success = await uploadToS3(
    process.env.AWS_S3_BUCKET!,
    key,
    JSON.stringify(report),
    'application/json'
  );

  if (success) {
    await putMetricData('APIWatch', 'ReportGenerated', 1, {
      ReportType: report.type,
      UserId: report.userId,
    });
  }

  return success;
}

export async function uploadLogs(logs: any[]) {
  const key = `logs/${Date.now()}.json`;
  const success = await uploadToS3(
    process.env.AWS_S3_BUCKET!,
    key,
    JSON.stringify(logs),
    'application/json'
  );

  if (success) {
    await putMetricData('APIWatch', 'LogsUploaded', logs.length, {
      LogType: 'api',
    });
  }

  return success;
}

export async function uploadBackup(data: any) {
  const key = `backups/${Date.now()}.json`;
  const success = await uploadToS3(
    process.env.AWS_S3_BUCKET!,
    key,
    JSON.stringify(data),
    'application/json'
  );

  if (success) {
    await putMetricData('APIWatch', 'BackupCreated', 1, {
      BackupType: 'full',
    });
  }

  return success;
} 