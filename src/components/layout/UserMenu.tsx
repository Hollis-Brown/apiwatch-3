'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ 
        redirect: false,
        callbackUrl: '/signin'
      });
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse" />
    );
  }

  const menuItems = [
    {
      label: 'Profile',
      icon: UserCircleIcon,
      onClick: () => router.push('/settings?section=profile'),
    },
    {
      label: 'Settings',
      icon: Cog6ToothIcon,
      onClick: () => router.push('/settings'),
    },
    {
      label: 'Billing',
      icon: CreditCardIcon,
      onClick: () => router.push('/settings?section=billing'),
    },
    {
      label: 'Sign Out',
      icon: ArrowRightOnRectangleIcon,
      onClick: handleSignOut,
    },
  ];

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="User menu"
          >
            <img
              src={session?.user?.image || '/default-avatar.png'}
              alt="User menu"
              className="h-8 w-8 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-gray-800"
            />
          </Menu.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-white">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-400">{session?.user?.email}</p>
              </div>

              <div className="my-1 border-t border-gray-700" />

              {menuItems.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={item.onClick}
                      className={`
                        flex w-full items-center px-4 py-2 text-sm
                        ${
                          active
                            ? 'bg-gray-700 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                      `}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </motion.button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
} 