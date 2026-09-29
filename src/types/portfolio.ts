import type { HeroImageSide, SectionId, SiteLayout, ThemeId } from "@/lib/content/layout";

export type { HeroImageSide, SectionId, SiteLayout, ThemeId };

export type Locale = "es" | "en";

export interface HeroContent {
  name: string;
  role: string;
  tagline: string;
  badge: string;
  imageAlt: string;
  cta: {
    experience: string;
    cv: string;
    contact: string;
  };
}

export interface AboutContent {
  title: string;
  intro: string;
  securityLearning: string;
  strengthsTitle: string;
  strengths: string[];
  languagesTitle: string;
  languages: string[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  title: string;
  institution?: string | undefined;
  period?: string | undefined;
  status?: string | undefined;
}

export interface StackGroup {
  category: string;
  items: string[];
}

export interface ArchitectureContent {
  title: string;
  description: string;
  diagram: string;
  decisionsTitle: string;
  decisions: { title: string; description: string }[];
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  repositoryUrl: string;
  repositoryLabel: string;
}

export interface ContactContent {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  linkedinHandle: string;
  githubHandle: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
}

export interface PortfolioContent {
  nav: {
    about: string;
    projects: string;
    experience: string;
    education: string;
    stack: string;
    architecture: string;
    contact: string;
  };
  hero: HeroContent;
  about: AboutContent;
  projects: {
    title: string;
    description: string;
    items: ProjectItem[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  stack: StackGroup[];
  architecture: ArchitectureContent;
  contact: ContactContent;
  seo: SeoContent;
}

export interface PortfolioDocument {
  heroImageFile: string | null;
  layout: SiteLayout;
  es: PortfolioContent;
  en: PortfolioContent;
}

export interface PortfolioView extends PortfolioContent {
  hero: HeroContent & { imageSrc: string };
  layout: SiteLayout;
}
