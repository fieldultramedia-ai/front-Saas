import React from 'react';
import { motion } from 'framer-motion';
import { TextEffect } from '../ui/TextEffect';
import AnimatedGradientBackground from '../ui/AnimatedGradientBackground';
import logoLeadbook from '@/assets/logo-leadbook.png';

const stats = [
  { value: '15s', label: 'TIEMPO DE CREACIÓN' },
  { value: '10x', label: 'MAYOR ALCANCE' },
  { value: '99%', label: 'TIEMPO AHORRADO' },
];

export default function AboutUsSection() {
  return (
    <section id="nosotros" className="relative w-full h-full overflow-hidden bg-[#070B14] flex flex-col items-center justify-start">
      <AnimatedGradientBackground />
      
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-start overflow-hidden pt-16 sm:pt-20 md:pt-24">
        
        {/* Main Content Container */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center w-full max-w-6xl mt-0 sm:mt-2 md:mt-4 lg:mt-8">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col space-y-6 lg:space-y-8"
          >

            
            <TextEffect
              per="word"
              as="h2"
              preset="blur"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-headline font-bold text-white leading-[1.1] tracking-tight"
            >
              Somos LeadBook. El SaaS de marketing que está cambiando todo.
            </TextEffect>
            
            <div className="space-y-4">
              <p className="text-slate-300 font-body text-sm sm:text-base md:text-lg leading-relaxed font-light">
                Somos el SaaS de marketing más potente del mundo. Nacimos en 2026 como proyecto internacional, con el respaldo de Field Ultra Media — empresa líder en soluciones SaaS — para ayudar a negocios de todo el mundo a crear contenido que realmente vende.
              </p>
              <p className="text-slate-400 font-body text-sm sm:text-base md:text-lg leading-relaxed font-light">
                LeadBook no es solo una IA más. Es el primer motor inteligente construido para entender el valor real de tu producto y convertirlo en contenido premium — posts, emails y ads — listos para publicar en segundos.
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-6 sm:gap-8 md:gap-12 pt-4 sm:pt-6 mt-2 sm:mt-4 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-xs md:text-sm font-label uppercase tracking-widest text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual Component */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative lg:h-[500px] w-full flex items-center justify-center"
          >
            {/* Graphic Base */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00d4ff]/10 to-[#6001d1]/20 rounded-3xl blur-3xl opacity-50"></div>
            
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-full bg-[#0B101A] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-end overflow-hidden shadow-2xl shadow-[#6001d1]/20 group">
              
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#6001d1] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-700"></div>
              
              <div className="relative z-10 flex flex-col space-y-4 max-w-sm">
                <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10">
                  <p className="text-white font-headline text-lg font-medium">"Convertir cualquier producto en contenido que vende. Eso es LeadBook."</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#6001d1] p-[2px]">
                    <div className="w-full h-full bg-[#070b14] rounded-full flex items-center justify-center overflow-hidden relative">
                      <img src={logoLeadbook} alt="LeadBook Logo" className="absolute w-[180%] h-[180%] object-contain" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">Equipo LeadBook</span>
                    <span className="text-slate-400 text-xs">Fundado en 2026</span>
                  </div>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
