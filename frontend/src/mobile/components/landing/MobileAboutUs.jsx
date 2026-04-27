import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '15s', label: 'CREACIÓN' },
  { value: '10x', label: 'ALCANCE' },
  { value: '99%', label: 'AHORRO' },
];

const MobileAboutUs = () => {
  return (
    <section className="py-20 px-6 bg-[#070B14]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-3xl font-extrabold font-['Syne'] leading-tight mb-6 text-white">
          Somos LeadBook. <br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#6001d1] bg-clip-text text-transparent">
            Cambiando el juego
          </span>
        </h2>
        
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <p>
            Nacimos en 2026 para ayudar a negocios de todo el mundo a crear contenido que realmente vende.
          </p>
          <p>
            LeadBook es el primer motor inteligente construido para entender el valor real de tu producto y convertirlo en contenido premium listos para publicar en segundos.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 py-8 border-y border-white/5">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-white mb-1 font-['Syne']">{stat.value}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-[#00d4ff]/5 to-[#6001d1]/5 border border-white/5 backdrop-blur-md"
      >
        <p className="text-white italic text-sm mb-4">
          "Convertir cualquier producto en contenido que vende. Eso es LeadBook."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#6001d1] p-0.5">
            <div className="w-full h-full bg-[#070B14] rounded-full flex items-center justify-center font-bold text-[10px]">LB</div>
          </div>
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Equipo LeadBook</div>
            <div className="text-[10px] text-gray-500 uppercase">Fundado en 2026</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MobileAboutUs;
