"use client";

import { User, Sparkles } from "lucide-react";
import { resume } from "@/data/resume";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Ph } from "../Ph";

/** Professional profile / summary + quick-hit highlights. */
export function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <SectionHeading eyebrow="Profile" title="About Me" icon={User} />

      <div className="space-y-4">
        {resume.summary.map((para, i) => (
          <Reveal key={i} delay={i * 0.09} distance={20}>
            <p className="text-[0.9375rem] leading-[1.78] text-[var(--muted)]">
              <Ph text={para} />
            </p>
          </Reveal>
        ))}
      </div>

      {resume.highlights && resume.highlights.length > 0 && (
        <RevealGroup
          gap={0.08}
          delay={0.15}
          className="mt-6 grid gap-2.5 sm:grid-cols-2"
        >
          {resume.highlights.map((h, i) => (
            <RevealItem key={i} direction="left" distance={18}>
              <div className="card flex items-start gap-3 px-4 py-3">
                <Sparkles
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                  strokeWidth={2}
                />
                <span className="text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                  <Ph text={h} />
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </section>
  );
}
