import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileBottomNav from './MobileBottomNav';

const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col font-['DM_Sans']">
      {/* Container para el contenido con padding bottom para no tapar el BottomNav */}
      <main className="flex-1 overflow-x-hidden pb-20">
        <Outlet />
      </main>

      {/* Navegación Inferior */}
      <MobileBottomNav />

      {/* Orbes decorativos de fondo (mantenemos el estilo visual solicitado) */}
      <div className="fixed top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#00d4ff]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[-10%] w-[250px] h-[250px] bg-[#6001d1]/10 rounded-full blur-[100px] pointer-events-none z-0" />
    </div>
  );
};

export default MobileLayout;
