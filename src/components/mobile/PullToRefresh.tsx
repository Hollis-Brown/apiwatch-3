import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Transform y value to rotation and opacity
  const rotate = useTransform(y, [0, 100], [0, 360]);
  const opacity = useTransform(y, [0, 50, 100], [0, 0.5, 1]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let currentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0) {
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (container.scrollTop === 0) {
        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        if (deltaY > 0) {
          e.preventDefault();
          y.set(deltaY);
        }
      }
    };

    const handleTouchEnd = async () => {
      const currentYValue = y.get();
      if (currentYValue > 100) {
        setIsRefreshing(true);
        await onRefresh();
        setIsRefreshing(false);
      }
      controls.start({ y: 0 });
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [controls, onRefresh, y]);

  return (
    <div ref={containerRef} className="h-full overflow-auto">
      <motion.div
        className="flex items-center justify-center h-16 -mt-16"
        style={{ y }}
        animate={controls}
      >
        <motion.div
          className="flex items-center gap-2 text-gray-400"
          style={{ rotate, opacity }}
        >
          <ArrowPathIcon className="w-6 h-6" />
          <span className="text-sm">
            {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
          </span>
        </motion.div>
      </motion.div>
      {children}
    </div>
  );
} 