import { motion } from 'framer-motion'
import ParticleTextEffect from '../ui/particle-text-effect'
import ProfileCard from '../ui/ProfileCard'
import BackgroundShader from '../ui/background-shaders'

const formats = [
  { 
    icon: '📄', 
    title: 'PDF Profesional', 
    desc: 'Catálogos, propuestas, folletos. Descargables para compartir por email.',
    badge: 'Mejor para: presentaciones',
    gradientFrom: '#00D4FF',
    gradientTo: '#6001D1',
  },
  { 
    icon: '📸', 
    title: 'Instagram Post', 
    desc: 'Posts optimizados con copy y hashtags. Listo para publicar en feed.',
    badge: 'Mejor para: engagement',
    gradientFrom: '#6001D1',
    gradientTo: '#00D4FF',
  },
  { 
    icon: '✨', 
    title: 'Instagram Story', 
    desc: 'Stories atractivas con animaciones. Expira en 24h pero llega a tus followers.',
    badge: 'Mejor para: urgencia',
    gradientFrom: '#00D4FF',
    gradientTo: '#6001D1',
  },
  { 
    icon: '🎠', 
    title: 'Carrusel', 
    desc: 'Multi-slide posts que aumentan alcance. Instagram los promociona más.',
    badge: 'Mejor para: alcance',
    gradientFrom: '#6001D1',
    gradientTo: '#00D4FF',
  },
  { 
    icon: '📧', 
    title: 'Email Marketing', 
    desc: 'Newsletters con copy persuasivo. Conecta directo con tu audiencia.',
    badge: 'Mejor para: conversión',
    gradientFrom: '#00D4FF',
    gradientTo: '#6001D1',
  },
  { 
    icon: '🎬', 
    title: 'Video (Reel)', 
    desc: 'Videos cortos de 15-60s con IA. Reels son el formato con más viralidad.',
    badge: 'Mejor para: viralidad',
    gradientFrom: '#6001D1',
    gradientTo: '#00D4FF',
  },
]

export default function FormatsSection() {
  return (
    <section id="formatos" className="relative w-full h-full overflow-hidden bg-[#070b14] flex flex-col items-center justify-start">
      <BackgroundShader />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col items-center pb-4 sm:pb-6 pt-16 sm:pt-20 md:pt-[10vh] overflow-hidden">
        
        {/* Header - Particle Text Effect */}
        <div className="w-full flex justify-center text-center flex-col shrink-0 mb-1 sm:mb-2 md:mb-4 mt-1 sm:mt-2">
          <ParticleTextEffect 
            words={["Formatos", "PDF", "Carrusel", "Stories", "Email", "Reels"]} 
            className="w-full max-w-2xl mx-auto h-[70px] sm:h-[100px] md:h-[130px] lg:h-[160px]" 
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full max-w-6xl mt-2 sm:mt-4">
          {formats.map((f, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               viewport={{ once: true }}
             >
               <ProfileCard
                 name={f.title}
                 title={f.desc}
                 handle={f.badge}
                 status="Leadbook AI"
                 contactText="Ver más"
                 emojiIcon={f.icon}
                 showUserInfo={true}
                 enableTilt={true}
                 enableMobileTilt={false}
                 behindGlowColor={f.gradientFrom}
                 behindGlowEnabled={true}
                 innerGradient={`linear-gradient(145deg,${f.gradientTo}44 0%,${f.gradientFrom}22 100%)`}
               />
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
