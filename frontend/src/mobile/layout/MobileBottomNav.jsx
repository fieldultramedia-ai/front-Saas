import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusSquare, Clock, User } from 'lucide-react';

const MobileBottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Inicio', path: '/mobile' },
    { icon: PlusSquare, label: 'Nuevo', path: '/mobile/nuevo' },
    { icon: Clock, label: 'Historial', path: '/mobile/historial' },
    { icon: User, label: 'Cuenta', path: '/mobile/cuenta' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0f131d]/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/mobile'}
          className={({ isActive }) => `
            flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300
            ${isActive ? 'text-[#00d4ff]' : 'text-gray-500'}
          `}
        >
          {({ isActive }) => (
            <>
              <item.icon 
                size={22} 
                className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium tracking-wide uppercase">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 bg-[#00d4ff] rounded-full shadow-[0_0_8px_#00d4ff]" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileBottomNav;
