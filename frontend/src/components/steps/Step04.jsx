import { useState, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext';
import { useAppStore } from '../../store/useAppStore';
import { generarGuion } from '../../services/api';
import Toggle from '../ui/Toggle';
import { ArrowRight, ArrowLeft, Zap, Sparkles, Mic2, Music, Home, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TIPOS_VIDEO_PREDEFINIDOS = [
  { value: 'reel',  label: 'Reel Rápido',    desc: '15-25 seg · Showcase dinámico',       icon: <Zap size={24} /> },
  { value: 'tour',  label: 'Tour Narrado',    desc: '45-60 seg · Recorrido inmersivo',   icon: <Home size={24} /> },
];

const VOCES = [
  { value: 'femenina',  label: 'Femenina',  desc: 'Voz suave y profesional' },
  { value: 'masculina', label: 'Masculina', desc: 'Voz firme y confiable' },
];

const TONOS = [
  { value: 'profesional', label: 'Profesional', desc: 'Formal' },
  { value: 'lujo',        label: 'Lujo',        desc: 'Exclusivo' },
  { value: 'energetico',  label: 'Energético',  desc: 'Vibrante' },
];

export default function Step04({ onNext, onPrev }) {
  const { formData, updateFormData } = useFormContext();
  const { addToast } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAddingCustomStyle, setIsAddingCustomStyle] = useState(false);
  const [customStyle, setCustomStyle] = useState('');

  const isPredefinedStyle = TIPOS_VIDEO_PREDEFINIDOS.some(t => t.value === formData.tipoVideo);

  useEffect(() => {
    if (formData.tipoVideo && !isPredefinedStyle) {
      setCustomStyle(formData.tipoVideo);
      setIsAddingCustomStyle(true);
    }
  }, []);

  const handleNext = async () => {
    if (!formData.tipoVideo) {
      setError('Elegí el estilo de video antes de continuar.');
      return;
    }
    setError('');

    if (formData.escenas && formData.escenas.length > 0) {
      onNext();
      return;
    }

    setLoading(true);
    try {
      const result = await generarGuion(formData);
      if (result?.escenas?.length) {
        updateFormData({ escenas: result.escenas });
        addToast({
          type: 'success',
          title: 'Guión generado',
          message: `${result.escenas.length} escenas listas`
        });
        onNext();
      }
    } catch (err) {
      console.error('Error al generar guión:', err);
      setError('Error al conectar con la IA. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
           <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
             Paso 04
           </div>
           <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
        </div>
        <h1 className="text-3xl font-black font-syne text-white mb-3 italic tracking-tighter uppercase">
          Video y Narración
        </h1>
        <p className="text-zinc-400 text-sm">
          Configurá cómo la IA debe presentar tu propiedad. Podés usar estilos predefinidos o crear uno propio.
        </p>
      </header>

      <div className="space-y-10">
        {/* Tipo de video */}
        <section>
          <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">
            Estilo de Video <span className="text-blue-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TIPOS_VIDEO_PREDEFINIDOS.map(tipo => {
              const active = formData.tipoVideo === tipo.value;
              return (
                <button
                  key={tipo.value}
                  type="button"
                  onClick={() => {
                    updateFormData({ tipoVideo: tipo.value, escenas: [] });
                    setIsAddingCustomStyle(false);
                  }}
                  className={`
                    relative flex flex-col items-start p-6 rounded-3xl border transition-all duration-300 text-left
                    ${active 
                      ? 'bg-blue-500/10 border-blue-500 text-white' 
                      : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/10'}
                  `}
                >
                  <div className={`p-3 rounded-2xl mb-4 ${active ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                    {tipo.icon}
                  </div>
                  <h3 className="font-black text-[11px] uppercase tracking-tighter mb-1">{tipo.label}</h3>
                  <p className="text-[9px] text-zinc-600 leading-tight">{tipo.desc}</p>
                </button>
              );
            })}
            
            <button
              type="button"
              onClick={() => setIsAddingCustomStyle(true)}
              className={`
                relative flex flex-col items-center justify-center p-6 rounded-3xl border transition-all duration-300 text-center
                ${isAddingCustomStyle || (!isPredefinedStyle && formData.tipoVideo)
                  ? 'bg-blue-500/10 border-blue-500 text-white' 
                  : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/10'}
              `}
            >
              <div className={`p-3 rounded-2xl mb-2 ${isAddingCustomStyle || (!isPredefinedStyle && formData.tipoVideo) ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                <Plus size={24} />
              </div>
              <h3 className="font-black text-[11px] uppercase tracking-tighter">Otro Estilo</h3>
            </button>
          </div>
          
          <AnimatePresence>
            {(isAddingCustomStyle || (!isPredefinedStyle && formData.tipoVideo)) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <input 
                  autoFocus
                  className="w-full bg-zinc-900/50 border border-blue-500/30 rounded-xl px-5 h-12 text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                  placeholder="Ej: Cinematográfico, Lifestyle, Drone View..."
                  value={customStyle}
                  onChange={e => {
                    setCustomStyle(e.target.value);
                    updateFormData({ tipoVideo: e.target.value, escenas: [] });
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {error && <p className="text-red-400 text-[10px] font-bold uppercase mt-3">{error}</p>}
        </section>

        {/* Voiceover Option */}
        <section className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl">
          <Toggle
            value={formData.voiceover || false}
            onChange={v => updateFormData({ voiceover: v })}
            label="Voiceover con IA"
            subtitle="Generar una narración profesional para el video"
          />
        </section>

        {/* Conditional Voice Options */}
        <AnimatePresence>
          {formData.voiceover && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-8 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Voz */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                    <Mic2 size={12} /> Seleccionar Voz
                  </label>
                  <div className="flex gap-2">
                    {VOCES.map(v => {
                      const active = (formData.voz || 'femenina') === v.value;
                      return (
                        <button
                          key={v.value}
                          type="button"
                          onClick={() => updateFormData({ voz: v.value })}
                          className={`
                            flex-1 py-3 rounded-xl border text-[11px] font-black uppercase transition-all
                            ${active ? 'bg-white text-black border-white' : 'bg-zinc-900 border-white/5 text-zinc-500 hover:border-white/10'}
                          `}
                        >
                          {v.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tono */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                    <Music size={12} /> Tono de Voz
                  </label>
                  <div className="flex gap-2">
                    {TONOS.map(t => {
                      const active = (formData.tono || 'profesional') === t.value;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => updateFormData({ tono: t.value })}
                          className={`
                            flex-1 py-3 rounded-xl border text-[10px] font-black uppercase transition-all
                            ${active ? 'bg-white text-black border-white' : 'bg-zinc-900 border-white/5 text-zinc-500 hover:border-white/10'}
                          `}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Contexto */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Enfoque del Guión (Opcional)</label>
                <textarea 
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-4 min-h-[80px] text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
                  placeholder="Ej: Resaltar la vista, mencionar la cercanía al centro..."
                  value={formData.contextoAdicional || ''}
                  onChange={e => updateFormData({ contextoAdicional: e.target.value })} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation */}
        <footer className="pt-10 border-t border-white/5 flex items-center justify-between">
          <button 
            type="button" 
            onClick={onPrev}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Anterior
          </button>
          
          <button 
            type="button" 
            onClick={handleNext}
            disabled={!formData.tipoVideo || loading}
            className={`
              group relative flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500
              ${(!formData.tipoVideo || loading)
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-blue-500 hover:text-white shadow-xl shadow-blue-500/20'}
            `}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Escribiendo Guión...</span>
              </div>
            ) : (
              <>
                <span>Generar Guión con IA</span>
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              </>
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}
