import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  CreditCard, 
  Link2, 
  LogOut, 
  ChevronRight,
  Settings,
  HelpCircle,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MobileCuenta = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Mi Perfil', sub: 'Información personal y logo', path: '/mobile/cuenta/perfil' },
    { icon: Shield, label: 'Seguridad', sub: 'Cambiar contraseña', path: '/mobile/cuenta/seguridad' },
    { icon: CreditCard, label: 'Plan y Facturación', sub: 'Gestionar suscripción', path: '/mobile/cuenta/plan' },
    { icon: Link2, label: 'Conexiones', sub: 'Redes sociales vinculadas', path: '/mobile/cuenta/conexiones' },
    { icon: Bell, label: 'Notificaciones', sub: 'Ajustes de alertas', path: '/mobile/cuenta/notificaciones' },
    { icon: HelpCircle, label: 'Ayuda y Soporte', sub: 'Centro de ayuda', path: '/mobile/cuenta/soporte' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="px-6 py-8 pb-32">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-10 pt-4">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-[#00d4ff] to-[#6001d1] p-1 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
            <div className="w-full h-full bg-[#070B14] rounded-[2.2rem] flex items-center justify-center overflow-hidden">
              {user?.agencyLogo ? (
                <img src={user.agencyLogo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold font-['Syne'] text-[#00d4ff]">
                  {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#00d4ff] rounded-full border-4 border-[#070B14] flex items-center justify-center text-[#070B14]">
            <Settings size={14} />
          </button>
        </div>
        <h2 className="text-xl font-bold font-['Syne'] text-white">{user?.name || 'Usuario'}</h2>
        <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
      </div>

      {/* Menu Options */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="w-full p-5 rounded-3xl bg-[#1b2029]/40 border border-white/5 flex items-center gap-4 active:bg-white/5 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
              <item.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">{item.label}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">{item.sub}</div>
            </div>
            <ChevronRight size={16} className="text-gray-700" />
          </motion.button>
        ))}
      </div>

      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={handleLogout}
        className="w-full mt-8 p-5 rounded-3xl bg-red-500/5 border border-red-500/10 flex items-center gap-4 active:bg-red-500/10 transition-colors text-left group"
      >
        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
          <LogOut size={20} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-red-500">Cerrar Sesión</div>
          <div className="text-[10px] text-red-500/50 uppercase tracking-wider">Finalizar sesión actual</div>
        </div>
      </motion.button>
    </div>
  );
};

export default MobileCuenta;
