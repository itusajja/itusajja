/**
 * Brand marks drawn by hand — lucide-react v1 dropped bundled brand icons,
 * so LinkedIn / GitHub live here and match the lucide stroke language.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="3" />
      <path d="M7.2 10.4v6.4" />
      <circle cx="7.2" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.2 16.8v-6.4" />
      <path d="M11.2 13.1c0-1.5 1-2.6 2.5-2.6s2.4 1 2.4 2.7v3.6" />
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9.2 20.4v-1.7c-2.6.5-3.3-1.2-3.3-1.2-.4-1-1-1.3-1-1.3-.9-.6 0-.6 0-.6.9.1 1.4 1 1.4 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.5-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.6 1a7.6 7.6 0 0 1 4 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.6.6.6 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.4.4.7 1 .7 2v2.4" />
    </svg>
  );
}
