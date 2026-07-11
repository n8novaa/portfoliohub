import { motion } from "framer-motion";
import type { Profile } from "../types";

export default function About({ profile }: { profile: Profile }) {
  const skillsList = profile.skills ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 sm:px-16 py-24 relative z-0">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <p className="text-secondary font-medium text-lg uppercase tracking-widest">Introduction</p>
        <h2 className="text-white font-black text-4xl sm:text-5xl md:text-6xl mt-2">Overview.</h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-8 text-slate-300 text-lg sm:text-xl max-w-4xl leading-[1.8]"
      >
        {profile.bio}
      </motion.p>
      
      {skillsList.length > 0 && (
         <div className="mt-20">
            <h3 className="text-white font-bold text-3xl mb-10">Technical Skills</h3>
            <div className="flex flex-wrap gap-4">
              {skillsList.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-surface/50 backdrop-blur border border-slate-700/50 px-6 py-3 rounded-xl text-slate-100 font-semibold hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 shadow-md cursor-default origin-center hover:scale-105"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
         </div>
      )}
    </section>
  );
}
