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
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col font-['DM_Sans'] overflow-x-hidden">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[40%] bg-[#00d4ff]/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[40%] bg-[#7c3aed]/10 blur-[100px] rounded-full" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 px-6 pt-10 pb-6 flex items-center justify-between">
        <button 
          onClick={() => step === 2 ? setStep(1) : navigate('/landing')}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <Logo size="small" />
        <div className="w-10" /> {/* Spacer */}
      </div>

      <main className="relative z-10 flex-1 px-6 pb-12">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h1 className="text-3xl font-bold font-['Syne'] tracking-tight mb-2">
                  Creá tu <span className="text-[#00d4ff]">cuenta</span>
                </h1>
                <p className="text-white/50 text-sm">Empieza tu evolución inmobiliaria hoy.</p>
              </div>

              <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
                {/* Nombre */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#00d4ff]/70 ml-1">Nombre Completo</label>
                  <div className={`relative group ${errors.nombre ? 'animate-shake' : ''}`}>
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#00d4ff] transition-colors" />
                    <input 
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      className={`w-full bg-white/5 border ${errors.nombre ? 'border-red-500/50' : 'border-white/10'} focus:border-[#00d4ff]/50 rounded-2xl p-4 pl-12 text-sm outline-none transition-all placeholder:text-white/20`}
                      value={form.nombre}
                      onChange={e => update('nombre', e.target.value)}
                    />
                  </div>
                  {errors.nombre && <span className="text-red-400 text-[10px] ml-1">{errors.nombre}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#00d4ff]/70 ml-1">Email Corporativo</label>
                  <div className={`relative group ${errors.email ? 'animate-shake' : ''}`}>
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#00d4ff] transition-colors" />
                    <input 
                      type="email"
                      placeholder="nombre@empresa.com"
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-[#00d4ff]/50 rounded-2xl p-4 pl-12 text-sm outline-none transition-all placeholder:text-white/20`}
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                    />
                  </div>
                  {errors.email && <span className="text-red-400 text-[10px] ml-1">{errors.email}</span>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#00d4ff]/70 ml-1">Contraseña</label>
                  <div className={`relative group ${errors.password ? 'animate-shake' : ''}`}>
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#00d4ff] transition-colors" />
                    <input 
                      type={showPass ? 'text' : 'password'}
                      placeholder="Mínimo 8 caracteres"
                      className={`w-full bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} focus:border-[#00d4ff]/50 rounded-2xl p-4 pl-12 pr-12 text-sm outline-none transition-all placeholder:text-white/20`}
                      value={form.password}
                      onChange={e => update('password', e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <span className="text-red-400 text-[10px] ml-1">{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#00d4ff]/70 ml-1">Confirmar Contraseña</label>
                  <div className={`relative group ${errors.confirmPassword ? 'animate-shake' : ''}`}>
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#00d4ff] transition-colors" />
                    <input 
                      type={showPass ? 'text' : 'password'}
                      placeholder="Repetí tu contraseña"
                      className={`w-full bg-white/5 border ${errors.confirmPassword ? 'border-red-500/50' : 'border-white/10'} focus:border-[#00d4ff]/50 rounded-2xl p-4 pl-12 pr-12 text-sm outline-none transition-all placeholder:text-white/20`}
                      value={form.confirmPassword}
                      onChange={e => update('confirmPassword', e.target.value)}
                    />
                  </div>
                  {errors.confirmPassword && <span className="text-red-400 text-[10px] ml-1">{errors.confirmPassword}</span>}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 mt-2 px-1">
                  <button 
                    type="button"
                    onClick={() => setAccepted(!accepted)}
                    className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${accepted ? 'bg-[#00d4ff] border-[#00d4ff]' : 'border-white/20 bg-white/5'}`}
                  >
                    {accepted && <CheckCircle2 size={14} className="text-[#070B14]" />}
                  </button>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    Al registrarme, acepto los{' '}
                    <button 
                      type="button" 
                      onClick={() => setTerminosModalOpen(true)}
                      className="text-[#00d4ff] underline underline-offset-2"
                    >
                      Términos de Servicio
                    </button>{' '}
                    y la{' '}
                    <button 
                      type="button" 
                      onClick={() => setPoliticaModalOpen(true)}
                      className="text-[#00d4ff] underline underline-offset-2"
                    >
                      Política de Privacidad
                    </button>{' '}
                    de LeadBook.
                  </p>
                </div>
                {errors.accepted && <span className="text-red-400 text-[10px] ml-1">{errors.accepted}</span>}

                <button 
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-gradient-to-r from-[#00d4ff] to-[#00b5d8] text-[#070B14] font-bold py-4 rounded-2xl shadow-[0_8px_20px_rgba(0,212,255,0.2)] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-[#070B14] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Registrarme ahora
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-white/40">
                ¿Ya tienes una cuenta? {' '}
                <Link to="/login" className="text-[#00d4ff] font-bold hover:underline">Inicia sesión</Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00d4ff]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#00d4ff]/20">
                  <ShieldCheck size={32} className="text-[#00d4ff]" />
                </div>
                <h1 className="text-3xl font-bold font-['Syne'] mb-2">Verificá tu <span className="text-[#00d4ff]">email</span></h1>
                <p className="text-white/50 text-sm max-w-[280px] mx-auto">
                  Enviamos un código de 6 dígitos a <span className="text-white">{form.email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-8">
                <div className="flex justify-between gap-2">
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
                      className={`w-11 h-14 bg-white/5 border-2 ${digit ? 'border-[#00d4ff]' : 'border-white/10'} focus:border-[#00d4ff] rounded-xl text-center text-xl font-bold font-['Syne'] outline-none transition-all`}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    type="submit"
                    disabled={loading || otp.join('').length < 6}
                    className="w-full bg-[#00d4ff] text-[#070B14] font-bold py-4 rounded-2xl shadow-[0_8px_20px_rgba(0,212,255,0.2)] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-[#070B14] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Verificar código'
                    )}
                  </button>

                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-white/30 text-xs">Reenviar código en {countdown}s</p>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => {
                          setCountdown(60);
                          setCanResend(false);
                          sendOTP(form.email);
                        }}
                        className="text-[#00d4ff] text-xs font-bold hover:underline"
                      >
                        Reenviar código ahora
                      </button>
                    )}
                  </div>
                </div>
              </form>

              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="text-red-400 shrink-0" size={18} />
                <p className="text-[11px] text-red-200/70 leading-relaxed">
                  Si no recibiste el código, revisá tu carpeta de <strong>Spam</strong> o asegurate de haber escrito bien tu email.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <TerminosModal isOpen={terminosModalOpen} onClose={() => setTerminosModalOpen(false)} />
      <PoliticaModal isOpen={politicaModalOpen} onClose={() => setPoliticaModalOpen(false)} />
    </div>
  );
};

export default MobileRegister;
