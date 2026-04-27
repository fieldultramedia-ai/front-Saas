import React from 'react';
import AvatarUpload from './AvatarUpload';
import { Upload, User, Building2, Globe, Phone, Mail, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export default function TabPerfil({ profileData, onUpdate }) {
  const { user } = useAuth();
  const planName = profileData?.plan_nombre || 'FREE';
  const badgeTitle = planName.toUpperCase() === 'PRO' ? 'Plan Pro' : 'Plan Free';
  const badgeClass = planName.toUpperCase() === 'PRO' ? 'badge-accent' : 'badge-info';

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dpqgbgilw';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'leadbook_preset';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { 
      method: 'POST', 
      body: formData 
    });

    if (!res.ok) throw new Error('Error al subir a la nube');
    const data = await res.json();
    return data.secure_url;
  };

  const handleLogoUpload = async (e) => {
    const file = typeof e === 'object' && e.target ? e.target.files?.[0] : e;
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      onUpdate('logoUrl', blobUrl);
      try {
        const url = await uploadToCloudinary(file);
        onUpdate('logoUrl', url);
      } catch (err) {
        console.error("Cloudinary Error:", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up pb-20">
      
      {/* SECCIÓN 1: IDENTIDAD PERSONAL */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <AvatarUpload 
            src={profileData?.logoUrl || user?.agencyLogo || profileData?.logo_url} 
            nombre={profileData?.nombre} 
            onUpload={handleLogoUpload} 
          />
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white">{profileData?.nombre || 'Usuario'}</h3>
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border", 
                planName.toLowerCase() === 'pro' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-white/10 text-white/50 border-white/10"
              )}>
                {badgeTitle}
              </span>
            </div>
            <p className="text-white/40 text-sm">{profileData?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInput 
            label="Nombre Completo" 
            icon={<User size={14} />} 
            value={profileData?.nombre || ''} 
            onChange={val => onUpdate('nombre', val)} 
          />
          <ProfileInput 
            label="Correo Electrónico" 
            icon={<Mail size={14} />} 
            value={profileData?.email || ''} 
            onChange={val => onUpdate('email', val)} 
          />
          <ProfileInput 
            label="Teléfono" 
            icon={<Phone size={14} />} 
            placeholder="+54 9..."
            value={profileData?.telefono || ''} 
            onChange={val => onUpdate('telefono', val)} 
          />
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">País / Región</label>
            <select 
              className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all"
              value={profileData?.pais || ''} 
              onChange={e => onUpdate('pais', e.target.value)}
            >
              <option value="" className="bg-[#070B14]">Seleccionar...</option>
              <option value="Argentina" className="bg-[#070B14]">Argentina</option>
              <option value="México" className="bg-[#070B14]">México</option>
              <option value="Colombia" className="bg-[#070B14]">Colombia</option>
              <option value="Chile" className="bg-[#070B14]">Chile</option>
              <option value="España" className="bg-[#070B14]">España</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: DATOS DE LA AGENCIA */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="mb-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Building2 size={16} className="text-[#00d4ff]" />
            Datos de la Agencia
          </h3>
          <p className="text-white/30 text-xs mt-1">Se usará en tus PDF y listados generados.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ProfileInput 
            label="Nombre Inmobiliaria" 
            icon={<Building2 size={14} />} 
            placeholder="Tu negocio"
            value={profileData?.nombreInmobiliaria || profileData?.nombre_inmobiliaria || ''} 
            onChange={val => onUpdate('nombreInmobiliaria', val)} 
          />
          <ProfileInput 
            label="Sitio Web" 
            icon={<Globe size={14} />} 
            placeholder="www.tuweb.com"
            value={profileData?.sitioWeb || profileData?.sitio_web || ''} 
            onChange={val => onUpdate('sitioWeb', val)} 
          />
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Biografía / Descripción</label>
          <div className="relative">
            <FileText size={14} className="absolute left-4 top-4 text-white/20" />
            <textarea 
              className="w-full min-h-[120px] pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all resize-none"
              placeholder="Contanos sobre tu inmobiliaria..."
              value={profileData?.bio || ''} 
              onChange={e => onUpdate('bio', e.target.value)} 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Logo Institucional</label>
          <div className="mt-2 p-6 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center gap-4">
            {(profileData?.logoUrl || profileData?.logo_url) ? (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="h-16 w-32 px-4 py-2 bg-white rounded-lg flex items-center justify-center">
                  <img 
                    src={profileData?.logoUrl || profileData?.logo_url} 
                    alt="Logo preview" 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
                <label className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all cursor-pointer">
                  Cambiar Logo
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                  <Upload size={20} className="text-white/20 group-hover:text-[#00d4ff]" />
                </div>
                <span className="text-xs text-white/30 group-hover:text-white/50 transition-all">Subir logo (PNG recomendado)</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileInput({ label, icon, value, onChange, placeholder = "" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
          {icon}
        </div>
        <input 
          className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all"
          placeholder={placeholder}
          value={value} 
          onChange={e => onChange(e.target.value)} 
        />
      </div>
    </div>
  );
}
