import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

// Updated to use your custom hooks for correct typings
import { useAppDispatch, useAppSelector } from "@/redux/hooks"; 
// Make sure to import your actual actions from your slice
import { setMinPrice, setMaxPrice } from "@/redux/features/holidayPackageFilterSlice"; 

import FlightFilterSection from "@/pages/main/Flight/FlightDetail/filters/reusableComponents/FlightFilterSection";

interface PriceRangeData {
  min: number | null;
  max: number | null;
}

interface HolidayPriceRangeProps {
  data?: PriceRangeData;
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

const HolidayPriceRange = ({ data }: HolidayPriceRangeProps) => {
  
  const dispatch = useAppDispatch();

  // Read from holidayPackageFilters instead of flightSearch
  const selectedMinRaw = useAppSelector((state) => state.holidayPackageFilters.min_price);
  const selectedMaxRaw = useAppSelector((state) => state.holidayPackageFilters.max_price);

  // Convert to numbers if your slice stores them as strings
  const selectedMin = selectedMinRaw ? Number(selectedMinRaw) : undefined;
  const selectedMax = selectedMaxRaw ? Number(selectedMaxRaw) : undefined;

  const [dragValue, setDragValue] = useState<[number, number] | null>(null);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [minDraft, setMinDraft] = useState("");
  const [maxDraft, setMaxDraft] = useState("");

  // Since your API returns `min` and `max` (8000 and 500000), 
  // we treat them as the absolute limits.
  const absoluteMin = data?.min ?? 0;
  const absoluteMax = data?.max ?? 0;

  const step = useMemo(
    () => getStep(absoluteMin, absoluteMax),
    [absoluteMin, absoluteMax],
  );

  const committedValue: [number, number] = [
    selectedMin ?? absoluteMin,
    selectedMax ?? absoluteMax,
  ];

  const sliderValue = dragValue ?? committedValue;

  const minDisplayValue =
    editingField === "min" ? minDraft : String(sliderValue[0]);

  const maxDisplayValue =
    editingField === "max" ? maxDraft : String(sliderValue[1]);

  const commitRange = (min: number, max: number) => {
    if (!data) return;

    const safeMin = clamp(min, absoluteMin, absoluteMax);
    const safeMax = clamp(max, absoluteMin, absoluteMax);

    const finalMin = Math.min(safeMin, safeMax);
    const finalMax = Math.max(safeMin, safeMax);

    setDragValue(null);

    // Dispatching directly to your Holiday Package filter slice
    dispatch(setMinPrice(finalMin.toString())); 
    dispatch(setMaxPrice(finalMax.toString()));
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

  if (!data) return null;
  if (absoluteMax <= absoluteMin) return null;

  return (
    <FlightFilterSection value="price-range" title="Price Range">
      <div className="">
        <div className="rounded-2xl bg-muted/20">
          <div className="">
            <Slider
              min={absoluteMin}
              max={absoluteMax}
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

export default HolidayPriceRange;