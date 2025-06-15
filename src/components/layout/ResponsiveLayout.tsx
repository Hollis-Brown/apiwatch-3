import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Handle responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-800" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-800 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Mobile Navigation */}
      {isMobile && <MobileNav />}

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isMobile ? 'pb-16' : 'lg:pl-64'}
        `}
      >
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
} 