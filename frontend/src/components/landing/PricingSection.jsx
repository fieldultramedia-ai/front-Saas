"use client";
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { crearPreferenciaMP } from '../../services/api';
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Users, Rocket, Zap, Crown } from "lucide-react";
import { 
  PricingTable, 
  PricingTableHeader, 
  PricingTableBody, 
  PricingTableRow, 
  PricingTableHead, 
  PricingTableCell, 
  PricingTablePlan 
} from "@/components/ui/pricing-table";
import { Button } from "@/components/ui/button";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";

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

const ToggleGroup = ({ options, active, onChange }) => (
  <div className="relative inline-flex bg-[#0B101A] p-1 rounded-full border border-white/10">
    {options.map((opt) => (
      <button
        key={String(opt.value)}
        onClick={() => onChange(opt.value)}
        className={cn(
          "relative z-10 px-6 py-1.5 text-xs font-medium transition-colors duration-300 rounded-full",
          active === opt.value ? "text-black" : "text-white/60 hover:text-white"
        )}
      >
        {active === opt.value && (
          <motion.div
            layoutId={options[0].label + "bg"}
            className="absolute inset-0 bg-[#00d4ff] rounded-full"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-20">{opt.label}</span>
      </button>
    ))}
  </div>
);

export default function PricingSection() {
  const pricingRef = useRef(null);
  const [isYearly, setIsYearly] = useState(false);
  const [isCurrency, setIsCurrency] = useState('USD');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleSelectPlan = async (planId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (planId === 'free') {
      // Si es free y ya está logueado, probablemente no necesite hacer nada o redirigir al dashboard
      navigate('/dashboard');
      return;
    }

    if (planId === 'business') {
      window.location.href = 'mailto:ventas@leadbook.app';
      return;
    }

    setLoadingPlan(planId);
    try {
      const data = await crearPreferenciaMP(planId);
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (err) {
      console.error("Error al iniciar pago:", err);
      alert("Hubo un error al iniciar el proceso de pago. Por favor intenta de nuevo.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const getPrice = (plan) => {
    if (plan.id === 'business') return 'Custom';
    const price = isYearly 
      ? (isCurrency === 'USD' ? plan.yearlyUSD : plan.yearlyARS)
      : (isCurrency === 'USD' ? plan.monthlyUSD : plan.monthlyARS);
    
    return isCurrency === 'USD' ? `$${price}` : `$${price.toLocaleString()}`;
  };

  return (
    <section id="precios" className="relative w-full bg-[#070B14]" ref={pricingRef}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <TimelineContent
          animationNum={4}
          timelineRef={pricingRef}
          className="absolute top-0 h-full w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] z-0"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:70px_80px]"></div>
          <SparklesComp
            density={400}
            direction="top"
            speed={0.2}
            color="#FFFFFF"
            className="absolute inset-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          />
        </TimelineContent>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 flex flex-col py-4 sm:py-6 md:py-8 pt-20 sm:pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 space-y-1"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase italic">
            PRECIOS
          </h2>
          <p className="text-white/60 text-xs sm:text-sm md:text-base lg:text-lg font-light max-w-2xl mx-auto">
            Selecciona el plan que mejor se adapte a tus necesidades.
          </p>

          <div className="flex sm:hidden items-center justify-center gap-2 text-[#00d4ff] text-[10px] uppercase font-bold tracking-widest mt-4 opacity-70 animate-pulse">
            <span>← Desliza para ver más planes →</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <ToggleGroup 
              options={[
                { label: 'Mensual', value: false },
                { label: 'Anual', value: true }
              ]}
              active={isYearly}
              onChange={setIsYearly}
            />
            <ToggleGroup 
              options={[
                { label: 'USD', value: 'USD' },
                { label: 'ARS', value: 'ARS' }
              ]}
              active={isCurrency}
              onChange={setIsCurrency}
            />
          </div>
        </motion.div>

        <PricingTable className="w-full pb-8">
          <PricingTableHeader>
            <PricingTableRow>
              <th className="w-[15%] min-w-[100px]" />
              {plans.map((plan) => (
                <th key={plan.id} className="p-1 w-[17%] min-w-[150px]">
                  <PricingTablePlan
                    name={plan.name}
                    badge={plan.badge}
                    price={getPrice(plan)}
                    compareAt={plan.id !== 'business' && isYearly ? (isCurrency === 'USD' ? `$${plan.monthlyUSD * 12}` : `$${(plan.monthlyARS * 12).toLocaleString()}`) : undefined}
                    icon={plan.icon}
                    className={cn(
                      "h-full",
                      plan.id === 'starter' && "border-[#00d4ff]/30 bg-[#00d4ff]/5"
                    )}
                  >
                    <Button 
                      variant={plan.id === 'starter' ? "default" : "outline"}
                      className={cn(
                        "w-full rounded-lg text-xs font-bold transition-all duration-300",
                        plan.id === 'starter' && "bg-[#00d4ff] text-black hover:bg-[#00d4ff]/90 border-none"
                      )}
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={loadingPlan !== null}
                    >
                      {loadingPlan === plan.id ? (
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        plan.button
                      )}
                    </Button>
                  </PricingTablePlan>
                </th>
              ))}
            </PricingTableRow>
          </PricingTableHeader>
          <PricingTableBody>
            {FEATURES.map((feature, index) => (
              <PricingTableRow key={index}>
                <PricingTableHead className="text-white/60 font-medium text-xs uppercase tracking-wider pl-4">
                  {feature.label}
                </PricingTableHead>
                {feature.values.map((value, idx) => (
                  <PricingTableCell key={idx}>
                    {value}
                  </PricingTableCell>
                ))}
              </PricingTableRow>
            ))}
          </PricingTableBody>
        </PricingTable>

        {isYearly && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-[#00d4ff] text-sm font-bold"
          >
            Ahorras un 25% en planes anuales.
          </motion.p>
        )}
      </div>
    </section>
  );
}
