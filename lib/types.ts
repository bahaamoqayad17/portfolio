// Types for the portfolio app

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  description: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AboutCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  experience: string;
  location: string;
  education: string;
  categories: AboutCategory[];
  updatedAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  updatedAt?: string;
}
