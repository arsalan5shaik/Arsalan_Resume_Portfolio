export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  githubUrl: string;
  linkedinUrl: string;
  resumePdfPath: string;
  avatarImage?: string;
}

export interface Education {
  school: string;
  location: string;
  degree: string;
  gpa?: string;
  graduationDate: string;
  coursework?: string[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  logo?: string;
}

export interface Project {
  slug: string;
  title: string;
  organization?: string;
  description: string;
  bullets: string[];
  skills: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  image?: string;
}

export interface Hackathon {
  name: string;
  date?: string;
  location?: string;
  project: string;
  description: string;
  result?: string;
  image?: string;
  links?: { label: string; url: string }[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}
