import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { Experience } from "../types";

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 sm:px-12 py-32 relative z-0">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center text-center mb-20"
      >
        <motion.div className="flex items-center gap-4 mb-4">
          <div className="h-[2px] w-12 bg-primary rounded-full" />
          <p className="text-primary font-medium text-sm sm:text-base tracking-widest uppercase">
            Career Path
          </p>
          <div className="h-[2px] w-12 bg-primary rounded-full" />
        </motion.div>
        <h2 className="font-sans text-white font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
          Work Experience.
        </h2>
      </motion.div>

      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-6 space-y-12 pb-8">
        {(!experiences || experiences.length === 0) ? (
          <div className="relative pl-8 sm:pl-12">
             <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-6 sm:p-8 rounded-3xl text-center text-slate-400">
                No work experience added yet. Check back soon!
             </div>
          </div>
        ) : (
          experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 bg-surface border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 group-hover:bg-primary transition-all duration-300 z-10">
                <Briefcase size={14} className="text-primary group-hover:text-white transition-colors duration-300" />
              </div>

              <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-6 sm:p-8 rounded-3xl group-hover:bg-surface/50 group-hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10">
                  <div>
                    <h3 className="text-white text-2xl font-bold tracking-wide">{exp.title}</h3>
                    <p className="text-primary font-semibold text-lg mt-1">{exp.organization}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full self-start sm:self-center shrink-0">
                    <span className="text-slate-300 font-medium text-sm">
                      {exp.is_current ? `${exp.start_date} - Present` : `${exp.start_date} - ${exp.end_date}`}
                    </span>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none relative z-10">
                  <p className="text-slate-400 leading-relaxed text-base">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
        
        {/* Fading line at bottom */}
        <div className="absolute bottom-0 left-[-2px] w-1 h-32 bg-gradient-to-t from-background to-white/10" />
      </div>
    </section>
  );
}
