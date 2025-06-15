'use client';

import { motion } from 'framer-motion';
import APIForm from '@/components/apis/APIForm';

export default function AddAPIPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white">Add New API</h1>
        <p className="mt-1 text-sm text-gray-400">
          Configure a new API to monitor for changes and updates
        </p>
      </motion.div>

      <APIForm mode="create" />
    </div>
  );
} 