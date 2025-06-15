'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import UserMenu from './UserMenu';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => router.push('/dashboard')}
            >
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="APIWatch"
              />
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : session ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/register"
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 