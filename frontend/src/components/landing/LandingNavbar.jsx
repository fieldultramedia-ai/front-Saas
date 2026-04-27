import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo';
import { ProfileDropdown } from '../ui/profile-dropdown';
import { NavbarLamp } from '../ui/NavbarLamp';
import GlassSurface from '../ui/GlassSurface';

const NAV_LINKS = [
  { label: 'Inicio',        id: 'inicio' },
  { label: 'Funciones',     id: 'funciones' },
  { label: 'Cómo funciona', id: 'como-funciona' },
  { label: 'Formatos',      id: 'formatos' },
  { label: 'Nosotros',      id: 'nosotros' },
  { label: 'Precios',       id: 'precios' },
];

const LandingNavbar = ({ seccionActiva, setSeccionActiva }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && NAV_LINKS.find(l => l.id === hash)) setSeccionActiva(hash);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [setSeccionActiva]);

  const navegarA = (seccion) => {
    setMenuOpen(false);
    if (seccion === 'precios') {
      navigate('/precios');
      return;
    }
    if (location.pathname === '/') {
      setSeccionActiva(seccion);
      window.history.pushState({}, '', `#${seccion}`);
      document.getElementById(seccion)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(seccion)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <header>
      <nav className="fixed z-[1000] w-full px-2 group">

        {/* Lamp effect — only when not scrolled */}
        {!isScrolled && <NavbarLamp />}

        <div
          className={[
            'mx-auto mt-4 max-w-5xl w-full px-8 transition-all duration-500 lg:px-10',
            isScrolled
              ? 'bg-[rgba(10,14,23,0.7)] max-w-4xl rounded-full border-t border-[rgba(0,212,255,0.1)] backdrop-blur-xl shadow-2xl shadow-black/50 lg:px-6'
              : 'bg-[rgba(10,14,23,0.4)] rounded-full backdrop-blur-md border-t border-white/5',
          ].join(' ')}
        >
          <div className="relative flex flex-wrap items-center justify-between py-3 lg:flex-nowrap lg:gap-0 lg:py-4">

            {/* Left Section: Logo + hamburger */}
            <div className="flex w-full justify-between lg:w-1/3 lg:justify-start">
              <button
                onClick={() => navegarA('inicio')}
                className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0"
              >
                <video 
                  src="/navbar-logo.mp4?v=1" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  style={{ height: '32px', borderRadius: '6px', objectFit: 'contain' }}
                />
                <span className="text-white font-semibold text-base">LeadBook</span>
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white"
              >
                <Menu
                  className={`m-auto size-6 transition-all duration-200 ${
                    menuOpen ? 'scale-0 opacity-0 rotate-180' : 'scale-100 opacity-100 rotate-0'
                  }`}
                />
                <X
                  className={`absolute inset-0 m-auto size-6 transition-all duration-200 ${
                    menuOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-180'
                  }`}
                />
              </button>
            </div>

            {/* Center Section: Desktop nav links */}
            <div className="hidden lg:flex lg:w-1/3 lg:justify-center">
              <ul className="flex gap-8 text-sm">
                {NAV_LINKS.map(({ label, id }) => (
                  <li key={id}>
                    <button
                      onClick={() => navegarA(id)}
                      className={[
                        'bg-transparent border-none cursor-pointer text-sm transition-colors duration-150',
                        seccionActiva === id
                          ? 'text-[#00c4d4] font-semibold'
                          : 'text-white/70 hover:text-white',
                      ].join(' ')}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section: auth buttons + mobile menu panel */}
            <div
              className={[
                'w-full flex-wrap items-center justify-end rounded-3xl border border-white/10 bg-[rgba(7,11,20,0.95)] p-6 shadow-2xl shadow-zinc-900/20',
                'lg:m-0 lg:flex lg:w-1/3 lg:gap-6 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none mb-4 lg:mb-0',
                menuOpen ? 'flex' : 'hidden lg:flex',
              ].join(' ')}
            >
              {/* Mobile nav links */}
              <div className="w-full lg:hidden mb-6">
                <ul className="space-y-5 text-base">
                  {NAV_LINKS.map(({ label, id }) => (
                    <li key={id}>
                      <button
                        onClick={() => navegarA(id)}
                        className={[
                          'bg-transparent border-none cursor-pointer transition-colors duration-150',
                          seccionActiva === id
                            ? 'text-[#00c4d4] font-semibold'
                            : 'text-white/70 hover:text-white',
                        ].join(' ')}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Auth buttons */}
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-fit">
                {user && Object.keys(user).length > 0 ? (
                  <ProfileDropdown 
                    data={{
                      name: user.name,
                      email: user.email,
                      avatar: user.agencyLogo,
                      subscription: user.plan || "PRO",
                    }}
                    onLogout={() => { logout(); navigate('/'); }}
                  />
                ) : (
                  <>
                    {/* Mobile Only: Stacked buttons */}
                    <div className="flex w-full flex-col gap-3 lg:hidden">
                      <button
                        onClick={() => navigate('/login')}
                        className="bg-transparent border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full cursor-pointer hover:text-white transition-all"
                      >
                        Iniciar sesión
                      </button>
                      <button
                        onClick={() => navigate('/register')}
                        className="bg-[#00c4d4] text-[#070B14] border-none px-5 py-2 rounded-full text-sm font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,196,212,0.25)] transition-all"
                      >
                        Empezar gratis →
                      </button>
                    </div>

                    {/* Desktop Only: Pure text links */}
                    <div className="hidden lg:flex items-center gap-6">
                      <span
                        onClick={() => navigate('/login')}
                        className="text-[#e2e8f0] text-[15px] cursor-pointer hover:text-white transition-colors select-none"
                      >
                        Iniciar sesión
                      </span>
                      <span
                        onClick={() => navigate('/register')}
                        className="text-[#00c4d4] text-[15px] font-medium cursor-pointer hover:text-[#7cf0f5] transition-colors select-none"
                      >
                        Empezar gratis →
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default LandingNavbar;
