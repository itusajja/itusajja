"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { useSplashReady } from "./SplashScreen";

const SILK = [0.22, 1, 0.36, 1] as const;

/**
 * Client shell: renders the nav and gates the whole document's entrance on the
 * splash screen clearing, so nothing animates behind the overlay.
 */
export function Shell({ children }: { children: ReactNode }) {
  const ready = useSplashReady();
  const reduce = useReducedMotion();

  return (
    <>
      <Nav ready={ready} />

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
