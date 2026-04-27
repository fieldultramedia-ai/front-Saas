import React, { useState, useEffect } from 'react';
import { User, Shield, CreditCard, Link2, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL, getPerfil } from '../services/api';
import { ErrorState } from '../components/results/helpers';
import ResultSkeleton from '../components/results/ResultSkeleton';
import { cn } from '../lib/utils';

import TabPerfil from '../components/cuenta/TabPerfil';
import TabSeguridad from '../components/cuenta/TabSeguridad';
import TabPlan from '../components/cuenta/TabPlan';
import TabConexiones from '../components/cuenta/TabConexiones';
import TabSettings from '../components/cuenta/TabSettings';
import SaveBar from '../components/cuenta/SaveBar';

const TABS = [
  { id: 'perfil',      label: 'Perfil',      icon: User },
  { id: 'ajustes',     label: 'Ajustes',     icon: Settings },
  { id: 'seguridad',   label: 'Seguridad',   icon: Shield },
  { id: 'suscripcion', label: 'Suscripción', icon: CreditCard },
];

export default function CuentaPage() {
  const { updateProfile } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTabFromUrl = searchParams.get('tab');
  const initialTab = initialTabFromUrl || 'perfil';
  
  const [activeTab, setActiveTab] = useState(initialTab);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [originalData, setOriginalData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPerfil();
      setOriginalData(data);
      setProfileData({ ...data });

      // Sincronizar con el contexto global
      updateProfile({
        name: data.nombre,
        email: data.email,
        telefono: data.telefono,
        agencyName: data.nombre_inmobiliaria,
        agencyLogo: data.logo_url
      });
    } catch(err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleDiscard = () => {
    setProfileData({ ...originalData });
    setSaveError(null);
    setSaveSuccess(false);
  };

  const isDirty = JSON.stringify(originalData) !== JSON.stringify(profileData);

  const handleSave = async (payloadToSave, forceEndpoint) => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      if (forceEndpoint === 'password') {
        const res = await fetch(`${API_BASE_URL}/auth/cambiar-password/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token') || localStorage.getItem('subzero_access')}`
          },
          body: JSON.stringify(payloadToSave)
        });
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || body.detail || 'Error al cambiar contraseña');
        }
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        return { success: true };
      }

      // Default perfil global save
      const bodyPayload = {
        nombre: profileData.nombre,
        email: profileData.email,
        telefono: profileData.telefono,
        pais: profileData.pais,
        nombre_inmobiliaria: profileData.nombreInmobiliaria || profileData.nombre_inmobiliaria,
        sitio_web: profileData.sitioWeb || profileData.sitio_web,
        bio: profileData.bio,
        logo_url: profileData.logoUrl || profileData.logo_url,
        settings: profileData.settings
      };

      const res = await fetch(`${API_BASE_URL}/auth/perfil/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token') || localStorage.getItem('subzero_access')}`
        },
        body: JSON.stringify(bodyPayload)
      });
      if (!res.ok) throw new Error('Error al guardar perfil');

      const newSaved = await res.json();
      setOriginalData(newSaved);
      setProfileData({ ...newSaved });
      setSaveSuccess(true);

      // TAREA 2 — Forzar actualización del contexto Y del localStorage con el nuevo logoUrl
      const newLogo = newSaved.logo_url || profileData.logoUrl;
      updateProfile({
        name: newSaved.nombre,
        email: newSaved.email,
        telefono: newSaved.telefono,
        agencyName: newSaved.nombre_inmobiliaria,
        agencyLogo: newLogo
      });

      // Asegurar localStorage redundante (aunque updateProfile ya lo hace)
      const stored = JSON.parse(localStorage.getItem('subzero_user') || '{}');
      stored.agencyLogo = newLogo;
      localStorage.setItem('subzero_user', JSON.stringify(stored));

      setTimeout(() => setSaveSuccess(false), 3000);
      return { success: true };
    } catch(err) {
      setSaveError(err.message || 'Ocurrió un error');
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 md:py-16 relative">

      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic mb-2">Mi Cuenta</h1>
        <p className="text-white/40 text-sm font-light">
          {activeTab === 'perfil' && (profileData?.email || 'Información personal y de agencia')}
          {activeTab === 'ajustes' && 'Preferencias de la plataforma y notificaciones'}
          {activeTab === 'seguridad' && 'Protegé tu cuenta y cambiá tu contraseña'}
          {activeTab === 'suscripcion' && 'Detalles de tu suscripción y facturación'}
        </p>
      </div>

      <div className="mb-10 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 p-1 bg-white/5 border border-white/5 rounded-2xl w-fit">
          {TABS.map(tab => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap",
                  active 
                    ? "bg-[#00d4ff] text-[#070B14] shadow-[0_4px_12px_rgba(0,212,255,0.2)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={14} /> {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {loading ? (
        <ResultSkeleton height={400} lines={4} />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchProfile} label="perfil" />
      ) : (
        <>
          {activeTab === 'perfil' && (
            <TabPerfil
              profileData={profileData}
              onUpdate={handleUpdate}
            />
          )}
          {activeTab === 'ajustes' && (
            <TabSettings
              profileData={profileData}
              onUpdate={handleUpdate}
            />
          )}
          {activeTab === 'seguridad' && (
            <TabSeguridad
              onSave={(payload) => handleSave(payload, 'password')}
              saving={saving}
              saveError={saveError}
              saveSuccess={saveSuccess}
            />
          )}
          {activeTab === 'suscripcion' && (
            <TabPlan
              profileData={profileData}
            />
          )}
        </>
      )}

      {/* SaveBar (Solo en TabPerfil si hay cambios) */}
      <SaveBar
        visible={(activeTab === 'perfil' || activeTab === 'ajustes') && (isDirty || saveError || saveSuccess)}
        saving={saving}
        onSave={() => handleSave(profileData)}
        onDiscard={handleDiscard}
        saveSuccess={saveSuccess}
        saveError={saveError}
      />

    </div>
  );
}
