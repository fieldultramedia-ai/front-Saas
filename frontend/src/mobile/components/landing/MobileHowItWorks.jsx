import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { 
    n: '01', 
    title: 'Subí tu producto',   
    desc: 'Fotos, descripción, precio. Funciona con lo que tengas.',
    icon: '📦',
    color: '#6001d1'
  },
  { 
    n: '02', 
    title: 'La IA genera', 
    desc: 'PDFs, posts, stories, videos. Todo optimizado para vender.',
    icon: '✨',
    color: '#00d4ff'
  },
  { 
    n: '03', 
    title: 'Publicá y vendé',            
    desc: 'Instagram, WhatsApp, Facebook. Directo desde la app.',
    icon: '🚀',
    color: '#6001d1'
  },
];

const StepItem = ({ step, index, isLast }) => {
  return (
    <div className="relative flex gap-6 pb-12">
      {/* Line Connector */}
      {!isLast && (
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute left-[27px] top-[56px] w-[2px] bg-gradient-to-b from-[#00d4ff]/40 to-transparent z-0"
        />
      )}

      {/* Number and Icon */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, delay: index * 0.2 }}
          className="w-14 h-14 rounded-2xl bg-[#1b2029] border border-white/10 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ borderColor: `${step.color}40` }}
        >
          {step.icon}
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
        className="pt-1"
      >
        <span className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest mb-1 block">
          Paso {step.n}
        </span>
        <h3 className="text-xl font-bold text-white mb-2 font-['Syne']">{step.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
      </motion.div>
    </div>
  );
};

const MobileHowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 px-6 bg-[#070B14]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-extrabold font-['Syne'] leading-tight mb-4">
          De un producto a <br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#6001d1] bg-clip-text text-transparent">
            contenido viral
          </span>
        </h2>
        <p className="text-gray-400 text-sm">
          Sin importar tu industria. LeadBook se adapta a tu negocio, no al revés.
        </p>
      </motion.div>

      <div className="max-w-md mx-auto">
        {steps.map((step, index) => (
          <StepItem 
            key={index} 
            step={step} 
            index={index} 
            isLast={index === steps.length - 1} 
          />
        ))}
      </div>

      {/* Floating niches pills (as requested in original HowItWorks design) */}
      <div className="flex flex-wrap gap-2 justify-center mt-10">
        {['🏢 Inmobiliaria', '💪 Fitness', '🛍️ E-commerce', '✨ + más'].map((niche, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            viewport={{ once: true }}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300"
          >
            {niche}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default MobileHowItWorks;
