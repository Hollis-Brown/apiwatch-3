import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAPI } from '@/contexts/APIContext';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  baseUrl: string;
  docsUrl: string;
  version: string;
  checkFrequency: '15min' | '1hr' | '6hr' | 'daily';
  url: string;
  responseTime: number;
  isMonitoring: boolean;
}

export default function AddAPIForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addApi, popularApis } = useAPI();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    baseUrl: '',
    docsUrl: '',
    version: '',
    checkFrequency: '1hr',
    url: '',
    responseTime: 0,
    isMonitoring: true,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.baseUrl) newErrors.baseUrl = 'Base URL is required';
    if (!formData.version) newErrors.version = 'Version is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addApi(formData);
      onClose();
    }
  };

  const handlePopularApiSelect = (api: typeof popularApis[0]) => {
    setFormData({
      name: api.name,
      baseUrl: api.baseUrl,
      docsUrl: api.docsUrl,
      version: api.currentVersion,
      checkFrequency: '1hr',
      url: '',
      responseTime: 0,
      isMonitoring: true,
    });
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
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold">
                    Add New API
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Popular APIs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Quick Add Popular API
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {popularApis.map((api) => (
                        <motion.button
                          key={api.name}
                          type="button"
                          onClick={() => handlePopularApiSelect(api)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-2 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          {api.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      API Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full rounded-md bg-gray-700 border ${
                        errors.name ? 'border-status-red' : 'border-gray-600'
                      } text-white px-3 py-2`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-status-red">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Base URL
                    </label>
                    <input
                      type="url"
                      value={formData.baseUrl}
                      onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                      className={`w-full rounded-md bg-gray-700 border ${
                        errors.baseUrl ? 'border-status-red' : 'border-gray-600'
                      } text-white px-3 py-2`}
                    />
                    {errors.baseUrl && (
                      <p className="mt-1 text-sm text-status-red">{errors.baseUrl}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Documentation URL
                    </label>
                    <input
                      type="url"
                      value={formData.docsUrl}
                      onChange={(e) => setFormData({ ...formData, docsUrl: e.target.value })}
                      className="w-full rounded-md bg-gray-700 border border-gray-600 text-white px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Version
                    </label>
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className={`w-full rounded-md bg-gray-700 border ${
                        errors.version ? 'border-status-red' : 'border-gray-600'
                      } text-white px-3 py-2`}
                    />
                    {errors.version && (
                      <p className="mt-1 text-sm text-status-red">{errors.version}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Check Frequency
                    </label>
                    <select
                      value={formData.checkFrequency}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          checkFrequency: e.target.value as FormData['checkFrequency'],
                        })
                      }
                      className="w-full rounded-md bg-gray-700 border border-gray-600 text-white px-3 py-2"
                    >
                      <option value="15min">Every 15 minutes</option>
                      <option value="1hr">Every hour</option>
                      <option value="6hr">Every 6 hours</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-status-green hover:bg-status-green/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Start Monitoring
                    </motion.button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 