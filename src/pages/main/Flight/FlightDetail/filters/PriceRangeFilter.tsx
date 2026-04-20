interface PriceRangeData {
  min: number;
  max: number;
  absolute_min: number;
  absolute_max: number;
}

interface PriceRangeFilterProps {
  data?: PriceRangeData;
  isLoading: boolean;
}

const PriceRangeFilter = ({
  data,
  isLoading,
}: PriceRangeFilterProps) => {
  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">Loading price range...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold">Price Range</h3>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Min</span>
          <span>{data.min}</span>
        </div>

        <div className="flex justify-between">
          <span>Max</span>
          <span>{data.max}</span>
        </div>

        <div className="flex justify-between">
          <span>Absolute Min</span>
          <span>{data.absolute_min}</span>
        </div>

        <div className="flex justify-between">
          <span>Absolute Max</span>
          <span>{data.absolute_max}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;