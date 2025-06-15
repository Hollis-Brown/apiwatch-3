import fs from 'fs';
import path from 'path';
import { storageConfig } from '../config';

class LocalStorage {
  private basePath: string;

  constructor() {
    this.basePath = storageConfig.localPath;
    this.ensureDirectoryExists(this.basePath);
  }

  private ensureDirectoryExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  async save(key: string, data: Buffer | string, contentType?: string): Promise<boolean> {
    try {
      const filePath = path.join(this.basePath, key);
      const dirPath = path.dirname(filePath);
      this.ensureDirectoryExists(dirPath);

      if (typeof data === 'string') {
        fs.writeFileSync(filePath, data);
      } else {
        fs.writeFileSync(filePath, data);
      }

      return true;
    } catch (error) {
      console.error('Error saving file:', error);
      return false;
    }
  }

  async get(key: string): Promise<Buffer | null> {
    try {
      const filePath = path.join(this.basePath, key);
      if (!fs.existsSync(filePath)) {
        return null;
      }
      return fs.readFileSync(filePath);
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const filePath = path.join(this.basePath, key);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  async list(prefix: string): Promise<string[]> {
    try {
      const dirPath = path.join(this.basePath, prefix);
      if (!fs.existsSync(dirPath)) {
        return [];
      }

      const files = fs.readdirSync(dirPath);
      return files.map(file => path.join(prefix, file));
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }

  getUrl(key: string): string {
    return `/api/storage/${key}`;
  }
}

class S3Storage {
  // S3 implementation will be added when needed
  async save(key: string, data: Buffer | string, contentType?: string): Promise<boolean> {
    throw new Error('S3 storage not implemented');
  }

  async get(key: string): Promise<Buffer | null> {
    throw new Error('S3 storage not implemented');
  }

  async delete(key: string): Promise<boolean> {
    throw new Error('S3 storage not implemented');
  }

  async list(prefix: string): Promise<string[]> {
    throw new Error('S3 storage not implemented');
  }

  getUrl(key: string): string {
    throw new Error('S3 storage not implemented');
  }
}

export const storage = storageConfig.type === 's3' ? new S3Storage() : new LocalStorage(); 