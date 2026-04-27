import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function NumInput({ label, value, onChange, min = 0, max = 100 }) {
  const numValue = Number(value) || 0;

  const handleMinus = () => {
    if (numValue > min) onChange(numValue - 1);
  };

  const handlePlus = () => {
    if (numValue < max) onChange(numValue + 1);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
      <div className="flex items-center bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden h-12">
        <button 
          type="button" 
          onClick={handleMinus}
          className="w-12 h-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <Minus size={14} />
        </button>
        <div className="flex-1 text-center font-black text-sm text-white">
          {numValue}
        </div>
        <button 
          type="button" 
          onClick={handlePlus}
          className="w-12 h-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
