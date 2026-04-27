import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export function HeaderTab({ icon: Icon, title, subtitle, actions, accentColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', background: `${accentColor}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, border: `1px solid ${accentColor}33`
        }}>
          <Icon size={24} />
        </div>
        <div>
          <h2 className="text-h3">{title}</h2>
          <p className="text-body-sm text-secondary" style={{ marginTop: 4 }}>{subtitle}</p>
        </div>
      </div>
      <div>{actions}</div>
    </div>
  );
}

export function ErrorState({ error, onRetry, label, isLimitError }) {
  const isLimit = isLimitError || (error && error.isLimit);

  if (isLimit) {
    return (
      <div className="relative overflow-hidden p-10 bg-zinc-900/40 border border-yellow-500/20 rounded-[32px] backdrop-blur-md text-center group">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent opacity-50" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(234,179,8,0.1)] border border-yellow-500/20 mx-auto">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Alcanzaste el límite de tu plan</h3>
          <p className="text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
            Expandí tu plan para seguir aprovechando la potencia de la IA y escalar tu negocio inmobiliario.
          </p>
          <Link to="/precios" className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black font-bold rounded-2xl hover:bg-yellow-400 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-500/20">
            Actualizar plan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden p-12 bg-zinc-900/40 border border-zinc-800 rounded-[32px] backdrop-blur-md text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-30" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6 border border-red-500/20 mx-auto">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Error al cargar {label}</h3>
        <p className="text-zinc-500 max-w-md mx-auto mb-8 leading-relaxed">
          {error?.message || 'No pudimos conectar con el servidor. Por favor, verifica tu conexión o intenta de nuevo.'}
        </p>
        {onRetry && (
          <button 
            className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-2xl transition-all border border-zinc-700 hover:border-zinc-600 flex items-center gap-2 mx-auto"
            onClick={onRetry}
          >
            Reintentar conexión
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({ label, aspectRatio = 'auto' }) {
  return (
    <div style={{
      width: '100%', aspectRatio, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.02)'
    }}>
      <span className="text-body-sm text-tertiary">{label}</span>
    </div>
  );
}

export function InfoRow({ items }) {
  return (
    <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {items.map((item, i) => (
        <div key={i}>
          <div className="text-label" style={{ marginBottom: 4 }}>{item.label}</div>
          <div className="text-body-sm">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
