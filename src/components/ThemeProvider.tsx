"use client";

import { useServerInsertedHTML } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

const MEDIA_QUERY = "(prefers-color-scheme: dark)";
const STORAGE_KEY = "theme";
const THEMES = ["light", "dark", "system"] as const;

interface ThemeProviderProps {
  children: ReactNode;
  /** Kept for API parity with next-themes; this provider always uses the
   *  `class` strategy (`.dark` on <html>, see globals.css). */
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

interface ThemeContextValue {
  /** The stored preference (`"system"` when following the OS). */
  theme: Theme;
  /** The concrete theme currently applied to <html>. */
  resolvedTheme: "light" | "dark";
  systemTheme: "light" | "dark";
  setTheme: (theme: Theme | ((current: Theme) => Theme)) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light";
}

function readStoredTheme(fallback: Theme): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (THEMES as readonly string[]).includes(stored)) {
      return stored as Theme;
    }
  } catch {
    // localStorage can throw (private mode, blocked storage) — use fallback
  }
  return fallback;
}

function resolveTheme(theme: Theme, systemTheme: "light" | "dark"): "light" | "dark" {
  return theme === "system" ? systemTheme : theme;
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

/** Swap the theme class while CSS transitions are disabled, so the color
 *  change reads as an instant switch rather than a fade (mirrors the
 *  `disableTransitionOnChange` behavior of next-themes). */
function applyThemeWithoutTransitions(resolved: "light" | "dark") {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      "*, *::before, *::after { transition: none !important; }",
    ),
  );
  document.head.appendChild(style);
  applyTheme(resolved);
  // Force a style recalc so the rule above applies before the next paint.
  window.getComputedStyle(document.body);
  window.setTimeout(() => style.remove(), 1);
}

/** The inline script that resolves and applies the stored/system theme.
 *  It runs during HTML parsing, before hydration — so the splash screen and
 *  first paint never show the wrong theme (same guarantee next-themes made). */
function themeInitScript(defaultTheme: Theme, enableSystem: boolean) {
  const systemResolution = enableSystem
    ? `if (t === "system") { t = window.matchMedia(${JSON.stringify(
        MEDIA_QUERY,
      )}).matches ? "dark" : "light"; }`
    : "";
  return [
    "(function () {",
    "  try {",
    `    var t = window.localStorage.getItem(${JSON.stringify(
      STORAGE_KEY,
    )}) || ${JSON.stringify(defaultTheme)};`,
    systemResolution ? `    ${systemResolution}` : "",
    '    if (t !== "light" && t !== "dark") t = "light";',
    "    var d = document.documentElement;",
    '    d.classList.remove("light", "dark");',
    '    d.classList.add(t);',
    "    d.style.colorScheme = t;",
    "  } catch (e) {}",
    "})();",
  ]
    .filter(Boolean)
    .join("\n");
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined" ? defaultTheme : readStoredTheme(defaultTheme),
  );
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() =>
    typeof window === "undefined" ? "light" : getSystemTheme(),
  );

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? systemTheme : theme;

  // Keep <html> in sync while following the OS preference.
  useEffect(() => {
    const mql = window.matchMedia(MEDIA_QUERY);
    const onChange = () => {
      const next = mql.matches ? "dark" : "light";
      setSystemTheme(next);
      if (theme === "system") applyTheme(next);
    };
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  // Cross-tab sync.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (
        event.key === STORAGE_KEY &&
        event.newValue &&
        (THEMES as readonly string[]).includes(event.newValue)
      ) {
        const value = event.newValue as Theme;
        setThemeState(value);
        applyTheme(resolveTheme(value, getSystemTheme()));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback(
    (next: Theme | ((current: Theme) => Theme)) => {
      const value = typeof next === "function" ? next(theme) : next;
      try {
        window.localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // ignore write failures
      }
      const resolved = resolveTheme(value, systemTheme);
      if (disableTransitionOnChange) applyThemeWithoutTransitions(resolved);
      else applyTheme(resolved);
      setThemeState(value);
    },
    [theme, systemTheme, disableTransitionOnChange],
  );

  // Inject the pre-hydration script into the SSR stream OUTSIDE the React
  // tree (Next flushes it at the end of <body>). It is deliberately never
  // rendered on the client: React 19 dev builds warn — "Encountered a script
  // tag while rendering React component" — whenever a <script> element is
  // rendered inside a client component, which is exactly what next-themes
  // did. `useServerInsertedHTML` is a no-op on the client, so the script
  // exists only in the server HTML and hydration never sees it.
  const inserted = useRef(false);
  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return (
      <script
        id="theme-init"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: themeInitScript(defaultTheme, enableSystem),
        }}
      />
    );
  });

  const value = useMemo(
    () => ({ theme, resolvedTheme, systemTheme, setTheme }),
    [theme, resolvedTheme, systemTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
