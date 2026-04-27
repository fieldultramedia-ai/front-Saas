import { useLocation, Link } from 'react-router-dom';
import LandingNavbar from '../components/landing/LandingNavbar';
import PricingSection from '../components/landing/PricingSection';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function PreciosPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkoutStatus = searchParams.get('checkout');

  return (
    <div className="min-h-screen bg-[#070B14] overflow-x-hidden">
      <LandingNavbar seccionActiva="precios" setSeccionActiva={() => {}} />
      
      <div className="pt-20">
        <AnimatePresence>
          {checkoutStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-2xl px-4 mb-8"
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
              className="mx-auto max-w-2xl px-4 mb-8"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3">
                <XCircle className="text-red-500" size={20} />
                <span className="text-white text-sm font-medium">El pago fue cancelado. Podés intentarlo nuevamente.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PricingSection />

      {/* Simplified Footer */}
      <footer className="py-20 text-center border-t border-white/5">
        <p className="text-white/20 text-xs uppercase tracking-[0.2em] font-bold">
          © 2026 LeadBook · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
