import React from 'react';
import { Menu, Bell } from 'lucide-react';

const MobileNavBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#070B14]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#6001d1] rounded-lg flex items-center justify-center font-bold text-black text-sm">
          L
        </div>
        <span className="font-['Syne'] font-bold text-lg tracking-tight">LEADBOOK</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
};

export default MobileNavBar;
