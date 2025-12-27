import { useState } from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  { id: 'lead1', name: 'DR. SARAH CHEN', role: 'LEAD ARCHITECT', tier: 'lead' },
  { id: 'lead2', name: 'ALEX KUMAR', role: 'TECH DIRECTOR', tier: 'lead' },
  { id: 'lead3', name: 'MAYA PATEL', role: 'EVENT HEAD', tier: 'lead' },
  { id: 'core1', name: 'JAMES WU', role: 'DEV LEAD', tier: 'core' },
  { id: 'core2', name: 'PRIYA SHARMA', role: 'DESIGN LEAD', tier: 'core' },
  { id: 'core3', name: 'MIKE JOHNSON', role: 'OPS LEAD', tier: 'core' },
];

const TeamRegion = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

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
          SIGNAL <span className="accent-primary text-glow-primary">ARRAY</span>
        </h2>
        <p className="text-hud tracking-[0.15em]">COMMAND STRUCTURE</p>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        {teamMembers.map((member, index) => {
          const isHovered = hoveredMember === member.id;
          
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`glass-panel p-6 text-center cursor-pointer transition-all ${
                  member.tier === 'lead' ? 'border-accent-primary/30' : ''
                }`}
              >
                {/* Node circle */}
                <motion.div
                  animate={isHovered ? {
                    boxShadow: '0 0 30px hsl(var(--accent-primary) / 0.6)',
                  } : {
                    boxShadow: '0 0 10px hsl(var(--accent-primary) / 0.2)',
                  }}
                  className="w-16 h-16 rounded-full bg-nebula border-2 border-accent-primary/50 flex items-center justify-center mx-auto mb-4"
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-accent-primary"
                  />
                </motion.div>

                <h3 className="text-mono text-sm text-text-bright mb-1">{member.name}</h3>
                <span className="text-hud text-[10px] accent-cyan">{member.role}</span>
                
                {member.tier === 'lead' && (
                  <div className="mt-3 pt-3 border-t border-glass-border">
                    <span className="text-mono text-[9px] accent-primary">★ LEADERSHIP</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TeamRegion;