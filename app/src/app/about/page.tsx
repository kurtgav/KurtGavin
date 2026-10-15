import {
  Shell,
  Experience,
  TechStack,
  ContactSection,
} from "@/components/portfolio/Shared";
import Journal from "@/components/portfolio/Journal";

export default function AboutPage() {
  return (
    <Shell>
      <section className="wrap page-intro">
        <p className="eyebrow">THE PERSON BEHIND THE BUILD</p>
        <h1>
          A designer’s eye.
          <br />
          An engineer’s <span className="serif">mind.</span>
        </h1>
        <div className="about-intro">
          <img
            src="/journal/aws.jpg"
            alt="Kurt Gavin beside an AWS sign at a technology event venue."
            width="1000"
            height="1778"
          />
          <div>
            <p className="eyebrow">KURT GAVIN / PHILIPPINES</p>
            <h2>
              I connect the big picture
              <br />
              to the smallest details.
            </h2>
            <p>
              I’m a technology leader, software engineer and designer based in
              the Philippines. My path started in UI/UX design and development,
              grew into full-stack software engineering, and expanded into
              applied AI.
            </p>
            <p>
              Today, I’m CTO at{" "}
              <a
                href="https://thirdcodesolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Third Code Solutions Inc.
              </a>{" "}
              My work combines technical direction with the hands-on perspective
              of someone who designs and builds.
            </p>
            <p>
              I care about software that makes complex work easier to
              understand. Outside the build, you’ll find me at developer events,
              collaborating on demos and learning from the people shaping what
              comes next.
            </p>
          </div>
        </div>
      </section>
      <Experience />
      <TechStack />
      <Journal />
      <ContactSection />
    </Shell>
  );
}
