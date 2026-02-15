export default function Loading() {
  return (
    <section aria-labelledby="countries-loading-heading">
      <h2 id="countries-loading-heading" className="sr-only">
        Loading countries
      </h2>
      <div className="h-8 w-48 bg-muted rounded mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden"
          >
            <div className="h-40 bg-muted animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
