const HotelBookingSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5"
        >
          <div className="flex animate-pulse flex-col gap-4 lg:flex-row lg:justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className="size-11 rounded-xl bg-muted" />

                <div className="w-full">
                  <div className="h-5 w-48 rounded bg-muted" />
                  <div className="mt-2 h-4 w-64 max-w-full rounded bg-muted" />
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <div className="h-16 rounded-xl bg-muted" />
                <div className="h-16 rounded-xl bg-muted" />
                <div className="h-16 rounded-xl bg-muted" />
              </div>
            </div>

            <div className="flex gap-2 lg:flex-col lg:items-end">
              <div className="h-7 w-24 rounded-full bg-muted" />
              <div className="h-7 w-32 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelBookingSkeleton;