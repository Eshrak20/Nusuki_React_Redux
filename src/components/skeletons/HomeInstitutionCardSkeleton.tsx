const HomeInstitutionCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col h-full animate-pulse"
        >
          {/* Logo Container */}
          <div className="h-24 w-full flex items-center justify-center mb-4">
            <div className="h-16 w-28 bg-muted rounded-lg" />
          </div>

          <div className="border-t border-border mb-5" />

          {/* Text Content */}
          <div className="flex flex-col grow">
            {/* University Name (2 lines like real card) */}
            <div className="space-y-2 mb-3">
              <div className="h-4 w-[85%] bg-muted rounded-md" />
              <div className="h-4 w-[60%] bg-muted rounded-md" />
            </div>

            {/* Location */}
            <div className="h-3 w-[40%] bg-muted rounded-md mb-3" />

            {/* URL */}
            <div className="h-3 w-[70%] bg-muted rounded-md mb-4" />

            {/* Push buttons to bottom */}
            <div className="mt-auto flex gap-4">
              <div className="flex-1 h-10 bg-muted rounded-lg" />
              <div className="flex-1 h-10 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeInstitutionCardSkeleton;