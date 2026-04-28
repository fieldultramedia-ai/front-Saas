import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../store/useAppStore';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { GlassInputWrapper, SignInPage } from '../components/ui/sign-in';

export default function LoginPage() {
  const { login } = useAuth();
  const { addToast } = useAppStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null); // 'suspended' or 'deleted'

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'deleted') {
      setErrorStatus('deleted');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setErrorStatus(null);
      await login(email, password);
      const needsOnboarding = localStorage.getItem('leadbook_needs_onboarding');
      navigate(needsOnboarding ? '/onboarding' : '/dashboard');
      addToast({ type: 'success', title: '¡Bienvenido!', message: 'Inicio de sesión exitoso' });
    } catch (err) {
      const detail = err.response?.data?.detail || '';
      if (detail.includes('No active account found')) {
        setErrorStatus('suspended');
      } else {
        addToast({ type: 'error', title: 'Error', message: 'Email o contraseña incorrectos' });
      }
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
    <SignInPage
      title="Bienvenido de vuelta"
      description="Ingresá a tu cuenta de LeadBook para gestionar tus propiedades."
      heroImageSrc="/hero-bg.png"
      testimonials={sampleTestimonials}
      footerText="¿No tenés cuenta?"
      footerLinkText="Registrate gratis"
      footerAction={() => navigate('/register')}
      backAction={() => navigate('/landing')}
    >
      {errorStatus && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-red-200">
              {errorStatus === 'suspended' ? 'Cuenta Suspendida' : 'Cuenta Eliminada'}
            </p>
            <p className="text-xs text-red-300/80 leading-relaxed">
              {errorStatus === 'suspended' 
                ? 'Tu cuenta ha sido suspendida. Contactate con nosotros: soporte@leadbook.com.ar'
                : 'Tu cuenta ha sido eliminada. Contactate con nosotros: soporte@leadbook.com.ar'}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Email</label>
          <GlassInputWrapper>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                 type="email" placeholder="tu@email.com" 
                 className="w-full !bg-transparent text-sm p-4 pl-12 focus:outline-none !text-white" 
                 value={email} onChange={e => setEmail(e.target.value)} 
                 required
                 autoComplete="off"
              />
            </div>
          </GlassInputWrapper>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Contraseña</label>
            <button type="button" className="text-[11px] text-[#00d4ff] hover:underline">¿Olvidaste tu contraseña?</button>
          </div>
          <GlassInputWrapper>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                 type={showPass ? 'text' : 'password'} placeholder="Tu contraseña" 
                 className="w-full !bg-transparent text-sm p-4 pl-12 pr-12 focus:outline-none !text-white" 
                 value={password} onChange={e => setPassword(e.target.value)} 
                 required
                 autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </GlassInputWrapper>
        </div>

        <button 
           type="submit" 
           className="w-full bg-[#00d4ff] text-black font-bold py-4 rounded-2xl hover:bg-[#00b5d8] transition-all flex items-center justify-center gap-2 mt-4"
           disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesión"} <ArrowRight size={18} />
        </button>
      </form>
    </SignInPage>
  );
}
