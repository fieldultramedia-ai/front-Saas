import { useState, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext';
import NumInput from '../ui/NumInput';
import { ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MONEDAS_PREDEFINIDAS = ['USD', 'ARS', 'MXN', 'CLP', 'COP', 'EUR'];

export default function Step02({ onNext, onPrev }) {
  const { formData, updateFormData } = useFormContext();
  const [isAddingMoneda, setIsAddingMoneda] = useState(false);
  const [customMoneda, setCustomMoneda] = useState('');

  const isPredefinedMoneda = MONEDAS_PREDEFINIDAS.includes(formData.moneda);

  useEffect(() => {
    if (formData.moneda && !isPredefinedMoneda) {
      setCustomMoneda(formData.moneda);
      setIsAddingMoneda(true);
    }
  }, []);

  const handlePrecioChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const formatted = raw ? Number(raw).toLocaleString('en-US') : '';
    e.target.value = formatted;
    updateFormData({ precio: raw });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.precio || !formData.superficieCubierta) return;
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
           <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
             Paso 02
           </div>
           <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
        </div>
        <h1 className="text-3xl font-black font-syne text-white mb-3 italic tracking-tighter uppercase">
          Precio y Características
        </h1>
        <p className="text-zinc-400 text-sm">
          Ingresá el valor comercial y las especificaciones técnicas del activo.
        </p>
      </header>

      <form onSubmit={handleNext} className="space-y-10">
        {/* Precio Section */}
        <section className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Precio <span className="text-blue-500">*</span></label>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="relative w-32 shrink-0">
                  <select 
                    className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 h-14 text-sm text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                    value={isAddingMoneda ? 'OTRA' : (formData.moneda || 'USD')}
                    onChange={e => {
                      if (e.target.value === 'OTRA') {
                        setIsAddingMoneda(true);
                      } else {
                        setIsAddingMoneda(false);
                        updateFormData({ moneda: e.target.value });
                      }
                    }}
                  >
                    {MONEDAS_PREDEFINIDAS.map(m => <option key={m} value={m}>{m}</option>)}
                    <option value="OTRA">+ Otra moneda</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                    <ArrowRight size={14} className="rotate-90" />
                  </div>
                </div>
                <input 
                  className="flex-1 bg-zinc-800 border border-white/5 rounded-xl px-6 h-14 text-xl font-black text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
                  type="text" 
                  placeholder="0.00" 
                  required
                  value={formData.precio ? Number(formData.precio).toLocaleString('en-US') : ''}
                  onChange={handlePrecioChange} 
                />
              </div>

              <AnimatePresence>
                {isAddingMoneda && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <input 
                      autoFocus
                      className="w-full bg-zinc-800 border border-blue-500/30 rounded-xl px-4 h-10 text-xs text-white outline-none focus:border-blue-500 transition-all placeholder:text-zinc-600 uppercase font-black tracking-widest"
                      placeholder="Símbolo o Código (ej: BRL, UF...)"
                      value={customMoneda}
                      onChange={e => {
                        setCustomMoneda(e.target.value);
                        updateFormData({ moneda: e.target.value });
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          <NumInput 
            label="Recámaras" 
            value={formData.recamaras} 
            onChange={val => updateFormData({ recamaras: val })} 
          />
          <NumInput 
            label="Baños" 
            value={formData.banos} 
            onChange={val => updateFormData({ banos: val })} 
          />

          <div className="space-y-2">
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Superficie Construida (M²) <span className="text-blue-500">*</span></label>
            <input
              className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 h-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
              type="text"
              inputMode="numeric"
              placeholder="Ej: 180"
              required
              value={formData.superficieCubierta || ''}
              onChange={e => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                updateFormData({ superficieCubierta: val });
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Superficie Terreno (M²)</label>
            <input
              className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 h-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
              type="text"
              inputMode="numeric"
              placeholder="Ej: 250"
              value={formData.superficieTotal || ''}
              onChange={e => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                updateFormData({ superficieTotal: val });
              }}
            />
          </div>

          <NumInput 
            label="Estacionamientos" 
            value={formData.estacionamientos} 
            onChange={val => updateFormData({ estacionamientos: val })} 
          />
          <NumInput 
            label="Pisos / Niveles" 
            value={formData.niveles} 
            onChange={val => updateFormData({ niveles: val })} 
          />
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
            type="submit" 
            disabled={!formData.precio || !formData.superficieCubierta}
            className={`
              group flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300
              ${(!formData.precio || !formData.superficieCubierta)
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-blue-500 hover:text-white shadow-xl shadow-blue-500/10'}
            `}
          >
            Continuar a Detalles
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </footer>
      </form>
    </div>
  );
}
