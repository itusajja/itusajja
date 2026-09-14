"use client";

import { Clock } from "lucide-react";
import { resume } from "@/data/resume";
import { Reveal } from "./Reveal";

/** The small dark "updated on …" pill, centered at the bottom of the document. */
export function Footer() {
  return (
    <footer className="px-5 pb-8 sm:px-10">
      <Reveal direction="left" distance={16}>
        <div className="mx-auto flex max-w-[1100px] justify-center">
          <span className="inline-flex items-center gap-2 rounded-md bg-[#232a3d] px-3 py-1.5 text-[0.6875rem] font-medium text-white/90 shadow-[0_6px_16px_-8px_rgba(0,0,0,.6)] dark:bg-[var(--surface)]">
            <Clock className="h-3 w-3" strokeWidth={2} />
            {resume.updatedOn}
          </span>
        </div>
      </Reveal>
    </footer>
  );
}
