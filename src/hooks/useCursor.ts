import { useEffect, useCallback } from 'react';
import { useStore } from '@/stores/useStore';

export const useCursor = () => {
  const setCursorPos = useStore((state) => state.setCursorPos);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    const normalizedY = -(y / window.innerHeight) * 2 + 1;
    
    setCursorPos({ x, y, normalizedX, normalizedY });
  }, [setCursorPos]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);
};
