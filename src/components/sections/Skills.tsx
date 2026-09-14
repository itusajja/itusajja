"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Wrench } from "lucide-react";
import { resume, type SkillGroup } from "@/data/resume";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Ph } from "../Ph";
import { useSplashReady } from "../SplashScreen";

const SILK = [0.22, 1, 0.36, 1] as const;

/** Skills — rated groups get animated meters, plain groups get tag clouds. */
export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <SectionHeading eyebrow="Toolkit" title="Skills" icon={Wrench} />

      <div className="space-y-7">
        {resume.skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08} distance={18}>
            <SkillBlock group={group} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SkillBlock({ group, index }: { group: SkillGroup; index: number }) {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const show = ready && inView;

  return (
    <div ref={ref}>
      <h3 className="mb-3 flex items-center gap-2.5 text-[0.6875rem] font-semibold tracking-[0.15em] text-[var(--faint)] uppercase">
        <span
          className="accent-bar h-2.5 w-0.5 rounded-full"
          aria-hidden="true"
        />
        <Ph text={group.title} />
      </h3>

      {group.rated && group.rated.length > 0 && (
        <div className="space-y-3">
          {group.rated.map((skill, i) => (
            <div key={`${index}-${i}`}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-[0.8125rem] font-medium text-[var(--ink)]">
                  <Ph text={skill.name} />
                </span>
                <span className="font-mono text-[0.625rem] text-[var(--faint)]">
                  {skill.level}%
                </span>
              </div>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
                  initial={{ width: 0 }}
                  animate={show ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{
                    duration: reduce ? 0.001 : 1.1,
                    ease: SILK,
                    delay: reduce ? 0 : i * 0.1,
                  }}
                />
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full opacity-45 blur-[3px]"
                  style={{ background: "var(--accent)" }}
                  initial={{ width: 0 }}
                  animate={show ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{
                    duration: reduce ? 0.001 : 1.25,
                    ease: SILK,
                    delay: reduce ? 0 : i * 0.1,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {group.items && group.items.length > 0 && (
        <RevealGroup gap={0.05} className="flex flex-wrap gap-1.5">
          {group.items.map((item, i) => (
            <RevealItem key={`${index}-${i}`} direction="up" distance={10}>
              <span className="chip cursor-default font-mono text-[0.6875rem]">
                <Ph text={item} />
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
