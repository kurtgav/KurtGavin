"use client";

import { useState } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "./Shared";

const filters = [
  "All work",
  "Enterprise systems",
  "Market platforms",
  "AI & intelligence",
];
export default function Projects() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  return (
    <section className="wrap section projects" id="selected-work">
      <SectionHeading
        index="01"
        label="SELECTED WORK"
        title="Complex challenges. Purposeful builds."
      >
        <p>
          A selection of confidential projects.
          <br />
          The work is real. The details stay private.
        </p>
      </SectionHeading>
      <div className="project-toolbar">
        <div className="filters" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
              {item === "All work" && <span>06</span>}
            </button>
          ))}
        </div>
        <span className="project-count" aria-live="polite">
          {visible.length} projects
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article className="project-card" key={project.number}>
            <div className={`project-art ${project.color}`} aria-hidden="true">
              <div className="art-top">
                <span>CONFIDENTIAL / {project.number}</span>
                <LockKeyhole size={15} />
              </div>
              <div className="art-grid" />
              <span className="art-mark">{project.mark}</span>
              <span className="art-label">{project.focus}</span>
              <div className="art-orbit" />
            </div>
            <div className="project-meta">
              <span>{project.category}</span>
              <span>
                <LockKeyhole size={11} /> NDA
              </span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <details>
              <summary>
                Project overview <span aria-hidden="true">+</span>
              </summary>
              <div>
                <p>
                  {project.focus}. Shared here as an anonymized overview of my
                  work. Client names, source code, screenshots and
                  implementation details are not public.
                </p>
                <a
                  href="mailto:kurtgavin.design@gmail.com"
                  className="text-link"
                >
                  Discuss a similar challenge <ArrowUpRight size={14} />
                </a>
              </div>
            </details>
          </article>
        ))}
      </div>
      <div className="nda-note">
        <LockKeyhole size={17} />
        <p>
          Confidential by design. All six projects are under NDA. No client
          identities, private repositories or proprietary product details are
          disclosed.
        </p>
      </div>
    </section>
  );
}
