import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

/**
 * AnimatedGradientBackground
 *
 * This component renders a customizable animated radial gradient background with a subtle breathing effect.
 * It uses `framer-motion` for an entrance animation and raw CSS gradients for the dynamic background.
 *
 * @returns JSX.Element
 */
const AnimatedGradientBackground = ({
   startingGap = 125,
   Breathing = true,
   gradientColors = [
      "#070B14", // Obsidian Loom Charcoal
      "#00D4FF", // Functional Cyan Light
      "#6001D1", // Secondary Violet Depth
      "#00D4FF",
      "#0a0e17", // surface_container_lowest
      "#070B14",
      "#070B14"
   ],
   gradientStops = [35, 50, 60, 70, 80, 90, 100],
   animationSpeed = 0.02,
   breathingRange = 10,
   containerStyle = {},
   topOffset = -20,
   containerClassName = "",
}) => {
   // Validation: Ensure gradientStops and gradientColors lengths match
   if (gradientColors.length !== gradientStops.length) {
      console.error(
         `GradientColors and GradientStops must have the same length.
     Received gradientColors length: ${gradientColors.length},
     gradientStops length: ${gradientStops.length}`
      );
   }

   const containerRef = useRef(null);

   useEffect(() => {
      let animationFrame;
      let width = startingGap;
      let directionWidth = 1;

      const animateGradient = () => {
         if (width >= startingGap + breathingRange) directionWidth = -1;
         if (width <= startingGap - breathingRange) directionWidth = 1;

         if (!Breathing) directionWidth = 0;
         width += directionWidth * animationSpeed;

         const gradientStopsString = gradientStops
            .map((stop, index) => `${gradientColors[index]} ${stop}%`)
            .join(", ");

         const gradient = `radial-gradient(${width}% ${width + topOffset}% at 50% 15%, ${gradientStopsString})`;

         if (containerRef.current) {
            containerRef.current.style.background = gradient;
         }

         animationFrame = requestAnimationFrame(animateGradient);
      };

      animationFrame = requestAnimationFrame(animateGradient);

      return () => cancelAnimationFrame(animationFrame); // Cleanup animation
   }, [startingGap, Breathing, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset]);

   return (
      <motion.div
         key="animated-gradient-background"
         initial={{
            opacity: 0,
            scale: 1.2,
         }}
         animate={{
            opacity: 1,
            scale: 1,
            transition: {
               duration: 2.5,
               ease: [0.25, 0.1, 0.25, 1], // Cubic bezier easing
             },
         }}
         className={`absolute inset-0 overflow-hidden ${containerClassName}`}
         style={{ zIndex: 0 }}
      >
         <div
            ref={containerRef}
            style={containerStyle}
            className="absolute inset-0 transition-transform duration-1000"
         />
      </motion.div>
   );
};

export default AnimatedGradientBackground;
