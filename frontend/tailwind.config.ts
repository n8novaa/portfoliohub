/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#a855f7", // Purple accents
        secondary: "#9ca3af", // Soft gray secondary
        tertiary: "#3b82f6", // Blue highlights
        cyanGlow: "#06b6d4", // Cyan glow
        background: "#050505", // Near black
        surface: "#111111", // Surface cards
        surfaceLight: "#1a1a1a", // Lighter surface
      },
      boxShadow: {
        card: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        glow: "0 0 20px rgba(6, 182, 212, 0.3)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  plugins: [],
};
