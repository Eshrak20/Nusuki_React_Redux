import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@/components/ui/slider";
import type { RootState } from "@/redux/store";
import { setRangeFilter } from "@/redux/features/flightSearchSlice";
import FlightFilterSection from "./reusableComponents/FlightFilterSection";

interface LayoverDurationData {
  min_minutes: number;
  max_minutes: number;
  min_text: string;
  max_text: string;
  request_min_key?: string;
  request_max_key?: string;
}

interface LayoverDurationFilterProps {
  data?: LayoverDurationData;
  isLoading: boolean;
}

const formatMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

const LayoverDurationFilter = ({
  data,
  isLoading,
}: LayoverDurationFilterProps) => {
  const dispatch = useDispatch();

  const selectedMin = useSelector(
    (state: RootState) => state.flightSearch.filters.layover_duration_min
  );

  const selectedMax = useSelector(
    (state: RootState) => state.flightSearch.filters.layover_duration_max
  );

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Loading layover duration...
        </p>
      </div>
    );
  }

  if (!data) return null;

  const hasValidRange = data.max_minutes > data.min_minutes;

  if (!hasValidRange) {
    return null;
  }

  const value: [number, number] = [
    selectedMin ?? data.min_minutes,
    selectedMax ?? data.max_minutes,
  ];

  return (
    <FlightFilterSection value="layover-duration" title="Layover Duration">
      <div className="space-y-4 px-1">
        <Slider
          min={data.min_minutes}
          max={data.max_minutes}
          step={5}
          value={value}
          onValueChange={(val) =>
            dispatch(
              setRangeFilter({
                category: "layover",
                min: val[0],
                max: val[1],
              })
            )
          }
          className="w-full"
        />

        <div className="flex items-center justify-between text-sm font-medium text-foreground">
          <span>{formatMinutes(value[0])}</span>
          <span>{formatMinutes(value[1])}</span>
        </div>
      </div>
    </FlightFilterSection>
  );
};

export default LayoverDurationFilter;