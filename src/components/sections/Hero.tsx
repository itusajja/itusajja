"use client";

import { motion, useReducedMotion } from "framer-motion";
import { resume } from "@/data/resume";
import { MaskLine, Reveal, RevealGroup, RevealItem } from "../Reveal";
import { Ph } from "../Ph";

const SILK = [0.22, 1, 0.36, 1] as const;

/**
 * Document header — the web equivalent of the top block of the PDF:
 * name, headline, positioning line and the contact row.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const nameWords = resume.name.split(" ");
  const first = nameWords[0];
  const rest = nameWords.slice(1).join(" ");

  return (
    <header
      id="top"
      className="relative overflow-hidden border-b border-[var(--line)] px-6 pt-14 pb-10 sm:px-12 sm:pt-16 lg:px-14"
    >
      {/* accent wash behind the header */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      >
        <div
          className="float-slow absolute -top-28 -right-16 h-72 w-72 rounded-full blur-[90px]"
          style={{ background: "var(--accent-ring)" }}
        />
        <div
          className="absolute inset-x-0 top-0 h-1 accent-bar"
          aria-hidden="true"
        />
      </div>

      <div className="relative">
        <Reveal distance={12} duration={0.7}>
          <span className="eyebrow inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            Résumé
          </span>
        </Reveal>

        {/* Name */}
        <h1 className="font-display mt-4 text-[2.6rem] leading-[1.02] font-bold tracking-[-0.03em] text-[var(--ink)] sm:text-6xl lg:text-[4.25rem]">
          <MaskLine>{first}</MaskLine>
          <MaskLine delay={0.1} className="text-[var(--accent)]">
            {rest}
          </MaskLine>
        </h1>

        {/* Headline */}
        <Reveal delay={0.18} distance={18} blur>
          <p className="font-display mt-5 text-lg font-medium tracking-tight text-[var(--ink)] sm:text-xl">
            <Ph text={resume.headline} />
          </p>
        </Reveal>

        {/* Tagline */}
        <Reveal delay={0.26} distance={18}>
          <p className="text-balance mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--muted)]">
            <Ph text={resume.tagline} />
          </p>
        </Reveal>

        {/* Contact row */}
        <RevealGroup gap={0.07} delay={0.34} className="mt-8 flex flex-wrap gap-2">
          {resume.contacts.map((c) => {
            const Icon = c.icon;
            const inner = (
              <>
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  <Ph text={c.value} />
                </span>
              </>
            );
            return (
              <RevealItem key={c.label} direction="up" distance={14}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.kind === "link" ? "_blank" : undefined}
                    rel={c.kind === "link" ? "noreferrer noopener" : undefined}
                    className="chip max-w-full"
                    aria-label={c.label}
                  >
                    {inner}
                  </a>
                ) : (
                  <span className="chip max-w-full" aria-label={c.label}>
                    {inner}
                  </span>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      {/* corner fold flourish */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 h-24 w-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0.001 : 1.2, ease: SILK, delay: 0.5 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            d="M100 0 L100 100 L0 0 Z"
            fill="var(--accent-soft)"
            opacity="0.55"
          />
          <path d="M0 0 L100 100" stroke="var(--line)" strokeWidth="1" />
        </svg>
      </motion.div>
    </header>
  );
}
