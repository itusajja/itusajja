"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { MaskLine, Reveal } from "./Reveal";
import { Ph } from "./Ph";
import { useSplashReady } from "./SplashScreen";

const SILK = [0.22, 1, 0.36, 1] as const;

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  /** Optional right-hand note (dates, counts, links). */
  aside?: React.ReactNode;
}

/**
 * Section header: eyebrow + masked title + a rule that draws itself in,
 * with an accent node that travels the width of the rule once.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  icon: Icon,
  aside,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const show = ready && inView;

  return (
    <div ref={ref} id={id} className="mb-7 scroll-mt-28">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && (
            <Reveal distance={10} duration={0.6}>
              <span className="eyebrow flex items-center gap-2">
                {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2} />}
                <Ph text={eyebrow} />
              </span>
            </Reveal>
          )}
          <MaskLine
            as="h2"
            delay={eyebrow ? 0.08 : 0}
            className="font-display mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-[1.7rem]"
          >
            <Ph text={title} />
          </MaskLine>
        </div>
        {aside && (
          <Reveal direction="left" distance={14} delay={0.15}>
            <div className="shrink-0 pb-1 text-right text-xs text-[var(--faint)]">
              {aside}
            </div>
          </Reveal>
        )}
      </div>

      {/* drawing rule */}
      <div className="relative mt-4 h-px w-full overflow-hidden bg-[var(--line)]">
        <motion.div
          className="absolute inset-y-0 left-0 origin-left bg-[var(--line-strong)]"
          initial={{ scaleX: 0 }}
          animate={show ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: reduce ? 0.001 : 0.95, ease: SILK }}
          style={{ width: "100%" }}
        />
        <motion.div
          className="accent-bar absolute inset-y-0 left-0 h-px"
          initial={{ scaleX: 0 }}
          animate={show ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: reduce ? 0.001 : 1.1,
            ease: SILK,
            delay: reduce ? 0 : 0.12,
          }}
          style={{ width: reduce ? "100%" : "42%" }}
        />
      </div>
    </div>
  );
}
