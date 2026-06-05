import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
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

type EditingField = "min" | "max" | null;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getStep = (min: number, max: number) => {
  const range = max - min;
  if (range <= 60) return 5;
  if (range <= 180) return 10;
  if (range <= 360) return 15;
  if (range <= 720) return 30;
  return 60;
};

const formatMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

const LayoverDurationFilter = ({
  data,
  isLoading,
}: LayoverDurationFilterProps) => {
  const dispatch = useDispatch();

  const selectedMin = useSelector(
    (state: RootState) => state.flightSearch.filters.layover_duration_min,
  );

  const selectedMax = useSelector(
    (state: RootState) => state.flightSearch.filters.layover_duration_max,
  );

  const [dragValue, setDragValue] = useState<[number, number] | null>(null);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [minDraft, setMinDraft] = useState("");
  const [maxDraft, setMaxDraft] = useState("");

  const step = useMemo(() => {
    if (!data) return 5; // fallback step
    return getStep(data.min_minutes, data.max_minutes);
  }, [data]);

  if (isLoading) {
    return (
      <div className="rounded-sm border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Loading layover duration...
        </p>
      </div>
    );
  }

  if (!data) return null;
  if (data.max_minutes <= data.min_minutes) return null;

  const committedValue: [number, number] = [
    selectedMin ?? data.min_minutes,
    selectedMax ?? data.max_minutes,
  ];

  const sliderValue = dragValue ?? committedValue;

  const minDisplayValue =
    editingField === "min" ? minDraft : String(sliderValue[0]);

  const maxDisplayValue =
    editingField === "max" ? maxDraft : String(sliderValue[1]);

  const commitRange = (min: number, max: number) => {
    if (!data) return;

    const safeMin = clamp(min, data.min_minutes, data.max_minutes);
    const safeMax = clamp(max, data.min_minutes, data.max_minutes);

    const finalMin = Math.min(safeMin, safeMax);
    const finalMax = Math.max(safeMin, safeMax);

    setDragValue(null);

    dispatch(
      setRangeFilter({
        category: "layover",
        min: finalMin,
        max: finalMax,
      }),
    );
  };

  const startEditingMin = () => {
    setEditingField("min");
    setMinDraft(String(sliderValue[0]));
  };

  const startEditingMax = () => {
    setEditingField("max");
    setMaxDraft(String(sliderValue[1]));
  };

  const submitMin = () => {
    const parsed = Number(minDraft.replace(/[^0-9]/g, ""));

    if (Number.isNaN(parsed)) {
      setEditingField(null);
      setMinDraft("");
      return;
    }

    commitRange(parsed, sliderValue[1]);
    setEditingField(null);
    setMinDraft("");
  };

  const submitMax = () => {
    const parsed = Number(maxDraft.replace(/[^0-9]/g, ""));

    if (Number.isNaN(parsed)) {
      setEditingField(null);
      setMaxDraft("");
      return;
    }

    commitRange(sliderValue[0], parsed);
    setEditingField(null);
    setMaxDraft("");
  };

  return (
    <FlightFilterSection value="layover-duration" title="Layover Duration">
      <div className="px-1">
        <div className="rounded-sm border border-border/60 bg-muted/20 p-4 sm:p-5">
          <div className="px-1">
            <Slider
              min={data.min_minutes}
              max={data.max_minutes}
              step={step}
              value={sliderValue}
              onValueChange={(val) => setDragValue([val[0], val[1]])}
              onValueCommit={(val) => commitRange(val[0], val[1])}
              className="w-full"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-sm border bg-background px-3 py-3 shadow-sm">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Min Layover
              </p>

              {editingField === "min" ? (
                <Input
                  autoFocus
                  type="number"
                  inputMode="numeric"
                  value={minDisplayValue}
                  onChange={(e) => setMinDraft(e.target.value)}
                  onBlur={submitMin}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitMin();
                    if (e.key === "Escape") {
                      setEditingField(null);
                      setMinDraft("");
                    }
                  }}
                  className="mt-1 h-8 border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus-visible:ring-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={startEditingMin}
                  className="mt-1 cursor-text text-left text-base font-bold text-foreground"
                >
                  {formatMinutes(sliderValue[0])}
                </button>
              )}
            </div>

            <div className="rounded-sm border bg-background px-3 py-3 text-right shadow-sm">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Max Layover
              </p>

              {editingField === "max" ? (
                <Input
                  autoFocus
                  type="number"
                  inputMode="numeric"
                  value={maxDisplayValue}
                  onChange={(e) => setMaxDraft(e.target.value)}
                  onBlur={submitMax}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitMax();
                    if (e.key === "Escape") {
                      setEditingField(null);
                      setMaxDraft("");
                    }
                  }}
                  className="mt-1 h-8 border-0 bg-transparent px-0 text-right text-sm font-semibold shadow-none focus-visible:ring-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={startEditingMax}
                  className="mt-1 cursor-text text-right text-base font-bold text-foreground"
                >
                  {formatMinutes(sliderValue[1])}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </FlightFilterSection>
  );
};

export default LayoverDurationFilter;
