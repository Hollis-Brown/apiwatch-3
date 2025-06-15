import { Fragment, useState } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // TODO: Implement authentication logic here
    setTimeout(() => {
      setLoading(false);
      if (onAuthSuccess) onAuthSuccess();
      onClose();
    }, 1000);
  };

  const handleGithubAuth = () => {
    // TODO: Implement GitHub OAuth logic
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onAuthSuccess) onAuthSuccess();
      onClose();
    }, 1000);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-white">
                    {tab === 'login' ? 'Login to APIWatch' : 'Sign Up for APIWatch'}
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <Tab.Group selectedIndex={tab === 'login' ? 0 : 1} onChange={i => setTab(i === 0 ? 'login' : 'signup')}>
                  <Tab.List className="flex space-x-2 mb-6">
                    <Tab
                      className={({ selected }) =>
                        `w-full py-2 rounded-lg text-sm font-medium focus:outline-none ${
                          selected ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-400'
                        }`
                      }
                    >
                      Login
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full py-2 rounded-lg text-sm font-medium focus:outline-none ${
                          selected ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-400'
                        }`
                      }
                    >
                      Sign Up
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    {/* Login Panel */}
                    <Tab.Panel>
                      <form className="space-y-4" onSubmit={handleAuth}>
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Email</label>
                          <input
                            type="email"
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-status-green"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Password</label>
                          <input
                            type="password"
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-status-green"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        {error && <div className="text-status-red text-sm">{error}</div>}
                        <button
                          type="submit"
                          className="w-full py-2 rounded-lg bg-status-green text-white font-semibold hover:bg-green-600 transition"
                          disabled={loading}
                        >
                          {loading ? 'Logging in...' : 'Login'}
                        </button>
                      </form>
                      <div className="my-4 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">or</span>
                      </div>
                      <button
                        onClick={handleGithubAuth}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white font-semibold hover:bg-gray-700 transition"
                        disabled={loading}
                      >
                        <svg width="20" height="20" fill="currentColor" className="text-white"><path d="M10 .3a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0110 5.8c.85.004 1.71.12 2.51.35 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0010 .3"/></svg>
                        Continue with GitHub
                      </button>
                    </Tab.Panel>
                    {/* Signup Panel */}
                    <Tab.Panel>
                      <form className="space-y-4" onSubmit={handleAuth}>
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Email</label>
                          <input
                            type="email"
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-status-green"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Password</label>
                          <input
                            type="password"
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-status-green"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Confirm Password</label>
                          <input
                            type="password"
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-status-green"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                        {error && <div className="text-status-red text-sm">{error}</div>}
                        <button
                          type="submit"
                          className="w-full py-2 rounded-lg bg-status-green text-white font-semibold hover:bg-green-600 transition"
                          disabled={loading}
                        >
                          {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                      </form>
                      <div className="my-4 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">or</span>
                      </div>
                      <button
                        onClick={handleGithubAuth}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white font-semibold hover:bg-gray-700 transition"
                        disabled={loading}
                      >
                        <svg width="20" height="20" fill="currentColor" className="text-white"><path d="M10 .3a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0110 5.8c.85.004 1.71.12 2.51.35 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0010 .3"/></svg>
                        Continue with GitHub
                      </button>
                      <div className="mt-4 text-center text-xs text-gray-400">
                        Free Plan – Monitor 5 APIs
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 