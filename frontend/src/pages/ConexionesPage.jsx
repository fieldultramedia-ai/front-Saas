import React from 'react';
import TabConexiones from '../components/cuenta/TabConexiones';
import { Link2, RefreshCw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConexionesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 pb-32">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
      >
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
              <Link2 size={24} className="text-[#00d4ff]" />
            </div>
            <h1 className="text-4xl font-black font-syne text-white tracking-tighter uppercase italic">
              Conexiones
            </h1>
          </div>
          <p className="text-white/40 text-sm max-w-lg leading-relaxed">
            Gestioná las conexiones con tus redes sociales para automatizar tus publicaciones y maximizar tu alcance con nuestra IA.
          </p>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-[2.5rem] blur opacity-5 group-hover:opacity-10 transition duration-1000" />
        <div className="relative bg-[#0a0f1a] border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden">
           {/* Decorative Orb */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4ff]/5 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           
           <TabConexiones showHeader={true} />
        </div>
      </motion.div>

      {/* Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 group hover:border-[#00d4ff]/20 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/5 flex items-center justify-center mb-6 text-[#00d4ff]">
            <Zap size={20} />
          </div>
          <h3 className="text-lg font-bold font-syne text-white mb-3">Automatización Inteligente</h3>
          <p className="text-sm text-white/30 leading-relaxed">
            Una vez conectadas tus redes, LeadBook puede publicar automáticamente tus listados en los mejores horarios para maximizar el engagement.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 group hover:border-[#7c3aed]/20 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/5 flex items-center justify-center mb-6 text-[#7c3aed]">
            <RefreshCw size={20} />
          </div>
          <h3 className="text-lg font-bold font-syne text-white mb-3">Sincronización en Tiempo Real</h3>
          <p className="text-sm text-white/30 leading-relaxed">
            Si cambias algo en LeadBook, tus publicaciones conectadas se actualizarán o notificarán según tus preferencias de sincronización.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

