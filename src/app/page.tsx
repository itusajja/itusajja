import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Languages } from "@/components/sections/Languages";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";

/**
 * The résumé, mirroring the source document's arrangement:
 * full-width header block, then a two-column body —
 *   left  : Skills · Languages · Education History
 *   right : Work Experience
 * On mobile the experience column leads (order-1), then the left column.
 */
export default function Home() {
  return (
    <div className="pt-20">
      <Hero />

      <div className="mx-auto grid w-full max-w-5xl gap-x-12 gap-y-12 px-5 pb-6 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16">
        {/* left column */}
        <div className="order-2 space-y-11 lg:order-1">
          <Skills />
          <Languages />
          <Education />
        </div>

        {/* right column */}
        <div className="order-1 space-y-11 lg:order-2">
          <Experience />
        </div>
      </div>

      <Footer />
    </div>
  );
}
