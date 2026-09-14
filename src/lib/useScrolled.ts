"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

/**
 * `true` once the client has hydrated.
 * Uses `useSyncExternalStore` rather than a `useState` + effect so it never
 * triggers a cascading render and stays hydration-safe.
 */
export function useMounted() {
  return useSyncExternalStore(emptySubscribe, getTrue, getFalse);
}

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback, { passive: true });
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

/** `true` when the page has been scrolled past `threshold` px. */
export function useScrolled(threshold = 24) {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}
