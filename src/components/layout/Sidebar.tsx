'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAPI } from '@/contexts/APIContext';
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Add API', href: '/add-api', icon: PlusCircleIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Billing', href: '/settings?section=billing', icon: CreditCardIcon },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { apis } = useAPI();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const isActive = (href: string) => {
    if (href === '/settings?section=billing') {
      return pathname === '/settings' && new URLSearchParams(window.location.search).get('section') === 'billing';
    }
    return pathname === href;
  };

  if (status === 'loading') {
    return (
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto bg-gray-800">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="h-8 w-32 bg-gray-700 rounded animate-pulse" />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-700 rounded animate-pulse"
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  }

  const MobileMenuButton = () => (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    >
      <span className="sr-only">Open sidebar</span>
      {isMobileMenuOpen ? (
        <XMarkIcon className="h-6 w-6" />
      ) : (
        <Bars3Icon className="h-6 w-6" />
      )}
    </button>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-800 border-r border-gray-700">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-8 w-auto"
            src="/logo.svg"
            alt="APIWatch"
          />
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isItemActive = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${
                    isItemActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-6 w-6
                    ${isItemActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'}
                  `}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
        <div className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={session?.user?.image || '/default-avatar.png'}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {session?.user?.name || 'User'}
              </p>
              <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                {apis.length} APIs Monitored
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <MobileMenuButton />
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="lg:hidden fixed inset-0 z-40"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <SidebarContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent />
        </div>
      </div>
    </>
  );
} 