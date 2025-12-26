import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';
import { Cpu, Globe, Rocket, Sparkles } from 'lucide-react';

const aboutPanels = [
  {
    icon: Cpu,
    title: 'INNOVATION',
    description: 'Pushing boundaries of technology',
  },
  {
    icon: Globe,
    title: 'COMMUNITY',
    description: 'Connecting minds across domains',
  },
  {
    icon: Rocket,
    title: 'COMPETITION',
    description: 'Battle for technological supremacy',
  },
  {
    icon: Sparkles,
    title: 'EXPERIENCE',
    description: 'Immersive tech-fest atmosphere',
  },
];

const AboutRegion = () => {
  const { activeRegion } = useStore();
  const isActive = activeRegion === 'about';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="heading-display text-3xl md:text-5xl text-text-bright mb-2">
          ABOUT <span className="accent-cyan text-glow-cyan">ULTRON</span>
        </h2>
        <p className="text-hud tracking-widest">MISSION BRIEF</p>
      </motion.div>

      {/* Floating Arc of Panels */}
      <div className="relative w-full max-w-5xl h-80 flex items-center justify-center">
        {aboutPanels.map((panel, index) => {
          const angle = (index - 1.5) * 15;
          const delay = 0.3 + index * 0.15;
          
          return (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 30, rotateY: angle }}
              animate={{ 
                opacity: isActive ? 1 : 0, 
                y: isActive ? 0 : 30,
                rotateY: angle,
                rotateX: -5,
              }}
              transition={{ 
                delay, 
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: angle + 5,
                z: 20,
              }}
              className="absolute glass-panel p-6 w-48 md:w-56"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translateX(${(index - 1.5) * 140}px) rotateY(${angle}deg)`,
              }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 0px hsl(var(--accent-primary) / 0)',
                    '0 0 20px hsl(var(--accent-primary) / 0.3)',
                    '0 0 0px hsl(var(--accent-primary) / 0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center mb-4"
              >
                <panel.icon className="w-5 h-5 accent-primary" />
              </motion.div>
              
              <h3 className="text-mono text-sm text-text-bright mb-2">{panel.title}</h3>
              <p className="text-hud text-xs leading-relaxed">{panel.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Vision Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.8 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 max-w-xl text-center"
      >
        <p className="text-dim text-sm leading-relaxed">
          ULTRON 9.0 is the flagship technical symposium, 
          uniting innovators in a celebration of human ingenuity and technological prowess.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutRegion;
