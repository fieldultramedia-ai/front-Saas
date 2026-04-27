import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Clock, Link2, ChevronDown, User, CreditCard, LogOut, Menu, X, Bell, Zap } from 'lucide-react';
import Logo from './Logo';
import { ProfileDropdown } from './ui/profile-dropdown';

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/dashboard', label: 'Inicio',      icon: <LayoutDashboard size={14} /> },
    { to: '/historial', label: 'Historial',   icon: <Clock size={14} /> },
    { to: '/conexiones', label: 'Conexiones', icon: <Link2 size={14} /> },
    { to: '/precios', label: 'Precios', icon: <Zap size={14} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 px-6 md:px-10 h-20 flex items-center gap-10 ${
        scrolled ? 'bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5 h-16' : 'bg-transparent h-20'
      }`}>
        {/* Logo */}
        <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer group">
          <div className="group-hover:scale-110 transition-transform duration-300">
             <Logo size="small" />
          </div>
          <span className="font-syne font-black text-2xl tracking-tighter hidden sm:block">
            Lead<span className="text-[#00d4ff]">Book</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                isActive(link.to) 
                  ? 'text-white bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                  : 'text-white/40 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <span className={isActive(link.to) ? 'text-[#00d4ff]' : 'text-inherit'}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-4">
          <button className="hidden sm:flex w-10 h-10 rounded-xl bg-white/5 border border-white/5 items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <Bell size={18} />
          </button>

          {user && Object.keys(user).length > 0 ? (
            <div className="relative">
              <ProfileDropdown 
                data={{
                  name: user.name,
                  email: user.email,
                  avatar: user.agencyLogo,
                  subscription: user.plan_nombre || "FREE",
                }}
                onLogout={() => { logout(); navigate('/'); }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">Login</Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 bg-[#00d4ff] text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#00b5d8] transition-all shadow-[0_10px_20px_-5px_rgba(0,212,255,0.3)]"
              >
                Empezar
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden w-10 h-10 flex items-center justify-center text-white" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[2000] bg-[#070B14]/95 backdrop-blur-2xl animate-in fade-in duration-300" onClick={() => setMobileOpen(false)}>
          <div className="flex flex-col p-10 h-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-12">
              <span className="font-syne font-black text-2xl tracking-tighter">Lead<span className="text-[#00d4ff]">Book</span></span>
              <button onClick={() => setMobileOpen(false)} className="text-white"><X size={28} /></button>
            </div>
            
            <div className="flex flex-col gap-6">
               {navLinks.map(link => (
                 <Link 
                   key={link.to} 
                   to={link.to} 
                   onClick={() => setMobileOpen(false)}
                   className={`text-2xl font-black font-syne flex items-center gap-4 ${isActive(link.to) ? 'text-[#00d4ff]' : 'text-white/40'}`}
                 >
                   {link.icon}{link.label}
                 </Link>
               ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/10">
               {user ? (
                 <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 text-red-400 font-bold uppercase tracking-widest text-sm">
                   <LogOut size={18} /> Cerrar sesión
                 </button>
               ) : (
                 <Link to="/login" className="flex items-center gap-3 text-[#00d4ff] font-bold uppercase tracking-widest text-sm">
                   <User size={18} /> Iniciar sesión
                 </Link>
               )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
