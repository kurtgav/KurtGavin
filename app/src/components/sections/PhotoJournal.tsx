import { journal } from '@/data/portfolio';

export default function PhotoJournal() {
  return (
    <section id="journal" className="section py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-24 bg-bg">
      <div className="max-w-[1600px] mx-auto">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-body mb-4">Community &amp; events</p>
        <h2 className="text-fg font-display font-[450] leading-[1.1] tracking-[-0.03em] mb-12 sm:mb-16" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>Building, sharing &amp; learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {journal.map((entry, index) => (
            <figure key={entry.image} className="journal-entry min-w-0">
              <a href={entry.image} target="_blank" rel="noopener noreferrer" aria-label={`Open full photo in a new tab: ${entry.title}`} className="block rounded-sm overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4">
                <img src={entry.image} alt={entry.alt} loading="lazy" width={index < 2 ? 1600 : 900} height={index < 2 ? 898 : 1600} className={`w-full object-cover ${index < 2 ? 'aspect-[16/10]' : 'aspect-[3/4]'}`} style={{ objectPosition: entry.position }} />
              </a>
              <figcaption className="mt-5 sm:mt-6">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted font-body mb-3">{entry.label}</p>
                <h3 className="text-xl sm:text-2xl font-display text-fg leading-[1.2] mb-3">{entry.title}</h3>
                <p className="text-sm sm:text-[15px] text-fg/70 font-body leading-[1.8] max-w-xl">{entry.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
