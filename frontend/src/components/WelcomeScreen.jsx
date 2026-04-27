import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles, Trophy } from 'lucide-react';
import { balloons } from 'balloons-js';

export default function WelcomeScreen({ onNext, name }) {
  React.useEffect(() => {
    console.log("WelcomeScreen: Triggering balloons...");
    try {
      balloons();
    } catch (e) {
      console.error("Balloons failed:", e);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#070B14] flex items-center justify-center overflow-hidden animate-in fade-in duration-500">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00d4ff]/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#6001d1]/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full px-6 text-center z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-tr from-[#00d4ff] to-[#6001d1] rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[0_20px_50px_rgba(0,212,255,0.3)]"
        >
          <Trophy size={48} className="text-white" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-6xl font-black font-syne mb-6 tracking-tighter leading-none"
        >
          ¡Excelente, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#6001d1]">{name}</span>!
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-white/60 mb-12 font-dm-sans leading-relaxed"
        >
          Estamos muy felices de tenerte con nosotros. <br /> 
          LeadBook es ahora tu aliado para escalar tus ventas con Inteligencia Artificial. <br />
          <span className="text-white/80 font-bold mt-4 block">¡Gracias por confiar en nuestra visión!</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={onNext}
            className="group relative px-10 py-5 bg-white text-black font-black text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center gap-3 mx-auto"
          >
            Comenzar mi viaje
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex items-center justify-center gap-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/20">
            <CheckCircle2 size={14} className="text-[#00ff88]" />
            Cuenta Verificada
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/20">
            <Sparkles size={14} className="text-[#ffaa00]" />
            IA Activada
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
