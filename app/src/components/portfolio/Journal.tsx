"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { journal } from "@/data/portfolio";
import { SectionHeading } from "./Shared";

export default function Journal() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  function showPhoto(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }
  const photo = journal[selected];
  return (
    <section className="journal-section" id="journal">
      <div className="wrap section">
        <SectionHeading
          index="04"
          label="FIELD NOTES"
          title="Beyond the screen."
        >
          <p>
            Building, presenting and learning with people.
            <br />A few moments along the way.
          </p>
        </SectionHeading>
        <div className="journal-grid">
          {journal.map((entry, index) => (
            <article
              key={entry.image}
              className={index < 2 ? "journal-card wide" : "journal-card"}
            >
              <button
                className="journal-image"
                onClick={() => showPhoto(index)}
                aria-label={`View photo: ${entry.title}`}
              >
                <img
                  src={entry.image}
                  alt={entry.alt}
                  loading="lazy"
                  width={index < 2 ? 1600 : 1000}
                  height={index < 2 ? 898 : 1778}
                  style={{ objectPosition: entry.position }}
                />
                <span className="expand-photo">
                  <ArrowUpRight size={18} />
                </span>
              </button>
              <p className="eyebrow">{entry.label}</p>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </article>
          ))}
        </div>
        <dialog
          ref={dialog}
          className="photo-dialog"
          aria-labelledby="photo-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <div className="dialog-inner">
            <button
              className="icon-button close-photo"
              onClick={() => dialog.current?.close()}
              aria-label="Close photo"
            >
              <X />
            </button>
            <img src={photo.image} alt={photo.alt} />
            <div className="dialog-caption">
              <p className="eyebrow">{photo.label}</p>
              <h3 id="photo-title">{photo.title}</h3>
              <p>{photo.description}</p>
            </div>
          </div>
        </dialog>
      </div>
    </section>
  );
}
