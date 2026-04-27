import { useLocation, Link } from 'react-router-dom';
import LandingNavbar from '../components/landing/LandingNavbar';
import AppNavbar from '../components/AppNavbar';
import PricingSection from '../components/landing/PricingSection';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PreciosPage() {
  const { user } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkoutStatus = searchParams.get('checkout');

  return (
    <div className={`min-h-screen ${user ? 'premium-gradient-bg' : 'bg-[#070B14]'} overflow-x-hidden scrollbar-hide relative`}>
      {/* Decorative Orbs — only when logged in */}
      {user && (
        <>
          <div className="orb orb-accent" style={{ width: 400, height: 400, top: -100, right: -100, opacity: 0.03, position: 'fixed' }} />
          <div className="orb orb-violet" style={{ width: 400, height: 400, bottom: -100, left: -100, opacity: 0.03, position: 'fixed' }} />
        </>
      )}

      {user ? (
        <AppNavbar />
      ) : (
        <LandingNavbar seccionActiva="precios" setSeccionActiva={() => {}} />
      )}
      
      <AnimatePresence>
        {(checkoutStatus === 'success' || checkoutStatus === 'cancelled') && (
          <div className={user ? "pt-24" : "pt-20"}>
            {checkoutStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mx-auto max-w-2xl px-4 mb-8 relative z-20"
              >
                <div className="bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#00D4FF]" size={20} />
                    <span className="text-white text-sm font-medium">¡Suscripción activada correctamente!</span>
                  </div>
                  <Link to="/dashboard" className="bg-[#00D4FF] text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#00b5d8] transition-all">
                    Ir al Dashboard
                  </Link>
                </div>
              </motion.div>
            )}
            
            {checkoutStatus === 'cancelled' && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mx-auto max-w-2xl px-4 mb-8 relative z-20"
              >
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3">
                  <XCircle className="text-red-500" size={20} />
                  <span className="text-white text-sm font-medium">El pago fue cancelado. Podés intentarlo nuevamente.</span>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <PricingSection />
      </div>

      {/* Simplified Footer */}
      <footer className="py-20 text-center border-t border-white/5 relative z-10">
        <p className="text-white/20 text-xs uppercase tracking-[0.2em] font-bold">
          © 2026 LeadBook · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
