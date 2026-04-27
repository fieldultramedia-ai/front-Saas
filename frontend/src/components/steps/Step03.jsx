import { useState, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext';
import { API_BASE_URL } from '../../services/api';
import { Plus, Check, Search, ArrowRight, ArrowLeft, Trash2, Zap, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AMENIDADES_LIST = [
  'Estacionamiento','Alberca','Jardín','Terraza',
  'Gimnasio','Seguridad 24h','Elevador','Cuarto de servicio',
  'Bodega','Roof Garden','Área de juegos','Pet Friendly',
  'Amueblado','Aire acondicionado','Calefacción','Cocina integral',
];

const DEFAULT_AMENIDADES_SUGERIDAS = [
  'Vista al mar', 'Vista a la montaña', 'Acceso privado',
  'Smart home', 'Paneles solares', 'Cisterna',
  'Generador eléctrico', 'Cuarto de juegos', 'Cava de vinos',
  'Spa', 'Sauna', 'Cancha de tenis', 'Cancha de paddle',
  'Pileta climatizada', 'Quincho', 'Parrilla',
  'Portería 24h', 'Cámaras de seguridad', 'Alarma',
];

export default function Step03({ onNext, onPrev }) {
  const { formData, updateFormData } = useFormContext();
  const selected = formData.amenidades || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [amenidadesSugeridas, setAmenidadesSugeridas] = useState(DEFAULT_AMENIDADES_SUGERIDAS);

  useEffect(() => {
    const token = localStorage.getItem('subzero_access');
    fetch(`${API_BASE_URL}/amenidades-presets/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => {
      const guardadas = data.presets || [];
      setAmenidadesSugeridas([
        ...new Set([...DEFAULT_AMENIDADES_SUGERIDAS, ...guardadas])
      ]);
    })
    .catch(() => {});
  }, []);

  const handleAgregarAmenidad = (nombre) => {
    if (!nombre.trim() || selected.includes(nombre.trim())) return;
    const newSelected = [...selected, nombre.trim()];
    updateFormData({ amenidades: newSelected });
    
    const token = localStorage.getItem('subzero_access');
    fetch(`${API_BASE_URL}/amenidades-presets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nombre: nombre.trim() })
    }).catch(() => {});
  };

  const toggle = (item) => {
    const updated = selected.includes(item)
      ? selected.filter(a => a !== item)
      : [...selected, item];
    updateFormData({ amenidades: updated });
  };

  const clearAll  = () => updateFormData({ amenidades: [] });
  const selectAll = () => {
    const combined = [...new Set([...selected, ...AMENIDADES_LIST])];
    updateFormData({ amenidades: combined });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
           <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
             Paso 03
           </div>
           <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
        </div>
        <h1 className="text-3xl font-black font-syne text-white mb-3 italic tracking-tighter uppercase">
          Detalles y Amenidades
        </h1>
        <p className="text-zinc-400 text-sm">
          Resaltá los puntos fuertes y características únicas que hacen especial a este producto.
        </p>
      </header>

      <div className="space-y-10">
        {/* Quick Selection Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Amenidades Populares</label>
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={selectAll}
                className="text-[10px] font-black text-zinc-600 hover:text-blue-400 uppercase tracking-widest transition-colors flex items-center gap-1"
              >
                <CheckCircle2 size={12} /> Seleccionar Todo
              </button>
              <button 
                type="button" 
                onClick={clearAll}
                className="text-[10px] font-black text-zinc-600 hover:text-red-400 uppercase tracking-widest transition-colors flex items-center gap-1"
              >
                <Trash2 size={12} /> Limpiar Todo
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AMENIDADES_LIST.map(item => {
              const isSelected = selected.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggle(item)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-2xl border text-xs font-bold transition-all duration-300
                    ${isSelected 
                      ? 'bg-blue-500/10 border-blue-500 text-white' 
                      : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/10'}
                  `}
                >
                  <div className={`
                    w-4 h-4 rounded-md flex items-center justify-center transition-all
                    ${isSelected ? 'bg-blue-500 text-white' : 'border border-zinc-700 text-transparent'}
                  `}>
                    <Check size={10} strokeWidth={4} />
                  </div>
                  <span className="truncate">{item}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Custom Amenity Input */}
        <section className="space-y-4">
          <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Agregar Amenidades Personalizadas</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors">
              <Search size={18} />
            </div>
            <input 
              className="w-full bg-zinc-900 border border-white/5 rounded-2xl pl-12 pr-32 h-14 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700 shadow-inner"
              placeholder="Ej: Vista panorámica, Domótica, Bodega..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            <button 
              type="button"
              onClick={() => {
                handleAgregarAmenidad(searchTerm);
                setSearchTerm('');
              }}
              className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg"
            >
              Agregar
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 z-50 bg-[#0a0f1a] border border-white/10 rounded-2xl mt-2 overflow-hidden shadow-2xl backdrop-blur-xl"
                >
                  {amenidadesSugeridas.filter(a => a.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                    amenidadesSugeridas.filter(a => a.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5).map(sug => (
                      <button
                        key={sug}
                        type="button"
                        className="w-full text-left px-5 py-4 text-sm text-zinc-400 hover:bg-blue-500/10 hover:text-white border-b border-white/5 last:border-0 transition-colors flex items-center justify-between group"
                        onClick={() => {
                          handleAgregarAmenidad(sug);
                          setSearchTerm('');
                          setShowDropdown(false);
                        }}
                      >
                        {sug}
                        <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))
                  ) : searchTerm && (
                    <div className="px-5 py-4 text-xs text-zinc-600 font-medium">
                      Presioná "Agregar" para crear <span className="text-blue-400">"{searchTerm}"</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Selected Custom Tags */}
          <div className="flex flex-wrap gap-2">
            {selected.filter(a => !AMENIDADES_LIST.includes(a)).map(a => (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={a} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold"
              >
                {a}
                <button onClick={() => toggle(a)} className="hover:text-white transition-colors">
                  <Plus size={14} className="rotate-45" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Notes */}
        <section className="space-y-4">
          <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Notas Adicionales</label>
          <div className="relative">
            <textarea 
              className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-6 min-h-[120px] text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700 shadow-inner"
              placeholder="Ej: Recién remodelada, cerca de escuelas, excelente iluminación natural..."
              value={formData.notas || ''}
              onChange={e => updateFormData({ notas: e.target.value })} 
            />
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
            Configurar Video
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </footer>
      </div>
    </div>
  );
}
