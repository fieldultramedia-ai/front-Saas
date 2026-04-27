import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  FileText, 
  BarChart2, 
  Video, 
  Link2, 
  ArrowRight,
  TrendingUp,
  Clock,
  User,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getDashboard } from '../../services/api';

const MobileDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await getDashboard();
        setData(dashboardData);
      } catch (error) {
        console.error("Error loading dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const stats = [
    { label: 'Mes', value: data?.listados_este_mes || 0, icon: FileText, color: '#00d4ff' },
    { label: 'Total', value: data?.total_generados || 0, icon: BarChart2, color: '#7C3AED' },
    { label: 'Videos', value: data?.videos_creados || 0, icon: Video, color: '#00ff88' },
    { label: 'Links', value: data?.conexiones_activas || 0, icon: Link2, color: '#ffcc00' },
  ];

  return (
    <div className="px-6 py-10">
      {/* Header Premium */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black font-syne uppercase tracking-tighter italic text-white leading-none">
            HOLA, {user?.name?.split(' ')[0] || 'CRACK'}
          </h1>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' })}
          </p>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-[#00d4ff]/20 blur-md rounded-2xl" />
          <div className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <User className="text-[#00d4ff]" size={20} />
          </div>
        </div>
      </div>

      {/* Plan Status Card (Premium Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 p-6 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap size={80} className="text-[#00d4ff]" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <Zap size={12} className="text-[#00d4ff]" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Plan {data?.plan || 'Free'}</span>
          </div>
          <span className="text-[10px] font-black text-[#00d4ff] uppercase tracking-widest">Activo</span>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between text-[10px] text-white/40 uppercase font-black mb-3 tracking-widest">
            <span>Uso de la plataforma</span>
            <span className="text-white">{data?.uso_actual?.properties_used || 0} / {data?.plan_limites?.properties_per_month || 10}</span>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((data?.uso_actual?.properties_used || 0) / (data?.plan_limites?.properties_per_month || 10)) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7C3AED] rounded-full shadow-[0_0_10px_rgba(0,212,255,0.3)]"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid (More spacing, better icons) */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col gap-4 active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>
            <div>
              <div className="text-3xl font-black text-white font-syne tracking-tighter leading-none">{loading ? '...' : stat.value}</div>
              <div className="text-[9px] text-white/30 font-black uppercase tracking-widest mt-2">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions (Bigger, more modern) */}
      <div className="mb-12">
        <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] mb-6 pl-2">Acciones Rápidas</h3>
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate('/mobile/nuevo')}
            className="w-full h-20 rounded-3xl bg-[#00d4ff] text-[#070B14] font-black flex items-center justify-between px-8 active:scale-95 transition-all shadow-[0_8px_30px_rgba(0,212,255,0.2)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center">
                <Plus size={24} strokeWidth={3} />
              </div>
              <span className="text-sm uppercase tracking-wider">Nuevo Listado</span>
            </div>
            <ArrowRight size={20} />
          </button>
          
          <button 
            onClick={() => navigate('/mobile/historial')}
            className="w-full h-20 rounded-3xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-between px-8 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Clock size={20} className="text-white/40" />
              </div>
              <span className="text-sm uppercase tracking-wider text-white/60">Historial</span>
            </div>
            <ArrowRight size={20} className="text-white/20" />
          </button>
        </div>
      </div>

      {/* Recent Items Preview */}
      <div>
        <div className="flex items-center justify-between mb-6 pl-2">
          <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Recientes</h3>
          <button onClick={() => navigate('/mobile/historial')} className="text-[#00d4ff] text-[10px] font-black uppercase tracking-widest">Ver Todos</button>
        </div>
        <div className="flex flex-col gap-4">
          {loading ? (
            [1, 2].map(i => <div key={i} className="h-24 w-full bg-white/5 rounded-[2rem] animate-pulse" />)
          ) : data?.listados_recientes?.length > 0 ? (
            data.listados_recientes.slice(0, 3).map((item) => (
              <div key={item.id} className="p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center gap-5 active:bg-white/5 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-2xl shadow-inner">
                  {item.tipo_propiedad?.includes('Casa') ? '🏠' : '🏢'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate uppercase tracking-tight">{item.titulo || 'Sin título'}</div>
                  <div className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em] mt-2">{item.ciudad}</div>
                </div>
                <ArrowRight size={16} className="text-white/10" />
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-6 rounded-[2rem] border border-dashed border-white/5 text-white/20 text-[10px] font-black uppercase tracking-widest">
              No hay listados recientes
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;
