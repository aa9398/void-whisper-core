import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';
import { Mail, MapPin, Phone, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'COMM', value: 'contact@ultron9.tech' },
  { icon: Phone, label: 'SIGNAL', value: '+91 98765 43210' },
  { icon: MapPin, label: 'COORDS', value: 'TECH CAMPUS, SECTOR 9' },
];

const socialLinks = [
  { icon: Twitter, label: 'TWITTER', href: '#' },
  { icon: Instagram, label: 'INSTAGRAM', href: '#' },
  { icon: Linkedin, label: 'LINKEDIN', href: '#' },
  { icon: Github, label: 'GITHUB', href: '#' },
];

const ContactRegion = () => {
  const { activeRegion } = useStore();
  const isActive = activeRegion === 'contact';

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
      {/* Darker overlay for edge-of-station feel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.3 : 0 }}
        className="absolute inset-0 bg-gradient-radial pointer-events-none"
      />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-10 text-center relative"
      >
        <h2 className="heading-display text-3xl md:text-5xl text-text-bright mb-2">
          DEEP SPACE <span className="accent-primary text-glow-primary">RELAY</span>
        </h2>
        <p className="text-hud tracking-widest">ESTABLISH CONNECTION</p>
      </motion.div>

      {/* Contact Signals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full mb-10 relative"
      >
        {contactInfo.map((info, index) => (
          <motion.div
            key={info.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isActive ? 1 : 0, 
              y: isActive ? 0 : 20,
            }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            className="glass-panel p-5 text-center group hover:border-accent-primary/30 transition-colors cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center mx-auto mb-3"
            >
              <info.icon className="w-5 h-5 accent-primary" />
            </motion.div>
            <span className="text-mono text-[10px] accent-cyan block mb-1">{info.label}</span>
            <span className="text-mono text-sm text-text-bright">{info.value}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Social Glyphs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex gap-4 mb-10 relative"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isActive ? 1 : 0, 
              scale: isActive ? 1 : 0,
            }}
            transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
            whileHover={{ 
              scale: 1.2,
              boxShadow: '0 0 20px hsl(var(--accent-cyan) / 0.5)',
            }}
            className="w-11 h-11 rounded-full glass-panel border border-glass-border hover:border-accent-cyan/50 flex items-center justify-center transition-colors"
          >
            <social.icon className="w-5 h-5 text-dim group-hover:accent-cyan transition-colors" />
          </motion.a>
        ))}
      </motion.div>

      {/* Footer HUD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.5 : 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 flex justify-between px-8 text-mono text-[10px] text-dim"
      >
        <div>
          <div>© 2025 ULTRON 9.0</div>
          <div>ALL SYSTEMS NOMINAL</div>
        </div>
        <div className="text-right">
          <div>VERSION 9.0.1</div>
          <div>SIGNAL: STRONG</div>
        </div>
      </motion.div>

      {/* Background stars effect for edge-of-station */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? [0.2, 0.5, 0.2] : 0 }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 rounded-full bg-text-dim"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ContactRegion;
