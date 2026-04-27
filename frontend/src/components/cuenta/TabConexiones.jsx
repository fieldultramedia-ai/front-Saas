import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../services/api';
import { cn } from '../../lib/utils';
import { RefreshCw, ExternalLink, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

function getToken() {
  return localStorage.getItem('subzero_access');
}

const BrandIcon = ({ id, color }) => {
  const icons = {
    tiktok: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6v4c-1.1 0-2 0-2 2 0 1.1.9 2 2 2s2-.9 2-2V.02z"/>
      </svg>
    ),
    instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    linkedin: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.062-1.865-3.062-1.867 0-2.153 1.459-2.153 2.964v5.702h-3v-11h2.88v1.503h.04c.401-.759 1.381-1.559 2.839-1.559 3.036 0 3.599 1.998 3.599 4.595v6.956z"/>
      </svg>
    ),
    youtube: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    facebook: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/>
      </svg>
    ),
    pinterest: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.164 0 7.399 2.966 7.399 6.935 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.621 0 11.988-5.367 11.988-11.987S18.638 0 12.017 0z"/>
      </svg>
    ),
    reddit: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.311 3.513 8.487l-.462 2.115a.5.5 0 0 0 .741.528l2.906-1.513A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.176 14.615c-.417 0-.75-.333-.75-.75s.333-.75.75-.75.75.333.75.75-.333.75-.75.75zm-10.352 0c-.417 0-.75-.333-.75-.75s.333-.75.75-.75.75.333.75.75-.333.75-.75.75zm9.324-4.148c-.571 0-1.034-.463-1.034-1.034 0-.571.463-1.034 1.034-1.034.571 0 1.034.463 1.034 1.034 0 .571-.463 1.034-1.034 1.034zm-8.296 0c-.571 0-1.034-.463-1.034-1.034 0-.571.463-1.034 1.034-1.034.571 0 1.034.463 1.034 1.034 0 .571-.463 1.034-1.034 1.034z"/>
      </svg>
    ),
    threads: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm3-6c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
      </svg>
    ),
    bluesky: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.8c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4-1.1-2.4-2.4-2.4zm0-10.8C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 21.6c-5.3 0-9.6-4.3-9.6-9.6s4.3-9.6 9.6-9.6 9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6z"/>
      </svg>
    ),
    googlebusiness: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.35 11.1h-9.17v2.73h6.51c-.3 1.56-1.71 4.56-6.51 4.56-4.11 0-7.47-3.42-7.47-7.62s3.36-7.62 7.47-7.62c2.34 0 3.9 1 4.8 1.86l2.16-2.07C17.7 1.89 15.06 1 12.18 1 6.03 1 1.05 6 1.05 12.15s4.98 11.15 11.13 11.15c6.42 0 10.68-4.5 10.68-10.83 0-.72-.09-1.26-.21-1.86h-.3z"/>
      </svg>
    )
  };
  return <div style={{ color }}>{icons[id] || icons.instagram}</div>;
};

const REDES = [
  { id: 'tiktok', nombre: 'TikTok', color: '#010101' },
  { id: 'instagram', nombre: 'Instagram', color: '#E1306C' },
  { id: 'linkedin', nombre: 'LinkedIn', color: '#0A66C2' },
  { id: 'youtube', nombre: 'YouTube', color: '#FF0000' },
  { id: 'facebook', nombre: 'Facebook', color: '#1877F2' },
  { id: 'twitter', nombre: 'X', color: '#ffffff' },
  { id: 'pinterest', nombre: 'Pinterest', color: '#E60023' },
  { id: 'reddit', nombre: 'Reddit', color: '#FF4500' },
  { id: 'threads', nombre: 'Threads', color: '#ffffff' },
  { id: 'bluesky', nombre: 'Bluesky', color: '#0085ff' },
  { id: 'googlebusiness', nombre: 'Google Business', color: '#4285F4' },
];

export default function TabConexiones({ showHeader = true }) {
  const [estado, setEstado] = useState({ conectado: false, redes: [] });
  const [loading, setLoading] = useState(true);
  const [conectando, setConectando] = useState(false);
  const [recargando, setRecargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarEstado();
  }, []);

  const cargarEstado = async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${API_BASE_URL}/conexiones/estado/`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await resp.json();
      setEstado(data);
    } catch (e) {
      console.error('Error cargando estado:', e);
    } finally {
      setLoading(false);
      setRecargando(false);
    }
  };

  const handleRecargar = async () => {
    setRecargando(true);
    await cargarEstado(false);
  };

  const conectarRedes = async (platform = null) => {
    setConectando(true);
    setError(null);
    try {
      const resp = await fetch(`${API_BASE_URL}/conexiones/init/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ platform })
      });
      const data = await resp.json();
      if (data.access_url) {
        window.open(data.access_url, '_blank');
        setTimeout(() => cargarEstado(false), 5000);
      } else {
        setError(data.error || 'No se pudo generar el enlace de conexión.');
      }
    } catch (e) {
      setError('Error de conexión con el servidor.');
    } finally {
      setConectando(false);
    }
  };

  const redesConectadas = estado.redes || [];

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black font-syne text-white mb-2">
              Tus Conexiones
            </h2>
            <p className="text-white/40 text-sm">
              Conectá tus cuentas para publicar automáticamente con LeadBook.
            </p>
          </div>
          <button
            onClick={handleRecargar}
            disabled={recargando || loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest disabled:opacity-50"
          >
            <RefreshCw size={14} className={cn(recargando && "animate-spin")} />
            {recargando ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm mb-6"
        >
          <AlertCircle size={18} />
          {error}
        </motion.div>
      )}

      <div className="space-y-8">
        {/* Main CTA */}
        <button
          onClick={conectarRedes}
          disabled={conectando}
          className={cn(
            "group relative w-full overflow-hidden rounded-3xl p-6 transition-all active:scale-[0.98]",
            conectando ? "bg-white/10" : "bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
          )}
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {conectando ? (
              <RefreshCw size={20} className="animate-spin text-white" />
            ) : (
              <ExternalLink size={20} className="text-white" />
            )}
            <span className="text-lg font-black font-syne text-white uppercase tracking-tight">
              {conectando ? 'Generando enlace seguro...' : 'Conectar nuevas redes sociales'}
            </span>
          </div>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>

        {/* Grid of capsules */}
        <div className="flex flex-wrap gap-3">
          {REDES.map((red, idx) => {
            const conectada = redesConectadas.some(
              r => r.platform?.toLowerCase() === red.id
            );
            return (
              <motion.div
                key={red.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => !conectada && !conectando && conectarRedes(red.id)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-full border transition-all group",
                  conectada 
                    ? "bg-white/10 border-white/20 cursor-default" 
                    : "bg-[#161B22] border-white/5 hover:border-white/20 hover:bg-white/[0.02] cursor-pointer"
                )}
              >
                <BrandIcon id={red.id} color={red.color} />
                <span className={cn(
                  "text-xs font-bold tracking-tight transition-colors",
                  conectada ? "text-white" : "text-white/40 group-hover:text-white/80"
                )}>
                  {red.nombre}
                </span>
                {conectada && (
                  <div className="flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase text-green-500">Conectado</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              redesConectadas.length > 0 ? "bg-green-500/10 text-green-500" : "bg-white/5 text-white/20"
            )}>
              {redesConectadas.length > 0 ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest">Estado del Servicio</p>
              <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">
                {redesConectadas.length > 0 ? 'Conexiones activas' : 'Sin cuentas vinculadas'}
              </p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-white/10 mx-2" />

          <div className="flex-1">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Cuentas vinculadas</span>
                <span className="text-[10px] font-black text-[#00d4ff]">{redesConectadas.length} / {REDES.length}</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(redesConectadas.length / REDES.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
                />
             </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { title: '¿Cómo conectar?', desc: 'Haz clic en el botón superior para abrir el panel seguro de vinculación.', icon: <ExternalLink size={14}/> },
             { title: 'Seguridad total', desc: 'LeadBook utiliza tokens OAuth 2.0. Nunca vemos ni guardamos tus contraseñas.', icon: <ShieldCheck size={14}/> }
           ].map((item, i) => (
             <div key={i} className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-[#00d4ff]">{item.icon}</div>
                  <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">{item.title}</h4>
                </div>
                <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>

      {loading && !recargando && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <RefreshCw size={32} className="animate-spin text-[#00d4ff]" />
          <p className="text-xs font-bold text-white uppercase tracking-[0.2em]">Cargando conexiones...</p>
        </div>
      )}
    </div>
  );
}
