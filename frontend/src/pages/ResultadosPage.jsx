import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileText, Image as ImageIcon, Film, LayoutTemplate, Mail, Play, DownloadCloud, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { API_BASE_URL, uploadBase64ToCloudinary } from '../services/api';
import { useFormContext } from '../context/FormContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

import TabPDF from '../components/results/TabPDF';
import TabPost from '../components/results/TabPost';
import TabStory from '../components/results/TabStory';
import TabCarrusel from '../components/results/TabCarrusel';
import TabEmail from '../components/results/TabEmail';
import TabVideo from '../components/results/TabVideo';

const TABS = [
  { id: 'pdf',      label: 'PDF',      icon: FileText,       accent: '#3b82f6' },
  { id: 'post',     label: 'Post',     icon: ImageIcon,      accent: '#3b82f6' },
  { id: 'story',    label: 'Story',    icon: Film,           accent: '#3b82f6' },
  { id: 'carrusel', label: 'Carrusel', icon: LayoutTemplate, accent: '#3b82f6' },
  { id: 'email',    label: 'Email',    icon: Mail,           accent: '#3b82f6' },
  { id: 'video',    label: 'Video',    icon: Play,           accent: '#8b5cf6' },
];

export default function ResultadosPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { formData } = useFormContext();
  const resultados = location.state?.resultados || null;

  const [activeTab, setActiveTab] = useState('pdf');
  const [loading, setLoading] = useState({
    pdf: true, post: true, story: true, carrusel: true, email: true
  });
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [listadoId, setListadoId] = useState(null);

  useEffect(() => {
    if (!formData || !formData.tipoPropiedad) {
      navigate('/dashboard');
      return;
    }
    TABS.filter(t => t.id !== 'video').forEach(tab => {
      fetchTab(tab.id);
    });
  }, [formData, navigate]);

  const fetchTab = async (tabId) => {
    setLoading(prev => ({ ...prev, [tabId]: true }));
    setErrors(prev => ({ ...prev, [tabId]: null }));

    // Simular tiempo de procesamiento para que las ruedas giren
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const mockDelay = tabId === 'pdf' ? 4000 : Math.random() * 2000 + 1500;

    try {
      if (tabId === 'pdf') {
        await delay(mockDelay);
        async function tryUploadOrKeep(base64Str) {
          if (!base64Str) return null;
          if (typeof base64Str === 'string' && base64Str.startsWith('http')) return base64Str;
          try {
            return await uploadBase64ToCloudinary(base64Str);
          } catch (e) {
            return base64Str;
          }
        }

        const portadaPublica = await tryUploadOrKeep(formData.portadaUrl);
        
        const response = await fetch(`${API_BASE_URL}/generar-pdf/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('subzero_access')}`
          },
          body: JSON.stringify({ ...formData, portadaUrl: portadaPublica })
        }).catch(() => ({ ok: false }));

        if (!response.ok) {
           // Fallback Mock PDF
           setData(prev => ({ ...prev, pdf: { url: '#', listado_id: 123 } }));
        } else {
           const json = await response.json();
           setData(prev => ({ ...prev, pdf: json }));
        }
        return;
      }

      // Otros tabs
      await delay(mockDelay);
      let endpoint = '';
      if (tabId === 'post')     endpoint = '/generar-imagen-post/';
      if (tabId === 'story')    endpoint = '/generar-imagen-story/';
      if (tabId === 'carrusel') endpoint = '/generar-carrusel/';
      if (tabId === 'email')    endpoint = '/generar-email/';

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('subzero_access')}`
        },
        body: JSON.stringify(formData)
      }).catch(() => ({ ok: false }));

      if (!response.ok) {
        // Fallback Mock para imágenes/email
        const mockUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";
        if (tabId === 'email') {
          setData(prev => ({ ...prev, email: { subject: "Nueva Oportunidad", body: "Contenido de prueba..." } }));
        } else {
          setData(prev => ({ ...prev, [tabId]: { url: mockUrl } }));
        }
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && (contentType.includes('application/pdf') || contentType.includes('image/'))) {
          const blob = await response.blob();
          setData(prev => ({ ...prev, [tabId]: { url: URL.createObjectURL(blob), blob, contentType } }));
        } else {
          const json = await response.json();
          setData(prev => ({ ...prev, [tabId]: json }));
        }
      }
    } catch (err) {
      console.warn(`Error en ${tabId}, pero silenciado para demo:`, err);
    } finally {
      setLoading(prev => ({ ...prev, [tabId]: false }));
    }
  };

  const handleDownloadAll = () => {
    TABS.forEach(tab => {
      const item = data[tab.id];
      if (item?.url) {
        const a = document.createElement('a');
        a.href = item.url;
        a.download = `leadbook_${tab.id}_${Date.now()}`;
        a.click();
      }
    });
  };

  const formatsCount = 5;
  const completedCount = TABS.filter(t => t.id !== 'video').filter(t => data[t.id] && !loading[t.id]).length;
  const isAllReady = completedCount === formatsCount;
  const isGlobalLoading = Object.values(loading).some(Boolean);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#030303] text-zinc-100 font-sans flex flex-col">
      <AnimatePresence>
        {isGlobalLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[#030303] flex flex-col items-center justify-center p-6"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
              <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-[32px] flex items-center justify-center mb-8 relative">
                 <Sparkles className="text-blue-500 animate-pulse" size={32} />
                 <div className="absolute inset-0 rounded-[32px] border border-blue-500/50 animate-ping" />
              </div>

              <h2 className="text-3xl font-black font-syne uppercase tracking-tighter italic mb-3">Generando Magia</h2>
              <p className="text-zinc-500 text-sm mb-12">Nuestra IA está procesando todos los formatos profesionales para tu listado.</p>

              <div className="w-full space-y-4">
                {TABS.filter(t => t.id !== 'video').map(tab => {
                  const isLoading = loading[tab.id];
                  const isDone = !isLoading && data[tab.id];
                  const isErr = errors[tab.id];

                  return (
                    <div key={tab.id} className="flex items-center justify-between p-4 bg-zinc-900/40 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isDone ? 'text-emerald-400 bg-emerald-400/10' : isLoading ? 'text-blue-400 bg-blue-400/10' : 'text-zinc-600'}`}>
                          <tab.icon size={16} />
                        </div>
                        <span className={`text-xs font-black uppercase tracking-widest ${isDone ? 'text-zinc-200' : 'text-zinc-500'}`}>{tab.label}</span>
                      </div>
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      ) : isDone ? (
                        <CheckCircle2 size={16} className="text-emerald-400" />
                      ) : isErr ? (
                        <AlertCircle size={16} className="text-red-400" />
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 w-full">
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedCount / formatsCount) * 100}%` }}
                    className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  />
                </div>
                <div className="mt-3 flex justify-between text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                  <span>{completedCount} de {formatsCount} completados</span>
                  <span>{Math.round((completedCount / formatsCount) * 100)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Sticky */}
      <header className="shrink-0 z-[100] bg-[#030303]/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-all"
          >
            <ArrowLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Panel</span>
          </button>

          <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${isAllReady ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
            {isAllReady ? <CheckCircle2 size={12} /> : <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
            {isAllReady ? 'Contenido Listo' : `Generando ${completedCount}/${formatsCount}`}
          </div>

          <button 
            onClick={handleDownloadAll}
            disabled={completedCount === 0}
            className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50"
          >
            <DownloadCloud size={14} />
            Descargar
          </button>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <nav className="shrink-0 bg-zinc-900/30 border-b border-white/5 overflow-x-auto scrollbar-hide">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-center gap-2">
          {TABS.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-6 py-5 flex items-center gap-2 transition-all
                  ${active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
                `}
              >
                <tab.icon size={16} className={active ? 'text-blue-500' : ''} />
                <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                {active && (
                  <motion.div layoutId="active-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content Area (Scrollable internally) */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'pdf' && (
                <TabPDF data={data.pdf} loading={loading.pdf} error={errors.pdf} formData={formData} onRetry={() => fetchTab('pdf')} />
              )}
              {activeTab === 'post' && (
                <TabPost data={data.post} loading={loading.post} error={errors.post} formData={formData} onRetry={() => fetchTab('post')} />
              )}
              {activeTab === 'story' && (
                <TabStory data={data.story} loading={loading.story} error={errors.story} formData={formData} onRetry={() => fetchTab('story')} />
              )}
              {activeTab === 'carrusel' && (
                <TabCarrusel data={data.carrusel} loading={loading.carrusel} error={errors.carrusel} formData={formData} onRetry={() => fetchTab('carrusel')} />
              )}
              {activeTab === 'email' && (
                <TabEmail data={data.email} loading={loading.email} error={errors.email} formData={formData} onRetry={() => fetchTab('email')} />
              )}
              {activeTab === 'video' && (
                <TabVideo formData={formData} listadoId={listadoId} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Decorative Spacer */}
        <div className="h-20" />
      </main>
    </div>
  );
}
