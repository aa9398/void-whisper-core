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
    // Scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveRegion(id);
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="glass-panel px-3 md:px-6 py-2.5 flex items-center gap-1 md:gap-2 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activeRegion === item.id;
          const Icon = item.icon;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-2.5 md:p-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/20 border border-primary/40' 
                  : 'hover:bg-secondary border border-transparent hover:border-border'
              }`}
            >
              <Icon 
                className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`} 
              />
              
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                  style={{ boxShadow: '0 0 8px hsl(var(--primary))' }}
                />
              )}
              
              {/* Tooltip on hover */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-mono text-[10px] text-foreground whitespace-nowrap glass-panel px-2 py-1 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default NavigationDock;