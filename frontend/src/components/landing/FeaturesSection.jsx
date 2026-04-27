import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimatedGradientBackground from '../ui/AnimatedGradientBackground'
import { TextEffect } from '../ui/TextEffect'
import { GradientCard } from '../ui/GradientCard'
import { ParticleTextEffect } from '../ui/interactive-text-particle'
import { GooeyText } from '../ui/gooey-text-morphing'

const WORDS = ["increíble", "impactante", "potente", "innovador", "profesional"]

const features = [
  { icon: 'psychology', title: 'Generación con IA', desc: 'Nuestra IA entiende el contexto de tu propiedad para escribir copys que realmente venden.' },
  { icon: 'layers', title: 'Multi-formato', desc: 'De un solo clic obtenés PDFs, posts, stories y videos listos para compartir.' },
  { icon: 'auto_awesome', title: 'Publicación automática', desc: 'Programá tus redes sociales directamente desde LeadBook sin salir de la app.' },
  { icon: 'bolt', title: 'Sin experiencia técnica', desc: 'No necesitás saber de diseño. El sistema hace el trabajo pesado por vos.' },
  { icon: 'timer', title: 'Listo en segundos', desc: 'Lo que antes tomaba horas de diseño ahora se resuelve en lo que tardás en tomar un café.' },
  { icon: 'dashboard', title: 'Para cualquier nicho', desc: 'Optimizado para inmobiliarias, pero flexible para cualquier tipo de producto físico.' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function FeaturesSection({ onNavigate }) {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="funciones" className="relative w-full h-full overflow-hidden bg-[#070B14] flex flex-col items-center justify-start">
      {/* Dynamic Background */}
      <AnimatedGradientBackground />


      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-start overflow-hidden">

        {/* Header Area - Editorial Typography */}
        <div className="text-center w-full flex flex-col items-center gap-2 sm:gap-4 mt-28 sm:mt-32 md:mt-40 lg:mt-44 mb-0">
          <div className="pb-4 overflow-visible flex flex-col items-center w-full">

            <TextEffect
              per="word"
              as="h2"
              preset="blur"
              className="text-[#00D4FF] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-2 sm:mb-4 tracking-tighter uppercase italic"
            >
              Todo lo que necesitás para que tu negocio sea
            </TextEffect>

            <div className="h-[40px] sm:h-[60px] md:h-[80px] lg:h-[100px] w-full flex items-center justify-center -mt-1 sm:-mt-2">
              <ParticleTextEffect
                key={wordIndex}
                text={WORDS[wordIndex].toUpperCase()}
                colors={['00d4ff', '7c3aed', '00d4ff', 'ffffff']}
                particleDensity={4}
                animationForce={60}
                className="opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Features Grid - Bottom Alignment (3 columns x 2 rows) */}
        <div className="flex-1 flex items-start sm:items-center justify-center w-full mt-0 sm:-mt-12 md:-mt-20 lg:-mt-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-6xl w-full"
          >
            {features.map((f, i) => (
              <div key={i} className="flex justify-center">
                <GradientCard
                  icon={f.icon}
                  title={f.title}
                  description={f.desc}
                  onClick={() => onNavigate?.('docs')}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        #funciones {
          height: 100%;
        }
      `}</style>
    </section>
  )
}
