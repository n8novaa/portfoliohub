import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, ArrowUpRight, ArrowUp } from "lucide-react";
import { Github, Linkedin } from "./icons";
import { toast } from "sonner";

import type { Profile } from "../types";

export default function Contact({ profile }: { profile: Profile }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    toast.error("Please fill in all fields");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}contact/`, 
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send message");
    }

    toast.success("Message sent successfully! I'll get back to you soon.");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    toast.error(
      "Unable to send your message. Please try again or email me directly."
    );
  } finally {
    setLoading(false);
  }
};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 sm:px-12 py-32 relative z-0">
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
            Get in touch
          </p>
          <div className="h-[2px] w-12 bg-primary rounded-full" />
        </motion.div>
        <h2 className="font-sans text-white font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
          Contact Me.
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          Have a project in mind, a question, or just want to say hi? I'm always open to discussing new opportunities and ideas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Contact Info */}
        <motion.div
           initial={{ opacity: 0, x: -30 }} 
           whileInView={{ opacity: 1, x: 0 }} 
           transition={{ duration: 0.6 }} 
           viewport={{ once: true, margin: "-100px" }}
           className="flex flex-col space-y-8"
        >
          <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-colors duration-300">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors duration-500" />
             <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Direct Contact</h3>
             
             <div className="flex flex-col gap-6 relative z-10">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group/item w-fit flex-wrap break-all text-ellipsis overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover/item:bg-primary/20 group-hover/item:-translate-y-1 transition-all duration-300 border border-white/10 group-hover/item:border-primary/30 shrink-0 shadow-lg group-hover/item:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <Mail size={24} className="text-slate-300 group-hover/item:text-primary transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Email</span>
                    <span className="text-slate-200 font-semibold text-sm sm:text-base md:text-lg group-hover/item:text-white transition-colors">{profile.email}</span>
                  </div>
                </a>
             </div>
          </div>
          
          <div className="flex gap-4">
             {profile.github_url && (
                <a 
                  href={profile.github_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 flex flex-col items-center justify-center gap-3 bg-surface/30 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:bg-surface/60 hover:border-white/10 transition-all duration-300 group relative overflow-hidden"
                >
                  <Github size={32} className="text-slate-400 group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10" />
                  <span className="text-slate-300 font-medium relative z-10">GitHub</span>
                  <ArrowUpRight size={16} className="absolute top-4 right-4 text-slate-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
             )}
             
             {profile.linkedin_url && (
                <a 
                  href={profile.linkedin_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 flex flex-col items-center justify-center gap-3 bg-surface/30 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:bg-surface/60 hover:border-[#0a66c2]/30 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#0a66c2]/0 group-hover:bg-[#0a66c2]/10 transition-colors duration-300" />
                  <Linkedin size={32} className="text-slate-400 group-hover:text-[#0a66c2] group-hover:scale-110 transition-all duration-300 relative z-10" />
                  <span className="text-slate-300 font-medium relative z-10">LinkedIn</span>
                  <ArrowUpRight size={16} className="absolute top-4 right-4 text-slate-500 group-hover:text-[#0a66c2] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
             )}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
           initial={{ opacity: 0, x: 30 }} 
           whileInView={{ opacity: 1, x: 0 }} 
           transition={{ duration: 0.6 }} 
           viewport={{ once: true, margin: "-100px" }}
        >
          <form 
            onSubmit={handleSubmit} 
            className="bg-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl flex flex-col gap-6 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyanGlow/5 rounded-full blur-3xl" />
            
            <div className="flex flex-col gap-2 relative z-10">
              <label className="text-slate-300 font-medium ml-1">Your Name</label>
              <input 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                placeholder="John Doe"
                className="bg-background/50 border border-white/10 rounded-xl px-5 py-4 text-white hover:border-primary/50 focus:border-cyanGlow focus:outline-none focus:ring-1 focus:ring-cyanGlow transition-all duration-300 w-full"
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2 relative z-10">
              <label className="text-slate-300 font-medium ml-1">Your Email</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="john@example.com"
                className="bg-background/50 border border-white/10 rounded-xl px-5 py-4 text-white hover:border-primary/50 focus:border-cyanGlow focus:outline-none focus:ring-1 focus:ring-cyanGlow transition-all duration-300 w-full"
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2 relative z-10">
              <label className="text-slate-300 font-medium ml-1">Message</label>
              <textarea 
                name="message" 
                value={form.message} 
                onChange={handleChange} 
                placeholder="What do you want to say?"
                rows={5}
                className="bg-background/50 border border-white/10 rounded-xl px-5 py-4 text-white hover:border-primary/50 focus:border-cyanGlow focus:outline-none focus:ring-1 focus:ring-cyanGlow transition-all duration-300 w-full resize-none"
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 group relative overflow-hidden bg-white text-background px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 shadow-glow w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin text-background z-10 relative" />
              ) : (
                <>
                  <span className="relative z-10 text-background">Send Message</span>
                  <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-tertiary to-cyanGlow opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0 mix-blend-multiply" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Modern Footer Area */}
      <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-500 font-medium text-sm text-center md:text-left">
          © {new Date().getFullYear()} {profile.full_name}. All rights reserved.
        </p>
        
        <button 
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
}
