import React from 'react';
import { Bell, Palette, Globe, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function TabSettings({ profileData, onUpdate }) {
  
  const handleToggle = (key) => {
    onUpdate('settings', {
      ...(profileData?.settings || {}),
      [key]: !(profileData?.settings?.[key] ?? true)
    });
  };

  const sections = [
    {
      title: 'Notificaciones',
      desc: 'Controlá cómo y cuándo querés recibir avisos.',
      icon: <Bell size={18} className="text-blue-400" />,
      items: [
        { id: 'notify_email', label: 'Reportes por email', desc: 'Recibí un resumen semanal de tus listados.' },
        { id: 'notify_generation', label: 'Aviso de generación', desc: 'Notificar cuando un video o carrusel esté listo.' }
      ]
    },
    {
      title: 'Experiencia de Usuario',
      desc: 'Personalizá el comportamiento del generador.',
      icon: <Zap size={18} className="text-purple-400" />,
      items: [
        { id: 'auto_save_drafts', label: 'Guardado automático', desc: 'Guardar borradores del wizard automáticamente.' },
        { id: 'show_tips', label: 'Mostrar sugerencias IA', desc: 'Ver consejos de la IA durante la creación.' }
      ]
    },
    {
      title: 'Apariencia',
      desc: 'Configurá el aspecto visual de la plataforma.',
      icon: <Palette size={18} className="text-emerald-400" />,
      items: [
        { id: 'dark_mode', label: 'Modo Oscuro (Beta)', desc: 'Activar el modo de alto contraste oscuro.' },
        { id: 'glass_effects', label: 'Efectos de Transparencia', desc: 'Habilitar glassmorphism en la interfaz.' }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up pb-20">
      {sections.map((section, idx) => (
        <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              {section.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{section.title}</h3>
              <p className="text-white/30 text-xs mt-1">{section.desc}</p>
            </div>
          </div>

          <div className="divide-y divide-white/[0.03]">
            {section.items.map(item => (
              <div key={item.id} className="flex items-center justify-between py-6 first:pt-0 last:pb-0">
                <div className="max-w-md pr-8">
                  <h4 className="text-sm font-medium text-white/90 mb-1">{item.label}</h4>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
                
                <Toggle 
                  active={profileData?.settings?.[item.id] ?? true} 
                  onToggle={() => handleToggle(item.id)} 
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Región y Lenguaje */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <Globe size={18} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Región y Lenguaje</h3>
            <p className="text-white/30 text-xs mt-1">Configuración por defecto para tus nuevos listados.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Idioma de la Interfaz</label>
            <select className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all">
              <option value="es" className="bg-[#070B14]">Español</option>
              <option value="en" className="bg-[#070B14]">Inglés</option>
              <option value="pt" className="bg-[#070B14]">Portugués</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Zona Horaria</label>
            <select className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all">
              <option value="art" className="bg-[#070B14]">GMT-3 (Buenos Aires)</option>
              <option value="mex" className="bg-[#070B14]">GMT-6 (Ciudad de México)</option>
              <option value="col" className="bg-[#070B14]">GMT-5 (Bogotá)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ active, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative w-11 h-6 rounded-full transition-all duration-300 outline-none",
        active ? "bg-[#00d4ff]" : "bg-white/10"
      )}
    >
      <div 
        className={cn(
          "absolute top-1 h-4 w-4 bg-white rounded-full transition-all duration-300 shadow-sm",
          active ? "left-6" : "left-1"
        )}
      />
    </button>
  );
}
