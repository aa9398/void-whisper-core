import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';

const teamMembers = [
  { id: 'lead1', name: 'DR. SARAH CHEN', role: 'LEAD ARCHITECT', position: { x: 50, y: 30 } },
  { id: 'lead2', name: 'ALEX KUMAR', role: 'TECH DIRECTOR', position: { x: 30, y: 50 } },
  { id: 'lead3', name: 'MAYA PATEL', role: 'EVENT HEAD', position: { x: 70, y: 50 } },
  { id: 'core1', name: 'JAMES WU', role: 'DEV LEAD', position: { x: 20, y: 70 } },
  { id: 'core2', name: 'PRIYA SHARMA', role: 'DESIGN LEAD', position: { x: 50, y: 65 } },
  { id: 'core3', name: 'MIKE JOHNSON', role: 'OPS LEAD', position: { x: 80, y: 70 } },
];

const connections = [
  ['lead1', 'lead2'],
  ['lead1', 'lead3'],
  ['lead2', 'core1'],
  ['lead2', 'core2'],
  ['lead3', 'core2'],
  ['lead3', 'core3'],
  ['core1', 'core2'],
  ['core2', 'core3'],
];

const TeamRegion = () => {
  const { activeRegion, focusedModule, setFocusedModule } = useStore();
  const isActive = activeRegion === 'team';

  const getMemberById = (id: string) => teamMembers.find(m => m.id === id);

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
        className="mb-8 text-center"
      >
        <h2 className="heading-display text-3xl md:text-5xl text-text-bright mb-2">
          SIGNAL <span className="accent-primary text-glow-primary">ARRAY</span>
        </h2>
        <p className="text-hud tracking-widest">COMMAND STRUCTURE</p>
      </motion.div>

      {/* Network Visualization */}
      <div className="relative w-full max-w-3xl h-80">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(([from, to], index) => {
            const fromMember = getMemberById(from);
            const toMember = getMemberById(to);
            if (!fromMember || !toMember) return null;
            
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={`${fromMember.position.x}%`}
                y1={`${fromMember.position.y}%`}
                x2={`${toMember.position.x}%`}
                y2={`${toMember.position.y}%`}
                stroke="hsl(var(--glass-border))"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isActive ? 1 : 0, 
                  opacity: isActive ? 0.5 : 0,
                }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              />
            );
          })}
          
          {/* Animated pulse along connections */}
          {isActive && connections.map(([from, to], index) => {
            const fromMember = getMemberById(from);
            const toMember = getMemberById(to);
            if (!fromMember || !toMember) return null;
            
            return (
              <motion.circle
                key={`pulse-${from}-${to}`}
                r="2"
                fill="hsl(var(--accent-cyan))"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  cx: [`${fromMember.position.x}%`, `${toMember.position.x}%`],
                  cy: [`${fromMember.position.y}%`, `${toMember.position.y}%`],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            );
          })}
        </svg>

        {/* Team Nodes */}
        {teamMembers.map((member, index) => {
          const isFocused = focusedModule === member.id;
          const delay = 0.3 + index * 0.1;
          
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isActive ? 1 : 0, 
                scale: isActive ? 1 : 0,
              }}
              transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onHoverStart={() => setFocusedModule(member.id)}
              onHoverEnd={() => setFocusedModule(null)}
              className="absolute cursor-pointer"
              style={{
                left: `${member.position.x}%`,
                top: `${member.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Node circle */}
              <motion.div
                animate={isFocused ? {
                  boxShadow: '0 0 30px hsl(var(--accent-primary) / 0.6)',
                  scale: 1.2,
                } : {
                  boxShadow: '0 0 10px hsl(var(--accent-primary) / 0.3)',
                  scale: 1,
                }}
                className="w-8 h-8 rounded-full bg-nebula border-2 border-accent-primary flex items-center justify-center"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-accent-primary"
                />
              </motion.div>

              {/* Info tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isFocused ? 1 : 0,
                  y: isFocused ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-10 left-1/2 -translate-x-1/2 glass-panel px-3 py-2 min-w-[120px] text-center z-10"
              >
                <span className="text-mono text-xs text-text-bright block">{member.name}</span>
                <span className="text-hud text-[10px] accent-cyan">{member.role}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TeamRegion;
