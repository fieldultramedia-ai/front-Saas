import React, { useState } from 'react';
import { Eye, EyeOff, Star, ArrowLeft } from 'lucide-react';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 48 48">
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path
          fill="#4CAF50"
          d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);


// --- SUB-COMPONENTS ---

export const GlassInputWrapper = ({
  children
}) => (
  <div
    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-[#00d4ff]/40 focus-within:ring-1 focus-within:ring-[#00d4ff]/20 overflow-hidden">
    {children}
  </div>
);

export const TestimonialCard = ({
  testimonial,
  delay
}) => (
  <div
    className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-5 w-64`}>
    <img
      src={testimonial.avatarSrc}
      className="h-10 w-10 object-cover rounded-2xl"
      alt="avatar" />
    <div className="text-[13px] leading-snug">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-white/50 text-[11px] uppercase tracking-wider">{testimonial.role || testimonial.handle}</p>
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      <p className="mt-2 text-white/80 italic">"{testimonial.text}"</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export const SignInPage = ({
  title = <span className="font-light text-foreground tracking-tighter">Welcome</span>,
  description = "Access your account and continue your journey with us",
  heroImageSrc,
  testimonials = [],
  children, // Use children to inject the specific form
  onGoogleSignIn,
  onCreateAccount,
  footerText,
  footerAction,
  footerLinkText,
  backAction
}) => {
  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw] bg-[#020408] text-white relative">
      {backAction && (
        <button 
          onClick={backAction}
          className="absolute top-8 left-8 z-50 flex items-center gap-2 text-white/50 hover:text-white transition-all text-xs font-bold uppercase tracking-widest px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
        >
          <ArrowLeft size={16} /> Volver
        </button>
      )}
      {/* Left column: form section */}
      <section className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-10">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h1 className="animate-element animate-delay-100 text-3xl md:text-4xl font-bold leading-tight tracking-tight">{title}</h1>
              <p className="animate-element animate-delay-200 text-white/50 text-sm">{description}</p>
            </div>

            <div className="animate-element animate-delay-300">
               {children}
            </div>

            {onGoogleSignIn && (
              <>
                <div className="animate-element animate-delay-700 relative flex items-center justify-center my-2">
                  <span className="w-full border-t border-white/10"></span>
                  <span className="px-4 text-xs text-white/40 bg-[#070b14] absolute uppercase tracking-widest">O continúa con</span>
                </div>

                <button
                  onClick={onGoogleSignIn}
                  className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-white/10 rounded-2xl py-4 hover:bg-white/5 transition-colors text-sm">
                    <GoogleIcon />
                    Google
                </button>
              </>
            )}

            <p className="animate-element animate-delay-900 text-center text-sm text-white/40">
              {footerText}{' '}
              <button
                onClick={(e) => { e.preventDefault(); footerAction?.(); }}
                className="text-[#00d4ff] hover:underline transition-colors font-medium">
                {footerLinkText}
              </button>
            </p>
          </div>
        </div>
      </section>
      
      {/* Right column: hero image + testimonials */}
      <section className="hidden md:block flex-1 relative p-4">
        <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl overflow-hidden bg-[#020408] border border-white/5">
           {/* Decorative glowing brand blobs */}
           <div className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] rounded-full bg-[#00d4ff]/30 blur-[120px]" />
           <div className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#6001d1]/25 blur-[100px]" />
           <div className="absolute top-[30%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#00d4ff]/15 blur-[80px]" />
           <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
           
           {heroImageSrc && (
             <div className="absolute inset-0 opacity-80 bg-cover bg-center" style={{ backgroundImage: `url(${heroImageSrc})` }}></div>
           )}
        </div>

        {testimonials.length > 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
            <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />
            {testimonials[1] && <div className="hidden xl:flex"><TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" /></div>}
            {testimonials[2] && <div className="hidden 2xl:flex"><TestimonialCard testimonial={testimonials[2]} delay="animate-delay-1400" /></div>}
          </div>
        )}
      </section>
    </div>
  );
};
  