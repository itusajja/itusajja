"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useSplashReady } from "./SplashScreen";
import { ThemeToggle } from "./ThemeToggle";

const SILK = [0.22, 1, 0.36, 1] as const;

/**
 * Client shell: gates the whole document's entrance on the splash screen
 * clearing, so nothing animates behind the overlay, and hosts the floating
 * theme switch pinned to the bottom-right corner. (The top navbar was removed
 * — the site is a single scrolling document.)
 */
export function Shell({ children }: { children: ReactNode }) {
  const ready = useSplashReady();
  const reduce = useReducedMotion();

  return (
    <>
      {/* Floating theme switch — bottom right, clear of the content. */}
      <motion.div
        className="no-print fixed right-6 bottom-6 z-40"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 12 }}
        animate={
          ready
            ? { opacity: 1, scale: 1, y: 0 }
            : reduce
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.5, y: 12 }
        }
        transition={{
          duration: reduce ? 0.001 : 0.55,
          ease: SILK,
          delay: reduce ? 0 : 0.3,
        }}
      >
        <ThemeToggle />
      </motion.div>

      <motion.main
        className="relative z-10"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.985 }}
        animate={
          ready
            ? reduce
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1 }
            : reduce
              ? { opacity: 0 }
              : { opacity: 0, y: 34, scale: 0.985 }
        }
        transition={{
          duration: reduce ? 0.001 : 1.05,
          ease: SILK,
          delay: reduce ? 0 : 0.12,
        }}
      >
        {children}
      </motion.main>
    </>
  );
}
