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
    <section className="py-20 px-6 bg-[#070B14]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold font-['Syne'] leading-tight mb-4 text-white">
          Planes a tu <br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#6001d1] bg-clip-text text-transparent">
            medida
          </span>
        </h2>
        
        <div className="flex flex-col gap-4 mt-8">
          {/* Toggle Mensual/Anual */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Mensual</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-[#1b2029] rounded-full border border-white/10 relative p-1"
            >
              <motion.div 
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 bg-[#00d4ff] rounded-full shadow-[0_0_10px_#00d4ff]"
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Anual <span className="text-[#00ff88] text-[10px] font-bold ml-1">-25%</span>
            </span>
          </div>

          {/* Toggle Moneda */}
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${currency === 'USD' ? 'bg-[#00d4ff] text-black' : 'bg-white/5 text-white/60'}`}
            >
              USD
            </button>
            <button 
              onClick={() => setCurrency('ARS')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${currency === 'ARS' ? 'bg-[#00d4ff] text-black' : 'bg-white/5 text-white/60'}`}
            >
              ARS
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative p-8 rounded-[2.5rem] border ${
              plan.popular 
                ? 'bg-gradient-to-br from-[#00d4ff]/10 to-[#6001d1]/10 border-[#00d4ff]/30' 
                : 'bg-[#1b2029]/40 border-white/5'
            } backdrop-blur-xl`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00d4ff] text-[#070B14] text-[10px] font-bold uppercase tracking-widest rounded-full">
                Más Popular
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <plan.icon className="text-[#00d4ff]" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-['Syne']">{plan.name}</h3>
                <p className="text-gray-400 text-xs uppercase tracking-widest">Plan {plan.id}</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {getPrice(plan)}
                </span>
                <span className="text-gray-500 text-sm">/{isYearly ? 'año' : 'mes'}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={16} className="text-[#00ff88]" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loadingPlan === plan.id}
              className={`w-full h-14 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                plan.popular
                  ? 'bg-[#00d4ff] text-[#070B14] shadow-[0_0_20px_#00d4ff44]'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}
            >
              {loadingPlan === plan.id ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                plan.button
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MobilePricing;
