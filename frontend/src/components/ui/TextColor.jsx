"use client";

import React from "react";
import { Plus } from "lucide-react"; 

export function TextColor() {
  return (
    <div className="w-full flex justify-center mb-4 mt-2">
      <div className="px-2">
        <div className="relative py-6 px-6 md:px-12 w-full h-full border border-slate-800/40 rounded-3xl [mask-image:radial-gradient(100rem_24rem_at_center,white,transparent)]">
          <h1 className="tracking-tighter flex select-none px-3 py-2 flex-col text-center text-4xl md:text-5xl lg:text-7xl font-headline font-extrabold leading-tight md:leading-none lg:flex-row gap-1 lg:gap-4 justify-center items-center">
            
            {/* Corner Crosses in Cyan */}
            <Plus className="absolute -left-4 -top-4 h-8 w-8 text-[#00d4ff]/40" />
            <Plus className="absolute -bottom-4 -left-4 h-8 w-8 text-[#00d4ff]/40" />
            <Plus className="absolute -right-4 -top-4 h-8 w-8 text-[#00d4ff]/40" />
            <Plus className="absolute -bottom-4 -right-4 h-8 w-8 text-[#00d4ff]/40" />

            {/* Segment 1: Un contenido. */}
            <div className="relative flex items-center justify-center">
              <span
                data-content="Un contenido."
                className="before:animate-gradient-background-1 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:content-[attr(data-content)] before:text-white before:text-center text-center w-full"
              >
                <span className="from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text text-transparent px-1 md:px-2">
                  Un contenido.
                </span>
              </span>
            </div>

            {/* Segment 2: Infinitos formatos. */}
            <div className="relative flex items-center justify-center">
              <span
                data-content="Infinitos formatos."
                className="before:animate-gradient-background-2 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:content-[attr(data-content)] before:text-white before:text-center text-center w-full"
              >
                <span className="from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text text-transparent px-1 md:px-2">
                  Infinitos formatos.
                </span>
              </span>
            </div>

          </h1>
        </div>
      </div>
    </div>
  );
}
