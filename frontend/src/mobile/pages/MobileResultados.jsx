import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Download, 
  Share2, 
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Video,
  Layout
} from 'lucide-react';
import { cn } from '../../lib/utils';

const MobileResultados = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [itemsStatus, setItemsStatus] = useState([
    { id: 'pdf', label: 'PDF Profesional', icon: FileText, progress: 0, status: 'loading', color: '#00d4ff' },
    { id: 'post', label: 'Instagram Post', icon: Share2, progress: 0, status: 'pending', color: '#ff0055' },
    { id: 'story', label: 'Instagram Story', icon: Layout, progress: 0, status: 'pending', color: '#ffcc00' },
    { id: 'video', label: 'Video Reel IA', icon: Video, progress: 0, status: 'pending', color: '#00ff88' },
  ]);

  useEffect(() => {
    // Simular proceso de generación secuencial
    let currentItemIdx = 0;
    
    const interval = setInterval(() => {
      setItemsStatus(prev => {
        const newStatus = [...prev];
        const item = newStatus[currentItemIdx];
        
        if (item.status === 'pending') {
          item.status = 'loading';
        }

        if (item.progress < 100) {
          item.progress += Math.floor(Math.random() * 15) + 5;
          if (item.progress > 100) item.progress = 100;
        } else {
          item.status = 'completed';
          if (currentItemIdx < newStatus.length - 1) {
            currentItemIdx++;
          } else {
            clearInterval(interval);
            setLoading(false);
          }
        }
        
        // Calcular progreso general
        const totalProgress = newStatus.reduce((acc, curr) => acc + curr.progress, 0) / newStatus.length;
        setProgress(totalProgress);
        
        return newStatus;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 h-16">
        <button onClick={() => navigate('/mobile/historial')} className="p-2 -ml-2 text-white/40">
          <ChevronLeft size={24} />
        </button>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
          RESULTADOS IA
        </div>
        <button className="p-2 -mr-2 text-[#00d4ff] opacity-50">
          <Share2 size={20} />
        </button>
      </div>

      <div className="pt-24 px-6 pb-40">
        {/* Status Header */}
        <div className="mb-12 text-center">
          <div className="relative inline-block mb-6">
             <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-3xl font-black font-syne text-[#00d4ff]"
                    >
                      {Math.round(progress)}%
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="done"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[#00ff88]"
                    >
                      <CheckCircle2 size={48} strokeWidth={2.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Spinner overlay if loading */}
                {loading && (
                   <div className="absolute inset-0 border-4 border-t-[#00d4ff] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin p-2" />
                )}
             </div>
          </div>
          
          <h1 className="text-3xl font-black font-syne uppercase tracking-tighter italic mb-2">
            {loading ? 'GENERANDO MAGIA...' : '¡TODO LISTO!'}
          </h1>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[240px] mx-auto">
            {loading ? 'Nuestra IA está creando tus materiales de marketing' : 'Tus archivos han sido optimizados y están listos'}
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {itemsStatus.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-5 rounded-[2rem] border transition-all duration-500",
                item.status === 'completed' 
                  ? "bg-white/[0.03] border-white/10" 
                  : item.status === 'loading'
                  ? "bg-[#00d4ff]/5 border-[#00d4ff]/20"
                  : "bg-white/[0.01] border-white/5 opacity-50"
              )}
            >
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center relative",
                  item.status === 'completed' ? "bg-white/5" : "bg-black/20"
                )}>
                  <item.icon size={24} style={{ color: item.status === 'pending' ? '#333' : item.color }} />
                  {item.status === 'loading' && (
                    <div className="absolute inset-0 border-2 border-t-current rounded-2xl animate-spin" style={{ color: item.color }} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white uppercase tracking-tight truncate">{item.label}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        className="h-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-[9px] font-black text-white/30 uppercase w-8 text-right">
                      {item.progress}%
                    </span>
                  </div>
                </div>

                {item.status === 'completed' && (
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 active:bg-white/10">
                      <Download size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] active:bg-[#00d4ff]/20">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-4"
          >
            <button className="w-full h-20 rounded-3xl bg-gradient-to-r from-[#00d4ff] to-[#7C3AED] text-[#070B14] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-[0_12px_40px_rgba(0,212,255,0.3)] active:scale-95 transition-all">
               <Sparkles size={20} />
               <span>Maximizar con IA</span>
            </button>
            <button 
              onClick={() => navigate('/mobile')}
              className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
            >
              Volver al Dashboard
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MobileResultados;
