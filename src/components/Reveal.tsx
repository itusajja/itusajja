"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";
import { useSplashReady } from "./SplashScreen";

const SILK = [0.22, 1, 0.36, 1] as const;

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

function offsets(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance, x: 0 };
    case "down":
      return { y: -distance, x: 0 };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Slide-in direction. */
  direction?: RevealDirection;
  /** Travel distance in px. */
  distance?: number;
  delay?: number;
  duration?: number;
  /** Adds a soft focus pull while entering. */
  blur?: boolean;
  scale?: number;
  as?: ElementType;
  style?: React.CSSProperties;
}

/**
 * Scroll-triggered reveal.
 *
 * Deliberately gated on `useSplashReady()` so nothing fires behind the splash
 * overlay — the entrance plays only once the curtains have opened.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  distance = 26,
  delay = 0,
  duration = 0.75,
  blur = false,
  scale,
  as = "div",
  style,
}: RevealProps) {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px -60px 0px" });

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const { x, y } = offsets(direction, distance);

  const hidden = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        x,
        y,
        ...(scale ? { scale } : {}),
        ...(blur ? { filter: "blur(7px)" } : {}),
      };

  const shown = reduce
    ? { opacity: 1 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        ...(scale ? { scale: 1 } : {}),
        ...(blur ? { filter: "blur(0px)" } : {}),
      };

  const show = ready && inView;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial={hidden}
      animate={show ? shown : hidden}
      transition={{
        duration: reduce ? 0.001 : duration,
        delay: reduce ? 0 : delay,
        ease: SILK,
      }}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------- */
/*  Staggered group                                                            */
/* -------------------------------------------------------------------------- */

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Delay between each `<RevealItem>`. */
  gap?: number;
  /** Delay before the first child starts. */
  delay?: number;
  as?: ElementType;
  style?: React.CSSProperties;
}

/**
 * Parent that orchestrates a staggered entrance for its `<RevealItem>`s.
 * Direction and distance are set per-item, so a group can mix slide-ins.
 */
export function RevealGroup({
  children,
  className,
  gap = 0.09,
  delay = 0,
  as = "div",
  style,
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px -60px 0px" });

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const show = ready && inView;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={show ? "shown" : "hidden"}
      variants={{
        hidden: {},
        shown: {
          transition: {
            staggerChildren: reduce ? 0 : gap,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of `<RevealGroup>`; inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  direction = "up",
  distance = 22,
  blur = false,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
  blur?: boolean;
  as?: ElementType;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const { x, y } = offsets(direction, distance);

  return (
    <MotionTag
      className={className}
      style={style}
      variants={{
        hidden: reduce
          ? { opacity: 0 }
          : {
              opacity: 0,
              x,
              y,
              ...(blur ? { filter: "blur(6px)" } : {}),
            },
        shown: reduce
          ? { opacity: 1 }
          : {
              opacity: 1,
              x: 0,
              y: 0,
              ...(blur ? { filter: "blur(0px)" } : {}),
              transition: { duration: 0.7, ease: SILK },
            },
      }}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------- */
/*  Line mask reveal — for headings and the name                               */
/* -------------------------------------------------------------------------- */

export function MaskLine({
  children,
  className,
  delay = 0,
  as = "span",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const ready = useSplashReady();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = ready && inView;

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.span;

  return (
    <MotionTag ref={ref} className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={reduce ? { opacity: 0 } : { y: "112%", opacity: 0 }}
        animate={
          show
            ? reduce
              ? { opacity: 1 }
              : { y: "0%", opacity: 1 }
            : reduce
              ? { opacity: 0 }
              : { y: "112%", opacity: 0 }
        }
        transition={{ duration: reduce ? 0.001 : 0.9, ease: SILK, delay: reduce ? 0 : delay }}
      >
        {children}
      </motion.span>
    </MotionTag>
  );
}
