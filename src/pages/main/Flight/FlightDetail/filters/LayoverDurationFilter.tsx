interface LayoverDurationData {
  min_minutes: number;
  max_minutes: number;
  min_text: string;
  max_text: string;
}

interface LayoverDurationFilterProps {
  data?: LayoverDurationData;
  isLoading: boolean;
}

const LayoverDurationFilter = ({
  data,
  isLoading,
}: LayoverDurationFilterProps) => {
  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Loading layover duration...
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold">Layover Duration</h3>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Min</span>
          <span>{data.min_text}</span>
        </div>

        <div className="flex justify-between">
          <span>Max</span>
          <span>{data.max_text}</span>
        </div>
      </div>
    </div>
  );
};

export default LayoverDurationFilter;