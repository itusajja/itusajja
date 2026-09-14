/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — transcribed verbatim from the résumé PDF/PNG.
 *  Every string on the site comes from here. Wording, dates, ordering and
 *  section membership mirror the source document 1:1.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { ComponentType } from "react";
import {
  GitHubIcon,
  GmailIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface Contact {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface SkillItem {
  label: string;
  /** 0-100 — drives the animated meter, mirrors the PDF bar length. */
  level: number;
  /** Brand badge: background colour + short glyph rendered in a circle. */
  badge: { bg: string; fg: string; glyph: string };
}

export interface LanguageItem {
  name: string;
  proficiency: string;
  flag: "id" | "gb";
}

export interface EducationItem {
  period: string;
  title: string;
  subtitle: string;
}

export interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  bullets: string[];
}

export interface ResumeData {
  name: string;
  initials: string;
  headline: string;
  /**
   * Path to the headshot shown in the circular portrait (e.g. "/avatar.jpg").
   * `null` renders an initials monogram instead — the original photo could not
   * be extracted from the supplied screenshot. Drop the file in `public/` and
   * set this field to use the real portrait.
   */
  photo: string | null;
  availability: { badge: string; note: string };
  contacts: Contact[];
  greeting: string;
  intro: string[];
  cta: { strong: string; light: string };
  skills: SkillItem[];
  languages: LanguageItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  updatedOn: string;
}

/* -------------------------------------------------------------------------- */
/*  Content — verbatim                                                         */
/* -------------------------------------------------------------------------- */

export const resume: ResumeData = {
  name: "Achmad Zainul Arianto",
  initials: "AZ",
  headline: "Experienced Fullstack Developer & Graphic Designer",
  photo: null,

  availability: {
    badge: "OPEN TO WORK",
    note: "WORK FROM HOME",
  },

  contacts: [
    {
      label: "LinkedIn",
      value: "imachmad",
      href: "https://linkedin.com/in/imachmad",
      icon: LinkedInIcon,
    },
    {
      label: "Telegram",
      value: "itusajja",
      href: "https://t.me/itusajja",
      icon: TelegramIcon,
    },
    {
      label: "GitHub",
      value: "itusajja",
      href: "https://github.com/itusajja",
      icon: GitHubIcon,
    },
    {
      label: "Email",
      value: "hi.itusajja@gmail.com",
      href: "mailto:hi.itusajja@gmail.com",
      icon: GmailIcon,
    },
    {
      label: "WhatsApp",
      value: "(+62) 896 6162 6364",
      href: "https://wa.me/6289661626364",
      icon: WhatsAppIcon,
    },
  ],

  greeting: "Assalamualaikum, hi there!",

  intro: [
    "I'm Achmad,  an experienced web developer with over 7 years of hands-on expertise in building and designing user interfaces for websites and web applications.",
    "My skill set includes UI/UX development, testing, debugging, performance optimization, and staff training. I have a proven track record of enhancing web app functionalities to significantly reduce data retrieval time and improve overall performance.",
  ],

  cta: { strong: "Hire", light: "me" },

  skills: [
    {
      label: "Angular",
      level: 85,
      badge: { bg: "#dd0031", fg: "#ffffff", glyph: "Ng" },
    },
    {
      label: "React",
      level: 80,
      badge: { bg: "#61dafb", fg: "#0b1e2d", glyph: "Re" },
    },
    {
      label: "Next.js",
      level: 75,
      badge: { bg: "#171717", fg: "#ffffff", glyph: "Nx" },
    },
    {
      label: "SQL Server",
      level: 82,
      badge: { bg: "#a91d22", fg: "#ffffff", glyph: "SQL" },
    },
    {
      label: "Go",
      level: 65,
      badge: { bg: "#00add8", fg: "#ffffff", glyph: "Go" },
    },
    {
      label: "Python",
      level: 70,
      badge: { bg: "#3776ab", fg: "#ffffff", glyph: "Py" },
    },
    {
      label: "AWS",
      level: 55,
      badge: { bg: "#232f3e", fg: "#ffffff", glyph: "AWS" },
    },
    {
      label: "Docker",
      level: 70,
      badge: { bg: "#2496ed", fg: "#ffffff", glyph: "Dk" },
    },
    {
      label: "Podman",
      level: 60,
      badge: { bg: "#892ca0", fg: "#ffffff", glyph: "Pm" },
    },
    {
      label: "Linux",
      level: 72,
      badge: { bg: "#f5c518", fg: "#1a1a1a", glyph: "Lx" },
    },
  ],

  languages: [
    { name: "BAHASA INDONESIA", proficiency: "Native", flag: "id" },
    { name: "ENGLISH", proficiency: "Conversational", flag: "gb" },
  ],

  education: [
    {
      period: "2016-2019",
      title: "PONDOK PROGRAMMER",
      subtitle: "Backend Developer / Yogyakarta",
    },
    {
      period: "2013-2016",
      title: "SMKN 2 SINGOSARI",
      subtitle: "Formal Education / Malang",
    },
    {
      period: "2010-2013",
      title: "SMPN 1 MOJOSARI",
      subtitle: "Formal Education / Mojokerto",
    },
    {
      period: "2004-2010",
      title: "SDN 2 RANDUBANGO",
      subtitle: "Formal Education / Mojokerto",
    },
  ],

  experience: [
    {
      period: "2023-PRESENT",
      company: "SOLUTION DETAILS PTE. LTD.",
      role: "Software Engineer (2+ Years)",
      bullets: [
        "ERP System Using Angular",
        "POS System Support",
        "Bug fixes, API Integration, Mall sale generation",
        "Angular, Node, SQL Server",
      ],
    },
    {
      period: "2022-2023",
      company: "THE DIGITAL SPACEE PTE. LTD.",
      role: "Fullstack Developer (8 months)",
      bullets: ["Marketplace, ERP System."],
    },
    {
      period: "2019-2023",
      company: "FREELANCE WEB DEVELOPER",
      role: "Upwork, Freelancer, & Telegram Channel (4 years)",
      bullets: [
        "Writer Marketplace",
        "Realtime Health Calculator",
        "Crypto Wallet Electrum",
        "Custom Bill of Material App",
        "Opencart Development (Tour Website)",
      ],
    },
    {
      period: "2016-2022",
      company: "FULLSTACK DEVELOPER",
      role: "Islamic Center BinBaz (6 Years)",
      bullets: [
        "User requirement analysist",
        "Creating database scheme (with ERD)",
        "Creating backend side / CodeIgniter, NodeJS",
        "API Integration",
      ],
    },
    {
      period: "2017-2018",
      company: "OPENCART DEVELOPER",
      role: "HPWebdesign (8 months)",
      bullets: [
        "Online shop installation",
        "Module (ocmods) creation",
        "Theme synchronize",
        "Bugs fixing",
      ],
    },
  ],

  updatedOn: "updated on aug 2025",
};
