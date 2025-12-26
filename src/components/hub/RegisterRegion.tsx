import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';
import { Check, Loader2 } from 'lucide-react';

const RegisterRegion = () => {
  const { activeRegion } = useStore();
  const isActive = activeRegion === 'register';
  
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
    { key: 'name', label: 'IDENTITY', placeholder: 'ENTER FULL NAME' },
    { key: 'email', label: 'COMM LINK', placeholder: 'ENTER EMAIL ADDRESS' },
    { key: 'institution', label: 'ORIGIN', placeholder: 'INSTITUTION / COMPANY' },
    { key: 'event', label: 'MISSION', placeholder: 'SELECT PRIMARY EVENT' },
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (value && formStep < fields.length - 1) {
      setTimeout(() => setFormStep(formStep + 1), 500);
    }
  };

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
          CONTROL <span className="accent-cyan text-glow-cyan">TERMINAL</span>
        </h2>
        <p className="text-hud tracking-widest">REGISTRATION PROTOCOL</p>
      </motion.div>

      {/* Control Console */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="glass-panel p-8 w-full max-w-md relative overflow-hidden"
      >
        {/* Console header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-glass-border">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-destructive/50" />
            <span className="w-2 h-2 rounded-full bg-accent-cyan/50" />
            <span className="w-2 h-2 rounded-full bg-accent-primary/50" />
          </div>
          <span className="text-hud text-[10px] ml-2">REG_TERMINAL_v9.0</span>
        </div>

        {!isComplete ? (
          <div className="space-y-6">
            {fields.map((field, index) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= formStep ? 1 : 0.3,
                  x: index <= formStep ? 0 : -20,
                }}
                transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                className="relative"
              >
                <label className="text-mono text-[10px] accent-cyan block mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type={field.key === 'email' ? 'email' : 'text'}
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    disabled={index > formStep}
                    className="w-full bg-transparent border border-glass-border rounded-lg px-4 py-3 text-mono text-sm text-text-bright placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/30 transition-all disabled:opacity-30"
                  />
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
                
                {/* Focus glow */}
                <motion.div
                  animate={{ 
                    opacity: index === formStep ? 0.1 : 0,
                  }}
                  className="absolute inset-0 bg-accent-primary rounded-lg blur-xl -z-10"
                />
              </motion.div>
            ))}

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: formStep === fields.length - 1 && formData.event ? 1 : 0.3,
              }}
              onClick={handleSubmit}
              disabled={!formData.event || isSubmitting}
              className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-accent-primary to-accent-cyan text-text-bright text-mono text-sm font-medium transition-all hover:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            className="text-center py-8"
          >
            <motion.div
              animate={{ 
                boxShadow: ['0 0 0px hsl(var(--accent-cyan) / 0.5)', '0 0 40px hsl(var(--accent-cyan) / 0.5)', '0 0 0px hsl(var(--accent-cyan) / 0.5)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-accent-cyan/20 border border-accent-cyan flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-8 h-8 accent-cyan" />
            </motion.div>
            <h3 className="text-mono text-lg text-text-bright mb-2">REGISTRATION COMPLETE</h3>
            <p className="text-hud">CONFIRMATION TRANSMITTED TO YOUR COMM LINK</p>
          </motion.div>
        )}

        {/* Scanning line effect */}
        <motion.div
          animate={{ y: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
};

export default RegisterRegion;
