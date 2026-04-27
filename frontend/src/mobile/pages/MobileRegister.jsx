import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { sendOTP, verifyOTP, registerApi } from '../../services/api';
import Logo from '../../components/Logo';
import TerminosModal from '../../components/modals/TerminosModal';
import PoliticaModal from '../../components/modals/PoliticaModal';
import { cn } from '../../lib/utils';

const validarEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return "Email inválido (evitá ñ o tildes)";
  }
  return "";
};

const MobileRegister = () => {
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPass, setShowPass] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [terminosModalOpen, setTerminosModalOpen] = useState(false);
  const [politicaModalOpen, setPoliticaModalOpen] = useState(false);
  
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpInputs = useRef([]);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const update = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'Tu nombre es necesario';
    if (!form.email.trim()) {
      e.email = 'El email es necesario';
    } else {
      const emailErr = validarEmail(form.email);
      if (emailErr) e.email = emailErr;
    }
    if (form.password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'No coinciden';
    if (!accepted) e.accepted = 'Aceptá los términos';
    return e;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setLoading(true);
    try {
      await sendOTP(form.email);
      addToast({ type: 'info', title: 'Código enviado', message: `Revisá ${form.email}` });
      setStep(2);
      setCountdown(60);
      setCanResend(false);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: err.message || 'No se pudo enviar el código.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) return;

    setLoading(true);
    try {
      await verifyOTP(form.email, code);
      const data = await registerApi(form.email, form.password, form.nombre, '', '');
      
      if (data.access && data.refresh) {
        localStorage.setItem('subzero_access', data.access);
        localStorage.setItem('subzero_refresh', data.refresh);
      }
      
      addToast({ type: 'success', title: '¡Bienvenido!', message: 'Cuenta creada con éxito.' });
      localStorage.setItem('leadbook_needs_onboarding', 'true');
      window.location.href = '/select-plan';
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: err.message || 'Código inválido.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) otpInputs.current[index + 1].focus();
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col overflow-x-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[100%] h-[50%] bg-[#00d4ff]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[100%] h-[50%] bg-[#7c3aed]/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Top Header */}
      <div className="relative z-10 px-6 pt-10 pb-6 flex items-center justify-between">
        <button 
          onClick={() => step === 2 ? setStep(1) : navigate('/landing')}
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white/40 flex items-center justify-center active:scale-90 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <Logo size="small" />
        <div className="w-12" />
      </div>

      <main className="relative z-10 flex-1 px-8 pb-20">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-10 mt-8"
            >
              <div className="text-left">
                <h1 className="text-5xl font-black font-syne tracking-tighter italic leading-none mb-4 uppercase">
                  UNITE A LA<br/><span className="text-[#00d4ff]">ÉLITE.</span>
                </h1>
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Comenzá tu evolución inmobiliaria hoy</p>
              </div>

              <form onSubmit={handleSubmitForm} className="flex flex-col gap-6">
                <MobileRegInput 
                  label="Nombre Completo" 
                  icon={<User size={18} />} 
                  placeholder="Ej: Juan Pérez"
                  value={form.nombre}
                  onChange={val => update('nombre', val)}
                  error={errors.nombre}
                />

                <MobileRegInput 
                  label="Email Corporativo" 
                  icon={<Mail size={18} />} 
                  placeholder="tu@agencia.com"
                  value={form.email}
                  onChange={val => update('email', val)}
                  error={errors.email}
                />

                <MobileRegInput 
                  label="Contraseña" 
                  type={showPass ? 'text' : 'password'}
                  icon={<Lock size={18} />} 
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={val => update('password', val)}
                  error={errors.password}
                  rightElement={
                    <button type="button" onClick={() => setShowPass(!showPass)} className="text-white/20">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                <MobileRegInput 
                  label="Confirmar Contraseña" 
                  type={showPass ? 'text' : 'password'}
                  icon={<Lock size={18} />} 
                  placeholder="Reingresá tu clave"
                  value={form.confirmPassword}
                  onChange={val => update('confirmPassword', val)}
                  error={errors.confirmPassword}
                />

                {/* Terms */}
                <div className="flex items-start gap-3 mt-2">
                  <button 
                    type="button"
                    onClick={() => setAccepted(!accepted)}
                    className={cn(
                      "mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-all",
                      accepted ? 'bg-[#00d4ff] border-[#00d4ff]' : 'border-white/10 bg-white/5'
                    )}
                  >
                    {accepted && <CheckCircle2 size={16} className="text-[#070B14] stroke-[3]" />}
                  </button>
                  <p className="text-[10px] text-white/30 leading-relaxed font-bold uppercase tracking-tight">
                    Acepto los{' '}
                    <button type="button" onClick={() => setTerminosModalOpen(true)} className="text-[#00d4ff] underline">Términos</button>{' '}
                    y la{' '}
                    <button type="button" onClick={() => setPoliticaModalOpen(true)} className="text-[#00d4ff] underline">Privacidad</button>.
                  </p>
                </div>
                {errors.accepted && <span className="text-red-400 text-[10px] ml-1 uppercase font-black">{errors.accepted}</span>}

                <button 
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full h-18 bg-[#00d4ff] text-[#070B14] font-black uppercase tracking-[0.2em] rounded-3xl shadow-[0_12px_40px_rgba(0,212,255,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-[#070B14] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Registrarme</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-[10px] font-black uppercase tracking-widest text-white/20 pb-10">
                ¿Ya tenés una cuenta? {' '}
                <Link to="/login" className="text-[#00d4ff] hover:underline">Iniciá sesión</Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col gap-10 mt-12"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-[#00d4ff]/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-[#00d4ff]/20 relative">
                   <div className="absolute inset-0 bg-[#00d4ff]/20 blur-2xl rounded-full animate-pulse" />
                   <ShieldCheck size={48} className="text-[#00d4ff] relative z-10" />
                </div>
                <h1 className="text-4xl font-black font-syne uppercase italic tracking-tighter mb-4">VERIFICÁ<br/><span className="text-[#00d4ff]">TU EMAIL</span></h1>
                <p className="text-white/30 text-[10px] font-black uppercase tracking-widest max-w-[200px] mx-auto">
                  Enviamos un código a {form.email}
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-10">
                <div className="flex justify-between gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={el => otpInputs.current[idx] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(idx, e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Backspace' && !otp[idx] && idx > 0) otpInputs.current[idx - 1].focus();
                      }}
                      className={cn(
                        "w-full h-18 bg-white/5 border-2 rounded-2xl text-center text-2xl font-black font-syne outline-none transition-all",
                        digit ? 'border-[#00d4ff] text-[#00d4ff]' : 'border-white/10 text-white'
                      )}
                    />
                  ))}
                </div>

                <div className="space-y-6">
                  <button 
                    type="submit"
                    disabled={loading || otp.join('').length < 6}
                    className="w-full h-18 bg-[#00d4ff] text-[#070B14] font-black uppercase tracking-[0.2em] rounded-3xl shadow-[0_12px_40px_rgba(0,212,255,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-3 border-[#070B14] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Verificar Código'
                    )}
                  </button>

                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Reenviar en {countdown}s</p>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => {
                          setCountdown(60);
                          setCanResend(false);
                          sendOTP(form.email);
                        }}
                        className="text-[#00d4ff] text-[10px] font-black uppercase tracking-[0.2em] hover:underline"
                      >
                        Reenviar código ahora
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <TerminosModal isOpen={terminosModalOpen} onClose={() => setTerminosModalOpen(false)} />
      <PoliticaModal isOpen={politicaModalOpen} onClose={() => setPoliticaModalOpen(false)} />
    </div>
  );
};

function MobileRegInput({ label, icon, value, onChange, placeholder, type = "text", error, rightElement }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 pl-2">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20">
          {icon}
        </div>
        <input 
          type={type}
          className={cn(
            "w-full h-16 pl-14 pr-6 bg-white/[0.03] border rounded-2xl text-sm text-white focus:border-[#00d4ff] outline-none transition-all placeholder:text-white/10",
            error ? 'border-red-500/50 animate-shake' : 'border-white/10'
          )}
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
      {error && <span className="text-red-400 text-[9px] font-black uppercase tracking-widest ml-2">{error}</span>}
    </div>
  );
}

export default MobileRegister;
