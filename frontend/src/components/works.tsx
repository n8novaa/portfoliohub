import { motion, Variants } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { Github } from "./icons";
import type { Project } from "../types";

// Generate a consistent but distinct gradient for each project based on its title
const generateGradient = (title: string) => {
  const colors = [
    "from-purple-500/20 to-blue-500/20",
    "from-cyan-500/20 to-blue-500/20",
    "from-blue-500/20 to-indigo-500/20",
    "from-fuchsia-500/20 to-purple-500/20",
    "from-violet-500/20 to-fuchsia-500/20",
    "from-teal-500/20 to-emerald-500/20"
  ];
  const charCode = title.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

export default function Works({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section id="work" className="max-w-7xl mx-auto px-6 sm:px-12 py-32 relative z-0">
      <motion.div 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVars}
        className="flex flex-col items-center text-center mb-20"
      >
        <motion.div variants={itemVars} className="flex items-center gap-4 mb-4">
          <div className="h-[2px] w-12 bg-primary rounded-full" />
          <p className="text-primary font-medium text-sm sm:text-base tracking-widest uppercase">
            Portfolio
          </p>
          <div className="h-[2px] w-12 bg-primary rounded-full" />
        </motion.div>
        <motion.h2 variants={itemVars} className="font-sans text-white font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
          Featured Projects.
        </motion.h2>
        <motion.p variants={itemVars} className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          A showcase of my recent work, highlighting problem-solving capabilites, architecture design, and technical proficiency.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVars}
      >
        {projects.map((project) => {
          const techList = project.tech_stack ? project.tech_stack.split(",").map((s) => s.trim()).filter(Boolean) : [];
          const gradientClass = generateGradient(project.title);
          
          return (
            <motion.div
              key={project.id}
              variants={itemVars}
              className="bg-surface/40 backdrop-blur-xl rounded-3xl border border-white/5 hover:bg-surface/60 hover:border-white/10 transition-all duration-500 shadow-2xl flex flex-col group relative overflow-hidden h-full"
            >
              {/* Simulated Image Area */}
              <div className="relative w-full h-48 overflow-hidden bg-surfaceLight border-b border-white/5">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} group-hover:scale-110 transition-transform duration-700 ease-in-out`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay">
                   <Folder size={64} className="text-white drop-shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                </div>
                {/* Tech Badges on top of image */}
                <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {techList.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold text-white bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 shadow-lg uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                  {techList.length > 3 && (
                    <span className="text-[10px] font-bold text-white bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 shadow-lg">
                      +{techList.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow relative z-10">
                <h3 className="text-white font-bold text-2xl tracking-tight mb-4 group-hover:text-cyanGlow transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed flex-grow line-clamp-4">
                  {project.description || project.short_description}
                </p>
                
                <div className="pt-8 mt-auto flex items-center gap-4">
                  {project.live_url && (
                    <a 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-1 flex items-center justify-center gap-2 text-sm bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`flex items-center justify-center gap-2 text-sm bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 border border-white/10 hover:border-white/20 active:scale-95 ${!project.live_url ? 'flex-1' : 'flex-none w-14 sm:w-auto sm:flex-1'}`}
                      aria-label="Source Code"
                    >
                      <Github size={18} className="mx-auto" />
                      <span className={`${project.live_url ? 'hidden sm:inline-block' : 'inline-block'}`}>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
