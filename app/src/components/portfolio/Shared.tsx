import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { experience, stack } from "@/data/portfolio";
import Header from "./Header";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
export function SectionHeading({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          {index} / {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="status-dot" /> CTO · ENGINEER · DESIGNER
        </p>
        <p className="eyebrow">
          BASED IN THE PHILIPPINES <span className="tiny-sun">✳</span>
        </p>
      </div>
      <h1>
        I turn complex ideas
        <br />
        into <span className="serif">working</span>{" "}
        <span className="outlined">systems.</span>
      </h1>
      <div className="hero-bottom">
        <div className="hero-intro">
          <span className="asterisk" aria-hidden="true">
            ✳
          </span>
          <p>
            I’m Kurt Gavin. I bring design, full-stack engineering and applied
            AI together to build software with a purpose.
          </p>
          <Link className="button primary" href="/work">
            Explore my work <ArrowUpRight size={18} />
          </Link>
          <a
            className="current-role"
            href="https://thirdcodesolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="status-dot" /> Currently CTO at Third Code
            Solutions <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="hero-photo">
          <img
            src="/journal/zero-to-agent.jpg"
            width="1600"
            height="898"
            alt="Kurt collaborating on a laptop demo at Zero to Agent."
            fetchPriority="high"
          />
          <div className="photo-tag">
            <span>IN THE ROOM. IN THE BUILD.</span>
            <span>01 / FIELD NOTES</span>
          </div>
          <a
            href="#journal"
            className="photo-link"
            aria-label="Explore field notes"
          >
            <ArrowDown size={22} />
          </a>
        </div>
      </div>
      <div className="hero-foot">
        <span>DESIGN THINKING. ENGINEERING DISCIPLINE.</span>
        <a href="#selected-work">
          SCROLL TO EXPLORE <ArrowDown size={12} />
        </a>
      </div>
    </section>
  );
}
export function Intro() {
  return (
    <section className="intro wrap section">
      <p className="eyebrow">A LITTLE CONTEXT</p>
      <div>
        <h2>
          Good software starts with
          <br />
          <span className="serif">understanding the problem.</span>
        </h2>
        <div className="intro-bottom">
          <p>
            From construction ERP and independent accounting to AI initiatives
            and market platforms, my work sits where business needs meet
            thoughtful interfaces and dependable engineering.
          </p>
          <Link className="text-link" href="/about">
            More about me <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Experience() {
  return (
    <section className="wrap section" id="experience">
      <SectionHeading
        index="02"
        label="THE JOURNEY"
        title="Design to code. Code to leadership."
      />
      <div className="experience-list">
        {experience.map((item, i) => (
          <article className="experience-row" key={item.role}>
            <span className="eyebrow">{item.period}</span>
            <div>
              <h3>{item.role}</h3>
              <p>{item.description}</p>
            </div>
            {item.href ? (
              <a
                className="text-link"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.context} <ArrowUpRight size={16} />
              </a>
            ) : (
              <span className="experience-context">{item.context}</span>
            )}
            <span className="row-number">0{i + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
export function TechStack() {
  return (
    <section className="stack-section" id="stack">
      <div className="wrap section">
        <SectionHeading
          index="03"
          label="TOOLS OF THE TRADE"
          title="The right tools. For the real problem."
        >
          <p>
            A toolkit across the interface, the infrastructure and the
            intelligence in between.
          </p>
        </SectionHeading>
        <div className="stack-grid">
          {stack.map((group, i) => (
            <article key={group.title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ContactSection({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";
  return (
    <section className={`contact-section ${page ? "contact-page" : ""}`}>
      <div className="wrap">
        <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
        <div className="contact-title">
          <Heading>
            Let’s make
            <br />
            <span className="serif">something matter.</span>
          </Heading>
          <a
            href="mailto:kurtgavin.design@gmail.com"
            className="contact-circle"
            aria-label="Email Kurt Gavin"
          >
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="contact-bottom">
          <a className="email-link" href="mailto:kurtgavin.design@gmail.com">
            kurtgavin.design@gmail.com
          </a>
          <p>
            For projects, collaboration
            <br />
            and good conversations.
          </p>
        </div>
        {page && (
          <div className="contact-details">
            <div>
              <p className="eyebrow">LOCATION</p>
              <p>Philippines · UTC+8</p>
            </div>
            <div>
              <p className="eyebrow">PHONE</p>
              <a href="tel:+639629165786">+63 962 916 5786</a>
            </div>
            <div>
              <p className="eyebrow">ELSEWHERE</p>
              <a
                href="https://www.linkedin.com/in/kurtgavin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>{" "}
              /{" "}
              <a
                href="https://github.com/kurtgav"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer wrap">
      <Link href="/" className="wordmark">
        kurt gavin
        <span className="wordmark-dot" aria-hidden="true">
          ✳
        </span>
      </Link>
      <p>© {new Date().getFullYear()} Kurt Gavin</p>
      <div>
        <a
          href="https://www.linkedin.com/in/kurtgavin/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn <ArrowUpRight size={13} />
        </a>
        <a
          href="https://github.com/kurtgav"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight size={13} />
        </a>
      </div>
      <a href="#main" className="back-top">
        Back to top ↑
      </a>
    </footer>
  );
}
