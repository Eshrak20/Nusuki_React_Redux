import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import type { RootState } from "@/redux/store";
import { setRangeFilter } from "@/redux/features/flightSearchSlice";
import FlightFilterSection from "./reusableComponents/FlightFilterSection";

interface PriceRangeData {
  min: number;
  max: number;
  absolute_min: number;
  absolute_max: number;
  request_min_key?: string;
  request_max_key?: string;
}

interface PriceRangeFilterProps {
  data?: PriceRangeData;
  isLoading: boolean;
}

type EditingField = "min" | "max" | null;

const formatPrice = (value: number) => `৳ ${value.toLocaleString("en-BD")}`;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getStep = (min: number, max: number) => {
  const range = max - min;
  if (range <= 2000) return 100;
  if (range <= 10000) return 250;
  if (range <= 30000) return 500;
  return 1000;
};

const PriceRangeFilter = ({ data, isLoading }: PriceRangeFilterProps) => {
  const dispatch = useDispatch();

  const selectedMin = useSelector(
    (state: RootState) => state.flightSearch.filters.price_min,
  );
  const selectedMax = useSelector(
    (state: RootState) => state.flightSearch.filters.price_max,
  );

  const [dragValue, setDragValue] = useState<[number, number] | null>(null);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [minDraft, setMinDraft] = useState("");
  const [maxDraft, setMaxDraft] = useState("");

  const fallbackMin = data?.min ?? 0;
  const fallbackMax = data?.max ?? 0;
  const absoluteMin = data?.absolute_min ?? 0;
  const absoluteMax = data?.absolute_max ?? 0;

  const step = useMemo(
    () => getStep(absoluteMin, absoluteMax),
    [absoluteMin, absoluteMax],
  );

  const committedValue: [number, number] = [
    selectedMin ?? fallbackMin,
    selectedMax ?? fallbackMax,
  ];

  const sliderValue = dragValue ?? committedValue;

  const minDisplayValue =
    editingField === "min" ? minDraft : String(sliderValue[0]);

  const maxDisplayValue =
    editingField === "max" ? maxDraft : String(sliderValue[1]);

  const commitRange = (min: number, max: number) => {
    if (!data) return;

    const safeMin = clamp(min, data.absolute_min, data.absolute_max);
    const safeMax = clamp(max, data.absolute_min, data.absolute_max);

    const finalMin = Math.min(safeMin, safeMax);
    const finalMax = Math.max(safeMin, safeMax);

    setDragValue(null);

    dispatch(
      setRangeFilter({
        category: "price",
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

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">Loading price range...</p>
      </div>
    );
  }

  if (!data) return null;
  if (data.absolute_max <= data.absolute_min) return null;

  return (
    <FlightFilterSection value="price-range" title="Price Range">
      <div className="px-1">
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-5">
          <div className="px-1">
            <Slider
              min={data.absolute_min}
              max={data.absolute_max}
              step={step}
              value={sliderValue}
              onValueChange={(val) => setDragValue([val[0], val[1]])}
              onValueCommit={(val) => commitRange(val[0], val[1])}
              className="w-full"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border bg-background px-3 py-3 shadow-sm">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Min Price
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
                  {formatPrice(sliderValue[0])}
                </button>
              )}
            </div>

            <div className="rounded-2xl border bg-background px-3 py-3 text-right shadow-sm">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Max Price
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
                  {formatPrice(sliderValue[1])}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </FlightFilterSection>
  );
};

export default PriceRangeFilter;
