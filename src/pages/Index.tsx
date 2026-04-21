import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { artworks, exhibitionEvents } from "@/data/galleryData";
import LazyImage from "@/components/LazyImage";
import StaggerReveal from "@/components/StaggerReveal";
import FavouriteButton from "@/components/FavouriteButton";
import { useFavourites } from "@/hooks/FavouritesContext";

const availabilityOptions = ["All", "Available", "Reserved", "Sold"] as const;
const mediumOptions = ["All", ...new Set(artworks.map((artwork) => artwork.medium))] as const;
const artistOptions = ["All", ...new Set(artworks.map((artwork) => artwork.artist))] as const;

const Index = () => {
  const [selectedArtist, setSelectedArtist] = useState<(typeof artistOptions)[number]>("All");
  const [selectedMedium, setSelectedMedium] = useState<(typeof mediumOptions)[number]>("All");
  const [selectedAvailability, setSelectedAvailability] = useState<(typeof availabilityOptions)[number]>("All");
  const [showFavourites, setShowFavourites] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const { favourites } = useFavourites();

  const filteredWorks = useMemo(
    () =>
      artworks.filter((artwork) => {
        const byArtist = selectedArtist === "All" || artwork.artist === selectedArtist;
        const byMedium = selectedMedium === "All" || artwork.medium === selectedMedium;
        const byAvailability = selectedAvailability === "All" || artwork.availability === selectedAvailability;
        const byFavourite = !showFavourites || favourites.includes(artwork.id);
        return byArtist && byMedium && byAvailability && byFavourite;
      }),
    [selectedArtist, selectedMedium, selectedAvailability, showFavourites, favourites],
  );

  const currentEvents = exhibitionEvents.filter((event) => event.phase === "Current");
  const upcomingEvents = exhibitionEvents.filter((event) => event.phase === "Upcoming");
  const weeklyFeatures = artworks.slice(0, 4);

  useEffect(() => {
    document.title = "Contemporary Art Gallery | Exhibitions & Paintings";
  }, []);

  useEffect(() => {
    setIsFilterLoading(true);
    const timeout = setTimeout(() => setIsFilterLoading(false), 240);
    return () => clearTimeout(timeout);
  }, [selectedArtist, selectedMedium, selectedAvailability, showFavourites]);

  return (
    <main className="pb-20">
      <header className="sticky top-0 z-30 animate-fade-in border-b border-gallery-line/70 bg-background/85 backdrop-blur">
        <div className="gallery-shell flex h-20 items-center justify-between">
          <a href="#home" className="font-display text-2xl tracking-wide">
            AUREA GALLERY
          </a>
          <nav className="hidden gap-8 text-sm uppercase tracking-[0.18em] md:flex">
            <a href="#exhibitions" className="story-link transition-colors hover:text-primary">Exhibitions</a>
            <Link to="/collections" className="story-link transition-colors hover:text-primary">Collections</Link>
            <a href="#collection" className="story-link transition-colors hover:text-primary">Featured</a>
            <Link to="/explore" className="story-link transition-colors hover:text-primary">Explore</Link>
            <Link to="/favourites" className="story-link relative transition-colors hover:text-primary">
              Favourites
              {favourites.length > 0 && (
                <span className="absolute -right-3 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
                  {favourites.length}
                </span>
              )}
            </Link>
            <a href="#artists" className="story-link transition-colors hover:text-primary">Artists</a>
            <a href="#visit" className="story-link transition-colors hover:text-primary">Visit</a>
          </nav>
          <a href="/login" className="line-button">Login</a>
        </div>
      </header>

      <section id="home" className="gallery-shell grid min-h-[82vh] gap-10 pt-12 md:grid-cols-[1.1fr_0.9fr] md:pt-16">
        <div className="animate-fade-in space-y-8 self-end pb-6">
          <p className="editorial-kicker">New York · Paris · London</p>
          <h1 className="section-title max-w-2xl text-5xl md:text-7xl">
            A contemporary art gallery for unforgettable paintings and bold exhibitions.
          </h1>
          <p className="max-w-xl text-base text-muted-foreground md:text-lg">
            Discover museum-grade works from rising and established artists through curated presentations inspired by leading editorial gallery experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#collection" className="line-button">Explore collection</a>
            <a href="#exhibitions" className="line-button">Current exhibition</a>
          </div>
        </div>

        <figure className="painting-frame signature-hover animate-scale-in relative self-stretch overflow-hidden md:ml-auto md:max-w-[520px]">
          <LazyImage
            src={artworks[0].image}
            alt="Hero painting of a contemporary portrait in warm earth tones"
            width={1024}
            height={1280}
            className="h-full w-full object-cover md:animate-slow-pan"
          />
          <FavouriteButton artworkId={artworks[0].id} className="absolute right-6 top-6 z-10 h-12 w-12" />
        </figure>
      </section>

      <section id="immersive" className="animate-fade-in border-t border-gallery-line py-20">
        <div className="gallery-shell space-y-10">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="editorial-kicker">Image Focus</p>
              <h2 className="section-title mt-3">Inside the Collection</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Explore a visual-first selection of standout paintings curated for collectors and design-led interiors.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <StaggerReveal delay={40}>
              <Link to={`/artwork/${artworks[1].id}`} className="group block">
                <figure className="painting-frame hover-scale relative overflow-hidden">
                  <LazyImage
                    src={artworks[1].image}
                    alt={artworks[1].alt}
                    width={1024}
                    height={1280}
                    className="h-[620px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <FavouriteButton artworkId={artworks[1].id} className="absolute right-4 top-4 z-10" />
                </figure>
                <figcaption className="mt-3 flex items-center justify-between gap-4 border-b border-gallery-line pb-3">
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{artworks[1].title}</h3>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{artworks[1].artist}</p>
                  </div>
                  <span className="line-button">View</span>
                </figcaption>
              </Link>
            </StaggerReveal>

            <div className="grid gap-6">
              {[artworks[2], artworks[3]].map((work, index) => (
                <StaggerReveal key={work.id} delay={index * 100 + 120}>
                  <Link to={`/artwork/${work.id}`} className="group block">
                    <figure className="painting-frame hover-scale relative overflow-hidden">
                      <LazyImage
                        src={work.image}
                        alt={work.alt}
                        width={1024}
                        height={1280}
                        className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <FavouriteButton artworkId={work.id} className="absolute right-4 top-4 z-10" />
                    </figure>
                    <figcaption className="mt-3 border-b border-gallery-line pb-3">
                      <h3 className="font-display text-xl leading-tight">{work.title}</h3>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{work.medium}</p>
                    </figcaption>
                  </Link>
                </StaggerReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="weekly-feature" className="animate-fade-in border-t border-gallery-line py-20">
        <div className="gallery-shell space-y-10">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="editorial-kicker">Weekly Feature</p>
              <h2 className="section-title mt-3 text-5xl leading-[0.95] md:text-7xl">
                One featured painting every week.
              </h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              A rotating editorial spotlight with one selected work released each week for collectors and curators.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <StaggerReveal delay={40}>
              <Link to={`/artwork/${weeklyFeatures[0].id}`} className="group block">
                <figure className="painting-frame hover-scale relative overflow-hidden">
                  <LazyImage
                    src={weeklyFeatures[0].image}
                    alt={weeklyFeatures[0].alt}
                    width={1024}
                    height={1280}
                    className="h-[640px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <FavouriteButton artworkId={weeklyFeatures[0].id} className="absolute right-4 top-4 z-10" />
                </figure>
                <figcaption className="mt-3 border-b border-gallery-line pb-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Week 1</p>
                  <h3 className="font-display text-3xl leading-tight">{weeklyFeatures[0].title}</h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {weeklyFeatures[0].artist} · {weeklyFeatures[0].medium}
                  </p>
                </figcaption>
              </Link>
            </StaggerReveal>

            <div className="grid gap-6">
              {weeklyFeatures.slice(1).map((work, index) => (
                <StaggerReveal key={work.id} delay={index * 100 + 120}>
                  <Link to={`/artwork/${work.id}`} className="group block">
                    <figure className="painting-frame hover-scale relative overflow-hidden">
                      <LazyImage
                        src={work.image}
                        alt={work.alt}
                        width={1024}
                        height={1280}
                        className="h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <FavouriteButton artworkId={work.id} className="absolute right-4 top-4 z-10" />
                    </figure>
                    <figcaption className="mt-3 border-b border-gallery-line pb-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Week {index + 2}</p>
                      <h3 className="font-display text-2xl leading-tight">{work.title}</h3>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{work.artist}</p>
                    </figcaption>
                  </Link>
                </StaggerReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="exhibitions" className="gallery-shell animate-fade-in border-t border-gallery-line py-20">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="editorial-kicker">Event Timeline</p>
            <h2 className="section-title mt-3">Current & Upcoming Exhibitions</h2>
          </div>
          <p className="max-w-xl text-muted-foreground">
            A live schedule of openings, collector programs, and previews. RSVP to reserve your place at each event.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {[{ title: "Current", list: currentEvents }, { title: "Upcoming", list: upcomingEvents }].map((group) => (
            <div key={group.title} className="space-y-5 animate-fade-in">
              <h3 className="font-display text-2xl">{group.title}</h3>
              {group.list.map((event, index) => (
                <StaggerReveal key={event.id} delay={index * 90}>
                  <article className="border border-gallery-line bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-art">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    <h4 className="mt-2 font-display text-2xl leading-tight">{event.title}</h4>
                    <p className="mt-1 text-sm uppercase tracking-[0.16em] text-muted-foreground">{event.location}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{event.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link className="line-button" to={`/exhibitions/${event.id}`}>View details</Link>
                      <a
                        href={`mailto:rsvp@aureagallery.com?subject=${encodeURIComponent(`RSVP - ${event.title}`)}`}
                        className="line-button"
                      >
                        RSVP
                      </a>
                    </div>
                  </article>
                </StaggerReveal>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="collection" className="gallery-shell animate-fade-in space-y-10 pb-20">
        <div className="flex items-end justify-between gap-6 border-b border-gallery-line pb-4">
          <h2 className="section-title">Featured Paintings</h2>
          <a href="#visit" className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground md:inline-block">
            Request catalog
          </a>
        </div>

        <div className="grid gap-4 border border-gallery-line bg-card p-4 md:grid-cols-4 md:p-5">
          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Artist
            <select
              value={selectedArtist}
              onChange={(event) => setSelectedArtist(event.target.value as (typeof artistOptions)[number])}
              className="mt-2 h-10 w-full border border-gallery-line bg-background px-3 text-sm transition-all duration-300 focus:scale-[1.01] focus:ring-2 focus:ring-ring"
            >
              {artistOptions.map((artist) => (
                <option key={artist} value={artist}>
                  {artist}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Medium
            <select
              value={selectedMedium}
              onChange={(event) => setSelectedMedium(event.target.value as (typeof mediumOptions)[number])}
              className="mt-2 h-10 w-full border border-gallery-line bg-background px-3 text-sm transition-all duration-300 focus:scale-[1.01] focus:ring-2 focus:ring-ring"
            >
              {mediumOptions.map((medium) => (
                <option key={medium} value={medium}>
                  {medium}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Availability
            <select
              value={selectedAvailability}
              onChange={(event) => setSelectedAvailability(event.target.value as (typeof availabilityOptions)[number])}
              className="mt-2 h-10 w-full border border-gallery-line bg-background px-3 text-sm transition-all duration-300 focus:scale-[1.01] focus:ring-2 focus:ring-ring"
            >
              {availabilityOptions.map((availability) => (
                <option key={availability} value={availability}>
                  {availability}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Favourites
            <div className="mt-2 flex h-10 w-full items-center">
              <button
                onClick={() => setShowFavourites(!showFavourites)}
                className={`flex h-full w-full items-center justify-between border border-gallery-line px-3 text-sm transition-all duration-300 ${showFavourites ? "bg-primary text-primary-foreground" : "bg-background"
                  }`}
              >
                {showFavourites ? "Favourites Only" : "Show All"}
                <span className={`h-2 w-2 rounded-full ${showFavourites ? "bg-red-400" : "bg-gallery-line"}`} />
              </button>
            </div>
          </label>
        </div>

        <div className={`relative transition-all duration-300 ${isFilterLoading ? "pointer-events-none opacity-75" : "opacity-100"}`} aria-live="polite" aria-busy={isFilterLoading}>
          {isFilterLoading && (
            <p className="mb-4 animate-fade-in text-xs uppercase tracking-[0.2em] text-muted-foreground">Updating collection…</p>
          )}
          <div className="grid gap-8 md:grid-cols-2">
            {filteredWorks.map((work, index) => (
              <StaggerReveal key={work.id} delay={index * 80}>
                <article className="space-y-4">
                  <figure className="painting-frame signature-hover hover-scale relative">
                    <LazyImage
                      src={work.image}
                      alt={work.alt}
                      width={1024}
                      height={1280}
                      className="h-[520px] w-full object-cover md:h-[620px]"
                    />
                    <FavouriteButton artworkId={work.id} className="absolute right-4 top-4 z-10" />
                  </figure>
                  <div className="flex items-start justify-between gap-4 border-b border-gallery-line pb-4">
                    <div>
                      <h3 className="font-display text-2xl">{work.title}, {work.year}</h3>
                      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{work.artist}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{work.medium} · {work.availability}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link className="line-button" to={`/artwork/${work.id}`}>Details</Link>
                      <a
                        className="line-button"
                        href={`mailto:inquiries@aureagallery.com?subject=${encodeURIComponent(`Inquiry - ${work.title}`)}`}
                      >
                        Inquire
                      </a>
                    </div>
                  </div>
                </article>
              </StaggerReveal>
            ))}
          </div>
        </div>

        {filteredWorks.length === 0 && (
          <p className="animate-fade-in border border-gallery-line bg-card p-6 text-center text-muted-foreground">
            No artworks match the selected filters.
          </p>
        )}
      </section>

      <section id="artists" className="gallery-shell animate-fade-in border-y border-gallery-line py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <h2 className="section-title md:col-span-1">Artists</h2>
          <div className="md:col-span-2 grid gap-6 text-lg text-muted-foreground md:grid-cols-2">
            {[
              "Cinga Samson",
              "Mara K. Adebayo",
              "Helene Strauss",
              "Elias Morrow",
              "Jonah Ike",
              "Lucia Verdier",
            ].map((name) => (
              <p key={name} className="story-link border-b border-gallery-line py-3 transition-colors hover:text-foreground">{name}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="gallery-shell animate-fade-in grid gap-10 py-20 md:grid-cols-[1fr_1fr]">
        <div className="space-y-5 animate-fade-in">
          <p className="editorial-kicker">Visit</p>
          <h2 className="section-title">Plan your gallery visit</h2>
          <p className="max-w-lg text-muted-foreground">
            545 West 22nd Street, New York · Tue–Sat, 10:00–18:00.
            Private viewings and curatorial tours are available by appointment.
          </p>
        </div>
        <form className="hover-scale animate-scale-in space-y-4 border border-gallery-line bg-card p-6 shadow-art">
          <label className="block text-sm uppercase tracking-[0.16em] text-muted-foreground" htmlFor="email">
            Receive exhibition updates
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@email.com"
            className="h-11 w-full border border-gallery-line bg-background px-4 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button type="submit" className="line-button w-full justify-center">Subscribe</button>
        </form>
      </section>

      <footer className="gallery-shell animate-fade-in border-t border-gallery-line pt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        © 2026 Aurea Gallery · Exhibitions · Collection · Contact
      </footer>
    </main>
  );
};

export default Index;
