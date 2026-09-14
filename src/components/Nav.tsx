"use client";

import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { resume, sections } from "@/data/resume";
import { cn } from "@/lib/cn";
import { useScrolled } from "@/lib/useScrolled";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Sticky top bar: monogram, section anchors with a sliding active pill,
 * theme toggle, and a hairline scroll-progress indicator.
 * Fades in only after the splash screen has cleared.
 */
export function Nav({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  const [active, setActive] = useState<string>("");
  const solid = useScrolled(24);

  useEffect(() => {
    if (!ready) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.25, 0.6] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ready]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({
      top,
      behavior: reduce ? "auto" : "smooth",
    });
    setActive(id);
  };

  return (
    <motion.header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
      initial={{ y: -72, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -72, opacity: 0 }}
      transition={{ duration: reduce ? 0.001 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        // next-themes writes the class on <html>, so read the CSS var directly
        WebkitBackdropFilter: solid ? "blur(16px)" : undefined,
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
        <a
          href="#top"
          onClick={go("top")}
          className="group flex items-center gap-2.5"
          aria-label={`${resume.name} — back to top`}
        >
          <span className="pulse-ring grid h-8 w-8 place-items-center rounded-lg bg-[var(--accent)] font-display text-[0.7rem] font-bold text-[var(--accent-ink)] transition-transform duration-300 group-hover:scale-105">
            {resume.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-[var(--ink)] sm:block">
            {resume.name}
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={go(s.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-300",
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--ink)]",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--accent-soft)]"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </a>
            );
          })}
        </nav>

        <div className={cn("flex items-center gap-2", !ready && "invisible")}>
          <ThemeToggle />
        </div>
      </div>

      {/* scroll progress */}
      <motion.div
        className="accent-bar absolute inset-x-0 -bottom-px h-[2px] origin-left"
        style={{ scaleX: progress }}
      />
    </motion.header>
  );
}
