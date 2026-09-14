"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSplashReady } from "./SplashScreen";
import { Reveal } from "./Reveal";

const SILK = [0.22, 1, 0.36, 1] as const;

/**
 * Navy serif section heading, matching the source document's
 * "Skills / Work Experience / Languages / Education History" titles.
 */
export function SectionTitle({
  children,
  center = false,
  className = "",
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ready = useSplashReady();

  return (
    <Reveal distance={14} className={className}>
      <h2
        className={`heading-serif relative inline-block text-[1.4rem] font-bold text-[var(--ink)] sm:text-[1.55rem] ${
          center ? "text-center" : ""
        }`}
      >
        {children}
        {/* short orange underline that draws in under the title */}
        <motion.span
          className="accent-bar absolute -bottom-1.5 left-0 h-[3px] rounded-full"
          initial={{ width: 0 }}
          animate={ready ? { width: "2.6rem" } : { width: 0 }}
          transition={{ duration: reduce ? 0.001 : 0.7, ease: SILK, delay: reduce ? 0 : 0.25 }}
          aria-hidden="true"
        />
      </h2>
    </Reveal>
  );
}
