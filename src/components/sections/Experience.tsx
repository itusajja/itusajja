"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { resume } from "@/data/resume";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Ph } from "../Ph";
import { useSplashReady } from "../SplashScreen";

const SILK = [0.22, 1, 0.36, 1] as const;

/** Work history rendered as a self-drawing timeline. */
export function Experience() {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const show = ready && inView;

  return (
    <section id="experience" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Career"
        title="Work Experience"
        icon={Briefcase}
        aside={
          <span className="font-mono tracking-wider">
            {resume.experience.length} roles
          </span>
        }
      />

      <ol ref={ref} className="relative pl-7 sm:pl-9">
        {/* spine */}
        <span
          className="absolute top-1.5 bottom-1.5 left-[7px] w-px bg-[var(--line)] sm:left-[9px]"
          aria-hidden="true"
        />
        <motion.span
          className="absolute top-1.5 bottom-1.5 left-[7px] w-px origin-top bg-[var(--line-strong)] sm:left-[9px]"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          animate={show ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: reduce ? 0.001 : 1.5, ease: SILK }}
        />
        <motion.span
          className="accent-bar absolute top-1.5 left-[7px] w-px origin-top sm:left-[9px]"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          animate={show ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{
            duration: reduce ? 0.001 : 1.7,
            ease: SILK,
            delay: reduce ? 0 : 0.18,
          }}
          style={{ height: "70%" }}
        />

        <RevealGroup gap={0.14}>
          {resume.experience.map((job, i) => (
            <RevealItem key={`${job.company}-${i}`} direction="up" distance={24}>
              <li className="relative pb-9 last:pb-0">
                {/* node */}
                <motion.span
                  className="absolute top-1.5 -left-7 grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-[var(--accent)] bg-[var(--paper)] sm:-left-9"
                  aria-hidden="true"
                  initial={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                  animate={show ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    duration: reduce ? 0.001 : 0.55,
                    ease: SILK,
                    delay: reduce ? 0 : 0.25 + i * 0.14,
                  }}
                >
                  {job.current && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                </motion.span>

                <article className="card group px-5 py-4.5 sm:px-6 sm:py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
                    <h3 className="font-display text-base font-semibold tracking-tight text-[var(--ink)] sm:text-[1.0625rem]">
                      <Ph text={job.role} />
                    </h3>
                    <span className="chip shrink-0 font-mono text-[0.6875rem] tracking-wide">
                      <Ph text={`${job.start} — ${job.end}`} />
                      {job.current && (
                        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      )}
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
                    <span className="font-medium text-[var(--accent)]">
                      <Ph text={job.company} />
                    </span>
                    {job.location && (
                      <>
                        <span className="text-[var(--line-strong)]">•</span>
                        <span className="text-[var(--faint)]">
                          <Ph text={job.location} />
                        </span>
                      </>
                    )}
                  </div>

                  {job.summary && (
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--muted)] italic">
                      <Ph text={job.summary} />
                    </p>
                  )}

                  <ul className="mt-3.5 space-y-2">
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-2.5 text-[0.875rem] leading-[1.7] text-[var(--muted)]"
                      >
                        <span
                          className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)] transition-all duration-300 group-hover:w-2.5"
                          aria-hidden="true"
                        />
                        <span>
                          <Ph text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  {job.stack && job.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[var(--line)] pt-3.5">
                      {job.stack.map((s, si) => (
                        <span
                          key={si}
                          className="rounded-md bg-[var(--paper-raised)] px-2 py-0.5 font-mono text-[0.6875rem] text-[var(--faint)] ring-1 ring-[var(--line)] ring-inset transition-colors duration-300 group-hover:text-[var(--muted)]"
                        >
                          <Ph text={s} />
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            </RevealItem>
          ))}
        </RevealGroup>
      </ol>

      <Reveal delay={0.2} distance={10} className="mt-8">
        <p className="text-center text-[0.6875rem] tracking-[0.14em] text-[var(--faint)] uppercase">
          Earlier roles available on request
        </p>
      </Reveal>
    </section>
  );
}
