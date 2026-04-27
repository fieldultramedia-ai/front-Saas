import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  LogIn
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppStore } from '../../store/useAppStore';
import Logo from '../../components/Logo';

const MobileLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useAppStore();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      addToast({ type: 'error', title: 'Campos incompletos', message: 'Por favor, llena todos los campos.' });
      return;
    }

    setLoading(true);
    try {
      await login(form.email, form.password);
      addToast({ type: 'success', title: '¡Hola de nuevo!', message: 'Sesión iniciada correctamente.' });
      navigate('/mobile');
    } catch (err) {
      addToast({ type: 'error', title: 'Error de acceso', message: 'Credenciales inválidas.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col overflow-x-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[100%] h-[50%] bg-[#00d4ff]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[50%] bg-[#7c3aed]/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Top Header */}
      <div className="relative z-10 px-6 pt-10 pb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate('/landing')}
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white/40 flex items-center justify-center active:scale-90 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <Logo size="small" />
        <div className="w-12" />
      </div>

      <main className="relative z-10 flex-1 px-8 flex flex-col justify-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-12"
        >
          <div className="text-left">
            <h1 className="text-5xl font-black font-syne tracking-tighter italic leading-none mb-4 uppercase">
              ¡HOLA DE<br/><span className="text-[#00d4ff]">NUEVO!</span>
            </h1>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Gestioná tu imperio inmobiliario con IA</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="space-y-6">
              <MobileLoginInput 
                label="Email Corporativo" 
                icon={<Mail size={18} />} 
                placeholder="tu@agencia.com"
                value={form.email}
                onChange={val => setForm({...form, email: val})}
              />

              <div className="space-y-2">
                <MobileLoginInput 
                  label="Contraseña" 
                  type={showPass ? 'text' : 'password'}
                  icon={<Lock size={18} />} 
                  placeholder="********"
                  value={form.password}
                  onChange={val => setForm({...form, password: val})}
                  rightElement={
                    <button 
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="text-white/20"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
                <div className="flex justify-end px-2">
                   <button type="button" className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-[#00d4ff] transition-colors">¿Olvidaste tu contraseña?</button>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-6 w-full h-18 bg-[#00d4ff] text-[#070B14] font-black uppercase tracking-[0.2em] rounded-3xl shadow-[0_12px_40px_rgba(0,212,255,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-[#070B14] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar Ahora</span>
                  <LogIn size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] font-black uppercase tracking-widest text-white/20">
            ¿No tenés una cuenta? {' '}
            <Link to="/register" className="text-[#00d4ff] hover:underline">Registrate gratis</Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

function MobileLoginInput({ label, icon, value, onChange, placeholder, type = "text", rightElement }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 pl-2">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20">
          {icon}
        </div>
        <input 
          type={type}
          className="w-full h-16 pl-14 pr-6 bg-white/[0.03] border border-white/10 rounded-2xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all placeholder:text-white/10"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {rightElement && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileLogin;
