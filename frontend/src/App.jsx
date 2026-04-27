import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { FormProvider } from './context/FormContext';

// Layouts
import AppLayout from './layouts/AppLayout';

// Páginas públicas
import LandingPage   from './pages/LandingPage';
import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import PreciosPage   from './pages/PreciosPage';
import DeviceOnboardingPage from './pages/DeviceOnboardingPage';

// Páginas protegidas
import DashboardPage  from './pages/DashboardPage';
import NuevoPage      from './pages/NuevoPage';
import HistorialPage  from './pages/HistorialPage';
import ResultadosPage from './pages/ResultadosPage';
import CuentaPage     from './pages/CuentaPage';
import ConexionesPage from './pages/ConexionesPage';
import OnboardingPage from './pages/OnboardingPage';
import AdminPage      from './pages/AdminPage';
import SelectPlanPage from './pages/SelectPlanPage';
import RecuperarPasswordPage from './pages/RecuperarPasswordPage';
import PagoExitosoPage from './pages/PagoExitosoPage';
import PagoFallidoPage from './pages/PagoFallidoPage';
import TerminosPage    from './pages/TerminosPage';

// Componente de ruta protegida
function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#020408' }}>
        <div className="animate-spin" style={{ width:32, height:32, border:'2px solid rgba(255,255,255,0.1)', borderTop:'2px solid #00d4ff', borderRadius:'50%' }} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const planSeleccionado = user?.plan_seleccionado || 
    (() => {
      try {
        const stored = localStorage.getItem('subzero_user');
        return stored ? JSON.parse(stored)?.plan_seleccionado : null;
      } catch (e) { return null; }
    })()

  const estaEnOnboarding = location.pathname === '/onboarding'
  const vieneDeMP = location.search.includes('pago=')

  if (!planSeleccionado && !estaEnOnboarding && !vieneDeMP) {
    return <Navigate to="/onboarding" replace />
  }

  return <Outlet />
}

// Componente de ruta pública
function PublicRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

// Componente de ruta para admin
function AdminRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user || !user.is_staff) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

// Components
import RotationWrapper from './components/layout/RotationWrapper';
// Mobile detection
import MobileRouter from './mobile/router/MobileRouter';

function AppContent() {
  const location = useLocation();
  const isLandingPath = location.pathname === '/landing';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;

  if (isMobile && location.pathname !== '/') {
    return <MobileRouter />;
  }

  return (
    <RotationWrapper>
      {!isMobile && (location.pathname === '/' || isLandingPath) && (
        <div 
          style={{ 
            position: 'fixed',
            inset: 0,
            zIndex: isLandingPath ? 1000 : -1000,
            opacity: isLandingPath ? 1 : 0,
            visibility: isLandingPath ? 'visible' : 'hidden',
            pointerEvents: isLandingPath ? 'auto' : 'none',
            transition: 'opacity 0.8s ease-in-out',
            background: '#000'
          }}
        >
          <LandingPage />
        </div>
      )}

      <Routes>
        {/* Públicas */}
        <Route path="/" element={<DeviceOnboardingPage />} />
        <Route path="/landing" element={<div style={{ height: '100vh', background: '#000' }} />} />
        <Route path="/precios" element={<PreciosPage />} />
        
        <Route element={<PublicRoute />}>
          <Route path="/login"   element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recuperar-password" element={<RecuperarPasswordPage />} />
        </Route>

        <Route path="/terminos" element={<TerminosPage />} />

        {/* Protegidas (Sin AppLayout) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/pago-exitoso" element={<PagoExitosoPage />} />
          <Route path="/pago-fallido" element={<PagoFallidoPage />} />
          <Route path="/pago-pendiente" element={<PagoExitosoPage />} />
          <Route path="/select-plan" element={<SelectPlanPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          
          <Route element={<FormProvider><Outlet /></FormProvider>}>
            <Route path="/nuevo" element={<NuevoPage />} />
            <Route path="/resultados" element={<ResultadosPage />} />
          </Route>
        </Route>

        {/* Protegidas (Con AppLayout) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<FormProvider><AppLayout /></FormProvider>}>
            <Route path="/dashboard"   element={<DashboardPage />} />
            <Route path="/historial"   element={<HistorialPage />} />
            <Route path="/cuenta"      element={<CuentaPage />} />
            <Route path="/conexiones"  element={<ConexionesPage />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<AdminRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </RotationWrapper>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
