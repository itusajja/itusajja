"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/lib/useScrolled";

/**
 * Dark / light switch. Icons cross-fade and rotate so the change reads as a
 * single motion rather than a hard swap.
 */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
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
      className={
        compact
          ? "grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] bg-[var(--paper-raised)] text-[var(--muted)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          : "group relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[var(--line)] bg-[var(--paper-raised)] text-[var(--muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
      }
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
            <Moon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.75} />
          ) : (
            <Sun className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
