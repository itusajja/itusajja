"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { resume } from "@/data/resume";
import { SectionTitle } from "../SectionTitle";
import { RevealGroup, RevealItem } from "../Reveal";
import { useSplashReady } from "../SplashScreen";

const SILK = [0.22, 1, 0.36, 1] as const;

/** Education history — date · blue graduation-cap node · title + subtitle. */
export function Education() {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const show = ready && inView;

  return (
    <section id="education" className="scroll-mt-24">
      <SectionTitle>Education History</SectionTitle>

      <ol ref={ref} className="relative mt-6 space-y-6">
        {/* connecting spine through the nodes */}
        <motion.span
          className="absolute top-2 bottom-2 left-[6.4rem] w-[2px] origin-top rounded sm:left-[7.4rem]"
          style={{ background: "var(--node-edu)" }}
          initial={{ scaleY: 0 }}
          animate={show ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: reduce ? 0.001 : 1.3, ease: SILK }}
          aria-hidden="true"
        />

        <RevealGroup gap={0.12}>
          {resume.education.map((ed, i) => (
            <RevealItem key={ed.title} direction="right" distance={20}>
              <li className="grid grid-cols-[5.4rem_auto_1fr] items-start gap-x-3 sm:grid-cols-[6.4rem_auto_1fr] sm:gap-x-4">
                <span className="pt-1 text-right text-[0.8125rem] font-extrabold text-[#1f2740] dark:text-[var(--body)]">
                  {ed.period}
                </span>

                <motion.span
                  className="badge-circle relative z-10 mt-0.5 h-7 w-7 bg-[var(--node-edu)] text-white"
                  initial={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                  animate={show ? { scale: 1, opacity: 1 } : reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0.001 : 0.55, ease: SILK, delay: reduce ? 0 : 0.2 + i * 0.12 }}
                  aria-hidden="true"
                >
                  <GraduationCap className="h-4 w-4" strokeWidth={2.2} />
                </motion.span>

                <div className="min-w-0">
                  <p className="text-[0.9375rem] leading-snug font-bold tracking-wide text-[#1f2740] dark:text-[var(--body)]">
                    {ed.title}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] font-medium text-[var(--blue)]">
                    {ed.subtitle}
                  </p>
                </div>
              </li>
            </RevealItem>
          ))}
        </RevealGroup>
      </ol>
    </section>
  );
}
