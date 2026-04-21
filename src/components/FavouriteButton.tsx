import { Heart } from "lucide-react";
import { useFavourites } from "@/hooks/FavouritesContext";
import { cn } from "@/lib/utils";

interface FavouriteButtonProps {
  artworkId: string;
  className?: string;
}

const FavouriteButton = ({ artworkId, className }: FavouriteButtonProps) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const active = isFavourite(artworkId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavourite(artworkId);
      }}
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center rounded-full border border-gallery-line bg-background/50 transition-all hover:bg-background/80 active:scale-95",
        active && "border-red-200 bg-red-50/50",
        className
      )}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-300",
          active ? "fill-red-500 stroke-red-500" : "stroke-foreground/60 group-hover:stroke-foreground"
        )}
      />
    </button>
  );
};

export default FavouriteButton;
