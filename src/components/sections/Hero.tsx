"use client";

import { motion, useReducedMotion } from "framer-motion";
import { resume } from "@/data/resume";
import { MaskLine, Reveal, RevealGroup, RevealItem } from "../Reveal";
import { IndonesiaDotMap, LogoMark } from "../icons";

const SILK = [0.22, 1, 0.36, 1] as const;

/**
 * Document header, mirroring the source layout:
 *   logo + name/headline ………… availability badge
 *   white contact pill
 *   circular portrait over the dotted-map watermark
 *   greeting, two intro paragraphs, "Hire me" button
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header id="top" className="relative overflow-hidden px-5 pt-16 pb-12 sm:px-10 sm:pt-20 sm:pb-14">
      {/* dotted archipelago watermark behind the portrait block */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[42%] flex justify-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 0.5 : 0.75 }}
        transition={{ duration: reduce ? 0.001 : 1.6, ease: SILK, delay: 0.4 }}
        aria-hidden="true"
      >
        <IndonesiaDotMap className="w-[min(92%,640px)] opacity-80" />
      </motion.div>

      <div className="relative mx-auto max-w-[1100px]">
        {/* row 1 — logo + name ……… availability */}
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              initial={reduce ? { opacity: 0 } : { scale: 0.4, rotate: -25, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: reduce ? 0.001 : 0.8, ease: SILK }}
            >
              <LogoMark className="h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]" />
            </motion.div>
            <div>
              <h1 className="font-display text-[2rem] leading-[1.05] font-extrabold tracking-tight text-[var(--ink)] sm:text-[3rem]">
                <MaskLine>{resume.name}</MaskLine>
              </h1>
              <Reveal delay={0.14} distance={12}>
                <p className="mt-1 text-sm font-bold text-[var(--blue)] sm:text-lg">
                  {resume.headline}
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal direction="left" distance={20} delay={0.2} className="shrink-0">
            <div className="flex flex-col items-start gap-1.5 sm:items-end">
              <span className="rounded-lg bg-[var(--orange)] px-4 py-1.5 text-[0.8125rem] font-extrabold tracking-wide text-white shadow-[0_6px_18px_-8px_rgba(242,105,29,.8)]">
                {resume.availability.badge}
              </span>
              <span className="text-[0.8125rem] font-extrabold tracking-wide text-[var(--ink)]">
                {resume.availability.note}
              </span>
            </div>
          </Reveal>
        </div>

        {/* row 2 — contact pill */}
        <RevealGroup
          gap={0.06}
          delay={0.3}
          className="pill-white mx-auto mt-8 flex max-w-fit flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-3 sm:px-8"
        >
          {resume.contacts.map((c) => {
            const Icon = c.icon;
            return (
              <RevealItem key={c.label} direction="up" distance={10} as="span">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="group flex items-center gap-2 text-[0.8125rem] font-semibold text-[#1f2740] transition-colors duration-300 hover:text-[var(--blue)] dark:text-[var(--body)]"
                  aria-label={c.label}
                >
                  <Icon className="h-[1.15rem] w-[1.15rem] transition-transform duration-300 group-hover:scale-110" />
                  <span>{c.value}</span>
                </a>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* row 3 — portrait */}
        <div className="mt-9 flex justify-center">
          <motion.div
            className="relative"
            initial={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            transition={{ duration: reduce ? 0.001 : 0.9, ease: SILK, delay: 0.45 }}
          >
            <motion.span
              className="absolute -inset-1.5 rounded-full border-2 border-white/80"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: reduce ? 0.001 : 0.8, ease: SILK, delay: 0.6 }}
              aria-hidden="true"
            />
            {resume.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resume.photo}
                alt={resume.name}
                className="h-28 w-28 rounded-full object-cover grayscale sm:h-32 sm:w-32"
              />
            ) : (
              <div
                className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-[#3a4763] to-[#141b2e] sm:h-32 sm:w-32"
                role="img"
                aria-label={`Portrait placeholder for ${resume.name}`}
                title="Drop your headshot at public/avatar.jpg and set `photo` in src/data/resume.ts"
              >
                <span className="font-display text-3xl font-bold text-white/90">
                  {resume.initials}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* row 4/5 — greeting + intro */}
        <div className="relative mx-auto mt-7 max-w-3xl text-center">
          <Reveal distance={16}>
            <p className="text-[0.9375rem] font-extrabold text-[#1f2740] dark:text-[var(--ink)] sm:text-base">
              {resume.greeting}
            </p>
          </Reveal>
          {resume.intro.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08} distance={16}>
              <p className="mt-3.5 text-[0.875rem] leading-[1.75] text-[#2a3350] dark:text-[var(--body)] sm:text-[0.9375rem]">
                {p}
              </p>
            </Reveal>
          ))}

          {/* row 6 — CTA */}
          <Reveal delay={0.3} distance={18} className="mt-6">
            <a
              href={`mailto:${resume.contacts.find((c) => c.label === "Email")?.value}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--blue)] px-6 py-2.5 text-[0.9375rem] font-bold text-white shadow-[0_10px_24px_-10px_rgba(46,127,210,.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(46,127,210,1)]"
            >
              <span>{resume.cta.strong}</span>
              <span className="font-medium text-white/70">{resume.cta.light}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
