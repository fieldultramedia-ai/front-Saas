import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Trash2, 
  Eye, 
  Copy, 
  Filter,
  MoreVertical,
  ChevronRight,
  Plus
} from 'lucide-react';
import { API_BASE_URL } from '../../services/api';

const MobileHistorial = () => {
  const navigate = useNavigate();
  const [listados, setListados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchHistorial = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/listados/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token') || localStorage.getItem('subzero_access')}`
        }
      });
      const data = await res.json();
      setListados(Array.isArray(data) ? data : (data.results || []));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  const filtered = listados.filter(l => 
    (l.titulo || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.ciudad || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-10 pb-40">
      {/* Header Premium */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black font-syne uppercase tracking-tighter italic text-white">HISTORIAL</h1>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
            {listados.length} CONTENIDOS CREADOS
          </p>
        </div>
        <button 
          onClick={() => navigate('/mobile/nuevo')}
          className="w-12 h-12 rounded-2xl bg-[#00d4ff] text-[#070B14] flex items-center justify-center shadow-[0_8px_20px_rgba(0,212,255,0.3)] active:scale-90 transition-all"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Search Bar Premium */}
      <div className="relative mb-10 group">
        <div className="absolute inset-0 bg-[#00d4ff]/5 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00d4ff] transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar por título o zona..."
            className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-3xl pl-14 pr-6 outline-none focus:border-[#00d4ff] transition-all text-sm text-white placeholder:text-white/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List (Premium Cards) */}
      <div className="space-y-4">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 w-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] animate-pulse" />
          ))
        ) : filtered.length > 0 ? (
          <AnimatePresence>
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center gap-5 active:bg-white/[0.05] active:scale-[0.98] transition-all"
                onClick={() => navigate('/mobile/resultados', { state: { listado: item } })}
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-3xl shadow-inner">
                  {item.tipo_propiedad?.includes('Casa') ? '🏠' : '🏢'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1.5">{item.operacion}</div>
                  <div className="text-sm font-bold text-white truncate uppercase tracking-tight">
                    {item.titulo || `${item.tipo_propiedad} en ${item.ciudad}`}
                  </div>
                  <div className="text-[10px] text-[#00d4ff] font-black uppercase tracking-widest mt-1.5">{item.ciudad}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/10 group-active:text-white/40">
                  <ChevronRight size={18} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-24 px-8 rounded-[3rem] border border-dashed border-white/5">
            <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.3em]">No se encontraron resultados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHistorial;
