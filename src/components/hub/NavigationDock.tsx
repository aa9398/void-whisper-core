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
  const { activeRegion, setActiveRegion } = useStore();

  const handleNavClick = (id: HubRegion) => {
    setActiveRegion(id);
    // Scroll will be handled by MainHub's useEffect
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="glass-panel px-2 md:px-4 py-2 flex items-center gap-0.5 md:gap-1">
        {navItems.map((item) => {
          const isActive = activeRegion === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-2 md:p-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-accent-primary/20 border border-accent-primary/40' 
                  : 'hover:bg-glass-surface border border-transparent hover:border-glass-border'
              }`}
            >
              <item.icon 
                className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                  isActive ? 'text-accent-primary' : 'text-dim hover:text-text-bright'
                }`} 
              />
              
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-primary"
                  style={{ boxShadow: '0 0 8px hsl(var(--accent-primary))' }}
                />
              )}
              
              {/* Tooltip */}
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-9 left-1/2 -translate-x-1/2 text-mono text-[9px] text-text-bright whitespace-nowrap glass-panel px-2 py-1 pointer-events-none"
              >
                {item.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default NavigationDock;