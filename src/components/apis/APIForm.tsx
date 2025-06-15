'use client';

import { useState } from 'react';
import { useAPI } from '@/contexts/APIContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface APIFormProps {
  initialData?: {
    id: string;
    name: string;
    url: string;
    version: string;
    baseUrl: string;
    docsUrl: string;
    checkFrequency: string;
    responseTime: number;
    isMonitoring: boolean;
  };
  mode: 'create' | 'edit';
}

export default function APIForm({ initialData, mode }: APIFormProps) {
  const router = useRouter();
  const { addApi, updateApi, isLoading } = useAPI();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    url: initialData?.url || '',
    version: initialData?.version || '',
    baseUrl: initialData?.baseUrl || '',
    docsUrl: initialData?.docsUrl || '',
    checkFrequency: initialData?.checkFrequency || '1h',
    responseTime: initialData?.responseTime || 0,
    isMonitoring: initialData?.isMonitoring ?? true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    if (!formData.version.trim()) {
      newErrors.version = 'Version is required';
    }

    if (!formData.baseUrl.trim()) {
      newErrors.baseUrl = 'Base URL is required';
    } else if (!isValidUrl(formData.baseUrl)) {
      newErrors.baseUrl = 'Please enter a valid URL';
    }

    if (formData.docsUrl && !isValidUrl(formData.docsUrl)) {
      newErrors.docsUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'create') {
        await addApi(formData);
        toast.success('API created successfully');
      } else {
        await updateApi(initialData!.id, formData);
        toast.success('API updated successfully');
      }
      router.push('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            API Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="e.g., Stripe Payment API"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-300"
          >
            API URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
              errors.url ? 'border-red-500' : ''
            }`}
            placeholder="https://api.example.com"
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-500">{errors.url}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="version"
            className="block text-sm font-medium text-gray-300"
          >
            Version
          </label>
          <input
            type="text"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
              errors.version ? 'border-red-500' : ''
            }`}
            placeholder="v1.0.0"
          />
          {errors.version && (
            <p className="mt-1 text-sm text-red-500">{errors.version}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="baseUrl"
            className="block text-sm font-medium text-gray-300"
          >
            Base URL
          </label>
          <input
            type="url"
            id="baseUrl"
            name="baseUrl"
            value={formData.baseUrl}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
              errors.baseUrl ? 'border-red-500' : ''
            }`}
            placeholder="https://api.example.com/v1"
          />
          {errors.baseUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.baseUrl}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="docsUrl"
            className="block text-sm font-medium text-gray-300"
          >
            Documentation URL (Optional)
          </label>
          <input
            type="url"
            id="docsUrl"
            name="docsUrl"
            value={formData.docsUrl}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
              errors.docsUrl ? 'border-red-500' : ''
            }`}
            placeholder="https://docs.example.com"
          />
          {errors.docsUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.docsUrl}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="checkFrequency"
            className="block text-sm font-medium text-gray-300"
          >
            Check Frequency
          </label>
          <select
            id="checkFrequency"
            name="checkFrequency"
            value={formData.checkFrequency}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="5m">Every 5 minutes</option>
            <option value="15m">Every 15 minutes</option>
            <option value="30m">Every 30 minutes</option>
            <option value="1h">Every hour</option>
            <option value="6h">Every 6 hours</option>
            <option value="12h">Every 12 hours</option>
            <option value="1d">Every day</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? 'Saving...'
              : mode === 'create'
              ? 'Create API'
              : 'Update API'}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 