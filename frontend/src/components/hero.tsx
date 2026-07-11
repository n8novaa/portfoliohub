import { motion } from "framer-motion";
import type { Profile } from "../types";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="hero" className="relative w-full h-screen mx-auto flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient background layers */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[100px] animate-pulse mix-blend-screen" />
         <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-tertiary/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-16 flex flex-col items-start gap-6 w-full mt-[-60px]">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-tertiary font-medium text-lg md:text-xl tracking-widest uppercase"
        >
          Hello, I'm
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white font-black text-6xl sm:text-7xl md:text-8xl lg:text-[100px] tracking-tight leading-none"
        >
          {profile.full_name}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight max-w-4xl"
        >
          {profile.headline}
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="mt-8 flex flex-wrap gap-6"
        >
          <a href="#work" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(145,94,255,0.4)] hover:scale-105">
            View Projects
          </a>
          <a href="#contact" className="bg-surface/50 backdrop-blur-md border border-slate-700/50 hover:bg-surface text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
            Contact Me
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center items-center z-10">
        <a href="#about" aria-label="Scroll to About">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-slate-500/50 flex justify-center items-start p-2 hover:border-primary transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-slate-300"
            />
          </div>
        </a>
      </div>
    </section>
  );
}