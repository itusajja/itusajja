"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Info, X } from "lucide-react";

const SILK = [0.22, 1, 0.36, 1] as const;

/**
 * Temporary scaffold notice.
 *
 * Explains that the copy on screen is placeholder until the source PDF is
 * dropped into `src/data/resume.ts`. Dismissible, never printed.
 * Delete this component and its usage once the real content is in place.
 */
export function PendingNotice() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="no-print mx-auto mb-5 w-full max-w-5xl px-4 sm:px-6"
          initial={{ opacity: 0, y: -14, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -14, height: 0 }}
          transition={{ duration: 0.55, ease: SILK }}
        >
          <div className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] px-4 py-3.5">
            <span className="accent-bar absolute inset-y-0 left-0 w-[3px]" />
            <div className="flex items-start gap-3 pl-2">
              <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                strokeWidth={2}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[0.8125rem] leading-relaxed font-medium text-[var(--ink)]">
                  Content is placeholder
                </p>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-[var(--muted)]">
                  The layout, splash screen, theming and every animation are
                  final. Anything with a{" "}
                  <span className="ph">dashed underline</span> is waiting for
                  the exact wording from your résumé PDF — it all lives in one
                  file,{" "}
                  <code className="rounded bg-[var(--accent-soft)] px-1 py-0.5 font-mono text-[0.6875rem] text-[var(--accent)]">
                    src/data/resume.ts
                  </code>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Dismiss notice"
                className="-mt-0.5 -mr-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[var(--faint)] transition-colors duration-300 hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
