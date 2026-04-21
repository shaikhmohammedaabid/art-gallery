import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/LazyImage";
import { Input } from "@/components/ui/input";
import { artworks } from "@/data/galleryData";
import FavouriteButton from "@/components/FavouriteButton";
import { useFavourites } from "@/hooks/FavouritesContext";

const availabilityOptions = ["All", "Available", "Reserved", "Sold"] as const;
const mediumOptions = ["All", ...new Set(artworks.map((artwork) => artwork.medium))] as const;
const artistOptions = ["All", ...new Set(artworks.map((artwork) => artwork.artist))] as const;
const ITEMS_PER_BATCH = 6;

const Explore = () => {
  const [query, setQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<(typeof artistOptions)[number]>("All");
  const [selectedMedium, setSelectedMedium] = useState<(typeof mediumOptions)[number]>("All");
  const [selectedAvailability, setSelectedAvailability] = useState<(typeof availabilityOptions)[number]>("All");
  const [showFavourites, setShowFavourites] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { favourites } = useFavourites();

  const filteredWorks = useMemo(
    () =>
      artworks.filter((artwork) => {
        const searchText = `${artwork.title} ${artwork.artist} ${artwork.medium} ${artwork.year}`.toLowerCase();
        const matchesQuery = searchText.includes(query.trim().toLowerCase());
        const byArtist = selectedArtist === "All" || artwork.artist === selectedArtist;
        const byMedium = selectedMedium === "All" || artwork.medium === selectedMedium;
        const byAvailability = selectedAvailability === "All" || artwork.availability === selectedAvailability;
        const byFavourite = !showFavourites || favourites.includes(artwork.id);

        return matchesQuery && byArtist && byMedium && byAvailability && byFavourite;
      }),
    [query, selectedArtist, selectedMedium, selectedAvailability, showFavourites, favourites],
  );

  const visibleWorks = filteredWorks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredWorks.length;

  useEffect(() => {
    document.title = "Explore Artworks | Aurea Gallery";
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [query, selectedArtist, selectedMedium, selectedAvailability, showFavourites]);

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((current) => Math.min(current + ITEMS_PER_BATCH, filteredWorks.length));
        }
      },
      { rootMargin: "180px" },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, filteredWorks.length]);

  return (
    <main className="pb-20">
      <header className="sticky top-0 z-30 border-b border-gallery-line/70 bg-background/85 backdrop-blur">
        <div className="gallery-shell flex h-20 items-center justify-between gap-4">
          <Link to="/" className="font-display text-2xl tracking-wide">
            AUREA GALLERY
          </Link>
          <Link to="/collections" className="story-link hidden items-center text-sm uppercase tracking-[0.18em] md:flex">
            Collections
          </Link>
          <Link to="/favourites" className="story-link hidden items-center text-sm uppercase tracking-[0.18em] md:flex">
            Favourites
          </Link>
          <Link to="/" className="line-button">
            Back home
          </Link>
        </div>
      </header>

      <section className="gallery-shell space-y-10 pt-12 md:pt-16">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="editorial-kicker">Explore</p>
            <h1 className="section-title mt-3">Search the collection</h1>
          </div>
          <p className="max-w-xl text-muted-foreground">
            Find artworks by title, artist, medium, and availability with a continuously loaded browsing experience.
          </p>
        </div>

        <div className="grid gap-4 border border-gallery-line bg-card p-4 md:grid-cols-5 md:p-5">
          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground md:col-span-4">
            Search
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, artist, medium, or year"
              className="mt-2 border-gallery-line bg-background"
            />
          </label>

          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Artist
            <select
              value={selectedArtist}
              onChange={(event) => setSelectedArtist(event.target.value as (typeof artistOptions)[number])}
              className="mt-2 h-10 w-full border border-gallery-line bg-background px-3 text-sm focus:ring-2 focus:ring-ring"
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
              className="mt-2 h-10 w-full border border-gallery-line bg-background px-3 text-sm focus:ring-2 focus:ring-ring"
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
              className="mt-2 h-10 w-full border border-gallery-line bg-background px-3 text-sm focus:ring-2 focus:ring-ring"
            >
              {availabilityOptions.map((availability) => (
                <option key={availability} value={availability}>
                  {availability}
                </option>
              ))}
            </select>
          </label>

          <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Favourites
            <div className="mt-2 flex h-10 w-full items-center">
              <button
                onClick={() => setShowFavourites(!showFavourites)}
                className={`flex h-full w-full items-center justify-between border border-gallery-line px-3 text-sm transition-all duration-300 ${
                  showFavourites ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                {showFavourites ? "Favourites Only" : "Show All"}
                <span className={`h-2 w-2 rounded-full ${showFavourites ? "bg-red-400" : "bg-gallery-line"}`} />
              </button>
            </div>
          </div>

          <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Results
            <p className="mt-3 text-sm normal-case tracking-normal text-foreground">{filteredWorks.length} artworks</p>
          </div>
        </div>

        {filteredWorks.length === 0 ? (
          <p className="border border-gallery-line bg-card p-6 text-center text-muted-foreground">
            No artworks match your current search and filter criteria.
          </p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              {visibleWorks.map((work) => (
                <article key={work.id} className="space-y-4">
                  <figure className="painting-frame signature-hover hover-scale relative">
                    <LazyImage src={work.image} alt={work.alt} width={1024} height={1280} className="h-[520px] w-full object-cover md:h-[620px]" />
                    <FavouriteButton artworkId={work.id} className="absolute right-4 top-4 z-10" />
                  </figure>
                  <div className="flex items-start justify-between gap-4 border-b border-gallery-line pb-4">
                    <div>
                      <h2 className="font-display text-2xl">
                        {work.title}, {work.year}
                      </h2>
                      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{work.artist}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {work.medium} · {work.availability}
                      </p>
                    </div>
                    <Link className="line-button" to={`/artwork/${work.id}`}>
                      Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div ref={sentinelRef} className="pt-4">
              {hasMore ? (
                <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Loading more artworks…</p>
              ) : (
                <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">You’ve reached the end of the collection.</p>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Explore;