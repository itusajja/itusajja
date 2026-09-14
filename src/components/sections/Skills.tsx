"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { resume, type SkillItem } from "@/data/resume";
import { SectionTitle } from "../SectionTitle";
import { RevealGroup, RevealItem } from "../Reveal";
import { useSplashReady } from "../SplashScreen";

const SILK = [0.22, 1, 0.36, 1] as const;

/** Skills — circular brand badge + label + animated proficiency bar. */
export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <SectionTitle>Skills</SectionTitle>

      <RevealGroup gap={0.09} className="mt-6 space-y-5">
        {resume.skills.map((s, i) => (
          <RevealItem key={s.label} direction="right" distance={20}>
            <SkillRow skill={s} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

function SkillRow({ skill, index }: { skill: SkillItem; index: number }) {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = ready && inView;

  return (
    <div ref={ref} className="flex items-center gap-3.5">
      <motion.span
        className="badge-circle h-9 w-9 text-[0.6875rem] font-bold"
        style={{ background: skill.badge.bg, color: skill.badge.fg }}
        initial={reduce ? { opacity: 0 } : { scale: 0.3, rotate: -18, opacity: 0 }}
        animate={show ? { scale: 1, rotate: 0, opacity: 1 } : reduce ? { opacity: 0 } : { scale: 0.3, rotate: -18, opacity: 0 }}
        transition={{ duration: reduce ? 0.001 : 0.6, ease: SILK, delay: reduce ? 0 : index * 0.07 }}
        aria-hidden="true"
      >
        {skill.badge.glyph}
      </motion.span>

      <div className="min-w-0 flex-1">
        <p className="text-[0.8125rem] font-semibold text-[#1f2740] dark:text-[var(--body)]">
          {skill.label}
        </p>
        <div className="mt-1.5 h-[7px] w-full max-w-[13rem] overflow-hidden rounded-full bg-[var(--track)] shadow-[inset_0_1px_2px_rgba(0,0,0,.08)]">
          <motion.div
            className="blue-bar h-full rounded-full"
            initial={{ width: 0 }}
            animate={show ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{
              duration: reduce ? 0.001 : 1.05,
              ease: SILK,
              delay: reduce ? 0 : index * 0.07 + 0.15,
            }}
          />
        </div>
      </div>

      <span className="sr-only">{`${skill.label}: ${skill.level} out of 100`}</span>
    </div>
  );
}
