import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTextScramble } from '@/hooks/useTextScramble';

interface MagneticButtonProps {
  text: string;
  onClick?: () => void;
  strength?: number;
  className?: string;
}

const MagneticButton = ({ 
  text, 
  onClick, 
  strength = 0.3,
  className = '' 
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { displayText, scramble, reset } = useTextScramble(text);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const maxDistance = 100;
    
    if (distance < maxDistance) {
      const pullStrength = (1 - distance / maxDistance) * strength;
      setPosition({
        x: distanceX * pullStrength,
        y: distanceY * pullStrength,
      });
    }
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    reset();
  }, [reset]);

  const handleMouseEnter = useCallback(() => {
    scramble();
  }, [scramble]);

  return (
    <div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ padding: '20px' }}
    >
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
        }}
        whileTap={{
          scale: 0.98,
        }}
        className={`
          relative px-8 py-4
          text-mono tracking-widest
          transition-all duration-300
          rounded-xl
          cursor-pointer
          text-foreground
          ${className}
        `}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%)',
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10">{displayText}</span>
      </motion.button>
    </div>
  );
};

export default MagneticButton;
