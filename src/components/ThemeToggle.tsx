"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/lib/useScrolled";
import { useTheme } from "./ThemeProvider";

/**
 * Dark / light switch. Icons cross-fade and rotate so the change reads as a
 * single motion rather than a hard swap.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isDark : undefined}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] shadow-[0_10px_28px_-12px_rgba(10,17,48,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--blue)] hover:text-[var(--blue)]"
    >
      {/* always render both so SSR markup matches the client */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={mounted ? (isDark ? "moon" : "sun") : "sun"}
          className="grid place-items-center"
          initial={{ opacity: 0, scale: 0.4, rotate: -70 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.4, rotate: 70 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {mounted && isDark ? (
            <Moon className="h-5 w-5" strokeWidth={1.75} />
          ) : (
            <Sun className="h-5 w-5" strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
