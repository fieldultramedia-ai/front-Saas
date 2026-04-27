import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Upload, 
  ArrowRight,
  ChevronLeft,
  Globe,
  Sparkles,
  Camera,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { actualizarPerfil } from '../../services/api';
import { cn } from '../../lib/utils';
import Logo from '../../components/Logo';

const MobileOnboarding = () => {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [agencyName, setAgencyName] = useState('');
  const [pais, setPais] = useState('Argentina');
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else finishOnboarding();
  };

  const finishOnboarding = async () => {
    setIsSubmitting(true);
    try {
      await updateProfile({ agencyName, agencyLogo: logoPreview });
      localStorage.removeItem('leadbook_needs_onboarding');
      navigate('/mobile');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col overflow-x-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[100%] h-[50%] bg-[#00d4ff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[50%] bg-[#7c3aed]/10 blur-[120px] rounded-full" />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] shadow-[0_0_15px_#00d4ff]"
        />
      </div>

      <div className="relative z-10 px-8 pt-16 flex flex-col flex-1">
        <div className="mb-12">
           <Logo size="small" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            {step === 1 && (
              <div className="space-y-10">
                <div>
                  <h1 className="text-4xl font-black font-syne uppercase italic tracking-tighter leading-none mb-4">
                    TU <span className="text-[#00d4ff]">AGENCIA.</span>
                  </h1>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Contanos sobre tu imperio inmobiliario</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 pl-2">Nombre del Negocio</label>
                    <div className="relative">
                      <Building2 size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                      <input 
                        type="text" 
                        placeholder="Ej: Élite Real Estate"
                        className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 outline-none focus:border-[#00d4ff] transition-all text-sm"
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 pl-2">País / Región</label>
                    <div className="relative">
                      <Globe size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                      <select 
                        className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-10 outline-none focus:border-[#00d4ff] transition-all text-sm appearance-none"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                      >
                        <option value="Argentina" className="bg-[#070B14]">Argentina</option>
                        <option value="México" className="bg-[#070B14]">México</option>
                        <option value="España" className="bg-[#070B14]">España</option>
                        <option value="Estados Unidos" className="bg-[#070B14]">Estados Unidos</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
                         <ArrowRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10">
                <div>
                  <h1 className="text-4xl font-black font-syne uppercase italic tracking-tighter leading-none mb-4">
                    TU <span className="text-[#00d4ff]">IDENTIDAD.</span>
                  </h1>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Subí tu logo para personalizar todo</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square max-w-[280px] bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[3rem] relative flex items-center justify-center overflow-hidden group shadow-2xl transition-all active:scale-[0.98]">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-10" />
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-white/20">
                        <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center">
                           <Camera size={32} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Subir Archivo</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>
                  {logoPreview && (
                    <button onClick={() => setLogoPreview(null)} className="mt-6 text-red-500/60 text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors">Eliminar logo</button>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10">
                <div className="text-center">
                   <div className="w-20 h-20 bg-[#00ff88]/10 rounded-[2rem] border border-[#00ff88]/20 flex items-center justify-center mx-auto mb-6 relative">
                      <div className="absolute inset-0 bg-[#00ff88]/20 blur-xl rounded-full animate-pulse" />
                      <ShieldCheck size={40} className="text-[#00ff88] relative z-10" />
                   </div>
                   <h1 className="text-4xl font-black font-syne uppercase italic tracking-tighter mb-4">
                      ¿ESTÁ <span className="text-[#00d4ff]">TODO BIEN?</span>
                   </h1>
                   <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Confirmá tus datos de acceso</p>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8 relative overflow-hidden">
                  <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-[#00d4ff]/5 blur-3xl rounded-full" />
                  
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#00d4ff]">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black mb-1">Agencia</div>
                      <div className="text-sm font-bold text-white uppercase tracking-tight">{agencyName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#7c3aed]">
                      <Globe size={24} />
                    </div>
                    <div>
                      <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black mb-1">País</div>
                      <div className="text-sm font-bold text-white uppercase tracking-tight">{pais}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="mt-auto py-10 flex flex-col gap-4">
          <button
            onClick={handleNext}
            disabled={(step === 1 && !agencyName.trim()) || isSubmitting}
            className="w-full h-20 rounded-3xl bg-[#00d4ff] text-[#070B14] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-[0_12px_40px_rgba(0,212,255,0.3)] disabled:opacity-50 transition-all active:scale-95"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-3 border-[#070B14] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{step === 3 ? 'Comenzar Ahora' : 'Siguiente Paso'}</span>
                <ArrowRight size={20} strokeWidth={3} />
              </>
            )}
          </button>
          
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)} 
              className="w-full h-12 text-white/20 text-[10px] font-black uppercase tracking-[0.3em] active:text-white transition-colors"
            >
              Volver Atrás
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileOnboarding;
