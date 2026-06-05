import { Loader2, MapPin } from "lucide-react";

import { SearchField } from "./SearchField";
import type { PlaceSuggestion } from "@/types/hotel/hotelSearch.types";

type Props = {
  value: string;
  suggestions: PlaceSuggestion[];
  isSearching: boolean;
  onChange: (value: string) => void;
  onSelect: (place: PlaceSuggestion) => void;
  onLoadMore: () => void;
};

export function DestinationField({
  value,
  suggestions,
  isSearching,
  onChange,
  onSelect,
  onLoadMore,
}: Props) {
  return (
    <div className="relative">
      <SearchField
        label="Destination"
        icon={<MapPin className="h-5 w-5 text-slate-400" />}
      >
        <div className="flex items-center gap-1">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
            placeholder="Where are you going?"
          />

          {isSearching && (
            <Loader2 className="mt-1 h-4 w-4 animate-spin text-primary" />
          )}
        </div>
      </SearchField>

      {suggestions.length > 0 && (
        <div
          className="absolute left-0 top-full z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-sm border bg-white shadow-xl"
          onScroll={(event) => {
            const target = event.currentTarget;

            const isBottom =
              target.scrollTop + target.clientHeight >= target.scrollHeight - 20;

            if (isBottom && !isSearching) {
              onLoadMore();
            }
          }}
        >
          {suggestions.map((place) => (
            <button
              key={place.id}
              type="button"
              onClick={() => onSelect(place)}
              className="block w-full px-4 py-3 text-left hover:bg-slate-50"
            >
              <p className="text-sm font-semibold text-slate-800">
                {place.name}
              </p>
              <p className="text-xs text-slate-500">
                {place.fullAddress}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}