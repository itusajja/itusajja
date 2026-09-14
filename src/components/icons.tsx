/**
 * Hand-drawn marks.
 *
 * lucide-react v1 dropped bundled brand icons, so every brand/decorative mark
 * used by the résumé lives here, drawn to match the source document's look.
 */

type IconProps = { className?: string };

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* ------------------------------- social ---------------------------------- */

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#0a66c2" />
      <path
        d="M7.1 10.2v7M7.1 7.1v.02M11.2 17.2v-7M11.2 13c0-1.6 1.1-2.8 2.7-2.8s2.6 1.1 2.6 2.9v4.1"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg {...stroke} className={className} strokeWidth={1.6}>
      <path d="M9.2 20.4v-1.7c-2.6.5-3.3-1.2-3.3-1.2-.4-1-1-1.3-1-1.3-.9-.6 0-.6 0-.6.9.1 1.4 1 1.4 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.5-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.6 1a7.6 7.6 0 0 1 4 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.6.6.6 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.4.4.7 1 .7 2v2.4" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#29a9e0" />
      <path
        d="M6.2 11.9l11-4.3c.5-.2.9.1.8.7l-1.6 8.6c-.1.6-.5.7-1 .4l-2.6-1.9-1.3 1.3c-.2.2-.4.3-.7.2l.2-3 5.4-4.9-6.6 4.1-2.4-.8c-.6-.2-.6-.6.1-.9z"
        fill="#fff"
      />
    </svg>
  );
}

export function GmailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2" y="5" width="20" height="14.5" rx="2.5" fill="#fff" />
      <path d="M3.5 6.5L12 13l8.5-6.5" fill="none" stroke="#ea4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 6.5v11M20.5 6.5v11" stroke="#4285f4" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M3.5 6.5L8 10M20.5 6.5L16 10" stroke="#ea4335" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M8 10v7.5M16 10v7.5" stroke="#fbbc04" strokeWidth="0" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#25d366" />
      <path
        d="M8.4 7.9c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.3 0 .5-.1.6l-.4.5c-.1.2-.2.4 0 .6.6 1 1.4 1.8 2.5 2.4.3.1.4.1.6-.1l.5-.5c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .8-.6 1.6-1.4 1.7-.7.1-1.4.1-2.1-.1-2.6-.8-4.6-2.6-5.7-5-.3-.7-.4-1.5-.2-2.2.1-.4.2-.8.4-1.1z"
        fill="#fff"
      />
      <path
        d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/* ------------------------------- logo ------------------------------------ */

/** The three overlapping orange circles from the top-left of the document. */
export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="30" cy="22" r="15" fill="#f2691d" />
      <circle cx="18" cy="38" r="13" fill="#ef5a10" />
      <circle cx="34" cy="42" r="14" fill="#f8821e" />
    </svg>
  );
}

/* ------------------------------- flags ----------------------------------- */

export function FlagIndonesia({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <clipPath id="flagid-clip">
        <circle cx="12" cy="12" r="11" />
      </clipPath>
      <g clipPath="url(#flagid-clip)">
        <rect x="0" y="0" width="24" height="12" fill="#e12529" />
        <rect x="0" y="12" width="24" height="12" fill="#ffffff" />
      </g>
      <circle cx="12" cy="12" r="11" fill="none" stroke="rgba(0,0,0,.12)" />
    </svg>
  );
}

export function FlagUnitedKingdom({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <clipPath id="flaggb-clip">
        <circle cx="12" cy="12" r="11" />
      </clipPath>
      <g clipPath="url(#flaggb-clip)">
        <rect width="24" height="24" fill="#0a2f6b" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="4" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#d0202f" strokeWidth="1.6" />
        <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="7" />
        <path d="M12 0v24M0 12h24" stroke="#d0202f" strokeWidth="3.6" />
      </g>
      <circle cx="12" cy="12" r="11" fill="none" stroke="rgba(0,0,0,.12)" />
    </svg>
  );
}

/* --------------------------- map watermark ------------------------------- */

/**
 * A simplified dotted silhouette of the Indonesian archipelago, used as the
 * low-opacity watermark behind the hero — mirroring the source document.
 * Landmasses are rough blobs; the dot grid supplies the texture.
 */
export function IndonesiaDotMap({ className }: IconProps) {
  return (
    <svg viewBox="0 0 600 240" className={className} aria-hidden="true">
      <defs>
        <pattern id="idmap-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.9" fill="currentColor" />
        </pattern>
        <mask id="idmap-mask">
          <g fill="#fff">
            {/* Sumatra */}
            <path d="M60 20 L120 60 L150 110 L130 130 L90 90 L55 45 Z" />
            {/* Java */}
            <path d="M150 150 L250 160 L260 175 L160 172 Z" />
            {/* Kalimantan / Borneo */}
            <path d="M180 40 L250 45 L270 100 L230 130 L185 105 Z" />
            {/* Sulawesi */}
            <path d="M300 60 L320 55 L325 95 L345 70 L355 80 L330 120 L310 130 L305 90 Z" />
            {/* Bali / Nusa Tenggara */}
            <path d="M275 165 L340 168 L345 178 L278 176 Z" />
            {/* Maluku */}
            <path d="M380 90 L395 85 L400 130 L385 135 Z" />
            {/* Papua */}
            <path d="M430 80 L520 90 L540 130 L470 140 L435 115 Z" />
          </g>
        </mask>
      </defs>
      <rect
        width="600"
        height="240"
        fill="url(#idmap-dots)"
        mask="url(#idmap-mask)"
      />
    </svg>
  );
}
