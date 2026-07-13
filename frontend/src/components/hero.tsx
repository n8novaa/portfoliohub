import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  Cloud,
  Brain,
  Sparkles,
  Terminal
} from "lucide-react";

import type { Profile } from "../types";

const techIcons = [
  { icon: Code2, label: "React", delay: 0 },
  { icon: Database, label: "Django", delay: 0.2 },
  { icon: Cloud, label: "Cloud", delay: 0.4 },
  { icon: Brain, label: "AI", delay: 0.6 },
];

export default function Hero({ profile }: { profile: Profile }) {
  const names = profile.full_name?.split(" ") || [];
  const firstName = names[0] || "Creative";
  const lastName = names.slice(1).join(" ") || "Developer";

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      {/* Smooth Wavy Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg 
           viewBox="0 0 100 100" 
           preserveAspectRatio="none" 
           className="w-full h-full absolute inset-0 opacity-50 mix-blend-screen"
        >
           <defs>
             <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#a855f7" stopOpacity="0.1" />
               <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
               <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
             </linearGradient>
           </defs>
           
           {[...Array(6)].map((_, i) => (
             <motion.path 
               key={i}
               fill="none"
               stroke="url(#waveGrad)"
               strokeWidth={1.5}
               vectorEffect="non-scaling-stroke"
               animate={{ 
                  d: [
                    `M0,${40 + i * 4} C${20 + i * 6},${15 - i * 2} ${70 - i * 6},${85 + i * 2} 100,${40 + i * 4}`,
                    `M0,${40 + i * 4} C${30 - i * 4},${85 + i * 5} ${80 + i * 4},${15 - i * 5} 100,${40 + i * 4}`,
                    `M0,${40 + i * 4} C${20 + i * 6},${15 - i * 2} ${70 - i * 6},${85 + i * 2} 100,${40 + i * 4}`
                  ]
               }}
               transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "easeInOut" }}
             />
           ))}
        </svg>
        {/* Subtle overlay to fade the edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full grid lg:grid-cols-2 lg:gap-16 items-center">
        {/* LEFT */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={containerVars}
          className="flex flex-col text-left pt-10 lg:pt-0"
        >
          <motion.div variants={itemVars} className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center p-2 rounded-lg bg-surface/50 border border-white/10 backdrop-blur-md">
              <Sparkles size={16} className="text-secondary" />
            </div>
            <p className="text-secondary font-medium tracking-widest uppercase text-sm">
              {profile.headline || "Full Stack Developer"}
            </p>
          </motion.div>

          <motion.h1 variants={itemVars} className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[1.1] mb-6">
            <span className="block text-white">
              {firstName}
            </span>
            <span className="block bg-gradient-to-r from-primary via-tertiary to-cyanGlow bg-clip-text text-transparent">
              {lastName}
            </span>
          </motion.h1>

          <motion.p variants={itemVars} className="max-w-xl text-slate-300 text-lg sm:text-xl font-light leading-relaxed mb-10">
            Building scalable backend systems, modern web applications and AI-powered experiences using Django, React and Cloud technologies.
          </motion.p>

          <motion.div variants={itemVars} className="flex flex-wrap gap-5">
            <a
              href="#work"
              className="group flex items-center gap-3 bg-white text-background px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-glow"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full font-bold text-white bg-surface/30 backdrop-blur-xl border border-white/10 hover:bg-surface/50 transition-colors duration-300"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2, type: "spring" }}
           className="hidden lg:flex justify-end items-center relative mt-20 lg:mt-0"
           style={{ perspective: "1000px" }}
        >
          {/* Main Visual Card */}
          <motion.div 
             animate={{ y: [-15, 15, -15], rotateY: [-12, -18, -12], rotateX: [8, 12, 8] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
             className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl"
             style={{ transformStyle: "preserve-3d" }}
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-tertiary/20 to-cyanGlow/40 rounded-3xl blur-3xl opacity-40" />
             <div className="absolute inset-0 bg-surface/80 backdrop-blur-3xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col z-10 shadow-cyanGlow/10">
                {/* Editor Header */}
                <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between relative">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                   </div>
                   <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-slate-500 font-mono">
                     <Terminal size={12} />
                     developer.tsx
                   </div>
                </div>
                {/* Editor Content */}
                <div className="p-6 font-mono text-sm sm:text-[15px] leading-relaxed text-slate-300">
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">1</span>
                    <p><span className="text-primary">import</span> &#123; Developer &#125; <span className="text-primary">from</span> <span className="text-cyanGlow">"@portfolio/core"</span>;</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">2</span>
                    <p></p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">3</span>
                    <p><span className="text-tertiary">const</span> profile = <span className="text-primary">new</span> Developer(&#123;</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">4</span>
                    <p>&nbsp;&nbsp;name: <span className="text-cyanGlow">"{profile.full_name || "Guest"}"</span>,</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">5</span>
                    <p>&nbsp;&nbsp;options: &#123; <span className="text-slate-400">coffee</span>: <span className="text-primary">true</span> &#125;,</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">6</span>
                    <p>&#125;);</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">7</span>
                    <p></p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">8</span>
                    <p><span className="text-primary">await</span> profile.<span className="text-tertiary">buildAwesomeUI</span>();</p>
                  </div>
                  <div className="flex gap-4 mt-1 items-center">
                    <span className="text-slate-600 select-none">9</span>
                    <motion.div 
                       animate={{ opacity: [0, 1, 0] }}
                       transition={{ duration: 1, repeat: Infinity }}
                       className="ml-4 w-2 h-4 bg-primary"
                    />
                  </div>
                </div>
             </div>
             
             {/* Floating Badges */}
             {techIcons.map((item, index) => {
               // Assign dynamic positions
               let positionClass = "";
               if (index === 0) positionClass = "-top-8 -right-8";
               if (index === 1) positionClass = "-bottom-6 right-12";
               if (index === 2) positionClass = "-bottom-8 -left-4";
               if (index === 3) positionClass = "top-12 -left-8";
               
               return (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.8 + item.delay, type: "spring", bounce: 0.5 }}
                   className={`absolute z-20 bg-surface/90 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 shadow-xl flex items-center justify-center gap-3 ${positionClass}`}
                   style={{ transform: `translateZ(${60 + index * 15}px)` }}
                 >
                   <div className="bg-white/5 p-2 rounded-xl">
                     <item.icon size={20} className="text-white" />
                   </div>
                   <span className="text-[11px] sm:text-xs font-bold text-slate-200 tracking-wider hidden sm:block uppercase">
                     {item.label}
                   </span>
                 </motion.div>
               );
             })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}