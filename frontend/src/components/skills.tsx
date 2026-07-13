import { motion, Variants } from "framer-motion";
import { Terminal, Database, Layout, Server, Wrench, Brain } from "lucide-react";
import type { Profile } from "../types";

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

export default function Skills({ profile }: { profile: Profile }) {
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

  if (skillsList.length === 0) return null;

  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 sm:px-12 py-32 relative z-0">
      <motion.div
         initial="hidden"
         whileInView="show"
         viewport={{ once: true, margin: "-100px" }}
         variants={containerVars}
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
    </section>
  );
}
