import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';

const timelineNodes = [
  { date: 'FEB 15', phase: 'REGISTRATION OPENS', status: 'complete' },
  { date: 'FEB 28', phase: 'EARLY BIRD ENDS', status: 'complete' },
  { date: 'MAR 01', phase: 'WORKSHOPS BEGIN', status: 'active' },
  { date: 'MAR 10', phase: 'MAIN EVENT', status: 'upcoming' },
  { date: 'MAR 12', phase: 'GRAND FINALE', status: 'upcoming' },
];

const TimelineRegion = () => {
  const { activeRegion } = useStore();
  const isActive = activeRegion === 'timeline';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="heading-display text-3xl md:text-5xl text-text-bright mb-2">
          ORBITAL <span className="accent-cyan text-glow-cyan">TIMELINE</span>
        </h2>
        <p className="text-hud tracking-widest">MISSION PHASES</p>
      </motion.div>

      {/* Orbital Path */}
      <div className="relative w-full max-w-4xl">
        {/* Curved path line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 200"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.path
            d="M 50 100 Q 200 50, 400 100 Q 600 150, 750 100"
            fill="none"
            stroke="hsl(var(--glass-border))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 50 100 Q 200 50, 400 100 Q 600 150, 750 100"
            fill="none"
            stroke="url(#timeline-gradient)"
            strokeWidth="2"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 0.6 : 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--accent-primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent-cyan))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timeline Nodes */}
        <div className="relative flex justify-between items-center h-48 px-4">
          {timelineNodes.map((node, index) => {
            const delay = 0.4 + index * 0.15;
            const yOffset = index % 2 === 0 ? -20 : 20;
            
            return (
              <motion.div
                key={node.date}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: isActive ? 1 : 0, 
                  y: isActive ? yOffset : 30 + yOffset,
                }}
                transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="relative flex flex-col items-center"
              >
                {/* Node */}
                <motion.div
                  animate={node.status === 'active' ? {
                    boxShadow: [
                      '0 0 0px hsl(var(--accent-primary) / 0.5)',
                      '0 0 30px hsl(var(--accent-primary) / 0.8)',
                      '0 0 0px hsl(var(--accent-primary) / 0.5)',
                    ],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-4 h-4 rounded-full border-2 mb-3 ${
                    node.status === 'complete' 
                      ? 'bg-accent-cyan border-accent-cyan' 
                      : node.status === 'active'
                      ? 'bg-accent-primary border-accent-primary'
                      : 'bg-transparent border-glass-border'
                  }`}
                />
                
                {/* Info Panel */}
                <div className="glass-panel px-3 py-2 text-center min-w-[100px]">
                  <span className="text-mono text-[10px] accent-primary block mb-1">
                    {node.date}
                  </span>
                  <span className="text-hud text-[10px] text-text-bright block">
                    {node.phase}
                  </span>
                </div>
                
                {/* Status indicator */}
                {node.status === 'active' && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-mono text-[9px] accent-cyan mt-2"
                  >
                    ● CURRENT
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineRegion;
