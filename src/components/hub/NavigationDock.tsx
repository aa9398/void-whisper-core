import { motion } from 'framer-motion';
import { useStore, HubRegion } from '@/stores/useStore';
import { Home, Info, Calendar, Clock, Users, FileEdit, Star, MessageCircle } from 'lucide-react';

const navItems: { id: HubRegion; icon: typeof Home; label: string }[] = [
  { id: 'hero', icon: Home, label: 'HOME' },
  { id: 'about', icon: Info, label: 'ABOUT' },
  { id: 'events', icon: Calendar, label: 'EVENTS' },
  { id: 'timeline', icon: Clock, label: 'TIMELINE' },
  { id: 'team', icon: Users, label: 'TEAM' },
  { id: 'register', icon: FileEdit, label: 'REGISTER' },
  { id: 'sponsors', icon: Star, label: 'SPONSORS' },
  { id: 'contact', icon: MessageCircle, label: 'CONTACT' },
];

const NavigationDock = () => {
  const { activeRegion, setActiveRegion, cursorPos } = useStore();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-panel px-3 py-2 flex items-center gap-1">
        {navItems.map((item, index) => {
          const isActive = activeRegion === item.id;
          const distanceFromCenter = Math.abs(cursorPos.normalizedX * navItems.length - index);
          const scale = Math.max(0.8, 1 - distanceFromCenter * 0.05);
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveRegion(item.id)}
              whileHover={{ scale: 1.2, y: -5 }}
              animate={{ scale }}
              className={`relative p-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-accent-primary/20 border border-accent-primary/30' 
                  : 'hover:bg-glass-surface border border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'accent-primary' : 'text-dim'}`} />
              
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-primary"
                />
              )}
              
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-mono text-[9px] text-dim whitespace-nowrap glass-panel px-2 py-1"
              >
                {item.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default NavigationDock;
