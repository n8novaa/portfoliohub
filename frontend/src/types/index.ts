export interface Profile {
  id: number;
  full_name: string;
  headline: string;
  description: string;
  bio: string;
  skills: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  work_status: "open_to_work" | "employed" | "freelancing";
  resume: string | null;
  profile_image: string | null;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
  is_featured: boolean;
  created_at: string;
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  description: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  start_year: number;
  end_year: number;
}
