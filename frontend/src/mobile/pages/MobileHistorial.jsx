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
    <div className="px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-['Syne'] text-white">Historial</h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
            {listados.length} listados generados
          </p>
        </div>
        <button 
          onClick={() => navigate('/mobile/nuevo')}
          className="w-10 h-10 rounded-full bg-[#00d4ff] text-[#070B14] flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.4)]"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input 
          type="text" 
          placeholder="Buscar por título o zona..."
          className="w-full h-12 bg-[#1b2029] border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#00d4ff] transition-colors text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00d4ff]">
          <Filter size={18} />
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 w-full bg-white/5 rounded-[2rem] animate-pulse" />
          ))
        ) : filtered.length > 0 ? (
          <AnimatePresence>
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-[2rem] bg-[#1b2029]/40 border border-white/5 flex items-center gap-4 active:bg-white/5 transition-colors"
                onClick={() => navigate('/mobile/resultados', { state: { listado: item } })}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d4ff]/10 to-[#6001d1]/10 flex items-center justify-center text-2xl">
                  {item.tipo_propiedad?.includes('Casa') ? '🏠' : '🏢'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate mb-1">
                    {item.titulo || `${item.tipo_propiedad} en ${item.ciudad}`}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{item.operacion}</span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full" />
                    <span className="text-[10px] text-[#00d4ff] font-bold uppercase tracking-wider">{item.ciudad}</span>
                  </div>
                </div>
                <button className="p-2 text-gray-600">
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No se encontraron resultados
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHistorial;
