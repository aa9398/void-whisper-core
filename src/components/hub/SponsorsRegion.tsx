import { useState } from 'react';
import { motion } from 'framer-motion';

const sponsors = [
  { id: 's1', name: 'NEURALINK', tier: 'PLATINUM' },
  { id: 's2', name: 'SPACEX', tier: 'PLATINUM' },
  { id: 's3', name: 'OPENAI', tier: 'PLATINUM' },
  { id: 's4', name: 'MICROSOFT', tier: 'GOLD' },
  { id: 's5', name: 'GOOGLE', tier: 'GOLD' },
  { id: 's6', name: 'META', tier: 'GOLD' },
  { id: 's7', name: 'NVIDIA', tier: 'GOLD' },
  { id: 's8', name: 'INTEL', tier: 'SILVER' },
  { id: 's9', name: 'AMD', tier: 'SILVER' },
  { id: 's10', name: 'QUALCOMM', tier: 'SILVER' },
];

const SponsorsRegion = () => {
  const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null);

  const getTierStyles = (tier: string) => {
    switch (tier) {
      case 'PLATINUM': return { size: 'w-20 h-20 md:w-24 md:h-24', color: 'accent-primary', border: 'border-accent-primary/50' };
      case 'GOLD': return { size: 'w-16 h-16 md:w-20 md:h-20', color: 'accent-cyan', border: 'border-accent-cyan/40' };
      default: return { size: 'w-14 h-14 md:w-16 md:h-16', color: 'text-dim', border: 'border-glass-border' };
    }
  };

  const groupedSponsors = {
    PLATINUM: sponsors.filter(s => s.tier === 'PLATINUM'),
    GOLD: sponsors.filter(s => s.tier === 'GOLD'),
    SILVER: sponsors.filter(s => s.tier === 'SILVER'),
  };

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
          SPONSOR <span className="accent-cyan text-glow-cyan">CONSTELLATION</span>
        </h2>
        <p className="text-hud tracking-[0.15em]">ALLIED FORCES</p>
      </motion.div>

      {/* Sponsors by Tier */}
      <div className="w-full max-w-4xl space-y-12">
        {Object.entries(groupedSponsors).map(([tier, tierSponsors], tierIndex) => (
          <motion.div
            key={tier}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: tierIndex * 0.2, duration: 0.6 }}
            className="text-center"
          >
            <span className={`text-mono text-xs ${tier === 'PLATINUM' ? 'accent-primary' : tier === 'GOLD' ? 'accent-cyan' : 'text-dim'} mb-6 block`}>
              {tier} PARTNERS
            </span>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {tierSponsors.map((sponsor, index) => {
                const styles = getTierStyles(sponsor.tier);
                const isHovered = hoveredSponsor === sponsor.id;
                
                return (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    onHoverStart={() => setHoveredSponsor(sponsor.id)}
                    onHoverEnd={() => setHoveredSponsor(null)}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      animate={isHovered ? {
                        boxShadow: sponsor.tier === 'PLATINUM' 
                          ? '0 0 35px hsl(var(--accent-primary) / 0.7)'
                          : '0 0 25px hsl(var(--accent-cyan) / 0.5)',
                      } : {}}
                      className={`${styles.size} rounded-full glass-panel border ${styles.border} flex items-center justify-center cursor-pointer transition-colors`}
                    >
                      <motion.div
                        animate={{ 
                          opacity: [0.6, 1, 0.6],
                          scale: [0.8, 1, 0.8],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                        className={`w-2 h-2 rounded-full ${
                          sponsor.tier === 'PLATINUM' ? 'bg-accent-primary' 
                            : sponsor.tier === 'GOLD' ? 'bg-accent-cyan'
                            : 'bg-text-dim'
                        }`}
                      />
                    </motion.div>

                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass-panel px-3 py-2 text-center z-10 whitespace-nowrap"
                    >
                      <span className="text-mono text-xs text-text-bright">{sponsor.name}</span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tier Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex gap-6 mt-12"
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
    </section>
  );
};

export default SponsorsRegion;