import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../../lib/utils';
import Logo from '../../components/Logo';

const PLANS = [
  {
    id: 'basic',
    name: 'BÁSICO',
    price: '19',
    yearlyPrice: '150',
    features: ['5 Listados por mes', 'Exportación PDF', 'Soporte Email'],
    color: '#94a3b8',
    icon: ShieldCheck
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '49',
    yearlyPrice: '390',
    features: ['Ilimitado', 'Video Reels IA', 'Posteos Automáticos', 'Soporte 24/7'],
    color: '#00d4ff',
    icon: Zap,
    popular: true
  },
  {
    id: 'elite',
    name: 'ÉLITE',
    price: '99',
    yearlyPrice: '790',
    features: ['Todo en Pro', 'Gestión de Equipos', 'API Access', 'Account Manager'],
    color: '#a855f7',
    icon: Sparkles
  }
];

const MobileSelectPlan = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const handleSelect = (plan) => {
    // Aquí iría la lógica de suscripción (ej: MercadoPago o Stripe)
    localStorage.removeItem('leadbook_needs_onboarding');
    navigate('/mobile');
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col overflow-x-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[100%] h-[50%] bg-[#00d4ff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[100%] h-[50%] bg-[#7c3aed]/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-10 pb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white/40 flex items-center justify-center active:scale-90 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <Logo size="small" />
        <div className="w-12" />
      </div>

      <main className="relative z-10 flex-1 px-8 pb-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black font-syne uppercase italic tracking-tighter leading-none mb-4">
            ELEGÍ TU <span className="text-[#00d4ff]">PODER.</span>
          </h1>
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Desbloqueá el potencial de la IA</p>

          {/* Toggle Anual/Mensual */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", !isYearly ? "text-white" : "text-white/20")}>Mensual</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-8 bg-white/5 border border-white/10 rounded-full p-1 relative"
            >
              <motion.div 
                animate={{ x: isYearly ? 24 : 0 }}
                className="w-6 h-6 bg-[#00d4ff] rounded-full shadow-[0_0_10px_#00d4ff]"
              />
            </button>
            <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", isYearly ? "text-white" : "text-white/20")}>Anual</span>
            {isYearly && (
               <span className="bg-[#00ff88]/10 text-[#00ff88] text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest border border-[#00ff88]/20 animate-pulse">
                 -30% OFF
               </span>
            )}
          </div>
        </div>

        {/* Plans Carousel/List */}
        <div className="space-y-6">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "p-8 rounded-[3rem] border transition-all relative overflow-hidden",
                plan.popular 
                  ? "bg-white/[0.04] border-[#00d4ff]/40 shadow-[0_20px_50px_rgba(0,212,255,0.15)]" 
                  : "bg-white/[0.02] border-white/5"
              )}
            >
              {plan.popular && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-[#00d4ff] text-[#070B14] text-[8px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_#00d4ff]">
                  RECOMENDADO
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center" style={{ color: plan.color }}>
                    <plan.icon size={24} />
                 </div>
                 <h3 className="text-xl font-black font-syne uppercase italic tracking-tighter">{plan.name}</h3>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black font-syne">$</span>
                <span className="text-6xl font-black font-syne tracking-tighter italic">
                  {isYearly ? plan.yearlyPrice : plan.price}
                </span>
                <span className="text-white/20 text-xs font-black uppercase tracking-widest">
                  / {isYearly ? 'Año' : 'Mes'}
                </span>
              </div>

              <div className="space-y-4 mb-10">
                 {plan.features.map((feature, fidx) => (
                   <div key={fidx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
                         <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="text-xs font-bold text-white/50 uppercase tracking-tight">{feature}</span>
                   </div>
                 ))}
              </div>

              <button
                onClick={() => handleSelect(plan)}
                className={cn(
                  "w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all active:scale-95",
                  plan.popular 
                    ? "bg-[#00d4ff] text-[#070B14] shadow-[0_12px_30px_rgba(0,212,255,0.3)]" 
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                )}
              >
                <span>Seleccionar Plan</span>
                <ArrowRight size={16} strokeWidth={3} />
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[10px] font-black uppercase tracking-widest text-white/20 mt-12 px-10">
          Pagos seguros procesados por Stripe. Cancelá cuando quieras.
        </p>
      </main>
    </div>
  );
};

export default MobileSelectPlan;
