import { motion, Variants } from "framer-motion";
import { Download, Terminal, Code2, Database, Layout, Server, Wrench, Brain } from "lucide-react";
import type { Profile } from "../types";
import { cn } from "../utils/cn";
import heroImg from "../assets/hero.png";

const categorizeSkill = (skill: string) => {
  const s = skill.toLowerCase();
  
  if (
    s.includes("react") || s.includes("vue") || s.includes("angular") || 
    s.includes("html") || s.includes("css") || s.includes("tailwind") || 
    s.includes("next") || s.includes("framer") || s.includes("ui") || 
    s.includes("javascript") || s.includes("typescript") || s.includes("responsive") || s.includes("vite")
  ) return "Frontend";
  
  if (
    s.includes("machine learning") || s.includes("scikit") || s.includes("numpy") || 
    s.includes("pandas") || s.includes("recommendation") || s.includes("preprocessing") || s.includes("ai") || s === "ml"
  ) return "AI & Data Science";

  if (
    s.includes("sql") || s.includes("mongo") || s.includes("postgres") || 
    s.includes("redis") || s.includes("firebase") || s.includes("supabase") || 
    s.includes("database")
  ) return "Database";
  
  if (
    s.includes("aws") || s.includes("docker") || s.includes("kubernetes") || 
    s.includes("gcp") || s.includes("azure") || s.includes("ci/cd") || 
    s.includes("vercel") || s.includes("git") || s.includes("render") || 
    s.includes("deployment") || s.includes("npm") || s.includes("environment") || s.includes("virtual env")
  ) return "Cloud & DevOps";

  if (
    s.includes("node") || s.includes("django") || s.includes("python") || 
    s.includes("express") || s.includes("go") || s.includes("java") || 
    s.includes("c++") || s.includes("c#") || s.includes("ruby") || s.includes("php") || 
    s.includes("rest") || s.includes("api") || s.includes("jwt") || s.includes("oop") || s === "c"
  ) return "Backend";
  
  return "Tools & Other";
};

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "Frontend": return <Layout size={18} className="text-cyanGlow" />;
    case "Backend": return <Server size={18} className="text-primary" />;
    case "Database": return <Database size={18} className="text-tertiary" />;
    case "Cloud & DevOps": return <Terminal size={18} className="text-emerald-400" />;
    case "AI & Data Science": return <Brain size={18} className="text-secondary" />;
    default: return <Wrench size={18} className="text-slate-400" />;
  }
};

export default function About({ profile }: { profile: Profile }) {
  const skillsList = profile.skills ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];
  
  const categorizedSkills = skillsList.reduce((acc, skill) => {
    const category = categorizeSkill(skill);
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, string[]>);

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 sm:px-12 py-32 relative z-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Bio */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVars}
          className="flex flex-col"
        >
          <motion.div variants={itemVars} className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-primary rounded-full" />
            <p className="text-primary font-medium text-sm sm:text-base tracking-widest uppercase">
              Discover
            </p>
          </motion.div>
          <motion.h2 variants={itemVars} className="font-sans text-white font-bold text-4xl sm:text-5xl md:text-6xl mb-8 leading-tight">
            About Me.
          </motion.h2>
          
          <motion.div variants={itemVars} className="prose prose-invert prose-lg text-slate-300 font-light leading-relaxed mb-10">
            {profile.bio.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </motion.div>

          <motion.div variants={itemVars} className="flex flex-wrap gap-6">
            <button className="group flex items-center justify-center gap-3 bg-white text-background px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-glow">
              <Download size={18} />
              Download Resume
            </button>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">3+</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">20+</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Projects</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="relative w-full aspect-[4/5] max-w-md mx-auto"
        >
          {/* Background glowing blob */}
          <motion.div 
             animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-tertiary/20 to-cyanGlow/30 rounded-[3rem] blur-3xl opacity-70"
          />
          
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-cyanGlow/10 border border-white/5">
            <img 
               src={heroImg} 
               alt={profile.full_name || "Profile Picture"} 
               className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Skills Section */}
      {skillsList.length > 0 && (
        <motion.div
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-100px" }}
           variants={containerVars}
           className="mt-32"
        >
          <motion.div variants={itemVars} className="flex items-center gap-4 mb-4 justify-center">
            <div className="h-[1px] w-8 bg-tertiary rounded-full" />
            <p className="text-tertiary font-medium text-sm sm:text-base tracking-widest uppercase">
              Expertise
            </p>
            <div className="h-[1px] w-8 bg-tertiary rounded-full" />
          </motion.div>
          
          <motion.h3 variants={itemVars} className="text-white font-bold text-3xl sm:text-4xl text-center mb-16">
            Technical Arsenal.
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categorizedSkills).map(([category, skills], idx) => (
              <motion.div 
                key={category} 
                variants={itemVars}
                className="bg-surface/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-surface/50 transition-colors duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors duration-500" />
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-3 bg-white/5 rounded-2xl">
                    <CategoryIcon category={category} />
                  </div>
                  <h4 className="text-lg font-bold text-white">{category}</h4>
                </div>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-background/80 border border-white/10 px-4 py-2 rounded-full text-slate-300 font-medium text-sm hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
