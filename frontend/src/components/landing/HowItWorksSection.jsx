import { motion } from 'framer-motion'
import { GooeyText } from '../ui/GooeyText'
import { HeroGeometric } from '../ui/ShapeLandingHero'
import { ShineBorder } from '../ui/ShineBorder'

const niches = [
  { emoji: '🏢', label: 'Inmobiliaria' },
  { emoji: '💪', label: 'Fitness' },
  { emoji: '🛍️', label: 'E-commerce' },
  { emoji: '✂️', label: 'Servicios' },
  { emoji: '📚', label: 'Educación' },
  { emoji: '✨', label: '+ más' },
]

const steps = [
  { 
    n: '01', 
    image: '/steps/step1.png',
    title: 'Subí tu producto',   
    desc: 'Fotos, descripción, precio. Funciona con lo que tengas.',
    icon: '📦',
    accent: '#6001d1',
    shineColors: ['#6001d1', '#a955ff', '#c084fc'],
  },
  { 
    n: '02', 
    image: '/steps/step2.png',
    title: 'La IA genera', 
    desc: 'PDFs, posts, stories, videos. Todo optimizado para vender.',
    icon: '✨',
    accent: '#00d4ff',
    shineColors: ['#00d4ff', '#38bdf8', '#6001d1'],
  },
  { 
    n: '03', 
    image: '/steps/step3.png',
    title: 'Publicá y vendé',            
    desc: 'Instagram, WhatsApp, Facebook. Directo desde la app.',
    icon: '🚀',
    accent: '#6001d1',
    shineColors: ['#6001d1', '#f472b6', '#00d4ff'],
  },
]

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative w-full h-full overflow-hidden">
      <HeroGeometric>
        <div className="w-full h-full flex flex-col px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pt-28 sm:pt-32 md:pt-40 lg:pt-48 pb-4 sm:pb-6 overflow-hidden scrollbar-hide">
          
          {/* ── HEADER — fixed top offset, doesn't move ── */}
          <div className="flex flex-col items-center text-center shrink-0 mb-3 sm:mb-6">
            {/* GooeyText Morphing Title */}
            <GooeyText
              texts={[
                "De un producto",
                "a contenido viral",
                "en segundos",
                "sin esfuerzo",
              ]}
              morphTime={1.5}
              cooldownTime={0.5}
              className="h-[40px] sm:h-[60px] md:h-[80px] lg:h-[100px] w-full max-w-4xl mb-2 sm:mb-4"
              textClassName="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-headline font-extrabold tracking-tighter text-white"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-2xl max-w-2xl leading-relaxed font-body mb-3 sm:mb-5"
            >
              Sin importar tu industria. LeadBook se adapta a tu negocio, no al revés.
            </motion.p>

            {/* Niche Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4"
            >
              {niches.map((n, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.06, type: 'spring', stiffness: 300 }}
                  viewport={{ once: true }}
                  className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs sm:text-sm md:text-base text-slate-200 flex items-center gap-1.5 sm:gap-2.5 hover:bg-white/[0.08] hover:border-[#00d4ff]/30 transition-all cursor-default shadow-lg shadow-black/20"
                >
                  <span className="text-base sm:text-xl md:text-2xl">{n.emoji}</span>
                  <span className="font-medium tracking-wide">{n.label}</span>
                </motion.span>
              ))}
            </motion.div>
            
            <div className="flex sm:hidden items-center justify-center gap-2 text-[#00d4ff] text-[10px] uppercase font-bold tracking-widest mt-4 opacity-70 animate-pulse">
              <span>↓ Desliza para ver los pasos ↓</span>
            </div>
          </div>

          {/* ── STEP CARDS with ShineBorder — grow to fill all remaining space ── */}
          <div className="flex-1 flex items-stretch w-full min-h-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row items-stretch gap-3 sm:gap-4 lg:gap-6 w-full max-w-6xl mx-auto"
            >
              {steps.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col md:flex-row items-stretch">
                  {/* Step Card wrapped in ShineBorder */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.6 + i * 0.2,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="w-full h-full"
                  >
                    <ShineBorder
                      borderRadius={16}
                      borderWidth={2}
                      duration={10}
                      color={s.shineColors}
                      className="!rounded-2xl border border-white/[0.06] !bg-[rgba(27,32,41,0.5)] backdrop-blur-xl !p-0 h-full"
                    >
                      <div className="relative w-full h-full group cursor-default flex flex-col overflow-hidden rounded-2xl">
                        {/* Hover glow */}
                        <div
                          className="absolute -top-24 -right-24 w-56 h-56 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{
                            background: `radial-gradient(circle, ${s.accent}25 0%, transparent 70%)`,
                            filter: 'blur(24px)',
                          }}
                        />

                        {/* Top accent line */}
                        <div 
                          className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                          }}
                        />

                        <div className="relative p-4 sm:p-6 md:p-9 flex flex-col h-full">
                          {/* Step number + Icon */}
                          <div className="flex items-start justify-between">
                            <span 
                              className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-headline font-extrabold leading-none select-none"
                              style={{ color: `${s.accent}12` }}
                            >
                              {s.n}
                            </span>
                            <motion.div
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                              className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl shrink-0"
                              style={{
                                background: `${s.accent}10`,
                                boxShadow: `0 0 30px ${s.accent}15`,
                              }}
                            >
                              {s.icon}
                            </motion.div>
                          </div>

                          {/* Text & Image — centered in remaining space */}
                          <div className="flex-1 flex flex-col justify-center gap-4 py-3">
                            <div className="relative w-full h-16 sm:h-24 md:h-32 xl:h-40 rounded-xl overflow-hidden border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                               <img src={s.image} alt={s.title} className="w-full h-full object-cover mix-blend-screen opacity-90" />
                               <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,32,41,0.9)] via-[rgba(27,32,41,0.2)] to-transparent" />
                            </div>
                            <div>
                              <h3 className="text-base sm:text-xl lg:text-3xl font-headline font-extrabold text-white mb-1 sm:mb-2 tracking-tight leading-tight">
                                {s.title}
                              </h3>
                              <p className="text-[11px] sm:text-xs lg:text-base text-slate-400 leading-relaxed font-body">
                                {s.desc}
                              </p>
                            </div>
                          </div>

                          {/* Bottom tag */}
                          <div className="mt-auto pt-4 border-t border-white/[0.04]">
                            <span 
                              className="text-[11px] font-label uppercase tracking-[0.15em] font-bold"
                              style={{ color: s.accent }}
                            >
                              Paso {s.n}
                            </span>
                          </div>
                        </div>
                      </div>
                    </ShineBorder>
                  </motion.div>

                  {/* Connector */}
                  {i < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.2, type: 'spring' }}
                      viewport={{ once: true }}
                      className="hidden md:flex items-center justify-center mx-2 lg:mx-4 shrink-0"
                    >
                      <div className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M5 3L9 7L5 11" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </HeroGeometric>
    </section>
  )
}
