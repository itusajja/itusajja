"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Languages as LanguagesIcon, Heart } from "lucide-react";
import { resume } from "@/data/resume";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Ph } from "../Ph";
import { useSplashReady } from "../SplashScreen";

const SILK = [0.22, 1, 0.36, 1] as const;

/** Certifications, languages and interests — the closing credentials block. */
export function Credentials() {
  const certs = resume.certifications ?? [];
  const langs = resume.languages ?? [];
  const interests = resume.interests ?? [];

  if (!certs.length && !langs.length && !interests.length) return null;

  return (
    <section id="credentials" className="scroll-mt-24">
      <SectionHeading eyebrow="Recognition" title="Credentials" icon={Award} />

      <div className="grid gap-7 sm:grid-cols-2">
        {certs.length > 0 && (
          <div>
            <SubHeading icon={Award} text="Certifications" />
            <RevealGroup gap={0.09} className="mt-3 space-y-2.5">
              {certs.map((c, i) => (
                <RevealItem key={`${c.name}-${i}`} direction="left" distance={16}>
                  <div className="card group flex gap-3 px-4 py-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[var(--accent-soft)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                      <Award className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.8125rem] leading-snug font-medium text-[var(--ink)]">
                        <Ph text={c.name} />
                      </p>
                      <p className="mt-0.5 text-[0.75rem] text-[var(--faint)]">
                        <Ph text={c.issuer} />
                        {c.date && (
                          <>
                            <span className="mx-1.5 text-[var(--line-strong)]">
                              •
                            </span>
                            <Ph text={c.date} />
                          </>
                        )}
                      </p>
                      {c.id && (
                        <p className="mt-0.5 font-mono text-[0.6875rem] text-[var(--faint)]">
                          ID <Ph text={c.id} />
                        </p>
                      )}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}

        {langs.length > 0 && (
          <div>
            <SubHeading icon={LanguagesIcon} text="Languages" />
            <RevealGroup gap={0.09} className="mt-3 space-y-2.5">
              {langs.map((l, i) => (
                <RevealItem key={`${l.name}-${i}`} direction="left" distance={16}>
                  <div className="card flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-[0.8125rem] font-medium text-[var(--ink)]">
                        <Ph text={l.name} />
                      </p>
                      <p className="mt-0.5 text-[0.75rem] text-[var(--faint)]">
                        <Ph text={l.proficiency} />
                      </p>
                    </div>
                    <LanguageDots level={l.level} index={i} />
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}

        {interests.length > 0 && (
          <div className="sm:col-span-2">
            <SubHeading icon={Heart} text="Interests" />
            <RevealGroup gap={0.06} className="mt-3 flex flex-wrap gap-1.5">
              {interests.map((item, i) => (
                <RevealItem key={`${item}-${i}`} direction="up" distance={10}>
                  <span className="chip cursor-default">
                    <Ph text={item} />
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </section>
  );
}

function SubHeading({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  text: string;
}) {
  return (
    <Reveal distance={10} duration={0.6}>
      <h3 className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.15em] text-[var(--faint)] uppercase">
        <Icon className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={2} />
        {text}
      </h3>
    </Reveal>
  );
}

/** Five-dot fluency meter; dots light up in sequence on reveal. */
function LanguageDots({ level, index }: { level: number; index: number }) {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const filled = Math.round((level / 100) * 5);

  return (
    <div className="flex shrink-0 items-center gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((d) => (
        <motion.span
          key={d}
          className={
            d < filled
              ? "h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              : "h-1.5 w-1.5 rounded-full bg-[var(--line-strong)]"
          }
          initial={reduce ? { opacity: 0.001 } : { scale: 0.3, opacity: 0 }}
          animate={
            ready
              ? reduce
                ? { opacity: 1 }
                : { scale: 1, opacity: 1 }
              : reduce
                ? { opacity: 0.001 }
                : { scale: 0.3, opacity: 0 }
          }
          transition={{
            duration: reduce ? 0.001 : 0.45,
            ease: SILK,
            delay: reduce ? 0 : index * 0.08 + d * 0.07,
          }}
        />
      ))}
      <span className="sr-only">{`Fluency ${level} out of 100`}</span>
    </div>
  );
}
