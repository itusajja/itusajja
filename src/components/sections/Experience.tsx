"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { resume } from "@/data/resume";
import { SectionTitle } from "../SectionTitle";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import { useSplashReady } from "../SplashScreen";

const SILK = [0.22, 1, 0.36, 1] as const;

/**
 * Work Experience — the right column of the document.
 * date · navy briefcase node on a navy spine · company + role + bullet box.
 */
export function Experience() {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const show = ready && inView;

  return (
    <section id="experience" className="scroll-mt-24">
      <SectionTitle center className="block text-center">
        Work Experience
      </SectionTitle>

      <ol ref={ref} className="relative mt-8 space-y-9">
        {/* navy spine through the briefcase nodes */}
        <motion.span
          className="timeline-line absolute top-2 bottom-2 left-[6.6rem] w-[2.5px] origin-top rounded sm:left-[7.6rem]"
          initial={{ scaleY: 0 }}
          animate={show ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: reduce ? 0.001 : 1.6, ease: SILK }}
          aria-hidden="true"
        />

        <RevealGroup gap={0.13}>
          {resume.experience.map((job, i) => (
            <RevealItem key={`${job.company}-${i}`} direction="left" distance={22}>
              <li className="grid grid-cols-[5.6rem_auto_1fr] items-start gap-x-3 sm:grid-cols-[6.6rem_auto_1fr] sm:gap-x-4">
                <span className="pt-1 text-right text-[0.8125rem] font-extrabold text-[#1f2740] dark:text-[var(--body)]">
                  {job.period}
                </span>

                <motion.span
                  className="badge-circle relative z-10 mt-0.5 h-8 w-8 bg-[var(--node)] text-white shadow-[0_4px_12px_-4px_rgba(27,44,144,.7)]"
                  initial={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                  animate={show ? { scale: 1, opacity: 1 } : reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0.001 : 0.55, ease: SILK, delay: reduce ? 0 : 0.25 + i * 0.13 }}
                  aria-hidden="true"
                >
                  <Briefcase className="h-4 w-4" strokeWidth={2.2} />
                </motion.span>

                <div className="min-w-0">
                  <h3 className="text-[1.0625rem] leading-snug font-bold tracking-wide text-[var(--blue)]">
                    {job.company}
                  </h3>
                  <p className="mt-0.5 text-[0.875rem] font-semibold text-[#1f2740] dark:text-[var(--body)]">
                    {job.role}
                  </p>

                  <Reveal delay={0.12} distance={14} className="mt-3">
                    <div className="box-soft px-4 py-3">
                      <ul className="space-y-1.5">
                        {job.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="text-[0.8125rem] leading-relaxed text-[#2a3350] italic dark:text-[var(--body)]"
                          >
                            - {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </li>
            </RevealItem>
          ))}
        </RevealGroup>
      </ol>
    </section>
  );
}
