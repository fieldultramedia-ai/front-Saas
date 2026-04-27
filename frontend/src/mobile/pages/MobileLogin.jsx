import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight,
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
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col font-['DM_Sans'] overflow-x-hidden">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[40%] bg-[#00d4ff]/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] bg-[#7c3aed]/10 blur-[100px] rounded-full" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 px-6 pt-10 pb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate('/landing')}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <Logo size="small" />
        <div className="w-10" />
      </div>

      <main className="relative z-10 flex-1 px-6 flex flex-col justify-center pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-10"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold font-['Syne'] tracking-tight mb-3">
              ¡Bienvenido <span className="text-[#00d4ff]">vuelve!</span>
            </h1>
            <p className="text-white/50 text-sm">Gestiona tus leads con la potencia de la IA.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#00d4ff]/70 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#00d4ff] transition-colors" />
                <input 
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00d4ff]/50 rounded-2xl p-4 pl-12 text-sm outline-none transition-all"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#00d4ff]/70">Contraseña</label>
                <button type="button" className="text-[10px] text-white/30 hover:text-[#00d4ff]">¿Olvidaste tu contraseña?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#00d4ff] transition-colors" />
                <input 
                  type={showPass ? 'text' : 'password'}
                  placeholder="Tu contraseña secreta"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00d4ff]/50 rounded-2xl p-4 pl-12 pr-12 text-sm outline-none transition-all"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-gradient-to-r from-[#00d4ff] to-[#00b5d8] text-[#070B14] font-bold py-4 rounded-2xl shadow-[0_8px_20px_rgba(0,212,255,0.2)] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#070B14] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Iniciar Sesión
                  <LogIn size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40">
            ¿No tienes una cuenta? {' '}
            <Link to="/register" className="text-[#00d4ff] font-bold hover:underline">Regístrate gratis</Link>
          </p>
        </motion.div>
      </main>

    </div>
  );
};

export default MobileLogin;
