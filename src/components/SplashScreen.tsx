"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { resume } from "@/data/resume";

/* -------------------------------------------------------------------------- */
/*  Presence gate — page content waits for the splash to leave the stage       */
/* -------------------------------------------------------------------------- */

const SplashContext = createContext<boolean>(true);

/** `false` while the splash screen is still covering the page. */
export function useSplashReady() {
  return useContext(SplashContext);
}

export function SplashProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(true);

  return (
    <SplashContext.Provider value={ready}>
      {mounted && (
        <SplashScreen
          onDone={() => setReady(true)}
          onGone={() => setMounted(false)}
        />
      )}
      {children}
    </SplashContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Easing + timing                                                            */
/* -------------------------------------------------------------------------- */

const SILK = [0.22, 1, 0.36, 1] as const;
const CURTAIN = [0.76, 0, 0.24, 1] as const;

const MIN_STAY = 2400; // ms — keeps the intro readable even from a warm cache
const HARD_CAP = 7000; // ms — never trap a visitor if `load` never fires

type Status = "Preparing" | "Loading" | "Ready";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/* -------------------------------------------------------------------------- */
/*  Splash screen                                                              */
/* -------------------------------------------------------------------------- */

function SplashScreen({
  onDone,
  onGone,
}: {
  onDone: () => void;
  onGone: () => void;
}) {
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const [status, setStatus] = useState<Status>("Preparing");

  // One motion value drives both the bar and the numeric read-out, so the
  // percentage can never drift behind the fill — and updating it costs no
  // React re-render at all.
  const mv = useMotionValue(0);
  const barWidth = useTransform(mv, (v) => `${(v * 100).toFixed(2)}%`);
  const pctLabel = useTransform(mv, (v) => `${Math.round(v * 100)}%`);

  const words = useMemo(() => resume.name.split(" "), []);
  const ringLength = 2 * Math.PI * 46;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("splash-lock");
    window.scrollTo(0, 0);

    const min = reduce ? 500 : MIN_STAY;
    const startedAt = performance.now();
    let loaded = document.readyState === "complete";
    let finished = false;
    let frame = 0;
    let holdTimer = 0;

    const onLoad = () => {
      loaded = true;
    };
    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      mv.set(1);
      setStatus("Ready");
      // brief hold on "Ready" so the bar doesn't vanish mid-fill
      holdTimer = window.setTimeout(() => {
        setLeaving(true);
        onDone();
        root.classList.remove("splash-lock");
      }, reduce ? 60 : 400);
    };

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const timeShare = Math.min(1, elapsed / min);

      // Creep towards 92% while work remains, complete once released.
      const target =
        loaded && timeShare >= 1 ? 1 : 0.92 * easeOutCubic(timeShare);

      mv.set(mv.get() + (target - mv.get()) * 0.075);

      const next: Status =
        elapsed < 420 ? "Preparing" : mv.get() > 0.985 ? "Ready" : "Loading";
      setStatus((prev) => (prev === next ? prev : next));

      if ((loaded && timeShare >= 1) || elapsed > HARD_CAP) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(holdTimer);
      window.removeEventListener("load", onLoad);
      root.classList.remove("splash-lock");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <div className="splash-root fixed inset-0 z-[100]" aria-hidden="true">
      <AnimatePresence onExitComplete={onGone}>
        {!leaving && (
          <motion.div
            key="splash"
            className="absolute inset-0 overflow-hidden bg-[var(--bg)]"
          >
            {/* ---------------------- ambient backdrop --------------------- */}
            <div className="pointer-events-none absolute inset-0">
              <motion.div
                className="float-slow absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full blur-[110px]"
                style={{ background: "color-mix(in srgb, var(--orange) 16%, transparent)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4 }}
              />
              <motion.div
                className="float-slow absolute -right-40 -bottom-48 h-[30rem] w-[30rem] rounded-full blur-[120px]"
                style={{
                  background: "color-mix(in srgb, var(--blue) 14%, transparent)",
                  animationDelay: "-4.5s",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.2 }}
              />
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
                  backgroundSize: "68px 68px",
                  maskImage:
                    "radial-gradient(60% 60% at 50% 50%, #000 5%, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(60% 60% at 50% 50%, #000 5%, transparent 75%)",
                }}
              />
            </div>

            {/* ---------------------- curtains ----------------------------- */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[50.2%] bg-[var(--bg)]"
              exit={{ y: "-101%" }}
              transition={{
                duration: reduce ? 0.2 : 0.9,
                ease: CURTAIN,
                delay: reduce ? 0 : 0.22,
              }}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 h-[50.2%] bg-[var(--bg)]"
              exit={{ y: "101%" }}
              transition={{
                duration: reduce ? 0.2 : 0.9,
                ease: CURTAIN,
                delay: reduce ? 0 : 0.22,
              }}
            />
            {/* accent seam that splits apart with the curtains */}
            <motion.div
              className="accent-bar absolute inset-x-0 top-1/2 h-px -translate-y-1/2 opacity-70"
              exit={{ opacity: 0, scaleX: 0.15 }}
              transition={{ duration: 0.28 }}
            />

            {/* ---------------------- content ------------------------------ */}
            <motion.div
              className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6"
              exit={{ opacity: 0, y: -26, filter: "blur(8px)" }}
              transition={{ duration: reduce ? 0.15 : 0.4, ease: SILK }}
            >
              {/* monogram + drawing ring */}
              <motion.div
                className="relative mb-8 grid h-28 w-28 place-items-center sm:h-32 sm:w-32"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: SILK, delay: 0.05 }}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full -rotate-90"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="1.5"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="var(--orange)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={ringLength}
                    initial={{ strokeDashoffset: ringLength }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.5, ease: SILK, delay: 0.2 }}
                  />
                </svg>
                <motion.span
                  className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: SILK }}
                >
                  {resume.initials}
                </motion.span>
              </motion.div>

              {/* name — per-letter mask reveal */}
              <h1 className="font-display text-center text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
                <span className="sr-only">{resume.name}</span>
                {words.map((word, w) => (
                  <span
                    key={w}
                    className="mr-[0.28em] inline-block whitespace-nowrap last:mr-0"
                    aria-hidden="true"
                  >
                    {word.split("").map((char, i) => (
                      <span
                        key={i}
                        className="inline-block overflow-hidden align-bottom"
                      >
                        <motion.span
                          className="inline-block"
                          initial={{ y: "115%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          transition={{
                            duration: 0.72,
                            ease: SILK,
                            delay: 0.62 + (w * 0.09 + i * 0.026),
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              <motion.div
                className="mt-5 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.25 }}
              >
                <span className="h-px w-8 bg-[var(--line-strong)]" />
                <span className="eyebrow">Online Résumé</span>
                <span className="h-px w-8 bg-[var(--line-strong)]" />
              </motion.div>

              {/* progress */}
              <motion.div
                className="mt-10 w-full max-w-64 sm:max-w-76"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4, ease: SILK }}
              >
                <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-[var(--line)]">
                  <motion.div
                    className="sheen absolute inset-y-0 left-0 overflow-hidden rounded-full bg-[var(--blue)]"
                    style={{ width: barWidth }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[0.625rem] tracking-[0.14em] text-[var(--muted)] uppercase">
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {status}
                  </motion.span>
                  <motion.span>{pctLabel}</motion.span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
