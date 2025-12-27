import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import logo from '@/assets/logo.png';

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
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 pb-32 relative">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="heading-display text-3xl md:text-5xl lg:text-6xl text-text-bright mb-3">
          DEEP SPACE <span className="accent-primary text-glow-primary">RELAY</span>
        </h2>
        <p className="text-hud tracking-[0.15em]">ESTABLISH CONNECTION</p>
      </motion.div>

      {/* Contact Signals */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl w-full mb-12"
      >
        {contactInfo.map((info, index) => (
          <motion.a
            key={info.label}
            href={info.label === 'COMM' ? `mailto:${info.value}` : info.label === 'SIGNAL' ? `tel:${info.value.replace(/\s/g, '')}` : '#'}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="glass-panel p-5 md:p-6 text-center group hover:border-accent-primary/30 transition-colors cursor-pointer block"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center mx-auto mb-4"
            >
              <info.icon className="w-6 h-6 accent-primary" />
            </motion.div>
            <span className="text-mono text-[10px] accent-cyan block mb-2">{info.label}</span>
            <span className="text-mono text-xs md:text-sm text-text-bright">{info.value}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Social Glyphs */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex gap-4 mb-16"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
            whileHover={{ 
              scale: 1.15,
              boxShadow: '0 0 20px hsl(var(--accent-cyan) / 0.5)',
            }}
            className="w-12 h-12 rounded-full glass-panel border border-glass-border hover:border-accent-cyan/50 flex items-center justify-center transition-colors"
          >
            <social.icon className="w-5 h-5 text-dim hover:accent-cyan transition-colors" />
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center"
      >
        <img src={logo} alt="ULTRON 9.0" className="h-8 w-auto mx-auto mb-4 opacity-60" />
        <p className="text-mono text-[10px] text-dim mb-2">© 2025 ULTRON 9.0 • ALL SYSTEMS NOMINAL</p>
        <p className="text-mono text-[10px] text-dim">VERSION 9.0.1 • SIGNAL: STRONG</p>
      </motion.div>

      {/* Background stars effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
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
    </section>
  );
};

export default ContactRegion;