import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';

const sponsors = [
  { id: 's1', name: 'NEURALINK', tier: 'PLATINUM', position: { x: 50, y: 20 } },
  { id: 's2', name: 'SPACEX', tier: 'PLATINUM', position: { x: 25, y: 35 } },
  { id: 's3', name: 'OPENAI', tier: 'PLATINUM', position: { x: 75, y: 35 } },
  { id: 's4', name: 'MICROSOFT', tier: 'GOLD', position: { x: 15, y: 55 } },
  { id: 's5', name: 'GOOGLE', tier: 'GOLD', position: { x: 40, y: 55 } },
  { id: 's6', name: 'META', tier: 'GOLD', position: { x: 60, y: 55 } },
  { id: 's7', name: 'NVIDIA', tier: 'GOLD', position: { x: 85, y: 55 } },
  { id: 's8', name: 'INTEL', tier: 'SILVER', position: { x: 30, y: 75 } },
  { id: 's9', name: 'AMD', tier: 'SILVER', position: { x: 50, y: 75 } },
  { id: 's10', name: 'QUALCOMM', tier: 'SILVER', position: { x: 70, y: 75 } },
];

const constellationLines = [
  ['s1', 's2'], ['s1', 's3'],
  ['s2', 's4'], ['s2', 's5'],
  ['s3', 's6'], ['s3', 's7'],
  ['s5', 's8'], ['s5', 's9'],
  ['s6', 's9'], ['s6', 's10'],
];

const SponsorsRegion = () => {
  const { activeRegion, focusedModule, setFocusedModule } = useStore();
  const isActive = activeRegion === 'sponsors';

  const getSponsorById = (id: string) => sponsors.find(s => s.id === id);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'PLATINUM': return 'accent-primary';
      case 'GOLD': return 'accent-cyan';
      default: return 'text-dim';
    }
  };

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
        className="mb-8 text-center"
      >
        <h2 className="heading-display text-3xl md:text-5xl text-text-bright mb-2">
          SPONSOR <span className="accent-cyan text-glow-cyan">CONSTELLATION</span>
        </h2>
        <p className="text-hud tracking-widest">ALLIED FORCES</p>
      </motion.div>

      {/* Constellation */}
      <div className="relative w-full max-w-4xl h-80">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {constellationLines.map(([from, to], index) => {
            const fromSponsor = getSponsorById(from);
            const toSponsor = getSponsorById(to);
            if (!fromSponsor || !toSponsor) return null;
            
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={`${fromSponsor.position.x}%`}
                y1={`${fromSponsor.position.y}%`}
                x2={`${toSponsor.position.x}%`}
                y2={`${toSponsor.position.y}%`}
                stroke="hsl(var(--glass-border))"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isActive ? 1 : 0, 
                  opacity: isActive ? 0.3 : 0,
                }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
              />
            );
          })}
        </svg>

        {/* Sponsor Nodes */}
        {sponsors.map((sponsor, index) => {
          const isFocused = focusedModule === sponsor.id;
          const delay = 0.3 + index * 0.08;
          const size = sponsor.tier === 'PLATINUM' ? 'w-16 h-16' : sponsor.tier === 'GOLD' ? 'w-12 h-12' : 'w-10 h-10';
          
          return (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isActive ? 1 : 0, 
                scale: isActive ? 1 : 0,
              }}
              transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              onHoverStart={() => setFocusedModule(sponsor.id)}
              onHoverEnd={() => setFocusedModule(null)}
              className="absolute cursor-pointer"
              style={{
                left: `${sponsor.position.x}%`,
                top: `${sponsor.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Star node */}
              <motion.div
                animate={isFocused ? {
                  boxShadow: sponsor.tier === 'PLATINUM' 
                    ? '0 0 40px hsl(var(--accent-primary) / 0.8)'
                    : '0 0 30px hsl(var(--accent-cyan) / 0.6)',
                  scale: 1.2,
                } : {
                  boxShadow: '0 0 10px hsl(var(--accent-primary) / 0.2)',
                  scale: 1,
                }}
                className={`${size} rounded-full glass-panel border border-glass-border hover:border-accent-primary/50 flex items-center justify-center transition-colors`}
              >
                <motion.div
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className={`w-2 h-2 rounded-full ${
                    sponsor.tier === 'PLATINUM' 
                      ? 'bg-accent-primary' 
                      : sponsor.tier === 'GOLD'
                      ? 'bg-accent-cyan'
                      : 'bg-text-dim'
                  }`}
                />
              </motion.div>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isFocused ? 1 : 0,
                  y: isFocused ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass-panel px-3 py-2 text-center z-10 whitespace-nowrap"
              >
                <span className="text-mono text-xs text-text-bright block">{sponsor.name}</span>
                <span className={`text-hud text-[10px] ${getTierColor(sponsor.tier)}`}>{sponsor.tier}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Tier Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.6 : 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="flex gap-6 mt-4"
      >
        <span className="text-hud text-[10px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-primary" /> PLATINUM
        </span>
        <span className="text-hud text-[10px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-cyan" /> GOLD
        </span>
        <span className="text-hud text-[10px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-text-dim" /> SILVER
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SponsorsRegion;
