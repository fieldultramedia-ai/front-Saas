import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../store/useAppStore';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import TerminosModal from '../components/modals/TerminosModal';
import PoliticaModal from '../components/modals/PoliticaModal';
import { sendOTP, verifyOTP, registerApi } from '../services/api';
import { GlassInputWrapper, SignInPage } from '../components/ui/sign-in';

const validarEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return "Ingresá un email válido (sin caracteres especiales como ñ o tildes)";
  }
  return "";
};

function PasswordStrength({ password }) {
  const getStrength = (p) => {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };
  const strength = getStrength(password);
  const colors = ['', 'var(--error)', 'var(--warning)', '#EAB308', 'var(--success)'];
  const labels = ['', 'Muy débil', 'Débil', 'Buena', 'Fuerte'];
  if (!password) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display:'flex', gap:4, marginBottom:6 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            flex:1, height:3, borderRadius:2,
            background: i <= strength ? colors[strength] : 'rgba(255,255,255,0.1)',
            transition: 'background 0.3s ease',
          }} />
        ))}
      </div>
      <span style={{ fontFamily:'DM Sans', fontSize:11, color: colors[strength] }}>{labels[strength]}</span>
    </div>
  );
}

import WelcomeScreen from '../components/WelcomeScreen';

export default function RegisterPage() {
  const { addToast } = useAppStore();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  
  // ... rest of state stays the same
  // ... (rest of the state)
  const [form, setForm] = useState({ nombre:'', email:'', password:'', confirmPassword:'' });
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
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const update = (field, val) => { 
    setForm(prev => ({ ...prev, [field]: val })); 
    setErrors(prev => ({ ...prev, [field]:'' })); 
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido';
    if (!form.email.trim()) {
      e.email = 'El email es requerido';
    } else {
      const emailErr = validarEmail(form.email);
      if (emailErr) e.email = emailErr;
    }
    if (form.password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    if (!accepted) e.accepted = 'Debés aceptar los términos';
    return e;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    
    setLoading(true);
    try {
      await sendOTP(form.email);
      addToast({ type:'info', title:'Código enviado', message:`Enviamos un código a ${form.email}` });
      setStep(2);
    } catch (err) {
      if (err.message.includes('ya está registrado') || err.message.includes('ALREADY_REGISTERED')) {
        setErrors(prev => ({ ...prev, email: 'Este email ya está registrado.' }));
        addToast({ type: 'warning', title: 'Cuenta existente', message: 'Este email ya está registrado. Podés iniciar sesión.' });
      } else {
        addToast({ type:'error', title:'Error', message: err.message || 'No se pudo enviar el código.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e, forcedCode = null) => {
    if (e) e.preventDefault();
    const code = forcedCode || otp.join('');
    if (code.length < 6) return;

    setLoading(true);
    try {
      await verifyOTP(form.email, code);
      const data = await registerApi(form.email, form.password, form.nombre, '', '');
      
      if (data.access) {
        localStorage.setItem('subzero_access', data.access);
        localStorage.setItem('subzero_refresh', data.refresh);
        localStorage.setItem('subzero_user', JSON.stringify(data.user || {}));
        // Forzar que necesita onboarding
        localStorage.setItem('leadbook_needs_onboarding', 'true');
      }
      
      // Navegar directamente al onboarding (que ya tiene su propio WelcomeScreen)
      window.location.href = '/onboarding';

    } catch (err) {
      addToast({ type:'error', title:'Error de verificación', message: err.message || 'Código inválido.' });
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      await sendOTP(form.email);
      setCountdown(60);
      setCanResend(false);
      addToast({ type:'info', title:'Código reenviado' });
    } catch (err) {
      addToast({ type:'error', title:'Error' });
    } finally {
      setLoading(false);
    }
  };

  const sampleTestimonials = [
    {
      avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
      name: "Sofia M.",
      role: "Agente Inmobiliaria",
      text: "LeadBook transformó cómo trabajo. Textos impecables y la experiencia en la app es ultra premium."
    },
    {
      avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Carlos R.",
      role: "Broker Principal",
      text: "La velocidad de respuesta es increíble. Mis clientes aman los PDFs y la claridad de los copys."
    },
    {
      avatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Elena V.",
      role: "Marketing Manager",
      text: "No puedo creer que la IA escriba tan bien. Ahorro horas de copy y diseño cada semana."
    },
  ];

  return (
    <>
      <SignInPage
        title={step === 1 ? "Creá tu cuenta" : "Verificá tu email"}
        description={step === 1 ? "Empezá gratis y potencia tus ventas con IA." : `Enviamos un código a ${form.email}`}
        heroImageSrc="/hero-bg.png"
        testimonials={sampleTestimonials}
        footerText="¿Ya tenés cuenta?"
        footerLinkText="Iniciá sesión"
        footerAction={() => navigate('/login')}
        backAction={() => navigate('/landing')}
      >
        {step === 1 ? (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            {/* ... form content ... */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Nombre Completo</label>
              <GlassInputWrapper>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input 
                       type="text" placeholder="Tu nombre" 
                       className="w-full !bg-transparent text-sm p-4 pl-12 focus:outline-none !text-white" 
                       value={form.nombre} onChange={e => update('nombre', e.target.value)} 
                       autoComplete="off"
                    />
                </div>
              </GlassInputWrapper>
              {errors.nombre && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.nombre}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Email</label>
              <GlassInputWrapper>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input 
                     type="email" placeholder="tu@email.com" 
                     className="w-full !bg-transparent text-sm p-4 pl-12 focus:outline-none !text-white" 
                     value={form.email} onChange={e => update('email', e.target.value)} 
                     autoComplete="off"
                  />
                </div>
              </GlassInputWrapper>
              {errors.email && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Contraseña</label>
              <GlassInputWrapper>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input 
                     type={showPass ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" 
                     className="w-full !bg-transparent text-sm p-4 pl-12 pr-12 focus:outline-none !text-white" 
                     value={form.password} onChange={e => update('password', e.target.value)} 
                     autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </GlassInputWrapper>
              <PasswordStrength password={form.password} />
            </div>

            <div className="space-y-1">
               <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Confirmar Contraseña</label>
               <GlassInputWrapper>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input 
                       type={showPass ? 'text' : 'password'} placeholder="Repetí la contraseña" 
                       className="w-full !bg-transparent text-sm p-4 pl-12 focus:outline-none !text-white" 
                       value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} 
                       autoComplete="new-password"
                    />
                  </div>
               </GlassInputWrapper>
               {errors.confirmPassword && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-3 py-2">
              <input 
                 type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)}
                 className="mt-1 accent-[#00d4ff]"
              />
              <p className="text-[12px] text-white/60 leading-relaxed">
                Acepto los <button type="button" onClick={() => setTerminosModalOpen(true)} className="text-[#00d4ff] hover:underline">Términos</button> y la <button type="button" onClick={() => setPoliticaModalOpen(true)} className="text-[#00d4ff] hover:underline">Política de privacidad</button>.
              </p>
            </div>
            {errors.accepted && <p className="text-red-400 text-[10px] mt-1">{errors.accepted}</p>}

            <button 
               type="submit" 
               className="w-full bg-[#00d4ff] text-black font-bold py-4 rounded-2xl hover:bg-[#00b5d8] transition-all flex items-center justify-center gap-2"
               disabled={loading}
            >
              {loading ? "Enviando..." : "Crear cuenta gratis"} <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => otpInputs.current[idx] = el}
                  type="text"
                  maxLength={1}
                  className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-bold text-white focus:border-[#00d4ff] focus:outline-none"
                  value={digit}
                  onChange={e => {
                    const val = e.target.value.slice(-1);
                    if (val && !/^\d+$/.test(val)) return; // Solo números
                    
                    const newOtp = [...otp];
                    newOtp[idx] = val;
                    setOtp(newOtp);
                    
                    // Auto-focus al siguiente
                    if (val && idx < 5) {
                      otpInputs.current[idx+1].focus();
                    }

                    // Auto-verificar si completó los 6
                    const fullCode = newOtp.join('');
                    if (fullCode.length === 6) {
                      // Pequeño delay para que el usuario vea el último número puesto
                      setTimeout(() => handleVerifyOtp(null, fullCode), 100);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                      otpInputs.current[idx-1].focus();
                    }
                  }}
                  onPaste={e => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData('text').trim();
                    if (!/^\d+$/.test(pastedText)) return;
                    
                    const digits = pastedText.slice(0, 6).split('');
                    const newOtp = [...otp];
                    digits.forEach((char, i) => {
                      if (i < 6) newOtp[i] = char;
                    });
                    setOtp(newOtp);

                    // Focus al último dígito pegado o al siguiente disponible
                    const nextIdx = Math.min(digits.length, 5);
                    otpInputs.current[nextIdx].focus();

                    if (newOtp.join('').length === 6) {
                      setTimeout(() => handleVerifyOtp(null, newOtp.join('')), 100);
                    }
                  }}
                />
              ))}
            </div>
            <button 
               onClick={handleVerifyOtp}
               className="w-full bg-[#00d4ff] text-black font-bold py-4 rounded-2xl hover:bg-[#00b5d8] transition-all"
               disabled={loading || otp.join('').length < 6}
            >
              {loading ? "Verificando..." : "Verificar código"}
            </button>
            <div className="text-center">
               {countdown > 0 ? (
                 <p className="text-sm text-white/40">Reenviar en {countdown}s</p>
               ) : (
                 <button onClick={handleResendOtp} className="text-[#00d4ff] text-sm font-medium">Reenviar código</button>
               )}
            </div>
            <button onClick={() => setStep(1)} className="w-full text-white/40 text-sm hover:text-white transition-colors">Volver a editar datos</button>
          </div>
        )}

      <TerminosModal isOpen={terminosModalOpen} onClose={() => setTerminosModalOpen(false)} />
      <PoliticaModal isOpen={politicaModalOpen} onClose={() => setPoliticaModalOpen(false)} />
    </SignInPage>
    </>
  );
}
