import { useState, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Home, Building2, Landmark, Building, Map, Warehouse, Car, Layout, ArrowRight, Check, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TIPOS_PREDEFINIDOS = [
  { id: 'Casa', label: 'Casa', icon: <Home size={20} /> },
  { id: 'Departamento', label: 'Departamento', icon: <Building2 size={20} /> },
  { id: 'PH', label: 'PH', icon: <Landmark size={20} /> },
  { id: 'Local comercial', label: 'Local', icon: <Building size={20} /> },
  { id: 'Oficina', label: 'Oficina', icon: <Layout size={20} /> },
  { id: 'Terreno', label: 'Terreno', icon: <Map size={20} /> },
  { id: 'Bodega', label: 'Bodega', icon: <Warehouse size={20} /> },
  { id: 'Cochera', label: 'Cochera', icon: <Car size={20} /> },
];

const OPERACIONES_PREDEFINIDAS = [
  { id: 'Venta', label: 'Venta' },
  { id: 'Alquiler', label: 'Alquiler' },
  { id: 'Alquiler temporario', label: 'Temp' },
  { id: 'Preventa', label: 'Preventa' },
];

const PAISES = [
  'Argentina', 'México', 'Colombia', 'Chile', 'Uruguay', 'España', 'Perú', 'Ecuador', 
  'Bolivia', 'Paraguay', 'Venezuela', 'Costa Rica', 'Panamá', 'República Dominicana', 
  'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Estados Unidos', 'Brasil', 'Otro'
];
const IDIOMAS = ['Español', 'Inglés', 'Portugués', 'Francés', 'Italiano', 'Alemán', 'Otro'];

const CIUDADES_SUGERIDAS = [
  'Palermo, CABA', 'Recoleta, CABA', 'Belgrano, CABA',
  'Núñez, CABA', 'Puerto Madero, CABA', 'San Telmo, CABA',
  'Caballito, CABA', 'Villa Crespo, CABA',
  'San Isidro, GBA', 'Vicente López, GBA', 'Tigre, GBA',
  'Olivos, GBA', 'Martínez, GBA', 'Nordelta, GBA',
  'Córdoba Capital', 'Rosario', 'Mendoza Capital'
];

export default function Step01({ onNext }) {
  const { formData, updateFormData } = useFormContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [customTipo, setCustomTipo] = useState('');
  const [isAddingTipo, setIsAddingTipo] = useState(false);
  
  const [customOperacion, setCustomOperacion] = useState('');
  const [isAddingOperacion, setIsAddingOperacion] = useState(false);

  const [isAddingPais, setIsAddingPais] = useState(formData.pais && !PAISES.includes(formData.pais));
  const [isAddingIdioma, setIsAddingIdioma] = useState(formData.idioma && !IDIOMAS.includes(formData.idioma));

  // Determinar si el tipo actual es uno de los predefinidos
  const isPredefinedTipo = TIPOS_PREDEFINIDOS.some(t => t.id === formData.tipoPropiedad);
  const isPredefinedOperacion = OPERACIONES_PREDEFINIDAS.some(o => o.id === formData.operacion);

  useEffect(() => {
    if (formData.tipoPropiedad && !isPredefinedTipo) {
      setCustomTipo(formData.tipoPropiedad);
      setIsAddingTipo(true);
    }
    if (formData.operacion && !isPredefinedOperacion) {
      setCustomOperacion(formData.operacion);
      setIsAddingOperacion(true);
    }
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.tipoPropiedad || !formData.operacion || !formData.ciudad) return;
    onNext();
  };

  const filtradas = CIUDADES_SUGERIDAS.filter(c => 
    c.toLowerCase().includes((formData.ciudad || '').toLowerCase())
  );

  const selectTipo = (id) => {
    updateFormData({ tipoPropiedad: id });
    setIsAddingTipo(false);
  };

  const selectOperacion = (id) => {
    updateFormData({ operacion: id });
    setIsAddingOperacion(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <header className="mb-12 text-center md:text-left">
        <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
           <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
             Paso 01
           </div>
           <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-syne text-white mb-3 italic tracking-tighter uppercase">
          ¿Qué vamos a publicar?
        </h1>
        <p className="text-zinc-400 text-sm max-w-lg">
          Definí el tipo de producto o servicio, su ubicación y el tipo de operación. Podés agregar categorías personalizadas.
        </p>
      </header>

      <form onSubmit={handleNext} className="space-y-12">
        {/* Tipo de Propiedad */}
        <section>
          <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">
            Tipo de Producto o Servicio <span className="text-blue-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIPOS_PREDEFINIDOS.map((t) => {
              const active = formData.tipoPropiedad === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectTipo(t.id)}
                  className={`
                    relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300
                    ${active 
                      ? 'bg-blue-500/10 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                      : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/10 hover:bg-zinc-900'}
                  `}
                >
                  <div className={`${active ? 'text-blue-400' : 'text-zinc-600'}`}>{t.icon}</div>
                  <span className="text-[11px] font-bold tracking-tight">{t.label}</span>
                  {active && (
                    <motion.div 
                      layoutId="check-tipo"
                      className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"
                    >
                      <Check size={10} className="text-white" />
                    </motion.div>
                  )}
                </button>
              );
            })}
            
            {/* Botón Otro */}
            <button
              type="button"
              onClick={() => setIsAddingTipo(true)}
              className={`
                relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300
                ${isAddingTipo || !isPredefinedTipo && formData.tipoPropiedad
                  ? 'bg-blue-500/10 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                  : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/10 hover:bg-zinc-900'}
              `}
            >
              <div className={`${isAddingTipo || (!isPredefinedTipo && formData.tipoPropiedad) ? 'text-blue-400' : 'text-zinc-600'}`}>
                <Plus size={20} />
              </div>
              <span className="text-[11px] font-bold tracking-tight">Otro</span>
            </button>
          </div>

          <AnimatePresence>
            {(isAddingTipo || (!isPredefinedTipo && formData.tipoPropiedad)) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="relative">
                  <input 
                    autoFocus
                    className="w-full bg-zinc-900/50 border border-blue-500/30 rounded-xl px-5 h-12 text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                    placeholder="¿Qué producto o servicio es? Ej: Consultorio, Local de Ropa..."
                    value={customTipo}
                    onChange={e => {
                      setCustomTipo(e.target.value);
                      updateFormData({ tipoPropiedad: e.target.value });
                    }}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Personalizado</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Operación */}
        <section>
          <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">
            Operación <span className="text-blue-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {OPERACIONES_PREDEFINIDAS.map((o) => {
              const active = formData.operacion === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => selectOperacion(o.id)}
                  className={`
                    px-6 py-3 rounded-full border text-xs font-bold transition-all duration-300
                    ${active 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/10'}
                  `}
                >
                  {o.label}
                </button>
              );
            })}
            
            <button
              type="button"
              onClick={() => setIsAddingOperacion(true)}
              className={`
                px-6 py-3 rounded-full border text-xs font-bold transition-all duration-300 flex items-center gap-2
                ${isAddingOperacion || (!isPredefinedOperacion && formData.operacion)
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/10'}
              `}
            >
              <Plus size={14} />
              Otro
            </button>
          </div>

          <AnimatePresence>
            {(isAddingOperacion || (!isPredefinedOperacion && formData.operacion)) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <input 
                  autoFocus
                  className="w-full bg-zinc-900/50 border border-blue-500/30 rounded-xl px-5 h-12 text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                  placeholder="Ej: Traspaso, Subasta, Permuta..."
                  value={customOperacion}
                  onChange={e => {
                    setCustomOperacion(e.target.value);
                    updateFormData({ operacion: e.target.value });
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Ubicación y Regionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">País</label>
            <div className="relative">
              <select 
                className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 h-12 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all appearance-none cursor-pointer"
                value={isAddingPais ? 'Otro' : (formData.pais || '')}
                onChange={e => {
                  const val = e.target.value;
                  if (val === 'Otro') {
                    setIsAddingPais(true);
                    updateFormData({ pais: '' });
                  } else {
                    setIsAddingPais(false);
                    updateFormData({ pais: val });
                  }
                }}
              >
                <option value="">Seleccionar país...</option>
                {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>
            
            <AnimatePresence>
              {isAddingPais && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-2"
                >
                  <input 
                    autoFocus
                    className="w-full bg-zinc-900/50 border border-blue-500/30 rounded-xl px-4 h-10 text-sm text-white outline-none focus:border-blue-500 transition-all"
                    placeholder="Escribí el país..."
                    value={formData.pais || ''}
                    onChange={e => updateFormData({ pais: e.target.value })}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Idioma del Contenido</label>
            <div className="relative">
              <select 
                className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 h-12 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all appearance-none cursor-pointer"
                value={isAddingIdioma ? 'Otro' : (formData.idioma || '')}
                onChange={e => {
                  const val = e.target.value;
                  if (val === 'Otro') {
                    setIsAddingIdioma(true);
                    updateFormData({ idioma: '' });
                  } else {
                    setIsAddingIdioma(false);
                    updateFormData({ idioma: val });
                  }
                }}
              >
                <option value="">Seleccionar idioma...</option>
                {IDIOMAS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>

            <AnimatePresence>
              {isAddingIdioma && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-2"
                >
                  <input 
                    autoFocus
                    className="w-full bg-zinc-900/50 border border-blue-500/30 rounded-xl px-4 h-10 text-sm text-white outline-none focus:border-blue-500 transition-all"
                    placeholder="Escribí el idioma..."
                    value={formData.idioma || ''}
                    onChange={e => updateFormData({ idioma: e.target.value })}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Ciudad Autocomplete */}
        <div className="space-y-2 relative">
          <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">
            Ciudad / Zona <span className="text-blue-500">*</span>
          </label>
          <input 
            className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 h-12 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all placeholder:text-zinc-600"
            placeholder="Ej: Palermo, Buenos Aires"
            value={formData.ciudad || ''}
            onChange={e => {
              updateFormData({ ciudad: e.target.value });
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            required 
          />
          
          {showDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 z-50 bg-[#0a0f1a] border border-white/10 rounded-2xl mt-2 overflow-hidden shadow-2xl backdrop-blur-xl"
            >
              {filtradas.length > 0 ? (
                filtradas.slice(0, 5).map(sug => (
                  <button
                    key={sug}
                    type="button"
                    className="w-full text-left px-4 py-3 text-sm text-zinc-400 hover:bg-blue-500/10 hover:text-white border-b border-white/5 last:border-0 transition-colors"
                    onClick={() => {
                      updateFormData({ ciudad: sug });
                      setShowDropdown(false);
                    }}
                  >
                    {sug}
                  </button>
                ))
              ) : null}
              {formData.ciudad && (
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] hover:bg-blue-500/10 transition-colors"
                  onClick={() => { updateFormData({ ciudad: formData.ciudad.trim() }); setShowDropdown(false); }}
                >
                  ✚ Usar "{formData.ciudad.trim()}"
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Dirección */}
        <div className="space-y-2">
          <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Dirección (Opcional)</label>
          <input 
            className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 h-12 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all placeholder:text-zinc-600"
            placeholder="Calle, número, piso..."
            value={formData.direccion || ''}
            onChange={e => updateFormData({ direccion: e.target.value })} 
          />
        </div>

        {/* Action Button */}
        <footer className="pt-8 border-t border-white/5 flex justify-end">
          <button 
            type="submit" 
            disabled={!formData.tipoPropiedad || !formData.operacion || !formData.ciudad}
            className={`
              group relative flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-500 overflow-hidden
              ${(!formData.tipoPropiedad || !formData.operacion || !formData.ciudad)
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)]'}
            `}
          >
            <span className="relative z-10">Continuar al Precio</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </footer>
      </form>
    </div>
  );
}
