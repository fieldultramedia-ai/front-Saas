import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Camera, 
  MapPin, 
  DollarSign, 
  CheckCircle2,
  X
} from 'lucide-react';
import { useFormContext } from '../../context/FormContext';

const MobileNuevo = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, resetForm } = useFormContext();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else handleGenerate();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/mobile');
  };

  const handleGenerate = () => {
    // Simular generación
    navigate('/mobile/resultados');
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col">
      {/* Header Wizard */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="h-1 bg-white/5 w-full">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#00d4ff] to-[#6001d1]"
          />
        </div>
        <div className="flex items-center justify-between px-6 h-16">
          <button onClick={prevStep} className="p-2 -ml-2 text-gray-400">
            <ChevronLeft size={24} />
          </button>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Paso {step} de {totalSteps}
          </div>
          <button onClick={() => navigate('/mobile')} className="p-2 -mr-2 text-gray-400">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-24 pb-32 px-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8"
          >
            {step === 1 && (
              <>
                <div>
                  <h2 className="text-2xl font-bold font-['Syne'] mb-2">Información Básica</h2>
                  <p className="text-gray-500 text-sm">Contanos qué estás promocionando hoy.</p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest">Tipo de Producto</label>
                    <select 
                      className="w-full h-14 bg-[#1b2029] border border-white/10 rounded-2xl px-4 outline-none focus:border-[#00d4ff] transition-colors"
                      value={formData.tipoPropiedad || ''}
                      onChange={(e) => updateFormData({ tipoPropiedad: e.target.value })}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Casa">Casa</option>
                      <option value="Departamento">Departamento</option>
                      <option value="PH">PH</option>
                      <option value="Local">Local Comercial</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest">Operación</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Venta', 'Alquiler'].map((op) => (
                        <button
                          key={op}
                          onClick={() => updateFormData({ operacion: op })}
                          className={`h-12 rounded-xl border transition-all ${
                            formData.operacion === op 
                              ? 'bg-[#00d4ff] text-[#070B14] border-[#00d4ff] font-bold' 
                              : 'bg-white/5 border-white/10 text-gray-400'
                          }`}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <h2 className="text-2xl font-bold font-['Syne'] mb-2">Precio y Ubicación</h2>
                  <p className="text-gray-500 text-sm">¿Dónde está y cuánto vale?</p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest">Ciudad / Zona</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="text" 
                        placeholder="Ej: Palermo, CABA"
                        className="w-full h-14 bg-[#1b2029] border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#00d4ff] transition-colors"
                        value={formData.ciudad || ''}
                        onChange={(e) => updateFormData({ ciudad: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest">Precio</label>
                    <div className="relative">
                      <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="number" 
                        placeholder="Monto"
                        className="w-full h-14 bg-[#1b2029] border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#00d4ff] transition-colors"
                        value={formData.precio || ''}
                        onChange={(e) => updateFormData({ precio: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <h2 className="text-2xl font-bold font-['Syne'] mb-2">Estilo y Tono</h2>
                  <p className="text-gray-500 text-sm">Personalizá cómo se comunicará la IA.</p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest">Tono del Mensaje</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Acogedor', 'Profesional', 'Vanguardista', 'Persuasivo'].map((tono) => (
                        <button
                          key={tono}
                          onClick={() => updateFormData({ tono })}
                          className={`h-12 rounded-xl border transition-all text-sm ${
                            formData.tono === tono 
                              ? 'bg-[#6001d1] text-white border-[#6001d1] font-bold' 
                              : 'bg-white/5 border-white/10 text-gray-400'
                          }`}
                        >
                          {tono}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#00ff88]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#00ff88]/20">
                    <CheckCircle2 size={40} className="text-[#00ff88]" />
                  </div>
                  <h2 className="text-2xl font-bold font-['Syne'] mb-2">¡Todo Listo!</h2>
                  <p className="text-gray-500 text-sm px-6">
                    Hacé clic en generar y nuestra IA se encargará de crear todo tu material de marketing.
                  </p>
                </div>
                
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-4 mt-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Producto</span>
                    <span className="text-white font-bold">{formData.tipoPropiedad || 'No especificado'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Operación</span>
                    <span className="text-white font-bold">{formData.operacion || 'No especificado'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Ubicación</span>
                    <span className="text-white font-bold">{formData.ciudad || 'No especificado'}</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#070B14] via-[#070B14] to-transparent">
        <button
          onClick={nextStep}
          className="w-full h-16 rounded-2xl bg-[#00d4ff] text-[#070B14] font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-95 transition-all"
        >
          <span>{step === totalSteps ? 'Generar Contenido' : 'Siguiente Paso'}</span>
          {step === totalSteps ? <Sparkles size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default MobileNuevo;
