import React from 'react';
import TabConexiones from '../../components/cuenta/TabConexiones';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileConexiones = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-8 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-white/5 text-gray-400 active:scale-95 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold font-['Syne'] text-white">Conexiones</h1>
      </div>

      <div className="bg-[#1b2029]/40 border border-white/5 rounded-[2.5rem] p-6 shadow-xl overflow-hidden">
        <TabConexiones showHeader={false} />
      </div>

      <div className="mt-8 space-y-4">
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-sm">
           <h3 className="text-sm font-bold text-white mb-2 font-['Syne'] tracking-wide">💡 ¿Cómo funciona?</h3>
           <p className="text-[13px] text-gray-400 leading-relaxed font-['DM_Sans']">
             Conecta tus redes sociales para que LeadBook pueda publicar automáticamente por ti. Utilizamos tokens oficiales y seguros; nunca guardamos tus contraseñas.
           </p>
        </div>
      </div>
    </div>
  );
};

export default MobileConexiones;
