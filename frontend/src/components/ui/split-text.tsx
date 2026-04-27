"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextSplitProps {
  children: string;
  className?: string;
  topClassName?: string;
  bottomClassName?: string;
  maxMove?: number;
  falloff?: number;
}

export const TextSplit = ({
  children,
  className,
  topClassName,
  bottomClassName,
  maxMove = 50,
  falloff = 0.3,
}: TextSplitProps) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const getOffset = (index: number) => {
    if (hoverIndex === null) return 0;
    const distance = Math.abs(index - hoverIndex);
    return Math.max(0, maxMove * (1 - distance * falloff));
  };

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
    >
      {children.split("").map((char, index) => {
        const offset = getOffset(index);
        const displayChar = char === " " ? "\u00A0" : char;

        return (
          <div
            key={`${char}-${index}`}
            className="relative flex flex-col items-center h-[1em] w-auto leading-none"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Top Half */}
            <motion.div
              initial={false}
              animate={{ y: `-${offset}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("relative h-1/2 overflow-visible", topClassName)}
              style={{ clipPath: 'polygon(-50% 0, 150% 0, 150% 100%, -50% 100%)' }}
            >
              <div className="flex text-center whitespace-nowrap">{displayChar}</div>
            </motion.div>

            {/* Bottom Half */}
            <motion.div
              initial={false}
              animate={{ y: `${offset}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("relative h-1/2 overflow-visible", bottomClassName)}
              style={{ clipPath: 'polygon(-50% 0, 150% 0, 150% 100%, -50% 100%)' }}
            >
              <div className="flex text-center whitespace-nowrap -translate-y-1/2">{displayChar}</div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
