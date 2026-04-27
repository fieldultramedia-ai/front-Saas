/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "#00d4ff",
        "primary-container": "#00d4ff",
        "secondary": "#6001d1",
        "secondary-container": "#6001d1",
        "surface": "#0f131d",
        "surface-container-lowest": "#0a0e17",
        "surface-container-low": "#050505",
        "surface-container": "#1b2029",
        "surface-container-high": "#212833",
        "surface-container-highest": "#28303d",
        "surface-bright": "#353944",
        "outline-variant": "rgba(255, 255, 255, 0.15)", /* Ghost Border */
        "on-surface": "#ffffff",
        "on-background": "#ffffff",
      },
      fontFamily: {
        "headline": ["Syne", "sans-serif"],
        "label": ["Manrope", "sans-serif"],
        "body": ["DM Sans", "sans-serif"]
      },
      keyframes: {
        "gradient-border": {
          "0%, 100%": { borderRadius: "37% 29% 27% 27% / 28% 25% 41% 37%" },
          "25%": { borderRadius: "47% 29% 39% 49% / 61% 19% 66% 26%" },
          "50%": { borderRadius: "57% 23% 47% 72% / 63% 17% 66% 33%" },
          "75%": { borderRadius: "28% 49% 29% 100% / 93% 20% 64% 25%" },
        },
        "gradient-1": {
          "0%, 100%": { top: "0", right: "0" },
          "50%": { top: "50%", right: "25%" },
          "75%": { top: "25%", right: "50%" },
        },
        "gradient-2": {
          "0%, 100%": { top: "0", left: "0" },
          "60%": { top: "75%", left: "25%" },
          "85%": { top: "50%", left: "50%" },
        },
        "gradient-3": {
          "0%, 100%": { bottom: "0", left: "0" },
          "40%": { bottom: "50%", left: "25%" },
          "65%": { bottom: "25%", left: "50%" },
        },
        "gradient-4": {
          "0%, 100%": { bottom: "0", right: "0" },
          "50%": { bottom: "25%", right: "40%" },
          "90%": { bottom: "50%", right: "25%" },
        },
        "shine-pulse": {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          "to": { "background-position": "0% 0%" },
        },
      },
    },
  },
  plugins: [],
}
