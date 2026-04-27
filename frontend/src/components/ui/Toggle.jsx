export default function Toggle({ value, onChange, label, subtitle }) {
  return (
    <div className="flex items-center justify-between gap-6">
      {(label || subtitle) && (
        <div className="flex flex-col gap-0.5">
          {label && <span className="text-sm font-bold text-white tracking-tight">{label}</span>}
          {subtitle && <span className="text-xs text-zinc-500">{subtitle}</span>}
        </div>
      )}
      <button 
        type="button"
        onClick={() => onChange(!value)}
        className={`
          relative w-12 h-6 rounded-full transition-all duration-300 outline-none
          ${value ? 'bg-blue-500' : 'bg-zinc-800'}
        `}
      >
        <div className={`
          absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300
          ${value ? 'left-7' : 'left-1'}
        `} />
      </button>
    </div>
  );
}
