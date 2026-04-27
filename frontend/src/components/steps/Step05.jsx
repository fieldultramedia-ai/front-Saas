import { useRef, useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { useAppStore } from '../../store/useAppStore';
import { generarGuion } from '../../services/api';
import { RefreshCw, Upload, X, Clock, Type, Camera, ArrowRight, ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ESCENA_ICONS = { 
  Fachada: '🏠', Sala: '🛋️', Cocina: '🍳', Recámara: '🛏️', 
  Jardín: '🌿', Cierre: '📞', Comedor: '🪑', Baño: '🚿', 
  default: '📍' 
};

export default function Step05({ onNext, onPrev }) {
  const { formData, updateFormData } = useFormContext();
  const { addToast } = useAppStore();
  const [loadingGuion, setLoadingGuion] = useState(false);
  
  const escenas = formData.escenas || [];
  
  const totalPalabras = escenas.reduce((sum, e) => {
    const texto = e.texto || '';
    return sum + texto.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
  
  const palabrasPorSegundo = 2.17;
  const duracionSeg = Math.max(0, Math.round(totalPalabras / palabrasPorSegundo));
  const duracionDisplay = duracionSeg >= 60
    ? `${Math.floor(duracionSeg / 60)}m ${duracionSeg % 60}s`
    : `${duracionSeg}s`;
  
  const fotosListas = escenas.filter(e => e.fotoUrl && e.fotoUrl !== 'null' && e.fotoUrl !== null).length;

  const updateEscena = (idx, field, value) => {
    const updated = escenas.map((e, i) => i === idx ? { ...e, [field]: value } : e);
    updateFormData({ escenas: updated });
  };

  const handleFoto = (idx, file) => {
    if (!file) return;
    const MAX_W = 1200;
    const QUALITY = 0.8;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, MAX_W / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressed = canvas.toDataURL('image/jpeg', QUALITY);
      URL.revokeObjectURL(url);
      updateEscena(idx, 'fotoUrl', compressed);
    };
    img.src = url;
  };

  const handleRegenerar = async () => {
    setLoadingGuion(true);
    try {
      addToast({ type: 'info', title: 'Regenerando...', message: 'La IA está reescribiendo el guión' });
      const result = await generarGuion(formData);
      if (result?.escenas?.length) {
        updateFormData({ escenas: result.escenas });
        addToast({ type: 'success', title: '¡Listo!', message: 'Guión actualizado' });
      }
    } catch (e) {
      addToast({ type: 'error', title: 'Error', message: 'No se pudo conectar con la IA' });
    } finally {
      setLoadingGuion(false);
    }
  };

  if (escenas.length === 0) {
    return (
      <div className="text-center py-20 px-6">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">⚠️</div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">No hay guión generado</h3>
        <p className="text-zinc-500 text-sm mb-10 max-w-sm mx-auto">Parece que el guión no se creó correctamente. Volvé atrás e intentalo de nuevo.</p>
        <button className="px-8 py-3 bg-zinc-800 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all" onClick={onPrev}>
          ← Volver al paso anterior
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
               Paso 05
             </div>
             <div className="h-px w-20 bg-gradient-to-r from-blue-500/20 to-transparent" />
          </div>
          <h1 className="text-3xl font-black font-syne text-white mb-3 italic tracking-tighter uppercase">
            Pulir el Guión
          </h1>
          <p className="text-zinc-400 text-sm">
            Revisá el texto de cada escena y asigná una foto para el video profesional.
          </p>
        </div>
        <button 
          type="button" 
          onClick={handleRegenerar} 
          disabled={loadingGuion}
          className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <RefreshCw size={14} className={loadingGuion ? "animate-spin text-blue-400" : "group-hover:rotate-180 transition-transform duration-500"} /> 
          {loadingGuion ? 'Reescribiendo...' : 'Regenerar con IA'}
        </button>
      </header>

      {/* Modern Stats Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
          <Type size={18} className="text-blue-500 mb-2" />
          <span className="text-xl font-black text-white leading-none mb-1">{totalPalabras}</span>
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Palabras</span>
        </div>
        <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
          <Clock size={18} className="text-purple-500 mb-2" />
          <span className="text-xl font-black text-white leading-none mb-1">{duracionDisplay}</span>
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Duración</span>
        </div>
        <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
          <Camera size={18} className={fotosListas === escenas.length ? "text-emerald-500 mb-2" : "text-amber-500 mb-2"} />
          <span className={`text-xl font-black leading-none mb-1 ${fotosListas === escenas.length ? "text-emerald-400" : "text-white"}`}>{fotosListas}/{escenas.length}</span>
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Fotos</span>
        </div>
      </div>

      {/* Scene List */}
      <div className="space-y-6 mb-12">
        {escenas.map((escena, idx) => {
          const palabras = escena.texto?.trim().split(/\s+/).filter(Boolean).length || 0;
          const icon = ESCENA_ICONS[escena.nombre] || ESCENA_ICONS.default;

          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-zinc-900/20 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-300"
            >
              {/* Scene Header */}
              <div className="px-6 py-4 bg-zinc-900/40 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{icon}</span>
                  <input
                    type="text"
                    value={escena.nombre || ''}
                    onChange={(e) => updateEscena(idx, 'nombre', e.target.value)}
                    className="bg-transparent border-none text-sm font-black text-zinc-200 uppercase tracking-tight focus:ring-0 w-full outline-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-zinc-800 px-2 py-1 rounded-lg">
                    Escena {idx + 1}
                  </span>
                </div>
              </div>

              {/* Scene Content */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_200px]">
                <div className="p-6 space-y-4">
                  <textarea
                    className="w-full bg-transparent border-none p-0 text-sm text-zinc-400 leading-relaxed min-h-[100px] resize-none focus:ring-0 outline-none scrollbar-hide"
                    value={escena.texto || ''}
                    onChange={e => updateEscena(idx, 'texto', e.target.value)}
                    placeholder="Escribí lo que dirá la narración en esta escena..."
                  />
                  <div className="flex items-center gap-4 pt-2 border-t border-white/[0.03]">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                      {palabras} palabras
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-900/40 p-4 border-l border-white/5 flex flex-col items-center justify-center min-h-[160px]">
                  {escena.fotoUrl && escena.fotoUrl !== 'null' ? (
                    <div className="relative w-full aspect-video md:aspect-square group/img">
                      <img src={escena.fotoUrl} alt={escena.nombre} className="w-full h-full object-cover rounded-2xl shadow-2xl" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-2xl">
                         <label className="p-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-colors">
                           <RefreshCw size={16} className="text-white" />
                           <input type="file" accept="image/*" className="hidden" onChange={e => handleFoto(idx, e.target.files[0])} />
                         </label>
                         <button onClick={() => updateEscena(idx, 'fotoUrl', null)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-colors">
                           <X size={16} className="text-red-400" />
                         </button>
                      </div>
                    </div>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer group/upload hover:bg-blue-500/5 transition-all rounded-2xl border-2 border-dashed border-white/5 hover:border-blue-500/20">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover/upload:text-blue-400 group-hover/upload:bg-blue-400/10 transition-all">
                        <ImageIcon size={20} />
                      </div>
                      <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest group-hover/upload:text-blue-400 transition-colors">Agregar Foto</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleFoto(idx, e.target.files[0])} />
                    </label>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <footer className="pt-10 border-t border-white/5 flex items-center justify-between">
        <button 
          type="button" 
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Anterior
        </button>
        
        <button 
          type="button" 
          onClick={onNext}
          className={`
            group flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300
            ${fotosListas < escenas.length 
              ? 'bg-zinc-800 text-zinc-500 hover:text-amber-400 border border-amber-400/20' 
              : 'bg-white text-black hover:bg-blue-500 hover:text-white shadow-xl shadow-blue-500/10'}
          `}
        >
          {fotosListas < escenas.length ? (
            <>
              Faltan {escenas.length - fotosListas} Fotos
              <Sparkles size={16} className="text-amber-500" />
            </>
          ) : (
            <>
              Siguiente Paso
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
