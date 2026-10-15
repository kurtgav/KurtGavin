import { Shell, ContactSection } from "@/components/portfolio/Shared";
import Projects from "@/components/portfolio/Projects";

export default function WorkPage() {
  return (
    <Shell>
      <section className="wrap page-intro work-intro">
        <p className="eyebrow">PORTFOLIO / SELECTED PROJECTS</p>
        <h1>
          Built for the
          <br />
          <span className="serif">real world.</span>
        </h1>
        <p className="page-description">
          Enterprise software, market platforms and applied intelligence. Six
          confidential project areas, shared with respect for the work and the
          people behind it.
        </p>
      </section>
      <Projects />
      <ContactSection />
    </Shell>
  );
}
