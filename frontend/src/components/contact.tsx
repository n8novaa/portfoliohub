import { motion } from "framer-motion";
import type { Profile } from "../types";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 sm:px-16 py-24 relative z-0">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <p className="text-secondary font-medium text-lg uppercase tracking-widest">Get in touch</p>
        <h2 className="text-white font-black text-4xl sm:text-5xl md:text-6xl mt-2">Contact.</h2>
      </motion.div>

      <div className="mt-12 flex flex-col md:flex-row gap-10">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="w-full bg-surface/50 backdrop-blur-md p-8 lg:p-12 rounded-2xl border border-slate-700/50 shadow-xl"
        >
          <h3 className="text-white font-bold text-3xl mb-6">Let's Connect</h3>
          <p className="text-slate-300 text-lg sm:text-xl mb-12 leading-relaxed max-w-2xl">
            I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, feel free to reach out!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 flex-wrap">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:-translate-y-1 transition-all duration-300 border border-primary/20">
                <span className="text-2xl">📧</span>
              </div>
              <span className="text-lg font-medium">{profile.email}</span>
            </a>
            
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-[#0a66c2] transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-[#0a66c2]/10 flex items-center justify-center group-hover:bg-[#0a66c2]/20 group-hover:-translate-y-1 transition-all duration-300 border border-[#0a66c2]/20">
                  <span className="text-2xl">💼</span>
                </div>
                <span className="text-lg font-medium">LinkedIn</span>
              </a>
            )}

            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-slate-700/50 flex items-center justify-center group-hover:bg-slate-700 group-hover:-translate-y-1 transition-all duration-300 border border-slate-600">
                  <span className="text-2xl">🐙</span>
                </div>
                <span className="text-lg font-medium">GitHub</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>

      <div className="mt-24 text-center pb-8 border-t border-slate-800 pt-8">
         <p className="text-slate-500 font-medium">
           © {new Date().getFullYear()} {profile.full_name}. Developed with React & Django.
         </p>
      </div>
    </section>
  );
}
