import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Layout
import MobileLayout from '../layout/MobileLayout';

// Pages
import MobileLanding from '../pages/MobileLanding';
import MobileLogin from '../pages/MobileLogin';
import MobileRegister from '../pages/MobileRegister';
import MobileDashboard from '../pages/MobileDashboard';
import MobileNuevo from '../pages/MobileNuevo';
import MobileHistorial from '../pages/MobileHistorial';
import MobileResultados from '../pages/MobileResultados';
import MobileCuenta from '../pages/MobileCuenta';
import MobileOnboarding from '../pages/MobileOnboarding';
import MobileSelectPlan from '../pages/MobileSelectPlan';
import MobilePagoExitoso from '../pages/MobilePagoExitoso';
import MobilePagoFallido from '../pages/MobilePagoFallido';
import MobilePagoPendiente from '../pages/MobilePagoPendiente';
import MobileConexiones from '../pages/MobileConexiones';

// Componente de ruta protegida
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00d4ff]"></div>
    </div>
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const planSeleccionado = user?.plan_seleccionado || 
    (localStorage.getItem('subzero_user') && 
     JSON.parse(localStorage.getItem('subzero_user')).plan_seleccionado);

  const estaEnSelectPlan = location.pathname === '/select-plan';
  const estaEnOnboarding = location.pathname === '/onboarding';
  const vieneDeMP = location.search.includes('pago=');

  if (!planSeleccionado && !estaEnOnboarding && !vieneDeMP) {
    return <Navigate to="/onboarding" replace />;
  }

  const needsOnboarding = localStorage.getItem('leadbook_needs_onboarding') === 'true';

  if (planSeleccionado && needsOnboarding && !estaEnOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

// Componente de ruta pública
function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/mobile" replace />;
  return children;
}

export const MobileRouter = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<MobileLanding />} />
      <Route path="/landing" element={<MobileLanding />} />
      <Route path="/login" element={<PublicRoute><MobileLogin /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><MobileRegister /></PublicRoute>} />
      
      {/* Pagos */}
      <Route path="/pago-exitoso" element={<ProtectedRoute><MobilePagoExitoso /></ProtectedRoute>} />
      <Route path="/pago-fallido" element={<ProtectedRoute><MobilePagoFallido /></ProtectedRoute>} />
      <Route path="/pago-pendiente" element={<ProtectedRoute><MobilePagoPendiente /></ProtectedRoute>} />

      {/* Selección de Plan */}
      <Route path="/select-plan" element={<ProtectedRoute><MobileSelectPlan /></ProtectedRoute>} />

      {/* Onboarding */}
      <Route path="/onboarding" element={<ProtectedRoute><MobileOnboarding /></ProtectedRoute>} />

      {/* Conexiones direct desktop path on mobile */}
      <Route path="/conexiones" element={<ProtectedRoute><MobileLayout><MobileConexiones /></MobileLayout></ProtectedRoute>} />

      {/* Protegidas con Layout y prefijo /mobile */}
      <Route element={<ProtectedRoute><MobileLayout /></ProtectedRoute>}>
        <Route path="/mobile" element={<MobileDashboard />} />
        <Route path="/mobile/nuevo" element={<MobileNuevo />} />
        <Route path="/mobile/historial" element={<MobileHistorial />} />
        <Route path="/mobile/resultados" element={<MobileResultados />} />
        <Route path="/mobile/cuenta" element={<MobileCuenta />} />
        <Route path="/mobile/conexiones" element={<MobileConexiones />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default MobileRouter;
