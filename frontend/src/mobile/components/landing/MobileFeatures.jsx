import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Layers, 
  Sparkles, 
  Zap, 
  Clock, 
  LayoutGrid 
} from 'lucide-react';

const features = [
  { icon: Brain, title: 'Generación con IA', desc: 'Nuestra IA entiende el contexto de tu propiedad para escribir copys que realmente venden.' },
  { icon: Layers, title: 'Multi-formato', desc: 'De un solo clic obtenés PDFs, posts, stories y videos listos para compartir.' },
  { icon: Sparkles, title: 'Publicación automática', desc: 'Programá tus redes sociales directamente desde LeadBook sin salir de la app.' },
  { icon: Zap, title: 'Sin experiencia técnica', desc: 'No necesitás saber de diseño. El sistema hace el trabajo pesado por vos.' },
  { icon: Clock, title: 'Listo en segundos', desc: 'Lo que antes tomaba horas de diseño ahora se resuelve en lo que tardás en tomar un café.' },
  { icon: LayoutGrid, title: 'Para cualquier nicho', desc: 'Optimizado para inmobiliarias, pero flexible para cualquier tipo de producto físico.' },
];

const FeatureCard = ({ icon: Icon, title, desc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full group"
    >
      <div className="relative p-6 rounded-3xl bg-[#1b2029]/40 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#00d4ff]/30">
        {/* Glow effect on hover */}
        <div className="absolute -inset-px bg-gradient-to-br from-[#00d4ff]/20 via-transparent to-[#6001d1]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d4ff]/10 to-[#6001d1]/10 flex items-center justify-center mb-4 border border-white/5">
            <Icon className="text-[#00d4ff]" size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 font-['Syne']">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00d4ff]/5 to-transparent rounded-bl-3xl" />
      </div>
    </motion.div>
  );
};

const MobileFeatures = () => {
  return (
    <section id="funciones" className="py-20 px-6 bg-[#070B14]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-sm font-bold text-[#00d4ff] uppercase tracking-[0.2em] mb-4">
          Funcionalidades
        </h2>
        <h3 className="text-3xl font-extrabold font-['Syne'] leading-tight">
          Todo lo que necesitás para que tu negocio sea{' '}
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#6001d1] bg-clip-text text-transparent">
            increíble
          </span>
        </h3>
      </motion.div>

      <div className="flex flex-col gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default MobileFeatures;
