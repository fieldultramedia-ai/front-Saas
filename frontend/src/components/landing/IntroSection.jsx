import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Minus, Square, X } from 'lucide-react'
import HeroSection from './HeroSection'
import logoImg from '../../assets/logo-leadbook.png'

const TrailingWindow = ({ delay, zIndex, x, y, opacity, blur, title }) => (
  <motion.div
    initial={{ opacity: 0, x: 100, y: 50, rotateY: -15 }}
    animate={{ opacity, x: 0, y: 0, rotateY: -15 }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute h-[280px] w-[420px] rounded-xl border border-white/10 bg-[#0f131d]/60 backdrop-blur-${blur} shadow-2xl overflow-hidden pointer-events-none`}
    style={{ zIndex, right: x, bottom: y }}
  >
    <div className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-[#1b2029]/80 px-3">
      <div className="h-2 w-2 rounded-full bg-white/10" />
      <div className="h-2 w-2 rounded-full bg-white/10" />
      <div className="h-2 w-2 rounded-full bg-white/10" />
      <div className="mx-auto text-[10px] font-medium text-slate-500 uppercase tracking-widest">{title}</div>
    </div>
    <div className="p-6">
       <div className="h-4 w-2/3 rounded bg-white/5 mb-3" />
       <div className="space-y-2">
         <div className="h-2 w-full rounded bg-white/5" />
         <div className="h-2 w-full rounded bg-white/5" />
         <div className="h-2 w-[80%] rounded bg-white/5" />
       </div>
    </div>
    {/* Subtle gradient overlay to make it look like a real UI */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#6001D1]/5 to-[#00D4FF]/5" />
  </motion.div>
)

export default function IntroSection({ onNavigate }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#070b14]">
      
      {/* 1. BACKGROUND VIDEO / GIF LOGO */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Usamos un fondo que simula el screenshot: Cyan + Violet waves */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0e17] via-[#100824] to-[#070b14]" />
        
        {/* Giant Logo Overlay (Video Placeholder) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer" onClick={() => setIsVideoOpen(true)}>
           {/* Simulamos la flecha gigante/logo con un resplandor central suave */}
           <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="h-[80%] w-[80%] rounded-full bg-[#00D4FF] filter blur-[180px]" 
           />
           {/* Imagen central que representa el logo clickeable */}
           <img 
            src={logoImg} 
            alt="Leadbook Logo" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-[70vw] opacity-5 hover:opacity-20 transition-all duration-700"
           />
        </div>
      </div>

      {/* 2. TRAILING WINDOWS (Bottom Right) */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
        <TrailingWindow title="Dashboard" delay={0.6} zIndex={11} x="8%" y="8%" opacity={0.3} blur="md" />
        <TrailingWindow title="Analíticas" delay={0.8} zIndex={12} x="4%" y="15%" opacity={0.6} blur="sm" />
        <TrailingWindow title="Contenido" delay={1.0} zIndex={13} x="0%" y="22%" opacity={1} blur="none" />
      </div>

      {/* 3. MAIN APP WINDOW */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 h-[75vh] w-[90%] max-w-6xl rounded-2xl border border-white/10 bg-[#0a0e17]/90 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden flex flex-col group"
      >
        {/* Native Mac-style Title Bar */}
        <div className="flex h-10 items-center justify-between border-b border-white/5 bg-[#1b2029]/60 px-5">
           <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FF5F56] transition-opacity hover:opacity-60" />
              <div className="h-3 w-3 rounded-full bg-[#FFBD2E] transition-opacity hover:opacity-60" />
              <div className="h-3 w-3 rounded-full bg-[#27C93F] transition-opacity hover:opacity-60" />
           </div>
           <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-12">LeadBook OS — Landing Explorer</div>
           <div className="flex items-center gap-4 text-slate-500">
              <Minus size={14} />
              <Square size={12} />
              <X size={14} />
           </div>
        </div>

        {/* WINDOW CONTENT: The actual landing Hero */}
        <div className="relative flex-1 overflow-hidden">
          {/* Usamos el HeroSection real dentro, pero ajustamos su estilo para que encaje */}
          {/* Note: HeroSection needs to handle its own scaling to fit */}
          <div className="absolute inset-0 scale-[0.85] origin-top translate-y-[-5%] overflow-hidden pointer-events-auto">
             <HeroSection isActive={true} onNavigate={onNavigate} />
          </div>
          
          {/* Overlay sutil para indicar que es una ventana */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-b-2xl" />
        </div>
      </motion.div>

      {/* 4. VIDEO OVERLAY MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-10 backdrop-blur-2xl"
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative aspect-video w-full max-w-6xl rounded-3xl border border-white/10 bg-[#0f131d] shadow-2xl overflow-hidden"
            >
              {/* Aquí el iframe o video que el usuario quiera */}
              <div className="flex h-full w-full items-center justify-center flex-col gap-4">
                 <div className="h-20 w-20 rounded-full bg-[#00D4FF]/20 flex items-center justify-center border border-[#00D4FF]/50 animate-pulse">
                   <Play size={32} className="text-[#00D4FF]" fill="currentColor" />
                 </div>
                 <h2 className="text-white font-syne text-2xl font-bold">Reproduciendo Demo Reel</h2>
                 <p className="text-slate-500 font-manrope">Inserta aquí el link de tu video en mp4 o youtube</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
