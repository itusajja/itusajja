"use client";

import { FolderGit2, ExternalLink } from "lucide-react";
import { resume } from "@/data/resume";
import { RevealGroup, RevealItem } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Ph } from "../Ph";

/** Selected projects — only rendered when the data file has any. */
export function Projects() {
  const projects = resume.projects ?? [];
  if (!projects.length) return null;

  return (
    <section id="projects" className="scroll-mt-24">
      <SectionHeading eyebrow="Portfolio" title="Projects" icon={FolderGit2} />

      <RevealGroup gap={0.1} className="space-y-4">
        {projects.map((p, i) => (
          <RevealItem key={`${p.name}-${i}`} direction="up" distance={22}>
            <article className="card group px-5 py-4.5 sm:px-6 sm:py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
                <h3 className="font-display flex items-center gap-2 text-base font-semibold tracking-tight text-[var(--ink)]">
                  <Ph text={p.name} />
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Open ${p.name}`}
                      className="text-[var(--faint)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--accent)]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </a>
                  )}
                </h3>
                {p.period && (
                  <span className="chip shrink-0 font-mono text-[0.6875rem]">
                    <Ph text={p.period} />
                  </span>
                )}
              </div>

              {p.role && (
                <p className="mt-1 text-[0.8125rem] font-medium text-[var(--accent)]">
                  <Ph text={p.role} />
                </p>
              )}

              <p className="mt-2.5 text-[0.875rem] leading-[1.7] text-[var(--muted)]">
                <Ph text={p.description} />
              </p>

              {p.bullets && p.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {p.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="flex gap-2.5 text-[0.8125rem] leading-[1.7] text-[var(--muted)]"
                    >
                      <span
                        className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)] transition-all duration-300 group-hover:w-2.5"
                        aria-hidden="true"
                      />
                      <span>
                        <Ph text={b} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {p.stack && p.stack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[var(--line)] pt-3.5">
                  {p.stack.map((s, si) => (
                    <span
                      key={si}
                      className="rounded-md bg-[var(--paper-raised)] px-2 py-0.5 font-mono text-[0.6875rem] text-[var(--faint)] ring-1 ring-[var(--line)] ring-inset"
                    >
                      <Ph text={s} />
                    </span>
                  ))}
                </div>
              )}
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
