import React from 'react';
import TabConexiones from '../../components/cuenta/TabConexiones';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileConexiones = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-10 pb-40">
      {/* Header Premium */}
      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white/40 flex items-center justify-center active:scale-90 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black font-syne uppercase tracking-tighter italic text-white leading-none">CONEXIONES</h1>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Gestioná tus redes sociales</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-10">
        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#00d4ff]/10 blur-3xl rounded-full pointer-events-none" />
           <TabConexiones showHeader={false} />
        </div>

        {/* Info Card */}
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff]">
                <ShieldCheck size={20} />
             </div>
             <h3 className="text-sm font-black text-white uppercase tracking-widest font-syne">¿Cómo funciona?</h3>
           </div>
           <p className="text-[12px] text-white/40 leading-relaxed font-bold uppercase tracking-tight">
             Conectá tus redes para que LeadBook publique por vos. Usamos protocolos oficiales y seguros. Tu privacidad es nuestra prioridad absoluta.
           </p>
        </div>
      </div>
    </div>
  );
};

export default MobileConexiones;
