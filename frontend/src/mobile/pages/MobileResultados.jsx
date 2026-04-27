import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Download, 
  Share2, 
  Copy, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

const MobileResultados = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const listado = location.state?.listado;

  const resultCards = [
    { type: 'PDF', icon: '📄', label: 'PDF Profesional', status: 'Listo' },
    { type: 'Post', icon: '📸', label: 'Instagram Post', status: 'Listo' },
    { type: 'Story', icon: '✨', label: 'Instagram Story', status: 'Listo' },
    { type: 'Reel', icon: '🎬', label: 'Video Reel', status: 'Generando...' },
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 h-16">
        <button onClick={() => navigate('/mobile/historial')} className="p-2 -ml-2 text-gray-400">
          <ChevronLeft size={24} />
        </button>
        <div className="text-sm font-bold font-['Syne']">Resultados</div>
        <button className="p-2 -mr-2 text-[#00d4ff]">
          <Share2 size={20} />
        </button>
      </div>

      <div className="pt-24 px-6 pb-20">
        {/* Project Info */}
        <div className="mb-10 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00d4ff]/20 to-[#6001d1]/20 flex items-center justify-center text-3xl mx-auto mb-4 border border-white/10"
          >
            {listado?.tipo_propiedad?.includes('Casa') ? '🏠' : '✨'}
          </motion.div>
          <h1 className="text-2xl font-bold font-['Syne'] mb-2">
            {listado?.titulo || 'Tu contenido está listo'}
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">
            {listado?.ciudad || 'IA Marketing Suite'}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-4">
          {resultCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-[2rem] bg-[#1b2029]/40 border border-white/5 flex items-center gap-5"
            >
              <div className="text-3xl">{card.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white mb-1">{card.label}</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${card.status === 'Listo' ? 'text-[#00ff88]' : 'text-[#ffcc00] animate-pulse'}`}>
                  {card.status}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 active:bg-white/10">
                  <Download size={18} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] active:bg-[#00d4ff]/20">
                  <ExternalLink size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Magic Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full mt-10 h-16 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#6001d1] text-white font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
        >
          <Sparkles size={20} />
          <span>Optimizar con IA</span>
        </motion.button>
      </div>
    </div>
  );
};

export default MobileResultados;
