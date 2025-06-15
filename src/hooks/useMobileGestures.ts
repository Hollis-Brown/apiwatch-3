import { useEffect, useRef, useState } from 'react';

interface GestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onLongPress?: () => void;
  onPinchStart?: () => void;
  onPinchEnd?: () => void;
  onPinchMove?: (scale: number) => void;
}

export function useMobileGestures(options: GestureOptions = {}) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const initialPinchDistance = useRef<number>(0);
  const currentPinchDistance = useRef<number>(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;

      // Start long press timer
      longPressTimer.current = setTimeout(() => {
        setIsLongPressing(true);
        options.onLongPress?.();
      }, 500);

      // Handle pinch start
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance.current = Math.sqrt(dx * dx + dy * dy);
        currentPinchDistance.current = initialPinchDistance.current;
        options.onPinchStart?.();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Clear long press timer if moved
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }

      // Handle pinch move
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        currentPinchDistance.current = Math.sqrt(dx * dx + dy * dy);
        const scale = currentPinchDistance.current / initialPinchDistance.current;
        options.onPinchMove?.(scale);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Clear long press timer
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }

      // Handle swipe
      if (!isLongPressing && e.changedTouches.length === 1) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX.current;
        const deltaY = touchEndY - touchStartY.current;

        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 50) {
            options.onSwipeRight?.();
          } else if (deltaX < -50) {
            options.onSwipeLeft?.();
          }
        }
      }

      // Handle pinch end
      if (e.touches.length < 2) {
        options.onPinchEnd?.();
      }

      setIsLongPressing(false);
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [options, isLongPressing]);

  return elementRef;
} 