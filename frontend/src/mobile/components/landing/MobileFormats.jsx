import React from 'react';
import { motion } from 'framer-motion';

const formats = [
  { icon: '📄', title: 'PDF Profesional', desc: 'Catálogos, propuestas, folletos. Descargables para compartir.', badge: 'Presentaciones' },
  { icon: '📸', title: 'Instagram Post', desc: 'Posts optimizados con copy y hashtags. Listos para feed.', badge: 'Engagement' },
  { icon: '✨', title: 'Instagram Story', desc: 'Stories atractivas con animaciones. Directo a tus followers.', badge: 'Urgencia' },
  { icon: '🎠', title: 'Carrusel', desc: 'Multi-slide posts que aumentan alcance. Instagram los ama.', badge: 'Alcance' },
  { icon: '📧', title: 'Email Marketing', desc: 'Newsletters con copy persuasivo. Conecta con tu audiencia.', badge: 'Conversión' },
  { icon: '🎬', title: 'Video (Reel)', desc: 'Videos cortos de 15-60s con IA. Reels son virales.', badge: 'Viralidad' },
];

const FormatCard = ({ format }) => {
  return (
    <motion.div 
      className="flex-shrink-0 w-[280px] p-6 rounded-3xl bg-[#1b2029]/50 backdrop-blur-xl border border-white/5 relative overflow-hidden group"
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#00d4ff]/10 to-transparent rounded-bl-full" />
      
      <div className="text-4xl mb-4">{format.icon}</div>
      <div className="inline-block px-2 py-0.5 rounded-md bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] font-bold uppercase tracking-wider mb-2">
        {format.badge}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-['Syne']">{format.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{format.desc}</p>
      
      <div className="mt-6 flex items-center text-[#00d4ff] text-xs font-bold uppercase tracking-widest gap-2">
        Ver formato
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
};

const MobileFormats = () => {
  return (
    <section className="py-20 bg-[#070B14]">
      <div className="px-6 mb-10">
        <h2 className="text-3xl font-extrabold font-['Syne'] leading-tight mb-4">
          Un contenido para <br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#6001d1] bg-clip-text text-transparent">
            cada canal
          </span>
        </h2>
        <p className="text-gray-400 text-sm">
          Deslizá para ver todos los formatos que nuestra IA puede generar para vos.
        </p>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex overflow-x-auto gap-6 px-6 pb-8 no-scrollbar snap-x snap-mandatory">
        {formats.map((format, index) => (
          <div key={index} className="snap-center">
            <FormatCard format={format} />
          </div>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default MobileFormats;
