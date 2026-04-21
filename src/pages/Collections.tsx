import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import LazyImage from "@/components/LazyImage";
import { artworks, collections } from "@/data/galleryData";
import FavouriteButton from "@/components/FavouriteButton";
import StaggerReveal from "@/components/StaggerReveal";

const Collections = () => {
  const { id } = useParams();
  const selectedCollection = useMemo(() => collections.find((c) => c.id === id), [id]);

  const filteredWorks = useMemo(() => {
    if (!id) return [];
    return artworks.filter((artwork) => artwork.collectionId === id);
  }, [id]);

  useEffect(() => {
    document.title = selectedCollection 
      ? `${selectedCollection.name} | Aurea Gallery`
      : "Collections | Aurea Gallery";
  }, [selectedCollection]);

  if (id && !selectedCollection) {
    return (
      <main className="gallery-shell py-20 text-center">
        <h1 className="section-title">Collection not found</h1>
        <Link to="/collections" className="line-button mt-8">Back to collections</Link>
      </main>
    );
  }

  return (
    <main className="pb-20 min-h-screen">
      <header className="sticky top-0 z-30 border-b border-gallery-line/70 bg-background/85 backdrop-blur">
        <div className="gallery-shell flex h-20 items-center justify-between gap-4">
          <Link to="/" className="font-display text-2xl tracking-wide text-foreground">
            AUREA GALLERY
          </Link>
          <div className="flex gap-6">
            <Link to="/explore" className="story-link hidden items-center text-sm uppercase tracking-[0.18em] md:flex">
              Explore
            </Link>
            <Link to="/collections" className="story-link hidden items-center text-sm uppercase tracking-[0.18em] md:flex">
              Collections
            </Link>
            <Link to="/" className="line-button">Back home</Link>
          </div>
        </div>
      </header>

      {!id ? (
        <section className="gallery-shell space-y-12 pt-12 md:pt-16 animate-fade-in">
          <div className="max-w-2xl">
            <p className="editorial-kicker">Curated Views</p>
            <h1 className="section-title mt-3">Art Collections</h1>
            <p className="mt-4 text-muted-foreground">
              Discover artworks grouped by thematic focus, movement, and curatorial insight.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {collections.map((collection, index) => (
              <StaggerReveal key={collection.id} delay={index * 100}>
                <Link to={`/collections/${collection.id}`} className="group block space-y-4">
                  <figure className="painting-frame overflow-hidden">
                    <LazyImage 
                      src={collection.coverImage} 
                      alt={collection.name} 
                      className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </figure>
                  <div className="border-b border-gallery-line pb-4 transition-colors group-hover:border-primary">
                    <h2 className="font-display text-3xl">{collection.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{collection.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {artworks.filter(a => a.collectionId === collection.id).length} Artworks
                      </span>
                      <span className="line-button scale-90">View Collection</span>
                    </div>
                  </div>
                </Link>
              </StaggerReveal>
            ))}
          </div>
        </section>
      ) : (
        <section className="gallery-shell space-y-10 pt-12 md:pt-16 animate-fade-in">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-gallery-line pb-8">
            <div className="max-w-2xl">
              <Link to="/collections" className="editorial-kicker story-link">← All Collections</Link>
              <h1 className="section-title mt-4">{selectedCollection?.name}</h1>
              <p className="mt-4 text-muted-foreground">{selectedCollection?.description}</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work, index) => (
              <StaggerReveal key={work.id} delay={index * 80}>
                <article className="space-y-4">
                  <figure className="painting-frame signature-hover hover-scale relative">
                    <LazyImage 
                      src={work.image} 
                      alt={work.alt} 
                      className="h-[400px] w-full object-cover" 
                    />
                    <FavouriteButton artworkId={work.id} className="absolute right-4 top-4 z-10" />
                  </figure>
                  <div className="flex items-start justify-between gap-4 border-b border-gallery-line pb-4">
                    <div>
                      <h3 className="font-display text-xl leading-tight">{work.title}, {work.year}</h3>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{work.artist}</p>
                    </div>
                    <Link className="line-button scale-90" to={`/artwork/${work.id}`}>Details</Link>
                  </div>
                </article>
              </StaggerReveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Collections;
