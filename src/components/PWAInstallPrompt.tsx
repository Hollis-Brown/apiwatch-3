import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { DevicePhoneMobileIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePWA } from '@/hooks/usePWA';

export default function PWAInstallPrompt() {
  const { isInstallable, isStandalone, hasUpdate, installApp, updateApp } = usePWA();

  if (isStandalone || (!isInstallable && !hasUpdate)) {
    return null;
  }

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <DevicePhoneMobileIcon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-white"
                    >
                      {hasUpdate
                        ? 'Update Available'
                        : 'Install APIWatch App'}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">
                        {hasUpdate
                          ? 'A new version of APIWatch is available. Update now to get the latest features and improvements.'
                          : "Install APIWatch on your device for quick and easy access when you're on the go."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={hasUpdate ? updateApp : installApp}
                  >
                    {hasUpdate ? 'Update Now' : 'Install App'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-gray-600"
                    onClick={() => window.location.reload()}
                  >
                    {hasUpdate ? 'Not Now' : 'Maybe Later'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 