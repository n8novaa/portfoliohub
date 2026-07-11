import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import type { Experience } from "../types";

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 sm:px-16 py-24 relative z-0">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <p className="text-secondary font-medium text-lg uppercase tracking-widest">What I have done so far</p>
        <h2 className="text-white font-black text-4xl sm:text-5xl md:text-6xl mt-2">Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="rgba(51, 65, 85, 0.5)">
          {experiences.map((exp, index) => (
            <VerticalTimelineElement
              key={exp.id}
              contentStyle={{ background: "#1e293b", color: "#fff", border: "1px solid rgba(51, 65, 85, 0.5)", borderRadius: "1rem", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
              contentArrowStyle={{ borderRight: "7px solid  rgba(51, 65, 85, 0.5)" }}
              date={exp.is_current ? `${exp.start_date} - Present` : `${exp.start_date} - ${exp.end_date}`}
              dateClassName="text-slate-300 font-semibold"
              iconStyle={{ background: "#915EFF", color: "#fff", boxShadow: "0 0 0 4px #0f172a, inset 0 2px 0 rgba(0,0,0,0.08), 0 3px 0 4px rgba(0,0,0,0.05)" }}
              icon={
                <div className="flex justify-center items-center w-full h-full">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
              }
            >
              <div>
                <h3 className="text-white text-[24px] font-bold tracking-wide">{exp.title}</h3>
                <p className="text-secondary text-[16px] font-semibold mt-1" style={{ margin: 0 }}>
                  {exp.organization}
                </p>
              </div>
              <p className="mt-5 text-slate-300 text-[14px] leading-relaxed font-medium">
                {exp.description}
              </p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
