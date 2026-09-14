"use client";

import { resume } from "@/data/resume";
import { Reveal } from "./Reveal";
import { Ph } from "./Ph";

/** Closing line of the document. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] px-6 py-7 sm:px-12 lg:px-14">
      <Reveal distance={14}>
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="hairline w-24" aria-hidden="true" />
          <p className="text-[0.6875rem] tracking-[0.16em] text-[var(--faint)] uppercase">
            References available upon request
          </p>
          <p className="text-[0.6875rem] text-[var(--faint)]">
            <Ph text={resume.name} /> · <Ph text={resume.location} /> · ©{" "}
            {year}
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
