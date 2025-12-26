import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';

const CursorTrail = () => {
  const cursorPos = useStore((state) => state.cursorPos);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);
  
  const TRAIL_LENGTH = 15;
  const LAG = 0.07;

  useEffect(() => {
    // Initialize positions
    positionsRef.current = Array(TRAIL_LENGTH).fill({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    let animationId: number;
    
    const updateTrail = () => {
      const positions = positionsRef.current;
      
      // Update first position to cursor
      positions[0] = { x: cursorPos.x, y: cursorPos.y };
      
      // Each subsequent point follows the previous with lag
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = positions[i - 1];
        const curr = positions[i];
        
        positions[i] = {
          x: curr.x + (prev.x - curr.x) * LAG * (TRAIL_LENGTH - i),
          y: curr.y + (prev.y - curr.y) * LAG * (TRAIL_LENGTH - i),
        };
      }
      
      // Update DOM
      trailRef.current.forEach((el, i) => {
        if (el) {
          el.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        }
      });
      
      animationId = requestAnimationFrame(updateTrail);
    };
    
    animationId = requestAnimationFrame(updateTrail);
    
    return () => cancelAnimationFrame(animationId);
  }, [cursorPos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array(TRAIL_LENGTH).fill(null).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRef.current[i] = el;
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 8 - i * 0.4,
            height: 8 - i * 0.4,
            background: `radial-gradient(circle, rgba(99, 102, 241, ${0.8 - i * 0.05}) 0%, transparent 70%)`,
            borderRadius: '50%',
            mixBlendMode: 'screen',
          }}
        />
      ))}
      
      {/* Main cursor dot */}
      <motion.div
        className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: cursorPos.x,
          y: cursorPos.y,
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(99, 102, 241, 0.5) 50%, transparent 70%)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
        }}
      />
    </div>
  );
};

export default CursorTrail;
