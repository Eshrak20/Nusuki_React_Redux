import { Search, RotateCcw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  resetHolidayPackageFilters,
  setDurationDays,
  setMaxPrice,
  setMinPrice,
  setSearch,
} from "@/redux/features/holidayPackageFilterSlice";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import type { TourPackageDynamicFilters } from "@/types/holiday/types.tourPackgeLists";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HolidayPackageFilterProps {
  filters?: TourPackageDynamicFilters;
}

const HolidayPackageFilter = ({ filters }: HolidayPackageFilterProps) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector((state) => state.holidayPackageFilters);

  return (
    <aside className="sticky top-24 rounded-md border bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filter</h2>

        <Button
          size="sm"
          variant="default"
          onClick={() => dispatch(resetHolidayPackageFilters())}
          className="rounded-md"
        >
          <RotateCcw size={15} className="mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="border-b pb-3 font-semibold">Price Range</h3>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Minimum Price</Label>
              <Input
                type="number"
                placeholder="Min"
                value={selectedFilters.min_price}
                onChange={(e) => dispatch(setMinPrice(e.target.value))}
                className="mt-2 rounded-md"
              />
            </div>

            <div>
              <Label className="text-xs">Maximum Price</Label>
              <Input
                type="number"
                placeholder="Max"
                value={selectedFilters.max_price}
                onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                className="mt-2 rounded-md"
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            API Range:{" "}
            {filters?.price?.min ? `BDT ${filters.price.min}` : "Min N/A"} -{" "}
            {filters?.price?.max ? `BDT ${filters.price.max}` : "Max N/A"}
          </p>
        </div>

        <div>
          <h3 className="border-b pb-3 font-semibold">Package Search</h3>

          <div className="relative mt-4">
            <Input
              placeholder="Search Package"
              value={selectedFilters.search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="rounded-md pr-10"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
            />
          </div>
        </div>

        <div>
          <h3 className="border-b pb-3 font-semibold">Filter Durations</h3>

          <Select
            value={selectedFilters.duration_days || "all"}
            onValueChange={(value) =>
              dispatch(setDurationDays(value === "all" ? "" : value))
            }
          >
            <SelectTrigger className="mt-4 rounded-md">
              <SelectValue placeholder="Select Durations..." />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>

              {filters?.duration_days?.map((day) => (
                <SelectItem key={day} value={day}>
                  {day} Day
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  );
};

export default HolidayPackageFilter;