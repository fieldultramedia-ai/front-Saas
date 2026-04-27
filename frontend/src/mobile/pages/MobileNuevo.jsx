import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  CheckCircle2,
  X,
  Home,
  Globe,
  Languages,
  LayoutGrid,
  Info,
  Type
} from 'lucide-react';
import { useFormContext } from '../../context/FormContext';
import { cn } from '../../lib/utils';

const PAISES = [
  "Argentina", "Uruguay", "Chile", "Paraguay", "Bolivia", 
  "Perú", "Colombia", "España", "Estados Unidos", "Otro"
];

const IDIOMAS = [
  "Español (Rioplatense)", "Español (Latino)", "Español (España)", 
  "Inglés (EE.UU.)", "Portugués", "Otro"
];

const MobileNuevo = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, resetForm } = useFormContext();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else handleGenerate();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/mobile');
  };

  const handleGenerate = () => {
    navigate('/mobile/resultados');
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col">
      {/* Header Wizard */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="h-1.5 bg-white/5 w-full">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7C3AED] shadow-[0_0_10px_#00d4ff]"
          />
        </div>
        <div className="flex items-center justify-between px-6 h-16">
          <button onClick={prevStep} className="p-2 -ml-2 text-white/40">
            <ChevronLeft size={24} />
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
            PASO {step} <span className="text-white/20">/</span> {totalSteps}
          </div>
          <button onClick={() => navigate('/mobile')} className="p-2 -mr-2 text-white/40">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-24 pb-32 px-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-8"
          >
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-syne uppercase tracking-tighter italic mb-2">INFO BÁSICA</h2>
                  <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">Sentemos las bases del contenido</p>
                </div>
                
                <div className="space-y-6">
                  <MobileSelect 
                    label="Tipo de Producto" 
                    icon={<Home size={16} />}
                    options={["Casa", "Departamento", "PH", "Local Comercial", "Terreno", "Oficina"]}
                    value={formData.tipoPropiedad}
                    onChange={val => updateFormData({ tipoPropiedad: val })}
                  />

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Operación</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Venta', 'Alquiler'].map((op) => (
                        <button
                          key={op}
                          onClick={() => updateFormData({ operacion: op })}
                          className={cn(
                            "h-14 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest",
                            formData.operacion === op 
                              ? 'bg-[#00d4ff] text-[#070B14] border-[#00d4ff] shadow-[0_4px_12px_rgba(0,212,255,0.3)]' 
                              : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                          )}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                  </div>

                  <MobileSelect 
                    label="País" 
                    icon={<Globe size={16} />}
                    options={PAISES}
                    value={formData.pais}
                    onChange={val => updateFormData({ pais: val })}
                  />
                  {formData.pais === 'Otro' && (
                    <MobileInput 
                      placeholder="Escribí el país..."
                      value={formData.customPais || ''}
                      onChange={val => updateFormData({ customPais: val })}
                    />
                  )}

                  <MobileSelect 
                    label="Idioma del Texto" 
                    icon={<Languages size={16} />}
                    options={IDIOMAS}
                    value={formData.idioma}
                    onChange={val => updateFormData({ idioma: val })}
                  />
                  {formData.idioma === 'Otro' && (
                    <MobileInput 
                      placeholder="Escribí el idioma..."
                      value={formData.customIdioma || ''}
                      onChange={val => updateFormData({ customIdioma: val })}
                    />
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-syne uppercase tracking-tighter italic mb-2">UBICACIÓN</h2>
                  <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">¿Dónde se encuentra?</p>
                </div>
                <div className="space-y-6">
                  <MobileInput 
                    label="Provincia / Estado" 
                    icon={<MapPin size={16} />}
                    placeholder="Ej: Buenos Aires"
                    value={formData.provincia || ''}
                    onChange={val => updateFormData({ provincia: val })}
                  />
                  <MobileInput 
                    label="Ciudad" 
                    icon={<MapPin size={16} />}
                    placeholder="Ej: La Plata"
                    value={formData.ciudad || ''}
                    onChange={val => updateFormData({ ciudad: val })}
                  />
                  <MobileInput 
                    label="Dirección (Opcional)" 
                    icon={<MapPin size={16} />}
                    placeholder="Calle y altura"
                    value={formData.direccion || ''}
                    onChange={val => updateFormData({ direccion: val })}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-syne uppercase tracking-tighter italic mb-2">DETALLES</h2>
                  <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">Especificaciones técnicas</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <MobileInput label="Ambientes" type="number" placeholder="0" value={formData.ambientes} onChange={val => updateFormData({ ambientes: val })} />
                   <MobileInput label="Baños" type="number" placeholder="0" value={formData.banos} onChange={val => updateFormData({ banos: val })} />
                   <MobileInput label="M² Totales" type="number" placeholder="0" value={formData.metrosTotales} onChange={val => updateFormData({ metrosTotales: val })} />
                   <MobileInput label="M² Cubiertos" type="number" placeholder="0" value={formData.metrosCubiertos} onChange={val => updateFormData({ metrosCubiertos: val })} />
                </div>
                <MobileInput 
                  label="Precio" 
                  icon={<DollarSign size={16} />}
                  placeholder="0.00"
                  type="number"
                  value={formData.precio || ''}
                  onChange={val => updateFormData({ precio: val })}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-syne uppercase tracking-tighter italic mb-2">ESTILO IA</h2>
                  <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">Personalizá la comunicación</p>
                </div>
                <div className="space-y-6">
                  <MobileSelect 
                    label="Tono del Mensaje" 
                    icon={<Type size={16} />}
                    options={["Acogedor", "Profesional", "Vanguardista", "Persuasivo", "Informativo"]}
                    value={formData.tono}
                    onChange={val => updateFormData({ tono: val })}
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Información Extra</label>
                    <textarea 
                      className="w-full min-h-[150px] p-5 bg-white/5 border border-white/10 rounded-[2rem] text-sm text-white focus:border-[#00d4ff] outline-none transition-all resize-none"
                      placeholder="Ej: Cerca de transporte, recién pintado, ideal inversión..."
                      value={formData.extraInfo || ''}
                      onChange={e => updateFormData({ extraInfo: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#00ff88]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#00ff88]/20 relative">
                    <div className="absolute inset-0 bg-[#00ff88]/20 blur-xl rounded-full animate-pulse" />
                    <CheckCircle2 size={40} className="text-[#00ff88] relative z-10" />
                  </div>
                  <h2 className="text-3xl font-black font-syne uppercase tracking-tighter italic mb-2">REVISIÓN</h2>
                  <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest px-6">Confirmá que todo esté en orden</p>
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6">
                  <SummaryItem label="Producto" value={`${formData.tipoPropiedad || '-'} en ${formData.operacion || '-'}`} />
                  <SummaryItem label="Ubicación" value={`${formData.ciudad || '-'}, ${formData.provincia || '-'}`} />
                  <SummaryItem label="Precio" value={formData.precio ? `$${Number(formData.precio).toLocaleString()}` : '-'} />
                  <SummaryItem label="Tono" value={formData.tono || '-'} />
                  <SummaryItem label="Idioma" value={formData.idioma === 'Otro' ? formData.customIdioma : formData.idioma} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#070B14] via-[#070B14] to-transparent z-40">
        <button
          onClick={nextStep}
          className="w-full h-20 rounded-3xl bg-[#00d4ff] text-[#070B14] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-[0_12px_40px_rgba(0,212,255,0.3)] active:scale-95 transition-all"
        >
          <span>{step === totalSteps ? 'Generar Ahora' : 'Siguiente'}</span>
          {step === totalSteps ? <Sparkles size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};

function MobileInput({ label, icon, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-[10px] uppercase tracking-widest font-black text-white/40 pl-2">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20">{icon}</div>}
        <input 
          type={type}
          className={cn(
            "w-full h-14 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all",
            icon ? "pl-12" : "px-5"
          )}
          placeholder={placeholder}
          value={value} 
          onChange={e => onChange?.(e.target.value)} 
        />
      </div>
    </div>
  );
}

function MobileSelect({ label, icon, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase tracking-widest font-black text-white/40 pl-2">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
          {icon}
        </div>
        <select 
          className="w-full h-14 pl-12 pr-10 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all appearance-none"
          value={value || ''} 
          onChange={e => onChange?.(e.target.value)}
        >
          <option value="" className="bg-[#070B14]">Seleccionar...</option>
          {options.map(opt => (
            <option key={opt} value={opt} className="bg-[#070B14]">{opt}</option>
          ))}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
          <ChevronRight size={16} className="rotate-90" />
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{label}</span>
      <span className="text-sm font-bold text-white uppercase tracking-tight">{value}</span>
    </div>
  );
}

export default MobileNuevo;
