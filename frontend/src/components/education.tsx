import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import type { Education } from "../types";

export default function EducationSection({ education }: { education: Education[] }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="max-w-7xl mx-auto px-6 sm:px-16 py-24 relative z-0">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <p className="text-tertiary font-medium text-lg uppercase tracking-widest">My Background</p>
        <h2 className="text-white font-black text-4xl sm:text-5xl md:text-6xl mt-2">Education.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="rgba(51, 65, 85, 0.5)">
          {education.map((edu, index) => (
            <VerticalTimelineElement
              key={edu.id}
              contentStyle={{ background: "#1e293b", color: "#fff", border: "1px solid rgba(51, 65, 85, 0.5)", borderRadius: "1rem", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
              contentArrowStyle={{ borderRight: "7px solid  rgba(51, 65, 85, 0.5)" }}
              date={`${edu.start_year} - ${edu.end_year}`}
              dateClassName="text-slate-300 font-semibold"
              iconStyle={{ background: "#38bdf8", color: "#fff", boxShadow: "0 0 0 4px #0f172a, inset 0 2px 0 rgba(0,0,0,0.08), 0 3px 0 4px rgba(0,0,0,0.05)" }}
              icon={
                <div className="flex justify-center items-center w-full h-full">
                  <span className="text-background font-black text-xl">Edu</span>
                </div>
              }
            >
              <div>
                <h3 className="text-white text-[24px] font-bold tracking-wide">{edu.degree}</h3>
                <p className="text-secondary text-[16px] font-semibold mt-1" style={{ margin: 0 }}>
                  {edu.institution}
                </p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
