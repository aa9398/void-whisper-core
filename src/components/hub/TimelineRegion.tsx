import { motion } from 'framer-motion';

const timelineNodes = [
  { date: 'FEB 15', phase: 'REGISTRATION OPENS', status: 'complete' },
  { date: 'FEB 28', phase: 'EARLY BIRD ENDS', status: 'complete' },
  { date: 'MAR 01', phase: 'WORKSHOPS BEGIN', status: 'active' },
  { date: 'MAR 10', phase: 'MAIN EVENT', status: 'upcoming' },
  { date: 'MAR 12', phase: 'GRAND FINALE', status: 'upcoming' },
];

const TimelineRegion = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="heading-display text-3xl md:text-5xl lg:text-6xl text-text-bright mb-3">
          ORBITAL <span className="accent-cyan text-glow-cyan">TIMELINE</span>
        </h2>
        <p className="text-hud tracking-[0.15em]">MISSION PHASES</p>
      </motion.div>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl">
        {/* Horizontal line for desktop */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent origin-left"
        />
        
        {/* Vertical line for mobile */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="md:hidden absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-transparent via-glass-border to-transparent origin-top"
        />

        {/* Timeline Nodes */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-8 md:gap-4">
          {timelineNodes.map((node, index) => (
            <motion.div
              key={node.date}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative flex md:flex-col items-center gap-4 md:gap-3"
            >
              {/* Node */}
              <motion.div
                animate={node.status === 'active' ? {
                  boxShadow: [
                    '0 0 0px hsl(var(--accent-primary) / 0.5)',
                    '0 0 25px hsl(var(--accent-primary) / 0.8)',
                    '0 0 0px hsl(var(--accent-primary) / 0.5)',
                  ],
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                  node.status === 'complete' 
                    ? 'bg-accent-cyan border-accent-cyan' 
                    : node.status === 'active'
                    ? 'bg-accent-primary border-accent-primary'
                    : 'bg-transparent border-glass-border'
                }`}
              />
              
              {/* Info Panel */}
              <div className="glass-panel px-4 py-3 text-center min-w-[120px]">
                <span className="text-mono text-xs accent-primary block mb-1">
                  {node.date}
                </span>
                <span className="text-hud text-[10px] md:text-xs text-text-bright block">
                  {node.phase}
                </span>
              </div>
              
              {/* Status indicator */}
              {node.status === 'active' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-mono text-[9px] accent-cyan md:mt-2"
                >
                  ● CURRENT
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineRegion;