export function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border flex flex-col animate-pulse">
      <div className="aspect-[4/5] bg-muted" />
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="h-5 w-3/4 bg-muted rounded" />
        <div className="h-4 w-1/3 bg-muted rounded" />
        <div className="flex gap-1 mt-1">
          <div className="h-4 w-6 bg-muted rounded" />
          <div className="h-4 w-6 bg-muted rounded" />
          <div className="h-4 w-6 bg-muted rounded" />
        </div>
        <div className="h-9 w-full bg-muted rounded mt-2" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductsErrorState() {
  return (
    <div className="border border-border bg-card p-8 text-center">
      <p className="font-condensed uppercase tracking-widest text-sm text-muted-foreground">
        Products loading…
      </p>
      <p className="mt-2 text-foreground">Please refresh the page in a moment.</p>
    </div>
  );
}
