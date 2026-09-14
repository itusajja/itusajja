"use client";

import { resume } from "@/data/resume";
import { SectionTitle } from "../SectionTitle";
import { RevealGroup, RevealItem } from "../Reveal";
import { FlagIndonesia, FlagUnitedKingdom } from "../icons";

/** Languages — circular flag badge + name + proficiency. */
export function Languages() {
  return (
    <section id="languages" className="scroll-mt-24">
      <SectionTitle>Languages</SectionTitle>

      <RevealGroup gap={0.11} className="mt-6 space-y-5">
        {resume.languages.map((l) => {
          const Flag = l.flag === "id" ? FlagIndonesia : FlagUnitedKingdom;
          return (
            <RevealItem key={l.name} direction="right" distance={20}>
              <div className="flex items-center gap-3.5">
                <Flag className="badge-circle h-9 w-9" />
                <div>
                  <p className="text-[0.9375rem] font-bold tracking-wide text-[#1f2740] dark:text-[var(--body)]">
                    {l.name}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] font-medium text-[var(--blue)]">
                    {l.proficiency}
                  </p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
