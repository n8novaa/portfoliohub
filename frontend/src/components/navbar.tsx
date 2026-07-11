import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Profile } from "../types";

export default function Navbar({ profile }: { profile: Profile }) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", title: "About" },
    { id: "experience", title: "Experience" },
    { id: "work", title: "Projects" },
    { id: "contact", title: "Contact" }
  ];

  return (
    <nav className={`w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-300 ${scrolled ? "bg-surface/80 backdrop-blur-md shadow-lg border-b border-white/10" : "bg-transparent"}`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-6 sm:px-16">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="text-white text-[20px] font-bold cursor-pointer tracking-wide flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              {profile.full_name.charAt(0)}
            </span>
            {profile.full_name}
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${active === link.title ? "text-primary" : "text-slate-300"} hover:text-white text-[16px] font-medium cursor-pointer transition-colors duration-200`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          {profile.github_url && (
            <li>
              <a href={profile.github_url} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white text-[16px] font-medium transition-colors">
                GitHub
              </a>
            </li>
          )}
        </ul>

        {/* Mobile menu toggle */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
           <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none z-50 relative">
             <div className="w-6 h-6 flex flex-col justify-around">
               <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
               <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
               <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
             </div>
           </button>

           <div className={`fixed top-0 right-0 h-screen w-full bg-surface/95 backdrop-blur-xl transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"} z-40 flex flex-col items-center justify-center`}>
             <ul className="list-none flex flex-col gap-8 text-center mt-[-100px]">
               {navLinks.map((link) => (
                 <li key={link.id} onClick={() => { setActive(link.title); setMenuOpen(false); }}>
                   <a href={`#${link.id}`} className="text-white text-3xl font-black">{link.title}</a>
                 </li>
               ))}
             </ul>
           </div>
        </div>
      </div>
    </nav>
  );
}
