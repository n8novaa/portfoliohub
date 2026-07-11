import { motion } from "framer-motion";
import type { Project } from "../types";

export default function Works({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="work" className="max-w-7xl mx-auto px-6 sm:px-16 py-24 relative z-0">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <p className="text-secondary font-medium text-lg uppercase tracking-widest">My Work</p>
        <h2 className="text-white font-black text-4xl sm:text-5xl md:text-6xl mt-2">Projects.</h2>
      </motion.div>

      <div className="w-full flex mt-6">
        <motion.p
           initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
           className="text-slate-300 text-lg sm:text-xl max-w-3xl leading-[1.8]"
        >
          Following projects showcase my skills through real-world examples. Each project highlights my problem-solving ability, technical stack, and architecture choices.
        </motion.p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const techList = project.tech_stack ? project.tech_stack.split(",").map((s) => s.trim()).filter(Boolean) : [];
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-xl flex flex-col group relative overflow-hidden"
            >
              {/* Highlight bar at top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />

              <h3 className="mt-2 text-white font-bold text-2xl tracking-wide">{project.title}</h3>
              <p className="mt-4 text-slate-300 text-[15px] leading-relaxed flex-grow">{project.description || project.short_description}</p>
              
              <div className="mt-6 flex flex-wrap gap-2 mb-6">
                {techList.map((tag, i) => (
                  <span key={i} className="text-[13px] font-semibold text-tertiary bg-tertiary/10 px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700/50 flex gap-4 mt-auto">
                {project.live_url && (
                   <a href={project.live_url} target="_blank" rel="noreferrer" className="flex-1 text-center text-sm bg-primary text-white hover:bg-primary/80 px-4 py-2.5 rounded-xl font-bold transition-colors">
                     Live Demo
                   </a>
                )}
                {project.github_url && (
                   <a href={project.github_url} target="_blank" rel="noreferrer" className="flex-1 text-center text-sm bg-slate-700/50 text-white hover:bg-slate-700 px-4 py-2.5 rounded-xl font-bold transition-colors">
                     Source Code
                   </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
