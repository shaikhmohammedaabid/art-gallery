import { forwardRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
  skeletonClassName?: string;
};

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({ className, wrapperClassName, skeletonClassName, onLoad, loading = "lazy", decoding = "async", ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div className={cn("relative h-full w-full overflow-hidden", wrapperClassName)}>
        {!isLoaded && <Skeleton aria-hidden="true" className={cn("absolute inset-0 h-full w-full", skeletonClassName)} />}
        <img
          ref={ref}
          loading={loading}
          decoding={decoding}
          className={cn("h-full w-full transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
          onLoad={(event) => {
            setIsLoaded(true);
            onLoad?.(event);
          }}
          {...props}
        />
      </div>
    );
  },
);

LazyImage.displayName = "LazyImage";

export default LazyImage;