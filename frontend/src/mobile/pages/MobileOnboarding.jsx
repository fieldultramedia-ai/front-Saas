import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Upload, 
  Check, 
  ArrowRight,
  ChevronLeft,
  Globe,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL, actualizarPerfil } from '../../services/api';

const MobileOnboarding = () => {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [agencyName, setAgencyName] = useState('');
  const [pais, setPais] = useState('Argentina');
  const [nicho, setNicho] = useState('inmobiliaria');
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else finishOnboarding();
  };

  const finishOnboarding = async (skipLogo = false) => {
    // Actualizamos el estado local siempre para que la UI responda
    await updateProfile({ agencyName, agencyLogo: logoPreview });
    
    // En móvil, como no tenemos tabla de precios extensa aún, vamos al dashboard
    localStorage.removeItem('leadbook_needs_onboarding');
    navigate('/mobile/dashboard');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col px-6 py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex-1 flex flex-col"
        >
          {step === 1 && (
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold font-['Syne'] mb-4">Tu Negocio</h1>
                <p className="text-gray-500 text-sm">Contanos sobre tu agencia o inmobiliaria.</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest">Nombre de la Agencia</label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Ej: Inmobiliaria Central"
                      className="w-full h-14 bg-[#1b2029] border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#00d4ff] transition-colors"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest">País</label>
                  <div className="relative">
                    <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <select 
                      className="w-full h-14 bg-[#1b2029] border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#00d4ff] transition-colors appearance-none"
                      value={pais}
                      onChange={(e) => setPais(e.target.value)}
                    >
                      <option value="Argentina">Argentina</option>
                      <option value="México">México</option>
                      <option value="España">España</option>
                      <option value="Colombia">Colombia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold font-['Syne'] mb-4">Tu Imagen</h1>
                <p className="text-gray-500 text-sm">Subí tu logo para personalizar tus PDFs y posts.</p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="w-full aspect-square max-w-[250px] bg-[#1b2029] border-2 border-dashed border-white/10 rounded-[3rem] relative flex items-center justify-center overflow-hidden group">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-8" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-500">
                      <Upload size={40} />
                      <span className="text-xs font-bold uppercase tracking-widest">Subir Logo</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>
                {logoPreview && (
                  <button onClick={() => setLogoPreview(null)} className="text-red-500 text-xs font-bold uppercase tracking-widest">Eliminar logo</button>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold font-['Syne'] mb-4">¿Todo bien?</h1>
                <p className="text-gray-500 text-sm">Revisá tus datos antes de empezar.</p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#00d4ff]/10 to-[#6001d1]/10 border border-white/5 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Building2 className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Agencia</div>
                    <div className="text-white font-bold">{agencyName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Globe className="text-[#6001d1]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">País</div>
                    <div className="text-white font-bold">{pais}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer Navigation */}
      <div className="mt-auto flex flex-col gap-3">
        <button
          onClick={handleNext}
          disabled={step === 1 && !agencyName.trim()}
          className="w-full h-16 rounded-2xl bg-[#00d4ff] text-[#070B14] font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,212,255,0.3)] disabled:opacity-50 transition-all active:scale-95"
        >
          <span>{step === 3 ? 'Comenzar Ahora' : 'Siguiente'}</span>
          <ArrowRight size={20} />
        </button>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="w-full h-12 text-gray-500 text-xs font-bold uppercase tracking-widest">
            Volver
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileOnboarding;
