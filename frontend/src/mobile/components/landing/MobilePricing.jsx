import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, Crown, Users, Rocket } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    monthlyUSD: 0,
    monthlyARS: 0,
    yearlyUSD: 0,
    yearlyARS: 0,
    icon: Shield,
    features: ['10 publicaciones/mes', '1 nicho', 'Soporte básico'],
    button: 'Empezar Gratis'
  },
  {
    id: 'starter',
    name: 'Starter',
    monthlyUSD: 39,
    monthlyARS: 34000,
    yearlyUSD: 351,
    yearlyARS: 25500,
    icon: Zap,
    features: ['40 publicaciones/mes', '1 nicho', 'Videos IA (5/mes)', 'Soporte básico'],
    button: 'Elegir Starter',
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyUSD: 89,
    monthlyARS: 70000,
    yearlyUSD: 801,
    yearlyARS: 52500,
    icon: Crown,
    features: ['150 publicaciones/mes', '3 nichos', 'Videos IA (20/mes)', 'Branding personalizado'],
    button: 'Elegir Pro'
  },
  {
    id: 'scale',
    name: 'Scale',
    monthlyUSD: 149,
    monthlyARS: 143000,
    yearlyUSD: 1341,
    yearlyARS: 107000,
    icon: Users,
    features: ['Ilimitadas/mes', '10 nichos', 'Videos IA (60/mes)', '10 Usuarios'],
    button: 'Elegir Scale'
  }
];

const MobilePricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleCheckout = (planId) => {
    setLoadingPlan(planId);
    setTimeout(() => {
      window.location.href = `/register?plan=${planId}&interval=${isYearly ? 'yearly' : 'monthly'}&currency=${currency}`;
      setLoadingPlan(null);
    }, 800);
  };

  const getPrice = (plan) => {
    const price = isYearly 
      ? (currency === 'USD' ? plan.yearlyUSD : plan.yearlyARS)
      : (currency === 'USD' ? plan.monthlyUSD : plan.monthlyARS);
    
    return currency === 'USD' ? `$${price}` : `$${price.toLocaleString()}`;
  };

  return (
    <section className="py-24 px-6 bg-[#070B14] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00d4ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl font-black font-syne uppercase italic tracking-tighter leading-[0.9] text-white mb-6">
          ELEGÍ TU <br />
          <span className="text-[#00d4ff]">PLAN ÉLITE</span>
        </h2>
        
        <div className="flex flex-col gap-6 mt-10">
          {/* Toggle Mensual/Anual */}
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
            <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", isYearly ? "text-white" : "text-white/20")}>
              Anual <span className="text-[#00ff88] ml-1">-25%</span>
            </span>
          </div>

          {/* Toggle Moneda */}
          <div className="flex items-center justify-center gap-3">
            {['USD', 'ARS'].map(curr => (
              <button 
                key={curr}
                onClick={() => setCurrency(curr)}
                className={cn(
                  "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border",
                  currency === curr 
                    ? "bg-[#00d4ff] text-[#070B14] border-[#00d4ff] shadow-[0_4px_12px_rgba(0,212,255,0.3)]" 
                    : "bg-white/5 border-white/10 text-white/40"
                )}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "relative p-8 rounded-[3rem] border transition-all backdrop-blur-xl",
              plan.popular 
                ? 'bg-white/[0.04] border-[#00d4ff]/30 shadow-[0_20px_50px_rgba(0,212,255,0.15)]' 
                : 'bg-white/[0.01] border-white/5'
            )}
          >
            {plan.popular && (
              <div className="absolute top-8 right-8 px-3 py-1 bg-[#00d4ff] text-[#070B14] text-[8px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)]">
                POPULAR
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#00d4ff]">
                <plan.icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black font-syne uppercase italic tracking-tighter text-white">{plan.name}</h3>
                <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em]">{plan.id}</p>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black font-syne italic tracking-tighter text-white">
                  {getPrice(plan)}
                </span>
                <span className="text-white/20 text-xs font-black uppercase tracking-widest ml-1">
                  / {isYearly ? 'Año' : 'Mes'}
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-tight">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loadingPlan === plan.id}
              className={cn(
                "w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all active:scale-95 flex items-center justify-center gap-3",
                plan.popular
                  ? 'bg-[#00d4ff] text-[#070B14] shadow-[0_12px_30px_rgba(0,212,255,0.3)]'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              )}
            >
              {loadingPlan === plan.id ? (
                <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Elegir Plan</span>
                  <ArrowRight size={16} strokeWidth={3} />
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MobilePricing;
