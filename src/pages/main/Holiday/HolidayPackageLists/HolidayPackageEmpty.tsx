import { SearchX } from "lucide-react";

const HolidayPackageEmpty = () => {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center rounded-sm border border-dashed bg-card p-8 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-sm bg-primary/10 text-primary">
        <SearchX size={30} />
      </div>

      <h3 className="text-xl font-semibold">No package found</h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Try changing your search, price range, or duration filter.
      </p>
    </div>
  );
};

export default HolidayPackageEmpty;