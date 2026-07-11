import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { getProfile, getProjects, getExperiences, getEducation } from "./api/services";
import type { Profile, Project, Experience, Education } from "./types";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import ExperienceSection from "./components/experience";
import EducationSection from "./components/education";
import Works from "./components/works";
import Contact from "./components/contact";
import Loader from "./components/loader";

const App = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProfile().catch(() => null),
      getProjects().catch(() => []),
      getExperiences().catch(() => []),
      getEducation().catch(() => []),
    ])
      .then(([prof, proj, exp, edu]) => {
        setProfile(prof);
        setProjects(proj);
        setExperiences(exp);
        setEducation(edu);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (!profile) return <div className="h-screen w-full flex items-center justify-center bg-background text-white">Failed to load profile. Make sure backend is running.</div>;

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-background text-slate-100 min-h-screen">
        <Navbar profile={profile} />
        <Hero profile={profile} />
        <About profile={profile} />
        <ExperienceSection experiences={experiences} />
        {education.length > 0 && <EducationSection education={education} />}
        <Works projects={projects} />
        <Contact profile={profile} />
      </div>
    </BrowserRouter>
  );
};

export default App;
