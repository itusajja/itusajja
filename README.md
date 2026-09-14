# Achmad Zainul Arianto — Online Résumé

The PDF résumé rebuilt as a professional website: a splash-screen intro, a
scroll-animated document, and dark/light theming — with all copy kept in one
data file so it can be made to match the PDF exactly.

## Status

> **Content is placeholder.** Layout, animation, theming and the splash screen
> are complete. The source PDF has not yet been available in this workspace, so
> every string on the page is a `[bracketed]` placeholder rendered with a dashed
> underline. Dropping the real copy into `src/data/resume.ts` replaces all of it
> — no component changes needed.

## Stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)        |
| Language       | TypeScript (strict)                       |
| Styling        | Tailwind CSS v4 + CSS custom properties   |
| Animation      | Framer Motion 13                          |
| Theming        | next-themes (class strategy)              |
| Icons          | lucide-react + hand-drawn brand marks     |
| Fonts          | Self-hosted variable fonts (Inter, Sora, JetBrains Mono) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run lint                 # eslint
npx tsc --noEmit             # type check
```

## How it works

### Splash screen — `src/components/SplashScreen.tsx`

- Monogram ring draws itself via `stroke-dashoffset`, then the name reveals
  letter-by-letter from behind a mask.
- The progress bar tracks **real** page load: a `requestAnimationFrame` loop
  eases toward 92% and only completes once `window.load` has fired *and* a
  minimum on-screen time has elapsed (2.4s), with a 7s hard cap so nobody is
  ever trapped behind the overlay.
- Progress lives in a `MotionValue`, so the fill and the percentage read-out
  update with **zero React re-renders** per frame.
- Exit is a two-panel curtain split on a `cubic-bezier(.76,0,.24,1)` curve,
  with the content blurring out first.
- Scrolling is locked while it is on stage (`html.splash-lock`).

### The ready gate — `SplashProvider` / `useSplashReady()`

Every entrance animation is gated on this flag. Without it, `whileInView`
animations would fire *behind* the still-closed overlay and be finished by the
time the curtains opened. `src/components/Reveal.tsx` combines the flag with
`useInView` so reveals play only once the page is actually on stage.

### Editing the content — `src/data/resume.ts`

One typed object drives the entire page:

```
name · headline · tagline · contacts[]
summary[] · highlights[]
experience[]  → role, company, location, dates, bullets[], stack[]
education[]   → degree, school, dates, grade, details[]
skills[]      → { title, rated[{name, level}] } or { title, items[] }
projects[] · certifications[] · languages[] · interests[]
```

Optional arrays render nothing when empty — delete a section from the data and
it disappears from the page and the nav.

`sections` at the bottom of the file controls the sticky-nav order.

### Theming

Colours are CSS custom properties on `:root` / `.dark` (in
`src/app/globals.css`) exposed to Tailwind through `@theme inline`. To match the
PDF's palette exactly, change the values on `--accent`, `--paper`, `--ink` and
friends — nothing else needs touching.

### Accessibility & performance

- `prefers-reduced-motion` collapses all animation to instant opacity changes.
- A `<noscript>` block force-reveals content if JavaScript is unavailable.
- Fonts are self-hosted from npm: no render-blocking third-party request, and
  builds work offline.
- Print stylesheet collapses the page back to a clean A4 document
  (`Ctrl/Cmd + P`), hiding the nav, splash and scaffold notice.

## Layout

```
src/
├── app/
│   ├── layout.tsx        fonts, metadata, providers, shell
│   ├── page.tsx          the sheet: header + two-column body + footer
│   └── globals.css       design tokens, base, utilities, print
├── components/
│   ├── SplashScreen.tsx  intro + ready-gate provider
│   ├── Shell.tsx         nav + gated document entrance
│   ├── Nav.tsx           sticky bar, scroll progress, active pill
│   ├── ThemeToggle.tsx   dark/light switch
│   ├── Reveal.tsx        Reveal / RevealGroup / RevealItem / MaskLine
│   ├── SectionHeading.tsx eyebrow + masked title + self-drawing rule
│   ├── PendingNotice.tsx temporary scaffold notice (delete when filled in)
│   ├── Ph.tsx            renders [placeholders] with a dashed underline
│   ├── Footer.tsx
│   ├── icons.tsx         LinkedIn / GitHub marks
│   └── sections/         Hero · About · Experience · Projects
│                         Skills · Education · Credentials
├── data/resume.ts        ← ALL CONTENT LIVES HERE
└── lib/                  cn(), useMounted(), useScrolled()
```
