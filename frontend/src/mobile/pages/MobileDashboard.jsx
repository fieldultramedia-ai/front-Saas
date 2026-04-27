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
    { label: 'Total', value: data?.total_generados || 0, icon: BarChart2, color: '#6001d1' },
    { label: 'Videos', value: data?.videos_creados || 0, icon: Video, color: '#00ff88' },
    { label: 'Links', value: data?.conexiones_activas || 0, icon: Link2, color: '#ffcc00' },
  ];

  return (
    <div className="px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-['Syne'] text-white">
            Hola, {user?.name?.split(' ')[0] || 'Usuario'} 👋
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' })}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <User className="text-[#00d4ff]" size={24} />
        </div>
      </div>

      {/* Plan Status Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 rounded-[2rem] bg-gradient-to-br from-[#00d4ff]/10 to-[#6001d1]/10 border border-[#00d4ff]/20 relative overflow-hidden"
      >
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#00d4ff]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Plan {data?.plan || 'Free'}</span>
          </div>
          <span className="text-[10px] font-bold text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded-full uppercase">Activo</span>
        </div>
        <div className="relative z-10">
          <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold mb-2 tracking-widest">
            <span>Uso de listados</span>
            <span>{data?.uso_actual?.properties_used || 0} / {data?.plan_limites?.properties_per_month || 10}</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((data?.uso_actual?.properties_used || 0) / (data?.plan_limites?.properties_per_month || 10)) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#6001d1]"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-3xl bg-[#1b2029]/40 border border-white/5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
              <TrendingUp size={12} className="text-[#00ff88] opacity-50" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-['Syne']">{loading ? '...' : stat.value}</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Acciones Rápidas</h3>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate('/mobile/nuevo')}
            className="w-full h-16 rounded-2xl bg-[#00d4ff] text-[#070B14] font-bold flex items-center justify-between px-6 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3">
              <Plus size={20} />
              <span>Nuevo Listado</span>
            </div>
            <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => navigate('/mobile/historial')}
            className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold flex items-center justify-between px-6 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-gray-400" />
              <span>Ver Historial</span>
            </div>
            <ArrowRight size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Recent Items Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recientes</h3>
          <button onClick={() => navigate('/mobile/historial')} className="text-[#00d4ff] text-[10px] font-bold uppercase tracking-widest">Ver Todos</button>
        </div>
        <div className="flex flex-col gap-4">
          {loading ? (
            [1, 2].map(i => <div key={i} className="h-20 w-full bg-white/5 rounded-2xl animate-pulse" />)
          ) : data?.listados_recientes?.length > 0 ? (
            data.listados_recientes.slice(0, 3).map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-[#1b2029]/40 border border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/10 to-[#6001d1]/10 flex items-center justify-center text-xl">
                  {item.tipo_propiedad?.includes('Casa') ? '🏠' : '🏢'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{item.titulo || 'Sin título'}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{item.ciudad}</div>
                </div>
                <ArrowRight size={14} className="text-gray-600" />
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 text-xs">No hay listados recientes</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;
