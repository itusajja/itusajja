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
        <RevealGroup gap={0.13}>
          {resume.experience.map((job, i) => (
            <RevealItem key={`${job.company}-${i}`} direction="left" distance={22}>
              <li className="relative grid grid-cols-[5.6rem_auto_1fr] items-start gap-x-3 sm:grid-cols-[6.6rem_auto_1fr] sm:gap-x-4">
                {/* spine segment: from this row's node centre exactly to the
                    next row's node centre (node mt-0.5 + h-8/2 = 1.125rem;
                    row gap space-y-9 = 2.25rem). Runs through the middle of
                    the node column, which starts after the date + grid gap. */}
                {i < resume.experience.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[1.125rem] -bottom-[3.375rem] left-[calc(5.6rem+0.75rem)] flex w-8 justify-center sm:left-[calc(6.6rem+1rem)]"
                  >
                    <motion.span
                      className="timeline-line h-full w-[2.5px] origin-top rounded"
                      initial={{ scaleY: 0 }}
                      animate={show ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{
                        duration: reduce ? 0.001 : 1,
                        ease: SILK,
                        delay: reduce ? 0 : 0.25 + i * 0.13,
                      }}
                    />
                  </span>
                )}

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
                            className="flex gap-x-2 text-[0.8125rem] leading-relaxed text-[#2a3350] italic dark:text-[var(--body)]"
                          >
                            {/* hanging-indent bullet: wrapped lines stay
                                aligned under the text, not under the dash */}
                            <span aria-hidden="true" className="flex-none">
                              -
                            </span>
                            <span className="min-w-0">{b}</span>
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
