'use client'
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const GradientCard = ({ icon, title, description, onClick }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate mouse position relative to card center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate rotation (limited range for subtle effect)
      const rotateX = -(y / rect.height) * 8; // Max 8 degrees rotation
      const rotateY = (x / rect.width) * 8; // Max 8 degrees rotation

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  // Reset rotation when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="flex items-center justify-center p-2 sm:p-4">
      {/* Card container with Obsidian Loom editorial look */}
      <motion.div
        ref={cardRef}
        onClick={onClick}
        style={{
          width: "100%",
          maxWidth: "300px",
          transformStyle: "preserve-3d",
          backgroundColor: "var(--surface-container)",
        }}
        className="relative rounded-[24px] overflow-hidden border border-white/10 cursor-pointer h-[180px] sm:h-[220px] md:h-[260px]"
        animate={{
          y: isHovered ? -5 : 0,
          rotateX: rotation.x,
          rotateY: rotation.y,
          perspective: 1000,
          borderColor: isHovered ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.15)",
          boxShadow: isHovered 
            ? "0 24px 80px rgba(0, 0, 0, 0.6)" 
            : "0 12px 40px rgba(0, 0, 0, 0.4)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Obsidian Loom Backdrop */}
        <div className="absolute inset-0 z-0 bg-[#1b2029]" />

        {/* The Signature Violet Radial (Hover State) */}
        <motion.div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none z-10"
          style={{
            background: "radial-gradient(circle, rgba(96, 1, 209, 0.2) 0%, rgba(96, 1, 209, 0) 70%)",
            filter: "blur(20px)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{ duration: 0.5 }}
        />



        {/* Card content */}
        <div className="relative flex flex-col h-full p-5 sm:p-6 md:p-8 z-[40]">
          {/* Icon Area - Functional Light Source (Cyan) */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 sm:mb-6 bg-white/5 border border-white/10 backdrop-blur-md relative group">
            <span className="material-symbols-outlined text-[#00d4ff] text-xl sm:text-2xl z-10">{icon}</span>
            <motion.div 
               className="absolute inset-0 bg-[#00d4ff]/10"
               animate={{ opacity: isHovered ? 1 : 0 }}
            />
          </div>

          {/* Editorial Content */}
          <div className="flex-1">
            <h3 className="text-base sm:text-lg md:text-xl font-headline font-extrabold text-white mb-2 sm:mb-3 tracking-tighter leading-none">
              {title}
            </h3>
            <p className="text-xs sm:text-[0.875rem] font-body text-slate-400 leading-relaxed font-medium line-clamp-3">
              {description}
            </p>
          </div>
          
          <div className="mt-auto flex items-center gap-2 text-[#00d4ff] font-bold text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity cursor-pointer group/btn">
             <span>Ver más</span>
             <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
