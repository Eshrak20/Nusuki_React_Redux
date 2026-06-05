import { Search, RotateCcw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  resetHolidayPackageFilters,
  setDurationDays,
  setSearch,
} from "@/redux/features/holidayPackageFilterSlice";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { TourPackageDynamicFilters, TourPackageItem } from "@/types/holiday/types.tourPackageLists";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HolidayPriceRange from "./HolidayPriceRange";
import { useState } from "react";

interface HolidayPackageFilterProps {
  filters?: TourPackageDynamicFilters;
  packages: TourPackageItem[];
}

const HolidayPackageFilter = ({ filters, packages }: HolidayPackageFilterProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector((state) => state.holidayPackageFilters);

  return (
    <aside className="sticky top-24 rounded-sm border bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filter</h2>

        <Button
          size="sm"
          variant="default"
          onClick={() => dispatch(resetHolidayPackageFilters())}
          className="rounded-sm"
        >
          <RotateCcw size={15} className="mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        <div>

          <HolidayPriceRange data={filters?.price} />

          <p className="mt-3 text-xs text-muted-foreground">
            Price Range:{" "}
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
              onChange={(e) => {
                const value = e.target.value;
                dispatch(setSearch(value));

                if (!value) {
                  setSuggestions([]);
                  return;
                }

                const matched = packages
                  ?.map((pkg) => pkg.name)
                  .filter((name) =>
                    name.toLowerCase().includes(value.toLowerCase())
                  );

                setSuggestions(matched);
              }}
              className="rounded-sm pr-10"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full rounded-sm border bg-primary text-muted dark:bg-muted dark:text-foreground shadow-md">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer px-3 py-2 hover:opacity-60"
                    onClick={() => {
                      dispatch(setSearch(item));
                      setSuggestions([]);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
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
            <SelectTrigger className="mt-4 rounded-sm">
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