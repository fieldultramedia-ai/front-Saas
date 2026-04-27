import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, MessageCircle, Mail, FileText, Shield } from 'lucide-react';
import TerminosModal from '../../../components/modals/TerminosModal';
import PoliticaModal from '../../../components/modals/PoliticaModal';

const docs = [
  {
    category: 'IA',
    title: 'Generación con IA',
    details: 'Nuestro motor semántico entiende el valor comercial. Analiza la propiedad y redacta copys optimizados para cada plataforma.'
  },
  {
    category: 'Contenido',
    title: 'Multi-formato',
    details: 'Transforma una sola subida en PDFs editoriales, posts, historias animadas y guiones para video.'
  },
  {
    category: 'Automatización',
    title: 'Publicación automática',
    details: 'Conexión directa vía API con Meta y WhatsApp. Gestiona múltiples cuentas desde un solo tablero.'
  }
];

const DocAccordion = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 rounded-2xl bg-[#1b2029]/40 border border-white/5 flex items-center justify-between transition-all"
      >
        <div className="text-left">
          <span className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest opacity-60 mb-1 block">
            {item.category}
          </span>
          <h3 className="text-base font-bold text-white font-['Syne']">{item.title}</h3>
        </div>
        <ChevronDown 
          size={20} 
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-2 text-gray-400 text-sm leading-relaxed">
              {item.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileDocs = () => {
  const [terminosOpen, setTerminosOpen] = useState(false);
  const [politicaOpen, setPoliticaOpen] = useState(false);

  return (
    <section className="py-20 px-6 bg-[#070B14]">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold font-['Syne'] leading-tight mb-4 text-white">
          Recursos y <br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#6001d1] bg-clip-text text-transparent">
            Ayuda
          </span>
        </h2>
        <p className="text-gray-400 text-sm">
          Todo lo que necesitás saber para dominar LeadBook.
        </p>
      </div>

      <div className="mb-12">
        {docs.map((doc, i) => (
          <DocAccordion key={i} item={doc} index={i} />
        ))}
      </div>

      {/* Footer / Contact links */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 gap-3">
          <MessageCircle size={24} className="text-[#00ff88]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">WhatsApp</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 gap-3">
          <Mail size={24} className="text-[#00d4ff]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Email</span>
        </button>
      </div>

      <div className="mt-20 text-center">
        <div className="font-['Syne'] font-bold text-xl tracking-tight mb-4 text-white opacity-40">LEADBOOK</div>
        
        <div className="flex items-center justify-center gap-6 mb-6">
          <button 
            onClick={() => setTerminosOpen(true)}
            className="text-[10px] uppercase tracking-widest text-white/30 hover:text-[#00d4ff] transition-colors"
          >
            Términos
          </button>
          <button 
            onClick={() => setPoliticaOpen(true)}
            className="text-[10px] uppercase tracking-widest text-white/30 hover:text-[#00d4ff] transition-colors"
          >
            Privacidad
          </button>
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">© 2026 - Field Ultra Media</p>
      </div>

      <TerminosModal isOpen={terminosOpen} onClose={() => setTerminosOpen(false)} />
      <PoliticaModal isOpen={politicaOpen} onClose={() => setPoliticaOpen(false)} />
    </section>
  );
};

export default MobileDocs;
