import { Link, useParams } from "react-router-dom";
import { exhibitionEvents } from "@/data/galleryData";

const ExhibitionDetail = () => {
  const { id } = useParams();
  const exhibition = exhibitionEvents.find((event) => event.id === id);

  if (!exhibition) {
    return (
      <main className="gallery-shell animate-fade-in py-20">
        <h1 className="section-title animate-scale-in">Exhibition not found</h1>
        <p className="mt-4 text-muted-foreground">This exhibition page is unavailable.</p>
        <Link to="/#exhibitions" className="line-button mt-8">
          Back to exhibitions
        </Link>
      </main>
    );
  }

  return (
    <main className="gallery-shell animate-fade-in py-12 md:py-16">
      <Link to="/#exhibitions" className="editorial-kicker story-link">
        ← Back to exhibitions
      </Link>

      <section className="mt-6 grid gap-8 border border-gallery-line bg-card p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
        <div className="space-y-5">
          <p className="editorial-kicker">Exhibition Detail</p>
          <h1 className="section-title text-4xl md:text-5xl">{exhibition.title}</h1>
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
            {new Date(exhibition.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {exhibition.location}
          </p>
          <p className="max-w-2xl text-muted-foreground">{exhibition.summary}</p>
          <a
            href={`mailto:rsvp@aureagallery.com?subject=${encodeURIComponent(`RSVP - ${exhibition.title}`)}`}
            className="line-button"
          >
            RSVP for this event
          </a>
        </div>

        <div className="overflow-hidden border border-gallery-line bg-background">
          <iframe
            title={`${exhibition.location} map`}
            src={exhibition.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full"
          />
        </div>
      </section>

      <section className="mt-10 grid gap-10 md:grid-cols-2">
        <article className="animate-enter space-y-5 border border-gallery-line bg-card p-6">
          <h2 className="font-display text-3xl">Program Schedule</h2>
          <ol className="space-y-5">
            {exhibition.program.map((item, index) => (
              <li key={`${item.time}-${item.title}`} className="relative pl-10">
                <span className="absolute left-[0.55rem] top-[0.45rem] h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
                {index < exhibition.program.length - 1 && (
                  <span className="absolute left-[0.86rem] top-4 h-[calc(100%+0.8rem)] w-px origin-top animate-[scale-in_0.5s_ease-out] bg-gallery-line" aria-hidden="true" />
                )}
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.time}</p>
                <h3 className="mt-1 text-xl leading-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="animate-enter space-y-5 border border-gallery-line bg-card p-6">
          <h2 className="font-display text-3xl">Featured Speakers</h2>
          <ul className="space-y-5">
            {exhibition.speakers.map((speaker, index) => (
              <li key={speaker.name} className="relative pl-10">
                <span className="absolute left-[0.45rem] top-[0.45rem] h-4 w-4 rounded-full border border-primary/50 bg-background" aria-hidden="true" />
                <span className="absolute left-[0.7rem] top-[0.7rem] h-2 w-2 rounded-full bg-primary pulse" aria-hidden="true" />
                {index < exhibition.speakers.length - 1 && (
                  <span className="absolute left-[0.86rem] top-5 h-[calc(100%+0.7rem)] w-px origin-top animate-[scale-in_0.5s_ease-out] bg-gallery-line" aria-hidden="true" />
                )}
                <h3 className="text-xl leading-tight">{speaker.name}</h3>
                <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">{speaker.role}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
};

export default ExhibitionDetail;