import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Github } from "./icons";
import type { Profile } from "../types";
import { cn } from "../utils/cn";

const navLinks = [
  { id: "home", title: "Home" },
  { id: "about", title: "Skills" },
  { id: "work", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "contact", title: "Contact" },
];

export default function Navbar({ profile }: { profile: Profile }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionElements = navLinks
        .map((link) => document.getElementById(link.id))
        .filter(Boolean) as HTMLElement[];

      const viewportCenter = window.innerHeight / 3;

      let currentActive = "";
      for (const section of sectionElements) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
           currentActive = section.id;
        }
      }
      
      // Ensure the bottom section illuminates when we hit the absolute bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
         currentActive = navLinks[navLinks.length - 1].id;
      }

      if (currentActive) {
         setActive(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger instantly
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "w-full fixed top-0 z-50 transition-all duration-300 px-6 sm:px-12 py-4 flex justify-center",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500",
          scrolled
            ? "bg-surface/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-black/40"
            : "bg-transparent border border-transparent"
        )}
      >
        <Link
          to="/"
          className="flex items-center gap-3 group z-50"
          onClick={() => {
            setActive("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-cyanGlow flex items-center justify-center text-white font-bold text-sm shadow-glow group-hover:scale-110 transition-transform duration-300">
            {profile.full_name?.charAt(0) || "P"}
          </div>
          <p className="text-white text-[16px] font-semibold cursor-pointer flex items-center tracking-wide font-sans">
            {profile.full_name?.split(" ")[0] || "Portfolio"}
            <span className="sm:inline hidden text-slate-400 font-normal ml-2 group-hover:text-white transition-colors duration-300">
              / Dev
            </span>
          </p>
        </Link>

        {/* Desktop links */}
        <ul className="list-none hidden md:flex flex-row gap-2 relative">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} className="relative z-10">
                <a
                  href={`#${link.id}`}
                  onClick={() => setActive(link.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 block",
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  {link.title}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* GitHub icon */}
        <div className="hidden md:flex items-center gap-4">
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none z-50 relative p-2"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="absolute top-20 right-0 w-[240px] bg-surface/90 backdrop-blur-2xl z-40 flex flex-col p-6 rounded-3xl border border-white/10 shadow-2xl origin-top-right mr-6"
              >
                <ul className="list-none flex flex-col gap-4">
                  {navLinks.map((link, idx) => (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.id}
                      onClick={() => {
                        setActive(link.id);
                        setMenuOpen(false);
                      }}
                    >
                      <a
                        href={`#${link.id}`}
                        className={cn(
                          "transition-colors text-lg font-medium block",
                          active === link.id ? "text-white" : "text-slate-400 hover:text-white"
                        )}
                      >
                        {link.title}
                      </a>
                    </motion.li>
                  ))}
                  {profile.github_url && (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.length * 0.05 }}
                      className="pt-4 mt-2 border-t border-white/10"
                    >
                      <a
                        href={profile.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-primary text-md font-medium"
                      >
                        <Github size={18} />
                        GitHub
                      </a>
                    </motion.li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

