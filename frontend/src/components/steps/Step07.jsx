import { useState, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext';
import { useAuth } from '../../context/AuthContext';
import { Zap, User, Phone, Mail, Building, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Step07({ onPrev, onGenerar }) {
  const { formData, updateFormData } = useFormContext();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Pre-llenar con datos del usuario si están disponibles
  useEffect(() => {
    if (user) {
      const updates = {};
      if (!formData.agenteNombre) updates.agenteNombre = user.name || user.nombre || '';
      if (!formData.agenteEmail) updates.agenteEmail = user.email || '';
      if (!formData.agenteTelefono) updates.agenteTelefono = user.telefono || '';
      if (!formData.agenciaNombre || formData.agenciaNombre === 'Tu Negocio') {
        updates.agenciaNombre = user.agencyName || user.agency_name || '';
      }
      if (Object.keys(updates).length > 0) updateFormData(updates);
    }
  }, [user]);

  const handleGenerar = async (e) => {
    e.preventDefault();
    if (!formData.agenteNombre || !formData.agenteTelefono) return;

    const digits = formData.agenteTelefono.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) {
      setPhoneError('Ingresá un teléfono válido');
      return;
    }

    setLoading(true);
    try {
      await onGenerar();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
           <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
             Paso 07
           </div>
           <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
        </div>
        <h1 className="text-3xl font-black font-syne text-white mb-3 italic tracking-tighter uppercase">
          Información de Contacto
        </h1>
        <p className="text-zinc-400 text-sm">
          Estos datos aparecerán en tu PDF, post y video para que los clientes puedan contactarte directamente.
        </p>
      </header>

      <form onSubmit={handleGenerar} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
              <User size={12} /> Nombre del Responsable <span className="text-blue-500">*</span>
            </label>
            <input 
              className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-5 h-14 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700" 
              placeholder="Ej: María García" 
              required
              value={formData.agenteNombre || ''}
              onChange={e => updateFormData({ agenteNombre: e.target.value })} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
              <Phone size={12} /> Teléfono de Contacto <span className="text-blue-500">*</span>
            </label>
            <input 
              className={`w-full bg-zinc-900/50 border rounded-2xl px-5 h-14 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700 ${phoneError ? 'border-red-500/50' : 'border-white/5'}`}
              placeholder="Ej: 541112345678" 
              required
              value={formData.agenteTelefono || ''}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, '');
                updateFormData({ agenteTelefono: val });
                if (phoneError) setPhoneError('');
              }} 
            />
            {phoneError && <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-1 block">{phoneError}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
              <Mail size={12} /> Email Profesional
            </label>
            <input 
              className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-5 h-14 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700" 
              type="email" 
              placeholder="Ej: tu@email.com"
              value={formData.agenteEmail || ''}
              onChange={e => updateFormData({ agenteEmail: e.target.value })} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
              <Building size={12} /> Empresa / Agencia
            </label>
            <input 
              className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-5 h-14 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700" 
              placeholder="Ej: LeadBook Real Estate"
              value={formData.agenciaNombre || ''}
              onChange={e => updateFormData({ agenciaNombre: e.target.value })} 
            />
          </div>
        </div>

        {/* Resumen del Listado - Modern Card */}
        <section className="bg-zinc-900/30 border border-white/5 rounded-[32px] overflow-hidden">
          <div className="px-8 py-4 border-b border-white/[0.03] flex items-center justify-between">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Resumen del Listado</span>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
              <ShieldCheck size={12} /> Datos Verificados
            </div>
          </div>
          <div className="p-8 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
            {[
              { label: 'Tipo',        value: formData.tipoPropiedad || '—' },
              { label: 'Operación',   value: formData.operacion     || '—' },
              { label: 'Precio',      value: formData.precio ? `${formData.moneda || 'USD'} ${Number(formData.precio).toLocaleString()}` : '—' },
              { label: 'Ubicación',   value: formData.ciudad        || '—', full: true },
              { label: 'Contenido',   value: `${(formData.escenas || []).length} escenas`, badge: true },
              { label: 'Multimedia',  value: `${(formData.fotosRecorrido || []).length} fotos`, badge: true },
            ].map((item, i) => (
              <div key={i} className={`flex flex-col gap-1 ${item.full ? 'col-span-2 sm:col-span-1' : ''}`}>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-wider">{item.label}</span>
                <span className="text-xs font-bold text-zinc-200 truncate">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Button */}
        <footer className="pt-10 flex flex-col items-center gap-6">
          <div className="flex items-center justify-between w-full">
            <button 
              type="button" 
              onClick={onPrev}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all text-xs font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} />
              Anterior
            </button>
            
            <button 
              type="submit" 
              disabled={loading || !formData.agenteNombre || !formData.agenteTelefono}
              className={`
                group relative flex items-center gap-3 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 overflow-hidden
                ${(loading || !formData.agenteNombre || !formData.agenteTelefono)
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-[0_20px_50px_rgba(59,130,246,0.4)]'}
              `}
            >
              <span className="relative z-10 flex items-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <Zap size={18} fill="currentColor" />
                    Generar Listado Profesional
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em] animate-pulse">
            <Sparkles size={12} className="text-blue-500" />
            La IA generará todos los formatos en ~15 segundos
          </div>
        </footer>
      </form>
    </div>
  );
}
