import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../store/useAppStore';
import { getDashboard, eliminarListado } from '../services/api';
import {
  Plus, FileText, BarChart2, Video, Link2,
  Clock, LayoutTemplate, ArrowRight, MoreHorizontal,
  Trash2, Eye, Copy, AlertTriangle,
  Home, Building2, Store, Sparkles, Zap, ChevronRight
} from 'lucide-react';
import { Skeleton, SkeletonCard } from '../components/ui/Skeleton';
import { GlassInputWrapper } from '../components/ui/sign-in';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60)     return 'Hace un momento';
  if (diff < 3600)   return `Hace ${Math.floor(diff/60)} min`;
  if (diff < 86400)  return `Hace ${Math.floor(diff/3600)}h`;
  if (diff < 604800) return `Hace ${Math.floor(diff/86400)} días`;
  return d.toLocaleDateString('es-AR', { day:'numeric', month:'short' });
};

const getNichoIcon = (tipo) => {
  const t = (tipo || '').toLowerCase();
  if (t.includes('casa') || t.includes('ph')) return <Home size={18} className="text-[#00d4ff]" />;
  if (t.includes('depto') || t.includes('departamento')) return <Building2 size={18} className="text-[#6001d1]" />;
  return <Store size={18} className="text-yellow-400" />;
};

function KPICard({ value, label, icon, loading, delay = 0 }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (loading || value === undefined || value === null) return;
    if (isNaN(value)) { setDisplayed(value); return; }
    let start = 0;
    const end = parseInt(value) || 0;
    if (end === 0) { setDisplayed(0); return; }
    const duration = 1200;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplayed(end); clearInterval(timer); }
      else setDisplayed(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value, loading]);

  return (
    <div className="relative group animate-element" style={{ animationDelay: `${delay}s` }}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00d4ff]/20 to-[#6001d1]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative p-6 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/[0.05] transition-all">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00d4ff]">
            {icon}
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{label}</p>
            <h3 className="text-2xl font-black font-syne text-white leading-none mt-1">{loading ? '...' : displayed}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListadoCard({ item, onEliminar, onVer }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const { addToast } = useAppStore();

  const handleEliminar = async (e) => {
    e.stopPropagation();
    setEliminando(true);
    try {
      await onEliminar(item.id);
      addToast({ type:'success', title:'Eliminado' });
    } catch {
      addToast({ type:'error', title:'Error' });
    } finally {
      setEliminando(false);
      setMenuOpen(false);
    }
  };

  return (
    <div 
      onClick={() => onVer(item)}
      className="group relative bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer animate-element"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                {getNichoIcon(item.tipo_propiedad)}
             </div>
             <div>
                <span className="text-[9px] font-black text-[#00d4ff] uppercase tracking-tighter bg-[#00d4ff]/10 px-2 py-0.5 rounded-full">
                  {item.tipo_propiedad || 'Inmueble'}
                </span>
             </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/20 hover:text-white transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>

        <h4 className="text-sm font-bold text-white mb-1 font-syne line-clamp-1">{item.titulo || 'Sin título'}</h4>
        <p className="text-xs text-white/40 mb-4 font-medium">{item.ciudad} {item.precio ? `· ${item.precio}` : ''}</p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{formatDate(item.creado_en)}</span>
          <div className="flex gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/40" />
             <div className="w-1.5 h-1.5 rounded-full bg-[#6001d1]/40" />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-12 right-4 z-20 bg-[#0f131d] border border-white/10 rounded-xl p-1 shadow-2xl animate-in fade-in zoom-in duration-200">
           <button onClick={handleEliminar} className="w-full text-left px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-400/10 rounded-lg flex items-center gap-2">
             <Trash2 size={14} /> Eliminar
           </button>
        </div>
      )}
    </div>
  );
}

function BorradorCard({ onContinuar, onDescartar }) {
  const [draft, setDraft] = useState(null);
  useEffect(() => {
    const d = JSON.parse(localStorage.getItem('subzero_draft') || 'null');
    if (d?.incompleto) setDraft(d);
  }, []);

  if (!draft) return null;
  return (
    <div className="mb-6 p-4 bg-[#00d4ff]/5 border border-[#00d4ff]/20 rounded-2xl flex items-center justify-between gap-4 animate-element">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff]">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-xs font-bold text-white/80">📝 Tenés un borrador sin terminar</p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{draft.tipoPropiedad || 'Inmueble'} · {draft.ciudad || 'Pendiente'}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onDescartar} className="px-4 py-2 text-[10px] font-black uppercase text-white/30 hover:text-white transition-colors">Descartar</button>
        <button onClick={onContinuar} className="px-4 py-2 text-[10px] font-black uppercase bg-[#00d4ff] text-black rounded-lg hover:bg-[#00b5d8] transition-all">Continuar</button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, refreshPlan } = useAuth();
  const { addToast } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading,   setLoading]   = useState(true);
  const [metrics,   setMetrics]   = useState(null);
  const [recent,    setRecent]    = useState([]);
  const [planData,  setPlanData]  = useState(null);
  const [usageData, setUsageData] = useState(null);

  const today = new Date().toLocaleDateString('es-AR', { weekday:'long', day:'numeric', month:'long' });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  const handleEliminar = async (id) => {
    try {
      await eliminarListado(id);
      setRecent(prev => prev.filter(item => item.id !== id));
      addToast({ type: 'success', title: 'Eliminado correctamente' });
    } catch (err) {
      addToast({ type: 'error', title: 'Error al eliminar' });
    }
  };

  const cargarDashboard = async () => {
    setLoading(true);
    try {
      const data = await getDashboard();
      setMetrics({
        listados_este_mes: data.listados_este_mes ?? 0,
        total_generados:   data.total_generados   ?? 0,
        videos_creados:    data.videos_creados    ?? 0,
        conexiones:        data.conexiones_activas ?? 0,
      });
      setRecent(data.listados_recientes ?? []);
      setPlanData({ ...data.plan_limites, nombre: data.plan } ?? null);
      setUsageData(data.uso_actual   ?? null);
    } catch {
      addToast({ type:'error', title:'Error', message:'Error al cargar datos' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    cargarDashboard(); 
    const params = new URLSearchParams(location.search);
    if (params.get('pago') === 'exitoso') {
      localStorage.removeItem('leadbook_needs_onboarding');
      addToast({ type: 'success', title: 'Plan activado' });
      refreshPlan();
    }
  }, []);

  const kpis = [
    { value:metrics?.listados_este_mes, label:'Mes', icon:<FileText size={18}/>, delay:0.1 },
    { value:metrics?.total_generados, label:'Total', icon:<BarChart2 size={18}/>, delay:0.2 },
    { value:metrics?.videos_creados, label:'Videos', icon:<Video size={18}/>, delay:0.3 },
    { value:metrics?.conexiones, label:'Redes', icon:<Link2 size={18}/>, delay:0.4 },
  ];

  const planNombre = planData?.nombre || user?.plan_nombre || 'Free';

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in text-white">
      
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="animate-element">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mb-4">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
             <span className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest">Plan {planNombre} Activo</span>
          </div>
          <h1 className="text-5xl font-black font-syne mb-2 tracking-tighter">
            Hola, <span className="text-[#00d4ff]">{user?.name?.split(' ')[0] || 'onboarding'}</span> <span className="inline-block animate-bounce-slow">👋</span>
          </h1>
          <p className="text-white/40 font-medium">{todayCapitalized} · Tenés <span className="text-white">{recent.length}</span> listados recientes.</p>
        </div>
        
        <button 
          onClick={() => navigate('/nuevo')}
          className="group relative flex items-center gap-3 px-8 py-4 bg-[#00d4ff] text-black font-black rounded-2xl hover:bg-[#00b5d8] transition-all shadow-[0_20px_40px_-10px_rgba(0,212,255,0.3)] hover:-translate-y-1"
        >
          <Plus size={20} /> Nuevo listado
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {kpis.map((k, i) => <KPICard key={i} {...k} loading={loading} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-8">
           <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold font-syne tracking-tight">Listados Recientes</h3>
             <button onClick={() => navigate('/historial')} className="text-xs font-bold text-white/30 hover:text-[#00d4ff] uppercase tracking-widest flex items-center gap-1 transition-colors">
               Ver todos <ArrowRight size={14} />
             </button>
           </div>

           <BorradorCard onContinuar={() => navigate('/nuevo', { state:{ fromDraft:true } })} onDescartar={() => { localStorage.removeItem('subzero_draft'); window.dispatchEvent(new Event('storage')); }} />

           {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[1,2,3,4].map(i => <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />)}
             </div>
           ) : recent.length === 0 ? (
             <div className="p-16 rounded-3xl border border-dashed border-white/10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/20">
                  <FileText size={32} />
                </div>
                <h4 className="text-lg font-bold mb-2">Sin listados aún</h4>
                <p className="text-sm text-white/40 mb-8 max-w-xs">Comenzá ahora y creá tu primer material de marketing con IA.</p>
                <button onClick={() => navigate('/nuevo')} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase transition-all">Crear ahora</button>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {recent.slice(0, 4).map(item => (
                 <ListadoCard key={item.id} item={item} onEliminar={handleEliminar} onVer={(it) => navigate('/resultados', { state:{ listado:it } })} />
               ))}
             </div>
           )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
           <section>
             <h3 className="text-sm font-bold text-white/20 uppercase tracking-widest mb-6">Herramientas Rápidas</h3>
             <div className="space-y-3">
               {[
                 { label: 'Reel Rápido', desc: 'Publicación dinámica', icon: <Zap size={16} />, color: '#00d4ff' },
                 { label: 'Plantillas', desc: 'Empezá con una base', icon: <LayoutTemplate size={16} />, color: '#6001d1' }
               ].map((tool, i) => (
                 <button key={i} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all group text-left">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ color: tool.color }}>
                     {tool.icon}
                   </div>
                   <div className="flex-1">
                     <p className="text-sm font-bold text-white">{tool.label}</p>
                     <p className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">{tool.desc}</p>
                   </div>
                   <ChevronRight size={14} className="text-white/10 group-hover:text-white transition-colors" />
                 </button>
               ))}
             </div>
           </section>

           <section className="p-6 rounded-3xl bg-gradient-to-br from-[#6001d1]/10 to-transparent border border-[#6001d1]/20">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[#6001d1]/20 flex items-center justify-center text-[#6001d1]">
                 <BarChart2 size={16} />
               </div>
               <h3 className="text-sm font-bold uppercase tracking-widest">Tu Consumo</h3>
             </div>
             
             <div className="space-y-4">
               <div className="flex justify-between items-end">
                 <p className="text-2xl font-black font-syne">{usageData?.properties_used ?? 0}<span className="text-sm text-white/20 font-medium ml-1">/ {planData?.properties_per_month ?? 10}</span></p>
                 <span className="text-[10px] font-bold text-[#6001d1] uppercase tracking-widest">Listados</span>
               </div>
               
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-[#6001d1] transition-all duration-1000" 
                   style={{ width: `${Math.min(100, ((usageData?.properties_used ?? 0) / (planData?.properties_per_month ?? 10)) * 100)}%` }} 
                 />
               </div>

               <button onClick={() => navigate('/cuenta')} className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all">Ver suscripción</button>
             </div>
           </section>
        </div>

      </div>
    </div>
  );
}
