# Achmad Zainul Arianto — Online Résumé

The résumé PDF rebuilt as a professional website: a splash-screen intro, a
scroll-animated document, and dark/light theming — with layout, palette and
copy matched to the source document.

## Fidelity to the source

Content is transcribed **verbatim** from the supplied résumé image into
`src/data/resume.ts`: name, headline, availability badge, all five contact
handles, greeting, both intro paragraphs, six skills with bar levels, two
languages, four education entries, five work-experience entries with every
bullet, and the "updated on aug 2025" footer pill.

The visual language mirrors the document:

- periwinkle page (`#ccd9f2`) with a soft vertical wash
- navy (`#1b2c90`) serif section headings, name and timeline nodes
- secondary blue (`#2e7fd2`) for the headline, companies, subtitles and links
- orange (`#f2691d`) for the triple-circle logo and the OPEN TO WORK badge
- white rounded contact pill; light-blue rounded boxes for italic bullets
- dotted Indonesian-archipelago watermark behind the portrait
- two-column body: Skills · Languages · Education History | Work Experience

**One known gap:** the headshot. The source arrived as an inline screenshot,
which cannot be saved to disk, so the portrait renders as an initials monogram.
Drop the photo at `public/avatar.jpg` and set `photo: "/avatar.jpg"` in
`src/data/resume.ts` — the `<img>` path already exists in `Hero.tsx`.

## Stack

| Concern   | Choice                                            |
| --------- | ------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack)                 |
| Language  | TypeScript (strict)                                |
| Styling   | Tailwind CSS v4 + CSS custom properties            |
| Animation | Framer Motion 13                                   |
| Theming   | Custom ThemeProvider (class strategy, FOUC-free)   |
| Icons     | lucide-react + hand-drawn brand/flag/logo marks    |
| Fonts     | Self-hosted variable fonts (Inter, Sora, JetBrains Mono) |

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

- Logo ring draws via `stroke-dashoffset`, then the name reveals letter-by-letter
  from behind a mask.
- Progress tracks **real** load: an rAF loop eases toward 92% and completes only
  once `window.load` fires *and* a 2.4s minimum has elapsed, with a 7s hard cap
  so no visitor is trapped behind the overlay.
- Progress lives in a `MotionValue`, so the fill and percentage update with
  **zero React re-renders** per frame.
- Exit is a two-panel curtain split on `cubic-bezier(.76,0,.24,1)`.
- Scrolling is locked while on stage (`html.splash-lock`).

### The ready gate — `SplashProvider` / `useSplashReady()`

Every entrance animation waits for this flag, otherwise `whileInView`
animations fire *behind* the closed overlay and are finished by the time the
curtains open. `src/components/Reveal.tsx` combines it with `useInView`.

### Editing the content — `src/data/resume.ts`

One typed object drives the page: contacts, greeting, intro, skills (with bar
levels), languages, education, experience, availability and footer text.

### Theming

Colours are CSS custom properties on `:root` / `.dark` in
`src/app/globals.css`, exposed to Tailwind via `@theme inline`. Dark mode is a
deep-navy reinterpretation of the same palette.

### Accessibility & performance

- `prefers-reduced-motion` collapses all animation to instant opacity changes
- `<noscript>` force-reveals content if JavaScript is unavailable
- Fonts self-hosted from npm: no render-blocking third-party request
- Print stylesheet flattens the periwinkle theme to print-safe values
  (`Ctrl/Cmd + P`)

## Layout

```
src/
├── app/
│   ├── layout.tsx        fonts, metadata, providers, shell
│   ├── page.tsx          header + two-column body + footer pill
│   └── globals.css       design tokens, base, utilities, print
├── components/
│   ├── SplashScreen.tsx  intro + ready-gate provider
│   ├── Shell.tsx         gated document entrance + floating theme switch
│   ├── ThemeToggle.tsx   dark/light switch
│   ├── Reveal.tsx        Reveal / RevealGroup / RevealItem / MaskLine
│   ├── SectionTitle.tsx  navy serif heading with drawing underline
│   ├── Footer.tsx        "updated on …" pill
│   ├── icons.tsx         logo, social marks, flags, dotted map
│   └── sections/         Hero · Skills · Languages · Education · Experience
├── data/resume.ts        ← ALL CONTENT LIVES HERE
└── lib/                  cn(), useMounted(), useScrolled()
```
