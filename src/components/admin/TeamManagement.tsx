'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlusIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

// Sample data
const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 hours ago',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    role: 'Member',
    status: 'Active',
    lastActive: '5 minutes ago',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Viewer',
    status: 'Inactive',
    lastActive: '3 days ago',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson',
  },
];

const activityLog = [
  {
    id: 1,
    user: 'John Doe',
    action: 'added Stripe API',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    user: 'Sarah Smith',
    action: 'upgraded to Enterprise plan',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'viewed API documentation',
    timestamp: '3 days ago',
  },
];

export default function TeamManagement() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Member', email: 'jane@example.com' },
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle invite logic here
    setShowInviteModal(false);
    setInviteEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Members</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <UserIcon className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Now</p>
              <p className="text-2xl font-bold text-white">5</p>
            </div>
            <ShieldCheckIcon className="w-8 h-8 text-status-green" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Invites</p>
              <p className="text-2xl font-bold text-white">2</p>
            </div>
            <EnvelopeIcon className="w-8 h-8 text-status-yellow" />
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Team Members</h2>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90"
          >
            <UserPlusIcon className="w-5 h-5" />
            Invite Member
          </button>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Team Members</h2>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            Add Member
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-primary hover:text-primary/80">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Activity Log</h2>
        <div className="space-y-4">
          {activityLog.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-white">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-400">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Invite Team Member
              </h3>
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 