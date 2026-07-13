import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ExternalLink, Folder, ChevronDown } from "lucide-react";
import { Github } from "./icons";
import type { Project } from "../types";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const techList = project.tech_stack ? project.tech_stack.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const gradientClass = generateGradient(project.title);

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 24, delay: index * 0.08 } }
  };

  return (
    <motion.div
      variants={itemVars}
      layout
      className="bg-surface/40 backdrop-blur-xl rounded-3xl border border-white/5 hover:border-white/10 transition-colors duration-500 shadow-2xl flex flex-col group relative overflow-hidden"
    >
      {/* Image / Banner Area */}
      <div className="relative w-full h-44 overflow-hidden bg-surfaceLight border-b border-white/5 flex-shrink-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} group-hover:scale-110 transition-transform duration-700 ease-in-out`} />
        <div className="absolute inset-0 flex items-center justify-center opacity-20 mix-blend-overlay">
          <Folder size={72} className="text-white drop-shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
        </div>
        {/* Featured badge */}
        {project.is_featured && (
          <span className="absolute top-3 right-3 text-[10px] font-bold text-white bg-primary/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary/40 shadow-lg uppercase tracking-wider z-10">
            Featured
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-7 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-white font-bold text-xl tracking-tight mb-3 group-hover:text-cyanGlow transition-colors duration-300">
          {project.title}
        </h3>

        {/* Short description — always visible */}
        <p className="text-slate-400 text-sm leading-relaxed">
          {project.short_description || project.description}
        </p>

        {/* Expandable section */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {/* Full description */}
              {project.description && project.description !== project.short_description && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-slate-300 text-sm leading-relaxed mt-4 pt-4 border-t border-white/5"
                >
                  {project.description}
                </motion.p>
              )}

              {/* Tech Stack */}
              {techList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.3 }}
                  className="mt-5"
                >
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium text-slate-300 bg-background/70 border border-white/10 px-3 py-1 rounded-full hover:border-primary/40 hover:text-white transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand / Collapse toggle */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors duration-200 self-start focus:outline-none"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show more"}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronDown size={14} />
          </motion.span>
        </button>

        {/* Action buttons */}
        <div className="pt-6 mt-auto flex items-center gap-3">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center gap-2 text-sm bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-300 border border-white/10 hover:border-white/20 active:scale-95 ${!project.live_url ? "flex-1" : ""}`}
              aria-label="Source Code"
            >
              <Github size={17} />
              {!project.live_url && <span>Source</span>}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Works({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
          A showcase of my recent work, highlighting problem-solving capabilities, architecture design, and technical proficiency.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVars}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
