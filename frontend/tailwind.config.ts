/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#915EFF",
        background: "#0f172a", // slate 900
        surface: "#1e293b", // slate 800
        secondary: "#a78bfa", // violet 400
        tertiary: "#38bdf8", // cyan 400
        accent: "#818cf8", // indigo 400
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
