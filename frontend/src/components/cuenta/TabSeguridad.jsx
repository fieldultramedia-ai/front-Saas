import React, { useState } from 'react';
import { Eye, EyeOff, LogOut, ShieldCheck, KeyRound, Smartphone, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function TabSeguridad({ onSave, saving, saveError, saveSuccess }) {
  const { logout } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [localError, setLocalError] = useState('');

  // Password strength logic
  const getStrength = (pw) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    if (pw.length >= 12) s++;
    return s;
  };

  const strength = getStrength(newPassword);
  const STRENGTH_LABELS = ['Muy débil', 'Débil', 'Media', 'Fuerte', 'Excelente'];
  const STRENGTH_COLORS = ['#ff4444', '#ff8800', '#ffcc00', '#00ff88', '#00d4ff'];

  const noCoincide = confirmPassword.length > 0 && confirmPassword !== newPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!currentPassword) {
      setLocalError('Debes ingresar la contraseña actual');
      return;
    }
    if (newPassword.length < 8) {
      setLocalError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError('Las contraseñas no coinciden');
      return;
    }

    const payload = { current_password: currentPassword, new_password: newPassword };
    const res = await onSave(payload, 'password');
    if (res?.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleLogoutAll = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout-all/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token') || localStorage.getItem('subzero_access')}` }
      });
    } catch(e) {}
    logout();
  };

  return (
    <div className="animate-fade-in-up space-y-8 max-w-4xl">
      {/* Change Password Card */}
      <section className="bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 bg-gradient-to-r from-blue-500/5 to-transparent">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <KeyRound size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black font-syne uppercase italic tracking-tight text-white">Actualizar Contraseña</h3>
              <p className="text-xs text-zinc-500">Mantené tu cuenta segura con una contraseña robusta.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Contraseña Actual</label>
                <div className="relative">
                  <input 
                    type={showCurrent ? "text" : "password"} 
                    className="w-full h-12 bg-zinc-950 border border-white/5 rounded-xl px-4 text-sm text-white focus:border-blue-500 transition-all outline-none"
                    value={currentPassword} 
                    onChange={e => setCurrentPassword(e.target.value)} 
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white" onClick={() => setShowCurrent(!showCurrent)}>
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nueva Contraseña</label>
                <div className="relative">
                  <input 
                    type={showNew ? "text" : "password"} 
                    className="w-full h-12 bg-zinc-950 border border-white/5 rounded-xl px-4 text-sm text-white focus:border-blue-500 transition-all outline-none"
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white" onClick={() => setShowNew(!showNew)}>
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                {/* Strength Meter */}
                <AnimatePresence>
                  {newPassword && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2 pt-1"
                    >
                      <div className="flex gap-1 h-1">
                        {[0,1,2,3].map(i => (
                          <div 
                            key={i} 
                            className="flex-1 rounded-full transition-colors duration-500"
                            style={{ background: strength > i ? STRENGTH_COLORS[strength] : 'rgba(255,255,255,0.05)' }}
                          />
                        ))}
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: STRENGTH_COLORS[strength] }}>
                        {STRENGTH_LABELS[strength]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Confirmar Nueva Contraseña</label>
                <div className="relative">
                  <input 
                    type={showConfirm ? "text" : "password"} 
                    className={`w-full h-12 bg-zinc-950 border rounded-xl px-4 text-sm text-white focus:border-blue-500 transition-all outline-none ${noCoincide ? 'border-red-500/50' : 'border-white/5'}`}
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {noCoincide && <p className="text-[10px] text-red-400 font-bold uppercase mt-1">Las contraseñas no coinciden</p>}
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-zinc-950/50 rounded-[1.5rem] p-6 border border-white/5 flex flex-col justify-center gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-white/5 text-zinc-400 mt-1"><ShieldCheck size={18} /></div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">Tu seguridad es prioridad</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">Usá combinaciones de letras mayúsculas, minúsculas, números y caracteres especiales para mayor protección.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-white/5 text-zinc-400 mt-1"><Smartphone size={18} /></div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">Acceso en dispositivos</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">Si cambiás tu contraseña, se cerrarán las sesiones en otros dispositivos por seguridad.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {(localError || saveError) && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-2 text-red-400"
                  >
                    <AlertCircle size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wide">{localError || saveError}</span>
                  </motion.div>
                )}
                {saveSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-2 text-emerald-400"
                  >
                    <ShieldCheck size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wide">Contraseña actualizada con éxito</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              type="submit" 
              disabled={saving || !currentPassword || !newPassword || noCoincide}
              className={`
                px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300
                ${(saving || !currentPassword || !newPassword || noCoincide)
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-blue-500 hover:text-white shadow-xl shadow-blue-500/20'}
              `}
            >
              {saving ? 'Procesando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-red-400 font-black font-syne uppercase italic tracking-tight mb-1">Cerrar Sesiones Activas</h3>
            <p className="text-xs text-red-400/60">Cerrar sesión en todos los dispositivos donde hayas ingresado.</p>
          </div>
          <button 
            onClick={handleLogoutAll}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <LogOut size={16} />
            Cerrar Todo
          </button>
        </div>
      </section>
    </div>
  );
}
