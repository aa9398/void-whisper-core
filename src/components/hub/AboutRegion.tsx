import { motion } from 'framer-motion';
import { Cpu, Globe, Rocket, Sparkles } from 'lucide-react';

const aboutPanels = [
  {
    icon: Cpu,
    title: 'INNOVATION',
    description: 'Pushing boundaries of technology',
  },
  {
    icon: Globe,
    title: 'COMMUNITY',
    description: 'Connecting minds across domains',
  },
  {
    icon: Rocket,
    title: 'COMPETITION',
    description: 'Battle for technological supremacy',
  },
  {
    icon: Sparkles,
    title: 'EXPERIENCE',
    description: 'Immersive tech-fest atmosphere',
  },
];

const AboutRegion = () => {
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
          ABOUT <span className="accent-cyan text-glow-cyan">ULTRON</span>
        </h2>
        <p className="text-hud tracking-[0.15em]">MISSION BRIEF</p>
      </motion.div>

      {/* Floating Arc of Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mb-12">
        {aboutPanels.map((panel, index) => (
          <motion.div
            key={panel.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="glass-panel p-6 md:p-8 text-center group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-14 h-14 rounded-xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center mx-auto mb-5 group-hover:border-accent-primary/50 transition-colors"
            >
              <panel.icon className="w-7 h-7 accent-primary" />
            </motion.div>
            
            <h3 className="text-mono text-sm md:text-base text-text-bright mb-3">{panel.title}</h3>
            <p className="text-hud text-xs md:text-sm leading-relaxed">{panel.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Vision Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1 }}
        className="max-w-2xl text-center"
      >
        <p className="text-dim text-sm md:text-base leading-relaxed">
          ULTRON 9.0 is the flagship technical symposium, 
          uniting innovators in a celebration of human ingenuity and technological prowess.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutRegion;