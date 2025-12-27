import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

const RegisterRegion = () => {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    event: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const fields = [
    { key: 'name', label: 'IDENTITY', placeholder: 'ENTER FULL NAME', type: 'text' },
    { key: 'email', label: 'COMM LINK', placeholder: 'ENTER EMAIL ADDRESS', type: 'email' },
    { key: 'institution', label: 'ORIGIN', placeholder: 'INSTITUTION / COMPANY', type: 'text' },
    { key: 'event', label: 'MISSION', placeholder: 'SELECT PRIMARY EVENT', type: 'select' },
  ];

  const events = ['HACKATHON', 'ROBO WARS', 'ESPORTS', 'TECH TALK', 'UI/UX JAM', 'TECH QUIZ'];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleInputBlur = (index: number) => {
    if (formData[fields[index].key as keyof typeof formData] && formStep === index) {
      setFormStep(Math.min(formStep + 1, fields.length - 1));
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="heading-display text-3xl md:text-5xl lg:text-6xl text-text-bright mb-3">
          CONTROL <span className="accent-cyan text-glow-cyan">TERMINAL</span>
        </h2>
        <p className="text-hud tracking-[0.15em]">REGISTRATION PROTOCOL</p>
      </motion.div>

      {/* Control Console */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="glass-panel p-6 md:p-8 w-full max-w-md relative overflow-hidden"
      >
        {/* Console header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-glass-border">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent-primary/60" />
          </div>
          <span className="text-hud text-[10px] ml-2">REG_TERMINAL_v9.0</span>
        </div>

        {!isComplete ? (
          <div className="space-y-5">
            {fields.map((field, index) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= formStep ? 1 : 0.3,
                  x: 0,
                }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="relative"
              >
                <label className="text-mono text-[10px] accent-cyan block mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      disabled={index > formStep}
                      className="w-full bg-transparent border border-glass-border rounded-lg px-4 py-3 text-mono text-sm text-text-bright focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/30 transition-all disabled:opacity-30 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-nebula">{field.placeholder}</option>
                      {events.map(event => (
                        <option key={event} value={event} className="bg-nebula">{event}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      onBlur={() => handleInputBlur(index)}
                      disabled={index > formStep}
                      className="w-full bg-transparent border border-glass-border rounded-lg px-4 py-3 text-mono text-sm text-text-bright placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/30 transition-all disabled:opacity-30"
                    />
                  )}
                  {formData[field.key as keyof typeof formData] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Check className="w-4 h-4 accent-cyan" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: formData.event ? 1 : 0.4 }}
              onClick={handleSubmit}
              disabled={!formData.event || isSubmitting}
              className="w-full mt-4 py-3.5 rounded-lg bg-gradient-to-r from-accent-primary to-accent-cyan text-text-bright text-mono text-sm font-medium transition-all hover:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  PROCESSING...
                </>
              ) : (
                'INITIATE REGISTRATION'
              )}
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <motion.div
              animate={{ 
                boxShadow: ['0 0 0px hsl(var(--accent-cyan) / 0.5)', '0 0 40px hsl(var(--accent-cyan) / 0.5)', '0 0 0px hsl(var(--accent-cyan) / 0.5)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan flex items-center justify-center mx-auto mb-5"
            >
              <Check className="w-10 h-10 accent-cyan" />
            </motion.div>
            <h3 className="text-mono text-lg text-text-bright mb-2">REGISTRATION COMPLETE</h3>
            <p className="text-hud text-sm">CONFIRMATION TRANSMITTED TO YOUR COMM LINK</p>
          </motion.div>
        )}

        {/* Scanning line effect */}
        <motion.div
          animate={{ y: ['0%', '100%', '0%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent pointer-events-none"
        />
      </motion.div>
    </section>
  );
};

export default RegisterRegion;