import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Cpu, Gamepad2, Mic, Palette, Trophy } from 'lucide-react';

const events = [
  { id: 'hackathon', icon: Code, title: 'HACKATHON', category: 'CODE', duration: '24 HRS', prize: '₹50,000', description: 'Build innovative solutions in 24 hours' },
  { id: 'robotics', icon: Cpu, title: 'ROBO WARS', category: 'BUILD', duration: '2 DAYS', prize: '₹40,000', description: 'Battle robots in the arena' },
  { id: 'gaming', icon: Gamepad2, title: 'ESPORTS', category: 'PLAY', duration: '3 DAYS', prize: '₹30,000', description: 'Compete in popular gaming titles' },
  { id: 'debate', icon: Mic, title: 'TECH TALK', category: 'SPEAK', duration: '1 DAY', prize: '₹20,000', description: 'Present your ideas to the world' },
  { id: 'design', icon: Palette, title: 'UI/UX JAM', category: 'CREATE', duration: '12 HRS', prize: '₹25,000', description: 'Design beautiful interfaces' },
  { id: 'quiz', icon: Trophy, title: 'TECH QUIZ', category: 'THINK', duration: '3 HRS', prize: '₹15,000', description: 'Test your technical knowledge' },
];

const EventsRegion = () => {
  const [focusedModule, setFocusedModule] = useState<string | null>(null);

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
          EVENT <span className="accent-primary text-glow-primary">MODULES</span>
        </h2>
        <p className="text-hud tracking-[0.15em]">SELECT TO EXPLORE</p>
      </motion.div>

      {/* Floating Event Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl w-full">
        {events.map((event, index) => {
          const isFocused = focusedModule === event.id;
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setFocusedModule(isFocused ? null : event.id)}
              className="relative glass-panel p-5 md:p-6 cursor-pointer group overflow-hidden"
            >
              {/* Inner glow on focus */}
              <motion.div
                animate={{ opacity: isFocused ? 0.15 : 0 }}
                className="absolute inset-0 bg-accent-primary rounded-xl blur-xl"
              />
              
              {/* Category Badge */}
              <span className="text-mono text-[10px] accent-cyan mb-3 block relative">
                {event.category}
              </span>
              
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 5 }}
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-cyan/10 border border-glass-border flex items-center justify-center mb-4 group-hover:border-accent-primary/30 transition-colors relative"
              >
                <event.icon className="w-7 h-7 accent-primary" />
              </motion.div>
              
              {/* Title */}
              <h3 className="text-mono text-sm md:text-base text-text-bright mb-2 relative">{event.title}</h3>
              <p className="text-hud text-xs text-dim mb-3 relative">{event.description}</p>
              
              {/* Expanded Details */}
              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden relative"
                  >
                    <div className="pt-3 border-t border-glass-border mt-2 space-y-2">
                      <div className="flex justify-between text-hud text-xs">
                        <span>DURATION</span>
                        <span className="text-text-bright">{event.duration}</span>
                      </div>
                      <div className="flex justify-between text-hud text-xs">
                        <span>PRIZE POOL</span>
                        <span className="accent-cyan">{event.prize}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default EventsRegion;