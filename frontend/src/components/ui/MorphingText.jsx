'use client'
import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

export const MorphingText = ({ 
  words, 
  className,
  interval = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [morphProgress, setMorphProgress] = useState(0);

  const currentWord = words[currentIndex] || "";
  const nextWord = words[(currentIndex + 1) % words.length] || "";

  useEffect(() => {
    // Morph animation
    const morphDuration = 800;
    const steps = 20;
    let step = 0;

    const morphInterval = setInterval(() => {
      step++;
      const progress = step / steps;
      setMorphProgress(progress);

      if (progress < 0.5) {
        // Morphing out
        const charCount = Math.floor(currentWord.length * (1 - progress * 2));
        setDisplayText(currentWord.slice(0, charCount));
      } else {
        // Morphing in
        const charCount = Math.floor(nextWord.length * ((progress - 0.5) * 2));
        setDisplayText(nextWord.slice(0, charCount));
      }

      if (step >= steps) {
        clearInterval(morphInterval);
        setDisplayText(nextWord);
      }
    }, morphDuration / steps);

    const wordTimeout = setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % words.length);
    }, interval);

    return () => {
      clearInterval(morphInterval);
      clearTimeout(wordTimeout);
    };
  }, [currentIndex, currentWord, nextWord, interval, words.length]);

  return (
    <div className={cn("relative inline-block", className)}>
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
        {displayText}
        <span className="inline-block w-1 h-[0.8em] bg-gradient-to-b from-cyan-400 to-purple-600 animate-pulse ml-2 align-middle" />
      </span>
    </div>
  );
};
