import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';
import MagneticButton from '@/components/ui/MagneticButton';
import logo from '@/assets/logo.png';

const HeroRegion = () => {
  const { setActiveRegion } = useStore();

  const scrollToRegister = () => {
    setActiveRegion('register');
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
      {/* Floating Logo - First thing visible */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="mb-8"
      >
        <motion.img 
          src={logo} 
          alt="ULTRON 9.0" 
          className="h-20 md:h-28 lg:h-32 w-auto"
          animate={{ 
            filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Title with subtle glow */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="heading-display text-5xl md:text-7xl lg:text-8xl text-text-bright text-center mb-4"
      >
        ULTRON <span className="accent-primary text-glow-primary">9.0</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-hud text-center mb-3 tracking-[0.2em]"
      >
        THE FUTURE AWAITS
      </motion.p>

      {/* Event Date & Location - HUD style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex items-center gap-6 mb-12 text-mono text-xs"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
          <span className="text-dim">MARCH 2025</span>
        </div>
        <div className="h-4 w-px bg-glass-border" />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          <span className="text-dim">TECH CAMPUS</span>
        </div>
      </motion.div>

      {/* Primary Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <MagneticButton
          text="REGISTER NOW"
          onClick={scrollToRegister}
          strength={0.3}
        />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-mono text-xs text-dim">SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-glass-border flex items-start justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-2 rounded-full bg-accent-primary"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroRegion;