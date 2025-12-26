import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const GlassPanel = ({ 
  children, 
  className = '',
  animate = true,
  delay = 0
}: GlassPanelProps) => {
  const content = (
    <div
      className={`
        glass-panel
        ${className}
      `}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default GlassPanel;
