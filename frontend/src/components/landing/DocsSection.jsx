import React from 'react'
import { motion } from 'framer-motion'
import AnimatedGradientBackground from '../ui/AnimatedGradientBackground'
import { TextEffect } from '../ui/TextEffect'

const docs = [
  {
    category: 'Inteligencia Artificial',
    title: 'Generación con IA',
    details: 'Nuestro motor semántico no solo traduce datos; entiende el valor comercial. Analiza la propiedad, identifica los puntos de venta únicos y redacta copys optimizados para cada plataforma, desde el tono profesional de un PDF hasta el estilo energético de un Reel.'
  },
  {
    category: 'Contenido',
    title: 'Multi-formato',
    details: 'Olvídate de redimensionar imágenes. LeadBook transforma una sola subida en una suite completa: PDFs editoriales de 300dpi, posts cuadrados para IG, historias verticales animadas y guiones para video, todo manteniendo la coherencia visual de tu marca.'
  },
  {
    category: 'Automatización',
    title: 'Publicación automática',
    details: 'Conexión directa vía API oficial con Meta y WhatsApp. No más descargas manuales; programa tus lanzamientos o publica instantáneamente. Gestiona múltiples cuentas desde un solo tablero centralizado.'
  },
  {
    category: 'Usabilidad',
    title: 'Sin experiencia técnica',
    details: 'Diseñado por publicistas para profesionales. Hemos destilado años de teoría de diseño en una interfaz intuitiva de arrastrar y soltar. Si sabes usar un smartphone, sabes crear marketing de clase mundial con LeadBook.'
  },
  {
    category: 'Eficiencia',
    title: 'Listo en segundos',
    details: 'El tiempo es dinero. Lo que a una agencia le toma 48 horas, a LeadBook le toma 15 segundos. Reducimos el ciclo de producción de contenido en un 99%, permitiéndote escalar tu presencia digital sin aumentar el equipo.'
  },
  {
    category: 'Versatilidad',
    title: 'Para cualquier nicho',
    details: 'Aunque optimizado para el sector inmobiliario, nuestro motor es flexible. Adaptamos el lenguaje para Fitness, E-commerce, Servicios y más. La estructura de venta es universal, LeadBook la aplica a tu nicho específico.'
  }
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const docVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
}

export default function DocsSection() {
  return (
    <section id="docs" className="relative w-full h-full overflow-hidden bg-[#070B14] flex flex-col items-center justify-center">
      <AnimatedGradientBackground />
      
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 overflow-hidden">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <TextEffect
            per="word"
            as="h2"
            preset="blur"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-white mb-2 sm:mb-4"
          >
            Documentación de Funciones
          </TextEffect>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base md:text-lg">
            Explora en detalle cómo LeadBook potencia cada aspecto de tu estrategia de marketing.
          </p>
        </div>

        {/* Docs Grid */}
        <div className="flex-1 overflow-hidden pr-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
          >
            {docs.map((item, i) => (
              <motion.div 
                key={i} 
                variants={docVariant}
                className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md group hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
              >
                <div className="text-xs font-label uppercase tracking-widest text-cyan-400 mb-2 opacity-60">
                  {item.category}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-headline font-bold text-white mb-2 sm:mb-4 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base">
                  {item.details}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .docs-scrollbar::-webkit-scrollbar { width: 6px; }
        .docs-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .docs-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 212, 255, 0.2); border-radius: 10px; }
        .docs-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 212, 255, 0.4); }
      `}</style>
    </section>
  )
}
