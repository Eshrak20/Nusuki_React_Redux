const HolidaySearchSkeleton = () => {
  return (
    <section className="w-full py-10 animate-pulse">
      <div className="mx-auto max-w-7xl border bg-card p-6 shadow-lg">

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-10 w-32 bg-muted" />
          ))}
        </div>

        {/* Big Search */}
        <div className="mt-6 h-16 w-full bg-muted" />

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="h-40 w-full bg-muted" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HolidaySearchSkeleton;