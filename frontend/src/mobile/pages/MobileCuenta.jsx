import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Shield, 
  Settings, 
  LogOut, 
  ChevronRight,
  Building2,
  Globe,
  Phone,
  Mail,
  FileText,
  Upload,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPerfil, actualizarPerfil, updatePassword } from '../../services/api';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import AvatarUpload from '../../components/cuenta/AvatarUpload';

const MobileCuenta = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  
  const [activeTab, setActiveTab] = useState('perfil'); // 'perfil' | 'seguridad' | 'ajustes'
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getPerfil();
        setProfileData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      await actualizarPerfil(profileData);
      addToast({ type: 'success', title: 'Perfil actualizado', message: 'Los cambios se guardaron correctamente.' });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'No se pudieron guardar los cambios.' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="px-6 py-10 pb-40">
      {/* Header Premium */}
      <div className="mb-10">
        <h1 className="text-3xl font-black font-syne uppercase tracking-tighter italic text-white mb-2">MI CUENTA</h1>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Gestioná tu identidad y preferencias</p>
      </div>

      {/* Tabs Selector */}
      <div className="flex gap-1 p-1 bg-white/5 border border-white/5 rounded-2xl mb-10 overflow-x-auto scrollbar-hide">
        {[
          { id: 'perfil', label: 'Perfil', icon: User },
          { id: 'seguridad', label: 'Seguridad', icon: Shield },
          { id: 'ajustes', label: 'Ajustes', icon: Settings },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-[#00d4ff] text-[#070B14] shadow-[0_4px_12px_rgba(0,212,255,0.2)]" 
                : "text-white/40 hover:text-white"
            )}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'perfil' && (
          <motion.div 
            key="perfil"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Foto de Perfil / Logo */}
            <div className="flex flex-col items-center mb-10">
              <AvatarUpload 
                src={profileData?.logoUrl || profileData?.logo_url} 
                nombre={profileData?.nombre} 
                onUpload={(url) => handleUpdate('logoUrl', url)} 
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{profileData?.nombre || 'Usuario'}</h3>
                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] text-[9px] font-black uppercase tracking-widest border border-[#00d4ff]/20">
                  Plan {profileData?.plan || 'PRO'}
                </span>
              </div>
            </div>

            {/* Inputs Personales */}
            <div className="space-y-6">
              <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] pl-2">Información Personal</h3>
              <MobileInput 
                label="Nombre Completo" 
                icon={<User size={16} />} 
                value={profileData?.nombre || ''} 
                onChange={val => handleUpdate('nombre', val)} 
              />
              <MobileInput 
                label="Correo Electrónico" 
                icon={<Mail size={16} />} 
                value={profileData?.email || ''} 
                onChange={val => handleUpdate('email', val)} 
              />
              <MobileInput 
                label="Teléfono" 
                icon={<Phone size={16} />} 
                placeholder="+54 9..."
                value={profileData?.telefono || ''} 
                onChange={val => handleUpdate('telefono', val)} 
              />
              <div className="flex flex-col gap-2 px-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-white/40">País / Región</label>
                <select 
                  className="w-full h-14 px-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all"
                  value={profileData?.pais || ''} 
                  onChange={e => handleUpdate('pais', e.target.value)}
                >
                  <option value="" className="bg-[#070B14]">Seleccionar...</option>
                  <option value="Argentina" className="bg-[#070B14]">Argentina</option>
                  <option value="México" className="bg-[#070B14]">México</option>
                  <option value="España" className="bg-[#070B14]">España</option>
                </select>
              </div>
            </div>

            {/* Datos de Agencia */}
            <div className="space-y-6 pt-6">
              <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] pl-2">Datos de la Agencia</h3>
              <MobileInput 
                label="Inmobiliaria" 
                icon={<Building2 size={16} />} 
                placeholder="Nombre de tu negocio"
                value={profileData?.nombreInmobiliaria || profileData?.nombre_inmobiliaria || ''} 
                onChange={val => handleUpdate('nombreInmobiliaria', val)} 
              />
              <MobileInput 
                label="Sitio Web" 
                icon={<Globe size={16} />} 
                placeholder="www.tuweb.com"
                value={profileData?.sitioWeb || profileData?.sitio_web || ''} 
                onChange={val => handleUpdate('sitioWeb', val)} 
              />
              <div className="flex flex-col gap-2 px-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Biografía</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-4 text-white/20" />
                  <textarea 
                    className="w-full min-h-[120px] pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all resize-none"
                    placeholder="Contanos sobre vos..."
                    value={profileData?.bio || ''} 
                    onChange={e => handleUpdate('bio', e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Botón Guardar */}
            <button 
              onClick={saveChanges}
              disabled={saving}
              className="w-full h-16 rounded-2xl bg-[#00d4ff] text-[#070B14] font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_8px_30px_rgba(0,212,255,0.2)]"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>

            {/* Logout al final */}
            <button 
              onClick={handleLogout}
              className="w-full h-16 rounded-2xl bg-red-500/10 border border-red-500/10 text-red-500 font-black uppercase tracking-widest flex items-center justify-center gap-3 mt-10 active:scale-95 transition-all"
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </motion.div>
        )}

        {activeTab === 'seguridad' && (
          <motion.div 
            key="seguridad"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
             <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center">
               <div className="w-16 h-16 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-6">
                 <Shield className="text-[#7C3AED]" size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">Seguridad</h3>
               <p className="text-white/40 text-xs mb-8">Cambiá tu contraseña regularmente para mayor protección.</p>
               
               <div className="space-y-4 text-left">
                 <MobileInput label="Contraseña Actual" type="password" icon={<Shield size={16} />} />
                 <MobileInput label="Nueva Contraseña" type="password" icon={<Shield size={16} />} />
                 <button className="w-full h-14 rounded-xl bg-white/10 text-white font-bold uppercase tracking-widest text-xs mt-4">Actualizar Password</button>
               </div>
             </div>
          </motion.div>
        )}

        {activeTab === 'ajustes' && (
          <motion.div 
            key="ajustes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {[
              { label: 'Notificaciones Push', active: true },
              { label: 'Emails de Marketing', active: false },
              { label: 'Modo Desarrollador', active: false },
              { label: 'Reportar un error', active: null },
            ].map((adj, i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-sm font-bold text-white/70 uppercase tracking-tight">{adj.label}</span>
                {adj.active !== null ? (
                  <div className={cn(
                    "w-12 h-6 rounded-full p-1 transition-all",
                    adj.active ? "bg-[#00d4ff]" : "bg-white/10"
                  )}>
                    <div className={cn(
                      "w-4 h-4 bg-white rounded-full transition-all",
                      adj.active ? "translate-x-6" : "translate-x-0"
                    )} />
                  </div>
                ) : (
                  <ChevronRight size={16} className="text-white/20" />
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function MobileInput({ label, icon, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div className="flex flex-col gap-2 px-2">
      <label className="text-[10px] uppercase tracking-widest font-black text-white/40">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
          {icon}
        </div>
        <input 
          type={type}
          className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all"
          placeholder={placeholder}
          value={value} 
          onChange={e => onChange?.(e.target.value)} 
        />
      </div>
    </div>
  );
}

export default MobileCuenta;

export default MobileCuenta;
