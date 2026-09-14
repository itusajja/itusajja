"use client";

import { GraduationCap } from "lucide-react";
import { resume } from "@/data/resume";
import { RevealGroup, RevealItem } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Ph } from "../Ph";

/** Education history. */
export function Education() {
  return (
    <section id="education" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Academic"
        title="Education"
        icon={GraduationCap}
      />

      <RevealGroup gap={0.12} className="space-y-4">
        {resume.education.map((ed, i) => (
          <RevealItem key={`${ed.school}-${i}`} direction="up" distance={20}>
            <article className="card group relative overflow-hidden px-5 py-4.5 sm:px-6 sm:py-5">
              <GraduationCap
                className="pointer-events-none absolute -right-3 -bottom-4 h-24 w-24 text-[var(--line)] opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:text-[var(--accent-soft)]"
                strokeWidth={1}
                aria-hidden="true"
              />

              <div className="relative">
                <span className="chip font-mono text-[0.6875rem]">
                  <Ph text={`${ed.start} — ${ed.end}`} />
                </span>

                <h3 className="font-display mt-2.5 text-base font-semibold tracking-tight text-[var(--ink)]">
                  <Ph text={ed.degree} />
                </h3>

                <p className="mt-1 text-[0.8125rem] font-medium text-[var(--accent)]">
                  <Ph text={ed.school} />
                  {ed.location && (
                    <span className="font-normal text-[var(--faint)]">
                      {" "}
                      · <Ph text={ed.location} />
                    </span>
                  )}
                </p>

                {ed.grade && (
                  <p className="mt-2 text-[0.8125rem] text-[var(--muted)]">
                    <span className="text-[var(--faint)]">Grade: </span>
                    <Ph text={ed.grade} />
                  </p>
                )}

                {ed.details && ed.details.length > 0 && (
                  <ul className="mt-2.5 space-y-1.5">
                    {ed.details.map((d, di) => (
                      <li
                        key={di}
                        className="flex gap-2.5 text-[0.8125rem] leading-[1.7] text-[var(--muted)]"
                      >
                        <span
                          className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)] transition-all duration-300 group-hover:w-2.5"
                          aria-hidden="true"
                        />
                        <span>
                          <Ph text={d} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
