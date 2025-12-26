import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/stores/useStore';
import { Code, Cpu, Gamepad2, Mic, Palette, Trophy, Users, Zap } from 'lucide-react';

const events = [
  { id: 'hackathon', icon: Code, title: 'HACKATHON', category: 'CODE', duration: '24 HRS', prize: '₹50,000' },
  { id: 'robotics', icon: Cpu, title: 'ROBO WARS', category: 'BUILD', duration: '2 DAYS', prize: '₹40,000' },
  { id: 'gaming', icon: Gamepad2, title: 'ESPORTS', category: 'PLAY', duration: '3 DAYS', prize: '₹30,000' },
  { id: 'debate', icon: Mic, title: 'TECH TALK', category: 'SPEAK', duration: '1 DAY', prize: '₹20,000' },
  { id: 'design', icon: Palette, title: 'UI/UX JAM', category: 'CREATE', duration: '12 HRS', prize: '₹25,000' },
  { id: 'quiz', icon: Trophy, title: 'TECH QUIZ', category: 'THINK', duration: '3 HRS', prize: '₹15,000' },
];

const EventsRegion = () => {
  const { activeRegion, focusedModule, setFocusedModule } = useStore();
  const isActive = activeRegion === 'events';

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
        className="mb-10 text-center"
      >
        <h2 className="heading-display text-3xl md:text-5xl text-text-bright mb-2">
          EVENT <span className="accent-primary text-glow-primary">MODULES</span>
        </h2>
        <p className="text-hud tracking-widest">SELECT TO EXPLORE</p>
      </motion.div>

      {/* Floating Event Modules */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl">
        {events.map((event, index) => {
          const isFocused = focusedModule === event.id;
          const delay = 0.3 + index * 0.1;
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isActive ? 1 : 0, 
                y: isActive ? 0 : 30,
                scale: isFocused ? 1.1 : 1,
                z: isFocused ? 50 : 0,
              }}
              transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
              }}
              onClick={() => setFocusedModule(isFocused ? null : event.id)}
              className="relative glass-panel p-5 cursor-pointer group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Inner glow on focus */}
              <motion.div
                animate={{ 
                  opacity: isFocused ? 0.2 : 0,
                  scale: isFocused ? 1.2 : 1,
                }}
                className="absolute inset-0 bg-accent-primary rounded-xl blur-xl"
              />
              
              {/* Category Badge */}
              <span className="text-mono text-[10px] accent-cyan mb-3 block">
                {event.category}
              </span>
              
              {/* Icon */}
              <motion.div
                animate={{ 
                  rotateZ: isFocused ? [0, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-cyan/10 border border-glass-border flex items-center justify-center mb-4 group-hover:border-accent-primary/30 transition-colors"
              >
                <event.icon className="w-6 h-6 accent-primary" />
              </motion.div>
              
              {/* Title */}
              <h3 className="text-mono text-sm text-text-bright mb-2">{event.title}</h3>
              
              {/* Expanded Details */}
              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-glass-border mt-3 space-y-2">
                      <div className="flex justify-between text-hud">
                        <span>DURATION</span>
                        <span className="text-text-bright">{event.duration}</span>
                      </div>
                      <div className="flex justify-between text-hud">
                        <span>PRIZE POOL</span>
                        <span className="accent-cyan">{event.prize}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Magnetic hover glow */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--accent-primary) / 0.1), transparent 50%)',
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default EventsRegion;
