'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { CameraIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface ProfileFormData {
  name: string;
  email: string;
  avatar: string;
}

export default function ProfileSection() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    avatar: session?.user?.image || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      await update(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload avatar');

      const data = await response.json();
      setFormData((prev) => ({ ...prev, avatar: data.url }));
      await update({ ...session, user: { ...session?.user, image: data.url } });
      toast.success('Avatar updated successfully');
    } catch (error) {
      toast.error('Failed to upload avatar');
      console.error('Avatar upload error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={formData.avatar || '/default-avatar.png'}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-sm hover:bg-primary/90"
          >
            <CameraIcon className="h-5 w-5" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">Profile Picture</h3>
          <p className="text-sm text-gray-400">
            Upload a new profile picture (max 2MB)
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          />
        </div>

        {/* Subscription Status */}
        <div className="rounded-lg bg-gray-800 p-4">
          <h3 className="text-lg font-medium text-white">Subscription Status</h3>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Current Plan</p>
              <p className="text-lg font-medium text-white">Free Plan</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              Upgrade Plan
            </motion.button>
          </div>
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </form>
    </div>
  );
} 