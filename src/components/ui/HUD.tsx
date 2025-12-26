import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/stores/useStore';
import MagneticButton from './MagneticButton';
import MainHub from '@/components/hub/MainHub';
import logo from '@/assets/logo.png';

const HUD = () => {
  const { transitionPhase, setTransitionPhase, setIsZooming } = useStore();

  const handleEnter = () => {
    setTransitionPhase('focus');
    setIsZooming(true);
    
    setTimeout(() => {
      setTransitionPhase('warp');
    }, 1200);
    
    setTimeout(() => {
      setTransitionPhase('landed');
      setIsZooming(false);
    }, 3200);
  };

  return (
    <div className="hud-layer">
      <AnimatePresence mode="wait">
        {transitionPhase === 'idle' && (
          <motion.div
            key="hero-hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <img src={logo} alt="ULTRON 9.0" className="h-12 md:h-16 w-auto opacity-90" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="heading-display text-5xl md:text-7xl lg:text-8xl text-text-bright text-center mb-4"
            >
              ULTRON <span className="accent-primary text-glow-primary">9.0</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-hud text-center mb-12 max-w-md px-4"
            >
              NEXT GENERATION SPACE NAVIGATION INTERFACE
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-6 mb-12 text-mono text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                <span className="text-dim">SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                <span className="text-dim">READY</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <MagneticButton text="ENTER ULTRON 9.0 HUB" onClick={handleEnter} strength={0.3} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-8 left-8 right-8 flex justify-between items-end"
            >
              <div className="text-mono text-xs text-dim">
                <div>LAT: 00.0000° N</div>
                <div>LON: 00.0000° W</div>
              </div>
              <div className="text-mono text-xs text-dim text-right">
                <div>VERSION 9.0.1</div>
                <div>{new Date().toISOString().split('T')[0]}</div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {transitionPhase === 'warp' && (
          <motion.div
            key="warp-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 0] }}
              transition={{ duration: 2 }}
              className="w-4 h-4 rounded-full bg-accent-primary"
              style={{ boxShadow: '0 0 100px 50px rgba(99, 102, 241, 0.5)' }}
            />
          </motion.div>
        )}

        {transitionPhase === 'landed' && (
          <motion.div
            key="main-hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-0"
          >
            <MainHub />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scanlines" />
    </div>
  );
};

export default HUD;
