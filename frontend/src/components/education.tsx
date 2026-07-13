import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import type { Education } from "../types";

export default function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" className="max-w-4xl mx-auto px-6 sm:px-12 py-32 relative z-0">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center text-center mb-20"
      >
        <motion.div className="flex items-center gap-4 mb-4">
          <div className="h-[2px] w-12 bg-cyanGlow rounded-full" />
          <p className="text-cyanGlow font-medium text-sm sm:text-base tracking-widest uppercase">
            Academic Background
          </p>
          <div className="h-[2px] w-12 bg-cyanGlow rounded-full" />
        </motion.div>
        <h2 className="font-sans text-white font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
          Education.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {(!education || education.length === 0) ? (
          <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-3xl text-center text-slate-400">
             No education details added yet. Check back soon!
          </div>
        ) : (
          education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
              className="group w-full"
            >
              <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-3xl group-hover:bg-surface/50 group-hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyanGlow/5 rounded-full blur-3xl group-hover:bg-cyanGlow/10 transition-colors duration-500" />
                
                <div className="w-16 h-16 shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-cyanGlow/30 relative z-10">
                  <GraduationCap size={32} className="text-cyanGlow" />
                </div>
                
                <div className="flex flex-col relative z-10 flex-grow w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <h3 className="text-white text-2xl font-bold">{edu.degree}</h3>
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full inline-block sm:shrink-0 mx-auto sm:mx-0">
                      <span className="text-slate-300 font-medium text-sm">
                        {edu.start_year} - {edu.end_year}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 font-medium text-lg">{edu.institution}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
