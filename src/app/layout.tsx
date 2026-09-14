import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/sora";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SplashProvider } from "@/components/SplashScreen";
import { Shell } from "@/components/Shell";
import { resume } from "@/data/resume";

// Fonts are self-hosted from node_modules (see imports above) rather than
// fetched from Google Fonts at build time — keeps builds offline-safe and
// avoids a render-blocking third-party request.

export const metadata: Metadata = {
  title: `${resume.name} — Résumé`,
  description: `${resume.headline}. ${resume.intro[0]}`,
  applicationName: `${resume.name} — Résumé`,
  authors: [{ name: resume.name }],
  creator: resume.name,
  keywords: [
    resume.name,
    resume.headline,
    "résumé",
    "resume",
    "CV",
    "fullstack developer",
    "graphic designer",
    ...resume.skills.map((s) => s.label),
  ],
  openGraph: {
    title: `${resume.name} — Résumé`,
    description: `${resume.headline}. ${resume.intro[0]}`,
    type: "profile",
    siteName: `${resume.name} — Résumé`,
  },
  twitter: {
    card: "summary",
    title: `${resume.name} — Résumé`,
    description: `${resume.headline}. ${resume.intro[0]}`,
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="font-sans"
    >
      <body className="min-h-dvh antialiased">
        {/* Without JS the reveal animations never fire, so force content visible. */}
        <noscript>
          <style>{`
            [style*="opacity: 0"], [style*="opacity:0"] {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
            .splash-root { display: none !important; }
            html.splash-lock, html.splash-lock body {
              overflow: visible !important; height: auto !important;
            }
          `}</style>
        </noscript>

        <ThemeProvider>
          <SplashProvider>
            <Shell>{children}</Shell>
          </SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
