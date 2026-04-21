import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/LazyImage";
import { artworks } from "@/data/galleryData";
import FavouriteButton from "@/components/FavouriteButton";
import { useFavourites } from "@/hooks/FavouritesContext";
//  akefvv jkslwhfevjdj
const Favourites = () => {
  const { favourites } = useFavourites();

  const favouriteWorks = useMemo(
    () => artworks.filter((artwork) => favourites.includes(artwork.id)),
    [favourites]
  );

  useEffect(() => {
    document.title = "Your Favourites | Aurea Gallery";
  }, []);

  return (
    <main className="pb-20 min-h-screen">
      <header className="sticky top-0 z-30 border-b border-gallery-line/70 bg-background/85 backdrop-blur">
        <div className="gallery-shell flex h-20 items-center justify-between gap-4">
          <Link to="/" className="font-display text-2xl tracking-wide">
            AUREA GALLERY
          </Link>
          <div className="flex gap-4">
            <Link to="/explore" className="story-link hidden items-center text-sm uppercase tracking-[0.18em] md:flex">
              Explore Collection
            </Link>
            <Link to="/" className="line-button">
              Back home
            </Link>
          </div>
        </div>
      </header>

      <section className="gallery-shell space-y-10 pt-12 md:pt-16 animate-fade-in">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="editorial-kicker">Collection</p>
            <h1 className="section-title mt-3">Your Saved Artworks</h1>
          </div>
          <p className="max-w-xl text-muted-foreground">
            A curated selection of paintings you've marked as favourites. You can manage your collection here.
          </p>
        </div>

        {favouriteWorks.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-gallery-line bg-card p-12 text-center">
            <p className="text-lg text-muted-foreground">Your collection is empty.</p>
            <p className="mt-2 text-sm text-muted-foreground/60">Start exploring the gallery to add items to your favourites.</p>
            <Link to="/explore" className="line-button mt-6">
              Explore Artworks
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {favouriteWorks.map((work) => (
              <article key={work.id} className="space-y-4 animate-enter">
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
        )}
      </section>
    </main>
  );
};

export default Favourites;
