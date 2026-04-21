import { Skeleton } from "@/components/ui/skeleton";

const RouteSkeleton = () => {
  return (
    <main className="gallery-shell animate-fade-in space-y-8 py-12 md:py-16">
      <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div className="space-y-4">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-14 w-full max-w-2xl" />
          <Skeleton className="h-14 w-4/5 max-w-xl" />
          <Skeleton className="h-5 w-3/4 max-w-lg" />
        </div>
        <Skeleton className="aspect-[4/5] w-full" />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <article key={index} className="space-y-3 border border-gallery-line bg-card p-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-32" />
          </article>
        ))}
      </section>
    </main>
  );
};

export default RouteSkeleton;