'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAPI } from '@/contexts/APIContext';
import APIForm from '@/components/apis/APIForm';
import { useRouter } from 'next/navigation';

export default function EditAPIPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { apis, isLoading, error } = useAPI();
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    const foundApi = apis.find(a => a.id === params.id);
    if (foundApi) {
      setApi(foundApi);
    } else if (!isLoading) {
      router.push('/dashboard');
    }
  }, [apis, params.id, isLoading, router]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!api) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white">Edit API</h1>
        <p className="mt-1 text-sm text-gray-400">
          Update API configuration and monitoring settings
        </p>
      </motion.div>

      <APIForm mode="edit" initialData={api} />
    </div>
  );
} 