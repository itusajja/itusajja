/** Tiny class-name joiner (no runtime dep needed). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** True when a string still carries `[placeholder]` markers. */
export function hasPlaceholder(text: string) {
  return /\[[^\]]*\]/.test(text);
}
