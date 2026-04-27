import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Home, Utensils, ShoppingBag, Dumbbell, ArrowRight, Check, ShieldCheck, Zap, Globe, Building2, ChevronDown, ArrowLeft, Rocket, Send, Crown, Shield, Users, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, actualizarPerfil, seleccionarPlanFree, crearPreferenciaMP } from '../services/api';
import { GlassInputWrapper } from '../components/ui/sign-in';
import { motion, AnimatePresence } from "framer-motion";
import { 
  PricingTable, 
  PricingTableHeader, 
  PricingTableBody, 
  PricingTableRow, 
  PricingTableHead, 
  PricingTableCell, 
  PricingTablePlan 
} from "../components/ui/pricing-table";
import { cn } from "../lib/utils";
import WelcomeScreen from '../components/WelcomeScreen';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  
  const [step, setStep] = useState(() => {
    const saved = sessionStorage.getItem('onboarding_step');
    return saved ? parseInt(saved) : 1;
  });

  useEffect(() => {
    sessionStorage.setItem('onboarding_step', step);
  }, [step]);

  const [agencyName, setAgencyName] = useState('');
  const [pais, setPais] = useState('Argentina');
  const [nicho, setNicho] = useState('inmobiliaria');
  
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currency, setCurrency] = useState('USD');

  const countries = ['Argentina', 'México', 'Colombia', 'Chile', 'Uruguay', 'España', 'Perú'];
  
  const niches = [
    { id: 'inmobiliaria', label: 'Inmobiliaria', icon: Home, active: true },
    { id: 'restaurante', label: 'Restaurante', icon: Utensils, active: false, info: 'próximamente' },
    { id: 'retail', label: 'Retail', icon: ShoppingBag, active: false, info: 'próximamente' },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell, active: false, info: 'próximamente' }
  ];

  const handleNextStep = () => {
    if (!agencyName.trim()) return;
    setStep(2);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setLogoFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      subtitle: 'Para empezar',
      monthlyUSD: 0,
      monthlyARS: 0,
      yearlyUSD: 0,
      yearlyARS: 0,
      icon: Shield,
      badge: 'Gratis',
      button: 'Empezar gratis'
    },
    {
      id: 'starter',
      name: 'Starter',
      subtitle: 'Para crecer',
      monthlyUSD: 39,
      monthlyARS: 34000,
      yearlyUSD: 351,
      yearlyARS: 25500,
      icon: Zap,
      badge: 'Popular',
      button: 'Elegir plan'
    },
    {
      id: 'pro',
      name: 'Pro',
      subtitle: 'Para profesionales',
      monthlyUSD: 89,
      monthlyARS: 70000,
      yearlyUSD: 801,
      yearlyARS: 52500,
      icon: Crown,
      badge: 'Pro',
      button: 'Elegir Pro'
    },
    {
      id: 'scale',
      name: 'Scale',
      subtitle: 'Para equipos',
      monthlyUSD: 149,
      monthlyARS: 143000,
      yearlyUSD: 1341,
      yearlyARS: 107000,
      icon: Users,
      badge: 'Equipo',
      button: 'Elegir Scale'
    },
    {
      id: 'business',
      name: 'Business',
      subtitle: 'Enterprise',
      priceText: 'Custom',
      icon: Rocket,
      badge: 'Empresa',
      button: 'Contactar ventas'
    }
  ];

  const FEATURES = [
    {
      label: 'Publicaciones/mes',
      values: ['10', '40', '150', 'Ilimitadas', 'Ilimitadas'],
    },
    {
      label: 'Nichos',
      values: ['1', '1', '3', '10', 'Ilimitados'],
    },
    {
      label: 'Videos IA',
      values: [false, '5/mes', '20/mes', '60/mes', 'Ilimitados'],
    },
    {
      label: 'Usuarios',
      values: ['1', '1', '1', '10', 'Ilimitados'],
    },
    {
      label: 'Redes sociales',
      values: ['1', '1', '5', '5', 'Personalizado'],
    },
    {
      label: 'Formatos compatibles',
      values: ['PDF', 'Story/Post', 'Todos', 'Todos', 'Todos'],
    },
    {
      label: 'Publicación automática',
      values: [false, false, true, true, true],
    },
    {
      label: 'Branding personalizado',
      values: [false, false, true, true, true],
    },
    {
      label: 'Soporte',
      values: ['Básico', 'Básico', 'Prioritario', 'Prioritario', '24/7 + Manager'],
    },
    {
      label: 'API Access',
      values: [false, false, false, false, true],
    },
  ];

  const getPrecio = (plan) => {
    return billingCycle === 'annual' ? plan.precioAnual : plan.precioMensual;
  };

  const handleElegirPlan = async (planId) => {
    if (planId === 'business') {
      window.location.href = 'mailto:ventas@leadbook.io';
      return;
    }

    if (planId === 'free') {
      try {
        setLoadingPlan('free');
        await seleccionarPlanFree();
        const updatedUser = { ...user, plan_seleccionado: true, plan_nombre: 'free', plan_activo: true };
        localStorage.setItem('subzero_user', JSON.stringify(updatedUser));
        localStorage.removeItem('leadbook_needs_onboarding');
        navigate('/dashboard');
      } catch (e) {
        console.error("Error selecting free plan", e);
      } finally {
        setLoadingPlan(null);
      }
      return;
    }
    
    try {
      setLoadingPlan(planId);
      const data = await crearPreferenciaMP(planId);
      const updatedUser = { ...user, plan_seleccionado: true, plan_nombre: planId };
      localStorage.setItem('subzero_user', JSON.stringify(updatedUser));
      
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert('Error al procesar el pago. Intentá de nuevo.');
      }
    } catch (error) {
      console.error('Error MP:', error);
    } finally {
      setLoadingPlan(null);
    }
  };

  const getPriceDisplay = (plan) => {
    if (plan.id === 'business') return 'Custom';
    const isYearly = billingCycle === 'annual';
    const price = isYearly 
      ? (currency === 'USD' ? plan.yearlyUSD : plan.yearlyARS)
      : (currency === 'USD' ? plan.monthlyUSD : plan.monthlyARS);
    
    return currency === 'USD' ? `$${price}` : `$${price.toLocaleString()}`;
  };

  const ToggleGroup = ({ options, active, onChange, label }) => (
    <div className="relative inline-flex bg-[#0B101A] p-1 rounded-full border border-white/10">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          onClick={() => onChange(opt.value)}
          className={cn(
            "relative z-10 px-6 py-1.5 text-[10px] font-medium transition-colors duration-300 rounded-full",
            active === opt.value ? "text-black" : "text-white/60 hover:text-white"
          )}
        >
          {active === opt.value && (
            <motion.div
              layoutId={label + "bg"}
              className="absolute inset-0 bg-[#00d4ff] rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-20">{opt.label}</span>
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    if (user?.plan_seleccionado && step === 4) {
       localStorage.removeItem('leadbook_needs_onboarding');
       navigate('/dashboard');
    }
  }, [user, step]);

  const finishOnboarding = async (skipLogo = false) => {
    const finalLogo = skipLogo ? null : logoFile;
    // Actualizamos el estado local siempre para que la UI responda
    await updateProfile({ agencyName, agencyLogo: finalLogo });
    
    // Si ya tiene un plan seleccionado, terminamos aquí.
    // Si no, lo mandamos al paso 4 (Planes).
    if (user?.plan_seleccionado) {
      localStorage.removeItem('leadbook_needs_onboarding');
      navigate('/dashboard');
    } else {
      setStep(4);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00d4ff]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#6001d1]/10 blur-[100px] pointer-events-none" />

      {/* Global Back Button (Absolute at top-left of screen) */}
      {step > 1 && (
        <button 
          onClick={() => setStep(step - 1)} 
          className="absolute top-8 left-8 z-50 flex items-center gap-2 text-white/50 hover:text-white transition-all text-xs font-bold uppercase tracking-widest px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
        >
          <ArrowLeft size={16} /> Volver
        </button>
      )}

      {/* Main Container */}
      <div className="w-full max-w-4xl z-10 flex flex-col">
        
        {/* Step Indicator */}
        {step > 1 && (
          <div className="flex justify-center mb-12 gap-3">
            {[2, 3, 4].map((s) => (
              <div 
                 key={s} 
                 className={`h-1 rounded-full transition-all duration-500 ${step >= s ? 'w-12 bg-[#00d4ff]' : 'w-6 bg-white/10'}`} 
              />
            ))}
          </div>
        )}

        <div className={`transition-all duration-500 ease-in-out ${step === 4 ? 'max-w-none' : 'max-w-xl mx-auto'}`}>
          {step === 1 && (
            <WelcomeScreen name={user?.nombre} onNext={() => setStep(2)} />
          )}

          {step === 2 && (
            <div className="animate-element">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold font-syne mb-3 tracking-tight">Contanos sobre tu negocio</h1>
                <p className="text-white/40">Personalizá tu experiencia en LeadBook.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">Nombre de la agencia</label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input 
                         type="text" placeholder="Ej: Inmobiliaria López" 
                         className="w-full !bg-transparent text-sm p-4 pl-12 focus:outline-none !text-white" 
                         value={agencyName} onChange={e => setAgencyName(e.target.value)} 
                      />
                    </div>
                  </GlassInputWrapper>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">País</label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <select 
                        value={pais} 
                        onChange={e => setPais(e.target.value)}
                        className="w-full !bg-transparent text-sm p-4 pl-12 pr-10 focus:outline-none !text-white appearance-none cursor-pointer"
                      >
                        {countries.map(c => <option key={c} value={c} className="bg-[#0f131d]">{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    </div>
                  </GlassInputWrapper>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">Nicho de negocio</label>
                  <div className="grid grid-cols-2 gap-3">
                    {niches.map(n => (
                      <button 
                        key={n.id}
                        onClick={() => n.active && setNicho(n.id)}
                        className={`flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all ${
                          n.id === nicho 
                            ? 'bg-[#00d4ff]/10 border-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.1)]' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                        } ${!n.active && 'opacity-40 cursor-not-allowed'}`}
                      >
                        <n.icon size={24} className={n.id === nicho ? 'text-[#00d4ff]' : 'text-white/40'} />
                        <div className="text-center">
                          <p className={`text-sm font-bold ${n.id === nicho ? 'text-[#00d4ff]' : 'text-white'}`}>{n.label}</p>
                          {!n.active && <p className="text-[9px] text-white/30 uppercase font-bold mt-1 tracking-tighter">Próximamente</p>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setStep(3)}
                  disabled={!agencyName.trim()}
                  className="w-full bg-[#00d4ff] text-black font-bold py-4 rounded-2xl hover:bg-[#00b5d8] transition-all flex items-center justify-center gap-2 mt-8"
                >
                  Continuar <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-element relative">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold font-syne mb-3 tracking-tight">Identidad visual</h1>
                <p className="text-white/40">Subí el logo que aparecerá en tus contenidos.</p>
              </div>

              <div className="max-w-md mx-auto">
                {!logoPreview ? (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4ff] to-[#6001d1] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex flex-col items-center justify-center p-12 bg-[#0a0e17] border border-white/10 rounded-3xl cursor-pointer hover:bg-black/40 transition-all aspect-square">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <div className="w-16 h-16 rounded-full bg-[#00d4ff]/10 flex items-center justify-center mb-6">
                        <Upload size={24} className="text-[#00d4ff]" />
                      </div>
                      <p className="text-sm font-bold text-white mb-1">Elegí tu logo</p>
                      <p className="text-xs text-white/30">PNG o JPG (Max 2MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative p-8 bg-[#0a0e17] border border-white/10 rounded-3xl text-center">
                    <img src={logoPreview} alt="Logo Preview" className="max-h-48 mx-auto object-contain mb-8" />
                    <button onClick={() => setLogoPreview(null)} className="text-xs text-white/40 hover:text-[#00d4ff] uppercase tracking-widest font-bold">Cambiar imagen</button>
                  </div>
                )}

                <div className="flex flex-col gap-3 mt-10">
                  <button 
                  onClick={() => setStep(4)}
                  disabled={!logoFile}
                  className="w-full bg-[#00d4ff] text-black font-bold py-4 rounded-2xl hover:bg-[#00b5d8] transition-all flex items-center justify-center gap-2"
                >
                  Continuar <ArrowRight size={18} />
                </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-element relative w-full">
              <div className="text-center mb-10">
                <h1 className="text-5xl font-black font-syne mb-2 tracking-tighter uppercase italic">PRECIOS</h1>
                <p className="text-white/40 text-sm">Seleccioná el plan que mejor se adapte a tus necesidades.</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <ToggleGroup 
                    label="cycle"
                    options={[
                      { label: 'Mensual', value: 'monthly' },
                      { label: 'Anual', value: 'annual' }
                    ]}
                    active={billingCycle}
                    onChange={setBillingCycle}
                  />
                  <ToggleGroup 
                    label="curr"
                    options={[
                      { label: 'USD', value: 'USD' },
                      { label: 'ARS', value: 'ARS' }
                    ]}
                    active={currency}
                    onChange={setCurrency}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-2">
                {plans.map((plan, planIdx) => (
                  <div 
                    key={plan.id}
                    className={cn(
                      "relative p-6 rounded-[2.5rem] border transition-all flex flex-col",
                      plan.id === 'pro' 
                        ? 'bg-[#00d4ff]/5 border-[#00d4ff]/40 shadow-[0_0_50px_rgba(0,212,255,0.08)]' 
                        : 'bg-[#0a0f1a] border-white/5 hover:border-white/10'
                    )}
                  >
                    {plan.id === 'pro' && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00d4ff] text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full z-20">
                        Popular
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center text-center mb-8">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all border",
                        plan.id === 'pro' ? 'bg-[#00d4ff] text-black border-transparent' : 'bg-white/5 text-white/40 border-white/5'
                      )}>
                        {React.createElement(plan.icon, { size: 24 })}
                      </div>
                      <h3 className="font-syne text-xl font-black text-white uppercase tracking-tight">{plan.name}</h3>
                      <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">{plan.subtitle}</p>
                    </div>

                    <div className="flex flex-col items-center mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-white tracking-tighter">{getPriceDisplay(plan)}</span>
                        {plan.id !== 'business' && <span className="text-xs text-white/20 font-bold uppercase tracking-widest">/mo</span>}
                      </div>
                    </div>

                    <div className="space-y-4 mb-10 flex-1">
                      {FEATURES.map((feature, fIdx) => {
                        const val = feature.values[planIdx];
                        const isNo = val === false || val === '-';
                        return (
                          <div key={fIdx} className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {typeof val === 'boolean' ? (
                                val ? <Check size={14} className="text-[#00d4ff]" /> : <X size={14} className="text-white/10" />
                              ) : isNo ? (
                                <X size={14} className="text-white/10" />
                              ) : (
                                <Check size={14} className="text-[#00d4ff]" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className={cn("text-[11px] leading-tight", isNo ? "text-white/20" : "text-white/70 font-medium")}>
                                {val === true ? feature.label : val === false ? feature.label : `${val} ${feature.label}`}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button 
                      onClick={() => handleElegirPlan(plan.id)}
                      disabled={!!loadingPlan}
                      className={cn(
                        "w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-2",
                        plan.id === 'pro' 
                          ? 'bg-[#00d4ff] text-black hover:bg-[#00b5d8] shadow-[0_15px_30px_rgba(0,212,255,0.2)]' 
                          : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
                      )}
                    >
                      {loadingPlan === plan.id ? '...' : plan.button}
                      {!loadingPlan && <ArrowRight size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
