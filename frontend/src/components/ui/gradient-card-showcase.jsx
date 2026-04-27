import React from 'react';

export default function SkewCards({ cards }) {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2">
        {cards.map(({ title, desc, gradientFrom, gradientTo, badge, icon }, idx) => (
          <div
            key={idx}
            className="group relative w-[240px] h-[220px] transition-all duration-500"
          >
            {/* Skewed gradient panels */}
            <span
              className="absolute top-0 left-[40px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-70px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <span
              className="absolute top-0 left-[40px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-70px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />

            {/* Animated blurs */}
            <span className="pointer-events-none absolute inset-0 z-10">
              <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] transition-all duration-100 skew-blob group-hover:top-[-30px] group-hover:left-[30px] group-hover:w-[60px] group-hover:h-[60px] group-hover:opacity-100" />
              <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] transition-all duration-500 skew-blob skew-blob-delay group-hover:bottom-[-30px] group-hover:right-[30px] group-hover:w-[60px] group-hover:h-[60px] group-hover:opacity-100" />
            </span>

            {/* Content */}
            <div className="relative z-20 left-0 p-[14px_20px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-15px] group-hover:p-[20px_20px]">
              {icon && <div className="text-xl mb-1.5">{icon}</div>}
              <h2 className="text-sm font-headline font-bold mb-1 tracking-tight">{title}</h2>
              <p className="text-[10px] leading-relaxed mb-2 text-slate-300 line-clamp-2">{desc}</p>
              {badge && (
                <span 
                  className="inline-block text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom}20, ${gradientTo}20)`,
                    color: gradientFrom,
                    border: `1px solid ${gradientFrom}30`,
                  }}
                >
                  {badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes skewBlob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .skew-blob { animation: skewBlob 2s ease-in-out infinite; }
        .skew-blob-delay { animation-delay: -1s; }
      `}</style>
    </>
  );
}
