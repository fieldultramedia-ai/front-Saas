import React, { useState, useEffect } from 'react';
import { Check, Receipt, AlertCircle, CreditCard, ArrowRight, Download, Calendar, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPlanStatus } from '../../services/api';
import { Skeleton } from '../ui/Skeleton';
import { cn } from '../../lib/utils';

export default function TabPlan({ profileData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    getPlanStatus()
      .then(data => setPlanData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-48 w-full bg-white/5 rounded-2xl border border-white/10" />
        <div className="h-64 w-full bg-white/5 rounded-2xl border border-white/10" />
      </div>
    );
  }

  const planName = (planData?.plan_nombre || profileData?.plan_nombre || 'free').toLowerCase();
  const isFree = planName === 'free';
  const isStarter = planName === 'starter';
  const isPro = planName === 'pro';
  const isPremium = planName === 'premium';

  // Métricas
  const usedListings = planData?.properties_used || 0;
  const maxListings = planData?.properties_per_month || (isFree ? 10 : (isStarter ? 40 : '∞'));
  
  const aiUsed = planData?.ai_used || 0;
  const aiMax = planData?.ai_generations || 10;
  
  const imgUsed = planData?.images_used || 0;
  const imgMax = planData?.image_generations || 10;

  const getPercentage = (used, max) => {
    if (max === '∞') return 0;
    return Math.min((used / max) * 100, 100);
  };

  const status = planData?.mp_status || 'free';

  const featuresList = {
    free: ["10 listados por mes", "Ficha PDF básica", "Post para Instagram"],
    starter: ["40 listados por mes", "Formatos Story & Post", "IA para textos", "Soporte básico"],
    pro: ["Listados ilimitados", "Todos los formatos", "Video con IA", "Soporte prioritario"],
    premium: ["Todo lo de Pro", "API Access", "Branding personalizado", "Account Manager"]
  };

  const currentFeatures = featuresList[planName] || featuresList.free;

  const mockInvoices = [
    { id: 'INV-001', date: '2025-04-15', amount: '$39.00', status: 'Pagado' },
    { id: 'INV-002', date: '2025-03-15', amount: '$39.00', status: 'Pagado' },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      
      {/* Header de Suscripción */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0F1C] p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-[#00D4FF]/10 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/20">
              <CreditCard className="h-8 w-8 text-[#00D4FF]" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl font-bold text-white capitalize">{planName}</h3>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border",
                  status === 'active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-white/5 text-white/40 border-white/10"
                )}>
                  {status === 'active' ? 'ACTIVO' : 'PLAN ACTUAL'}
                </span>
              </div>
              <p className="text-white/50 text-sm">
                {isFree ? 'Disfrutando de las funciones básicas' : `Tu suscripción se renueva el ${new Date(planData?.periodo_fin).toLocaleDateString()}`}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/precios')}
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#070B14] transition-all hover:scale-105 active:scale-95"
          >
            {isFree ? 'Mejorar Plan' : 'Cambiar suscripción'}
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentFeatures.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-white/70 text-xs py-2 px-3 rounded-lg bg-white/5 border border-white/5">
              <Check size={12} className="text-[#00D4FF]" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de Uso */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard 
          title="Listados" 
          used={usedListings} 
          max={maxListings} 
          icon={<Calendar className="text-[#00D4FF]" size={18} />}
        />
        <MetricCard 
          title="Generaciones IA" 
          used={aiUsed} 
          max={aiMax} 
          icon={<div className="text-purple-400 font-bold text-xs">AI</div>}
        />
        <MetricCard 
          title="Imágenes/Video" 
          used={imgUsed} 
          max={imgMax} 
          icon={<Download className="text-emerald-400" size={18} />}
        />
      </div>

      {/* Historial de Facturación */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Receipt className="text-white/40" size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Historial de Facturación</h4>
          </div>
          <button className="text-[10px] uppercase tracking-widest font-bold text-[#00D4FF] hover:opacity-80 transition-opacity">
            Descargar todo
          </button>
        </div>

        {isFree ? (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/10 rounded-xl">
            <AlertCircle className="text-white/10 mb-4" size={32} />
            <p className="text-white/30 text-sm max-w-xs">No hay facturas disponibles para el plan gratuito.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/30 text-[10px] uppercase tracking-widest border-b border-white/5">
                  <th className="pb-4 font-medium">Factura</th>
                  <th className="pb-4 font-medium">Fecha</th>
                  <th className="pb-4 font-medium">Monto</th>
                  <th className="pb-4 font-medium">Estado</th>
                  <th className="pb-4 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="text-sm text-white/80 group hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-mono">{inv.id}</td>
                    <td className="py-4">{inv.date}</td>
                    <td className="py-4 font-bold">{inv.amount}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                        <div className="h-1 w-1 rounded-full bg-emerald-400" />
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition-colors">
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Soporte y Gestión */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-6 flex items-center justify-between">
          <div>
            <h5 className="font-bold text-white text-sm mb-1">¿Necesitás ayuda con tu plan?</h5>
            <p className="text-white/50 text-xs">Contactá con nuestro equipo de soporte.</p>
          </div>
          <button className="p-3 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors">
            <ExternalLink size={18} />
          </button>
        </div>
        <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 p-6 flex items-center justify-between">
          <div>
            <h5 className="font-bold text-white/70 text-sm mb-1">Cancelar suscripción</h5>
            <p className="text-white/30 text-xs">Perderás los beneficios Pro al final del ciclo.</p>
          </div>
          <button className="text-xs font-bold text-white/20 hover:text-red-400/50 transition-colors uppercase tracking-widest">
            Dar de baja
          </button>
        </div>
      </div>

    </div>
  );
}

function MetricCard({ title, used, max, icon }) {
  const isUnlimited = max === '∞';
  const pct = isUnlimited ? 0 : Math.min((used / max) * 100, 100);
  
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 relative group overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
            {icon}
          </div>
          <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{title}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-white">{used} <span className="text-white/30 font-light">/ {max}</span></div>
        </div>
      </div>
      
      {!isUnlimited && (
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                pct > 90 ? "bg-red-400" : (pct > 70 ? "bg-amber-400" : "bg-[#00D4FF]")
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/20 uppercase tracking-tighter">
            <span>{Math.round(pct)}% consumido</span>
            <span>{isUnlimited ? '' : `${max - used} restantes`}</span>
          </div>
        </div>
      )}
    </div>
  );
}
