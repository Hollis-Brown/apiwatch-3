import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface InfiniteScrollProps {
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  children: React.ReactNode;
}

export default function InfiniteScroll({
  onLoadMore,
  hasMore,
  children,
}: InfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(async (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        setIsLoading(true);
        await onLoadMore();
        setIsLoading(false);
      }
    }, options);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {hasMore && (
          <motion.div
            ref={loadMoreRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-4 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center gap-2 text-gray-400">
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span className="text-sm">Loading more...</span>
              </div>
            ) : (
              <div className="h-8" /> // Spacer for intersection observer
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 