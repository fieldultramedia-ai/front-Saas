"use client";
import React from "react";
import { motion, useInView } from "framer-motion";

export function TimelineContent({
  children,
  animationNum = 0,
  timelineRef,
  customVariants,
  as = "div",
  className,
  ...props
}) {
  const Component = motion[as] || motion.div;
  const inView = useInView(timelineRef || { current: null }, { once: true, margin: "-100px" });

  return (
    <Component
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={animationNum}
      variants={customVariants}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
