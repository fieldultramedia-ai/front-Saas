import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { ChevronLeft, X, Home, DollarSign, List, Video, FileText, Camera, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Step01 from '../components/steps/Step01';
import Step02 from '../components/steps/Step02';
import Step03 from '../components/steps/Step03';
import Step04 from '../components/steps/Step04';
import Step05 from '../components/steps/Step05';
import Step06 from '../components/steps/Step06';
import Step07 from '../components/steps/Step07';

const STEPS = [
  { number: 1, label: 'Producto', icon: <Home size={16} /> },
  { number: 2, label: 'Precio', icon: <DollarSign size={16} /> },
  { number: 3, label: 'Detalles', icon: <List size={16} /> },
  { number: 4, label: 'Video', icon: <Video size={16} /> },
  { number: 5, label: 'Guión', icon: <FileText size={16} /> },
  { number: 6, label: 'Fotos', icon: <Camera size={16} /> },
  { number: 7, label: 'Contacto', icon: <User size={16} /> },
];

export default function NuevoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, updateFormData, resetForm } = useFormContext();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const draft = localStorage.getItem('subzero_draft');
    const draftStep = localStorage.getItem('subzeroCurrentStep');
    if (!draft && !draftStep) {
      resetForm();
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plantilla = params.get('plantilla');

    if (plantilla) {
      resetForm();
      const prefills = {
        inmobiliaria: { tipoPropiedad: 'Inmueble', tono: 'acogedor', tipoVideo: 'tour' },
        ecommerce:    { tipoPropiedad: 'Producto', tono: 'comercial', tipoVideo: 'reel' },
        servicios:    { tipoPropiedad: 'Consultoría', tono: 'profesional', tipoVideo: 'tour' },
        reel:         { tipoPropiedad: 'Producto', tono: 'energetico', tipoVideo: 'reel' }
      };
      if (prefills[plantilla]) updateFormData(prefills[plantilla]);
    } else if (location.state?.prefill) {
      resetForm();
      updateFormData(location.state.prefill);
    }

    if (location.state?.fromDraft) {
      const draft = JSON.parse(localStorage.getItem('subzero_draft') || 'null');
      if (draft) {
        updateFormData(draft);
        setCurrentStep(draft._paso || 1);
      }
    }
  }, [location.search, location.state]);

  useEffect(() => {
    if (currentStep > 1) {
      localStorage.setItem('subzero_draft', JSON.stringify({ ...formData, incompleto: true, _paso: currentStep }));
    }
  }, [formData, currentStep]);

  const goNext = () => {
    if (currentStep < 7) setCurrentStep(prev => prev + 1);
    const scrollContainer = document.getElementById('wizard-scroll-container');
    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    const scrollContainer = document.getElementById('wizard-scroll-container');
    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSalir = () => {
    navigate('/dashboard');
  };

  const handleGenerarListado = () => {
    localStorage.removeItem('subzero_draft');
    navigate('/resultados');
  };

  const pct = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  const stepComponents = {
    1: <Step01 onNext={goNext} />,
    2: <Step02 onNext={goNext} onPrev={goPrev} />,
    3: <Step03 onNext={goNext} onPrev={goPrev} />,
    4: <Step04 onNext={goNext} onPrev={goPrev} />,
    5: <Step05 onNext={goNext} onPrev={goPrev} />,
    6: <Step06 onNext={goNext} onPrev={goPrev} />,
    7: <Step07 onPrev={goPrev} onGenerar={handleGenerarListado} />,
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#030303] text-zinc-100 font-sans selection:bg-blue-500/30 flex flex-col">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Fixed Header with Glassmorphism */}
      <header className="shrink-0 z-[100] bg-[#030303]/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={currentStep === 1 ? handleSalir : goPrev}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
          >
            <div className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all">
              <ChevronLeft size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">{currentStep === 1 ? 'Salir' : 'Atrás'}</span>
          </button>

          {/* Stepper for Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {STEPS.map((step, i) => {
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep;
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300
                    ${isActive ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 
                      isCompleted ? 'text-emerald-400' : 'text-zinc-500'}
                  `}>
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black
                      ${isActive ? 'bg-blue-500 text-white' : 
                        isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-900 text-zinc-600 border border-zinc-800'}
                    `}>
                      {isCompleted ? '✓' : step.number}
                    </div>
                    {isActive && <span className="text-xs font-bold uppercase tracking-tight">{step.label}</span>}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-4 h-px mx-1 ${isCompleted ? 'bg-emerald-500/20' : 'bg-zinc-800'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Step Indicator */}
          <div className="md:hidden flex flex-col items-center">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Paso {currentStep} de 7</span>
            <span className="text-xs font-medium text-white">{STEPS[currentStep - 1].label}</span>
          </div>

          <button onClick={handleSalir} className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Global Progress Line */}
        <div className="h-[1px] w-full bg-zinc-900">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${pct}%` }}
             className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
           />
        </div>
      </header>

      {/* Main Content Area (Scrollable internally) */}
      <main id="wizard-scroll-container" className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {stepComponents[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Decorative Spacer */}
        <div className="h-20" />
      </main>
    </div>
  );
}
