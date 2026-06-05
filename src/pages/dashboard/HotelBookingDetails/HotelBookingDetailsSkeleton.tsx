const HotelBookingDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-10 w-24 animate-pulse rounded-sm bg-muted" />

      <div>
        <div className="h-8 w-64 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
      </div>

      <div className="rounded-sm border bg-card p-6">
        <div className="flex animate-pulse items-start gap-4">
          <div className="size-12 rounded-sm bg-muted" />

          <div className="flex-1">
            <div className="h-6 w-72 max-w-full rounded bg-muted" />
            <div className="mt-2 h-4 w-52 rounded bg-muted" />
            <div className="mt-3 h-4 w-full rounded bg-muted" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-sm border bg-card p-4"
          >
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="mt-3 h-5 w-32 rounded bg-muted" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="h-80 animate-pulse rounded-sm border bg-card" />
        <div className="h-80 animate-pulse rounded-sm border bg-card" />
      </div>
    </div>
  );
};

export default HotelBookingDetailsSkeleton;