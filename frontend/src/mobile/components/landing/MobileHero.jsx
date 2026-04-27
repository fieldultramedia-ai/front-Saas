import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../components/Logo';

/* ── Inject aurora keyframes once (same pattern as desktop HeroSection) ── */
const mobileHeroStyleId = 'mobile-hero-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(mobileHeroStyleId)) {
  const style = document.createElement('style');
  style.id = mobileHeroStyleId;
  style.textContent = `
    @keyframes mobileOrbFloat1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33%       { transform: translate(-22px, -32px) scale(1.12); }
      66%       { transform: translate(14px, 18px) scale(0.95); }
    }
    @keyframes mobileOrbFloat2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      40%       { transform: translate(26px, -22px) scale(1.09); }
      75%       { transform: translate(-16px, 28px) scale(0.97); }
    }
    @keyframes mobileOrbFloat3 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50%       { transform: translate(-12px, -26px) scale(1.06); }
    }
    @keyframes mobileWaveDrift {
      0%   { transform: translateX(-20%) scaleY(1); }
      50%  { transform: translateX(-8%) scaleY(1.13); }
      100% { transform: translateX(-20%) scaleY(1); }
    }
    @keyframes avatarPop {
      from { opacity: 0; transform: scale(0.4); }
      to   { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

const avatars = [
  { bg: '#00D4FF', color: '#070B14', letter: 'A' },
  { bg: '#7C3AED', color: '#fff',    letter: 'B' },
  { bg: '#06B6D4', color: '#fff',    letter: 'C' },
  { bg: '#14B8A6', color: '#fff',    letter: 'D' },
];

const MobileHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden bg-[#070B14]">

      {/* ══ AURORA BACKGROUND ══ */}

      {/* Orb 1 — Violet, arriba izquierda */}
      <div style={{
        position: 'absolute', top: '0%', left: '-20%',
        width: '75%', height: '60%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.38) 0%, rgba(96,1,209,0.16) 45%, transparent 70%)',
        filter: 'blur(65px)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'mobileOrbFloat1 12s ease-in-out infinite',
      }} />

      {/* Orb 2 — Cyan, derecha centro */}
      <div style={{
        position: 'absolute', top: '25%', right: '-25%',
        width: '70%', height: '55%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.28) 0%, rgba(0,212,255,0.08) 45%, transparent 70%)',
        filter: 'blur(55px)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'mobileOrbFloat2 15s ease-in-out infinite',
      }} />

      {/* Orb 3 — Violet profundo, abajo */}
      <div style={{
        position: 'absolute', bottom: '-5%', left: '5%',
        width: '90%', height: '45%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,1,209,0.30) 0%, rgba(124,58,237,0.10) 50%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'mobileOrbFloat3 18s ease-in-out infinite reverse',
      }} />

      {/* Wave drift band */}
      <div style={{
        position: 'absolute', top: '38%', left: '-10%',
        width: '120%', height: '28%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.20) 20%, rgba(0,212,255,0.13) 50%, rgba(124,58,237,0.17) 80%, transparent 100%)',
        filter: 'blur(42px)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
        animation: 'mobileWaveDrift 10s ease-in-out infinite',
      }} />

      {/* ══ LOGO ══ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-10 z-20"
      >
        <Logo size="large" />
      </motion.div>

      {/* ══ BRAND LABEL ══ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="z-10 mb-4"
      >
        <span className="px-4 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] font-bold uppercase tracking-[0.2em]">
          AI Marketing Evolution
        </span>
      </motion.div>

      {/* ══ BRAND NAME — animated shiny (clase definida en index.css) ══ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="z-10 mb-4 text-center"
      >
        <span
          className="animated-shiny-text font-['Syne'] font-black tracking-[-0.04em] leading-none uppercase italic"
          style={{ fontSize: '4.5rem' }}
        >
          LEADBOOK
        </span>
      </motion.div>

      {/* ══ MAIN TITLE — animated shiny ══ */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="z-10 text-center font-['Syne'] font-black leading-[0.95] tracking-tighter mb-6 max-w-[340px] uppercase italic"
        style={{ fontSize: '2.5rem' }}
      >
        <span className="animated-shiny-text">
          TU CONTENIDO,<br/>SIN LÍMITES.
        </span>
      </motion.h1>

      {/* ══ SUBTITLE ══ */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="z-10 text-center text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-12 max-w-[280px] leading-relaxed"
      >
        Dominá el mercado inmobiliario con la potencia de la Inteligencia Artificial.
      </motion.p>

      {/* ══ CTA BUTTONS ══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="z-10 flex flex-col w-full gap-4 max-w-[280px] mb-10"
      >
        <button
          onClick={() => navigate('/register')}
          className="w-full h-14 bg-[#00d4ff] text-[#070B14] font-bold text-base rounded-2xl active:scale-95 transition-all"
          style={{ boxShadow: '0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)' }}
        >
          Empezar Gratis
        </button>
        <button
          onClick={() => {
            const target = document.getElementById('como-funciona');
            if (target) {
              const y = target.getBoundingClientRect().top + window.pageYOffset - 20;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          className="w-full h-14 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl backdrop-blur-md active:scale-95 transition-all"
        >
          Ver Cómo Funciona
        </button>
      </motion.div>

      {/* ══ SOCIAL PROOF ══ */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="z-10 flex items-center gap-3"
      >
        {/* Stacked avatars */}
        <div className="flex items-center">
          {avatars.map((av, i) => (
            <div
              key={i}
              style={{
                width: 30, height: 30,
                borderRadius: '50%',
                background: av.bg,
                color: av.color,
                border: '2px solid #070B14',
                marginLeft: i > 0 ? -9 : 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
                zIndex: avatars.length - i,
                position: 'relative',
                animation: `avatarPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.95 + i * 0.08}s both`,
                boxShadow: '0 0 0 1px rgba(0,212,255,0.15)',
              }}
            >
              {av.letter}
            </div>
          ))}
        </div>
        <p style={{
          fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.38)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontFamily: 'Manrope, sans-serif',
          margin: 0,
        }}>
          +500 negocios confían en nosotros
        </p>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#070B14] to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default MobileHero;
