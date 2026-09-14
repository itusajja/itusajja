import { PendingNotice } from "@/components/PendingNotice";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Credentials } from "@/components/sections/Credentials";

/**
 * The résumé, rendered as a single "sheet" that mirrors the PDF page:
 * header block across the top, then a two-column body — main column first in
 * the DOM (so it leads on mobile), sidebar pulled to the left on desktop.
 */
export default function Home() {
  return (
    <div className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
      <PendingNotice />

      <div className="sheet mx-auto w-full max-w-5xl overflow-hidden rounded-2xl">
        <Hero />

        <div className="grid lg:grid-cols-12">
          {/* main column */}
          <div className="order-1 space-y-13 px-6 py-10 sm:px-10 lg:order-2 lg:col-span-8 lg:px-12 lg:py-12">
            <About />
            <Experience />
            <Projects />
          </div>

          {/* sidebar */}
          <aside className="order-2 space-y-10 border-t border-[var(--line)] bg-[var(--paper-raised)]/45 px-6 py-10 sm:px-8 lg:order-1 lg:col-span-4 lg:border-t-0 lg:border-r lg:py-12">
            <Skills />
            <Education />
            <Credentials />
          </aside>
        </div>

        <Footer />
      </div>
    </div>
  );
}
