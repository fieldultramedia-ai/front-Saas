import { useState, useRef, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Upload, X, RotateCcw, Image as ImageIcon, Sparkles, Camera, FileText, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Step06({ onNext, onPrev }) {
  const { formData, updateFormData } = useFormContext();
  const portadaRef = useRef();
  const recorridoRef = useRef();

  useEffect(() => {
    const escenas = formData.escenas || [];
    if (!formData.portadaUrl && escenas[0]?.fotoUrl) {
      updateFormData({ portadaUrl: escenas[0].fotoUrl });
    }
    if (!formData.fotosRecorrido || formData.fotosRecorrido.length === 0) {
      const fotosDeEscenas = escenas.map(e => e.fotoUrl).filter(Boolean);
      if (fotosDeEscenas.length > 0) {
        updateFormData({ fotosRecorrido: fotosDeEscenas });
      }
    }
  }, []);

  const handlePortada = (file) => {
    if (!file) return;
    const MAX_W = 1200;
    const QUALITY = 0.8;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, MAX_W / img.width);
      const canvas = document.createElement('canvas');
      canvas.width  = img.width  * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressed = canvas.toDataURL('image/jpeg', QUALITY);
      URL.revokeObjectURL(url);
      updateFormData({ portadaUrl: compressed });
    };
    img.src = url;
  };

  const handleFotosRecorrido = (files) => {
    const current = formData.fotosRecorrido || [];
    const nuevas = Array.from(files).slice(0, 9 - current.length);
    let acumuladas = [...current];
    
    nuevas.forEach(file => {
      const MAX_W = 1000;
      const QUALITY = 0.75;
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const scale = Math.min(1, MAX_W / img.width);
        const canvas = document.createElement('canvas');
        canvas.width  = img.width  * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', QUALITY);
        URL.revokeObjectURL(url);
        acumuladas = [...acumuladas, compressed];
        updateFormData({ fotosRecorrido: acumuladas });
      };
      img.src = url;
    });
  };

  const removeRecorrido = (idx) => {
    const updated = (formData.fotosRecorrido || []).filter((_, i) => i !== idx);
    updateFormData({ fotosRecorrido: updated });
  };

  const formatos = [
    { key: 'generarStory',    label: 'Instagram Story', desc: '1080×1920 px', icon: <Camera size={18} /> },
    { key: 'generarCarrusel', label: 'Carrusel Social', desc: '5-7 Slides', icon: <Sparkles size={18} /> },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
           <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
             Paso 06
           </div>
           <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
        </div>
        <h1 className="text-3xl font-black font-syne text-white mb-3 italic tracking-tighter uppercase">
          Fotos y Formatos
        </h1>
        <p className="text-zinc-400 text-sm">
          Cargá las mejores imágenes para el PDF profesional y seleccioná los formatos extra para tus redes.
        </p>
      </header>

      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Portada */}
          <section className="space-y-4">
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
              Portada Principal <span className="text-[9px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md">Opcional</span>
            </label>
            {formData.portadaUrl ? (
              <div className="relative aspect-video rounded-3xl overflow-hidden group border border-white/10">
                <img src={formData.portadaUrl} alt="portada" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <button onClick={() => portadaRef.current?.click()} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                     <RotateCcw size={18} />
                   </button>
                   <button onClick={() => updateFormData({ portadaUrl: null })} className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-full text-red-400 transition-all">
                     <X size={18} />
                   </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-white/5 bg-zinc-900/30 rounded-3xl cursor-pointer hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600 mb-3 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-all">
                  <Upload size={24} />
                </div>
                <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-300">Subir Portada</span>
                <span className="text-[10px] text-zinc-600 mt-1">Recomendado 1920x1080</span>
                <input type="file" accept="image/*" className="hidden" ref={portadaRef} onChange={e => handlePortada(e.target.files[0])} />
              </label>
            )}
            <input type="file" accept="image/*" className="hidden" ref={portadaRef} onChange={e => handlePortada(e.target.files[0])} />
          </section>

          {/* Fotos recorrido */}
          <section className="space-y-4">
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center justify-between">
              Fotos del Recorrido 
              <span className="text-[10px] text-zinc-600">{(formData.fotosRecorrido || []).length}/9</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(formData.fotosRecorrido || []).map((foto, idx) => (
                <motion.div 
                  layoutId={`recorrido-${idx}`}
                  key={idx} 
                  className="relative aspect-square rounded-xl overflow-hidden group border border-white/5"
                >
                  <img src={foto} alt={`foto ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 w-5 h-5 bg-black/60 backdrop-blur-md rounded-lg flex items-center justify-center text-[10px] font-black text-white">
                    {idx + 1}
                  </div>
                  <button 
                    onClick={() => removeRecorrido(idx)} 
                    className="absolute top-1 right-1 p-1 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={10} />
                  </button>
                </motion.div>
              ))}

              {(formData.fotosRecorrido || []).length < 9 && (
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-white/5 bg-zinc-900/30 rounded-xl cursor-pointer hover:border-zinc-700 hover:bg-zinc-800 transition-all group">
                  <Upload size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleFotosRecorrido(e.target.files)} />
                </label>
              )}
            </div>
          </section>
        </div>

        {/* Formatos adicionales */}
        <section className="bg-zinc-900/30 border border-white/5 p-8 rounded-[40px]">
          <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6">Formatos Adicionales</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formatos.map(f => {
              const isSelected = formData[f.key] || false;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => updateFormData({ [f.key]: !isSelected })}
                  className={`
                    flex items-center gap-4 p-5 rounded-3xl border transition-all duration-300 text-left
                    ${isSelected 
                      ? 'bg-blue-500/10 border-blue-500 text-white' 
                      : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/10'}
                  `}
                >
                  <div className={`p-3 rounded-2xl ${isSelected ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                    {f.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-tighter leading-none mb-1">{f.label}</span>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{f.desc}</span>
                  </div>
                  {isSelected && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

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
            className="group flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl shadow-blue-500/10"
          >
            Finalizar Datos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </footer>
      </div>
    </div>
  );
}

