import { cn } from "@/lib/cn";

/**
 * Renders a string, styling any `[bracketed]` segment as a placeholder so
 * content still to be lifted from the PDF is impossible to miss.
 *
 * Once the PDF text is pasted into `src/data/resume.ts` the brackets disappear
 * and this renders as plain text — no code changes required.
 */
export function Ph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(\[[^\]]*\])/g);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        const isPh = part.startsWith("[") && part.endsWith("]");
        return (
          <span
            key={i}
            className={cn(className, isPh && "ph")}
            title={isPh ? "Placeholder — awaiting exact text from the PDF" : undefined}
          >
            {part}
          </span>
        );
      })}
    </>
  );
}
