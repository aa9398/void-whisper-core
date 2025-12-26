import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';
import MagneticButton from '@/components/ui/MagneticButton';
import logo from '@/assets/logo.png';

const HeroRegion = () => {
  const { activeRegion, setActiveRegion } = useStore();
  const isActive = activeRegion === 'hero';

  return (
    <motion.div
      initial={{ opacity: 0, z: -50 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.95,
        filter: isActive ? 'blur(0px)' : 'blur(2px)'
      }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
    >
      {/* Floating Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="mb-6"
      >
        <motion.img 
          src={logo} 
          alt="ULTRON 9.0" 
          className="h-14 md:h-20 w-auto"
          animate={{ 
            filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Title with subtle glow */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="heading-display text-4xl md:text-6xl lg:text-7xl text-text-bright text-center mb-3"
      >
        ULTRON <span className="accent-primary text-glow-primary">9.0</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="text-hud text-center mb-2 tracking-widest"
      >
        THE FUTURE AWAITS
      </motion.p>

      {/* Event Date & Location - HUD style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="flex items-center gap-6 mb-10 text-mono text-xs"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
          <span className="text-dim">MARCH 2025</span>
        </div>
        <div className="h-3 w-px bg-glass-border" />
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span className="text-dim">TECH CAMPUS</span>
        </div>
      </motion.div>

      {/* Primary Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <MagneticButton
          text="REGISTER NOW"
          onClick={() => setActiveRegion('register')}
          strength={0.3}
        />
      </motion.div>

      {/* Secondary action hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-mono text-xs text-dim">NAVIGATE BELOW</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-6 rounded-full border border-glass-border flex items-start justify-center pt-1"
        >
          <motion.div 
            className="w-1 h-1.5 rounded-full bg-accent-primary"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroRegion;
