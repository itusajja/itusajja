/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR THE RESUME
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every piece of text on the site comes from this file.
 *  When the original PDF is available, only the VALUES below need to change —
 *  the layout, animation and theming stay untouched.
 *
 *  Anything wrapped in [ square brackets ] is a PLACEHOLDER waiting to be
 *  replaced with the exact wording from the PDF. It is rendered with a dashed
 *  underline on screen so it is impossible to miss, and it is stripped out
 *  automatically in the print/PDF stylesheet.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { ComponentType } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ContactKind = "email" | "phone" | "location" | "link";

export interface Contact {
  kind: ContactKind;
  /** Short label shown on hover / in the print version. */
  label: string;
  /** What is rendered on screen. */
  value: string;
  href?: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  current?: boolean;
  summary?: string;
  bullets: string[];
  stack?: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  location?: string;
  start: string;
  end: string;
  grade?: string;
  details?: string[];
}

export interface SkillGroup {
  title: string;
  /** Plain tag list — used for tooling / technologies. */
  items?: string[];
  /** Rated list — `level` is 0-100 and drives the animated meter. */
  rated?: { name: string; level: number }[];
}

export interface ProjectItem {
  name: string;
  role?: string;
  period?: string;
  description: string;
  bullets?: string[];
  stack?: string[];
  link?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date?: string;
  id?: string;
}

export interface LanguageItem {
  name: string;
  proficiency: string;
  /** 0-100, drives the animated dots. */
  level: number;
}

export interface ResumeData {
  name: string;
  initials: string;
  headline: string;
  /** One-line positioning statement under the name. */
  tagline: string;
  location: string;
  contacts: Contact[];
  summary: string[];
  highlights?: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  languages?: LanguageItem[];
  interests?: string[];
}

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */

export const resume: ResumeData = {
  name: "Achmad Zainul Arianto",
  initials: "AZ",
  headline: "[Professional headline from PDF]",
  tagline:
    "[One-line positioning statement — exactly as written at the top of your resume PDF]",
  location: "[City, Country]",

  contacts: [
    {
      kind: "email",
      label: "Email",
      value: "[email@domain.com]",
      href: "mailto:[email@domain.com]",
      icon: Mail,
    },
    {
      kind: "phone",
      label: "Phone",
      value: "[+62 xxx xxxx xxxx]",
      href: "tel:[+62xxxxxxxxxx]",
      icon: Phone,
    },
    {
      kind: "location",
      label: "Location",
      value: "[City, Country]",
      icon: MapPin,
    },
    {
      kind: "link",
      label: "LinkedIn",
      value: "[linkedin.com/in/username]",
      href: "https://linkedin.com/in/[username]",
      icon: LinkedInIcon,
    },
    {
      kind: "link",
      label: "GitHub",
      value: "[github.com/username]",
      href: "https://github.com/[username]",
      icon: GitHubIcon,
    },
    {
      kind: "link",
      label: "Website",
      value: "[yoursite.com]",
      href: "https://[yoursite.com]",
      icon: Globe,
    },
  ],

  summary: [
    "[First paragraph of the professional summary, copied verbatim from the PDF. This is where your years of experience, domain focus and signature strengths go.]",
    "[Second paragraph — optional. Replace or delete it. Keeping the copy identical to the PDF is what makes the web version read as the same document.]",
  ],

  highlights: [
    "[Key achievement or metric]",
    "[Core area of expertise]",
    "[Notable certification or award]",
    "[Something that differentiates you]",
  ],

  experience: [
    {
      role: "[Most recent job title]",
      company: "[Company name]",
      location: "[City, Country]",
      start: "[Mon YYYY]",
      end: "Present",
      current: true,
      summary: "[One-line description of the role or team]",
      bullets: [
        "[Achievement bullet #1 — start with a strong verb and include a metric if the PDF has one.]",
        "[Achievement bullet #2.]",
        "[Achievement bullet #3.]",
        "[Achievement bullet #4.]",
      ],
      stack: ["[Tool]", "[Technology]", "[Platform]"],
    },
    {
      role: "[Previous job title]",
      company: "[Company name]",
      location: "[City, Country]",
      start: "[Mon YYYY]",
      end: "[Mon YYYY]",
      bullets: [
        "[Achievement bullet #1.]",
        "[Achievement bullet #2.]",
        "[Achievement bullet #3.]",
      ],
      stack: ["[Tool]", "[Technology]"],
    },
    {
      role: "[Earlier job title]",
      company: "[Company name]",
      location: "[City, Country]",
      start: "[Mon YYYY]",
      end: "[Mon YYYY]",
      bullets: ["[Achievement bullet #1.]", "[Achievement bullet #2.]"],
    },
  ],

  education: [
    {
      degree: "[Degree, e.g. Bachelor of Computer Science]",
      school: "[University name]",
      location: "[City, Country]",
      start: "[YYYY]",
      end: "[YYYY]",
      grade: "[GPA / grade if listed in the PDF]",
      details: [
        "[Relevant coursework, thesis title, or honour — if present in the PDF.]",
      ],
    },
  ],

  skills: [
    {
      title: "[Skill category 1]",
      rated: [
        { name: "[Skill]", level: 90 },
        { name: "[Skill]", level: 80 },
        { name: "[Skill]", level: 70 },
      ],
    },
    {
      title: "[Skill category 2]",
      items: ["[Skill]", "[Skill]", "[Skill]", "[Skill]", "[Skill]", "[Skill]"],
    },
    {
      title: "[Skill category 3]",
      items: ["[Skill]", "[Skill]", "[Skill]", "[Skill]"],
    },
  ],

  projects: [
    {
      name: "[Project name]",
      role: "[Your role]",
      period: "[YYYY]",
      description: "[One-sentence description of the project from the PDF.]",
      bullets: ["[What you built / the outcome.]", "[Technical highlight.]"],
      stack: ["[Tool]", "[Technology]"],
      link: "https://[project-link]",
    },
  ],

  certifications: [
    {
      name: "[Certification name]",
      issuer: "[Issuing organisation]",
      date: "[YYYY]",
      id: "[Credential ID, if listed]",
    },
  ],

  languages: [
    { name: "[Language]", proficiency: "[Native / Fluent]", level: 100 },
    { name: "[Language]", proficiency: "[Professional]", level: 80 },
  ],

  interests: ["[Interest]", "[Interest]", "[Interest]"],
};

/** Nav anchors — order here is the order in the sticky navigation. */
export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "credentials", label: "Credentials" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
