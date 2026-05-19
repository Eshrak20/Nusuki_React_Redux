/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/hotel/HotelFilterSidebar.tsx

"use client";

import { resetHotelFilters, setHotelBooleanFilter, setHotelPriceFilter, toggleHotelArrayFilter } from "@/redux/features/hotel/hotelSearchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import type { RootState } from "@/redux/store";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any;
};

const HotelFilterSidebar = ({ filters }: Props) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state: RootState) => state.hotelSearch.filters,
  );

  if (!filters) return null;

  return (
    <aside className="h-fit space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Filter</h2>

        <button
          type="button"
          onClick={() => dispatch(resetHotelFilters())}
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Reset
        </button>
      </div>

      {filters.price_range && (
        <div className="space-y-3 border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-800">Price Range</h3>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              defaultValue={filters.price_range.min}
              onChange={(e) =>
                dispatch(
                  setHotelPriceFilter({
                    min: e.target.value ? Number(e.target.value) : null,
                  }),
                )
              }
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Max"
              defaultValue={filters.price_range.max}
              onChange={(e) =>
                dispatch(
                  setHotelPriceFilter({
                    max: e.target.value ? Number(e.target.value) : null,
                  }),
                )
              }
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {filters.star_ratings?.length > 0 && (
        <FilterGroup title="Star Rating">
          {filters.star_ratings.map((item: any) => (
            <CheckboxFilter
              key={item.value}
              label={item.label}
              count={item.count}
              checked={selectedFilters.star_ratings.includes(item.value)}
              onChange={() =>
                dispatch(
                  toggleHotelArrayFilter({
                    key: item.request_key,
                    value: item.value,
                  }),
                )
              }
            />
          ))}
        </FilterGroup>
      )}

      {filters.chains?.length > 0 && (
        <FilterGroup title="Hotel Chain">
          {filters.chains.map((item: any) => (
            <CheckboxFilter
              key={item.code}
              label={item.name}
              count={item.count}
              checked={selectedFilters.chain_codes.includes(item.code)}
              onChange={() =>
                dispatch(
                  toggleHotelArrayFilter({
                    key: item.request_key,
                    value: item.code,
                  }),
                )
              }
            />
          ))}
        </FilterGroup>
      )}

      {filters.amenities?.length > 0 && (
        <FilterGroup title="Amenities" scroll>
          {filters.amenities.map((item: any) => (
            <CheckboxFilter
              key={item.code}
              label={item.name}
              count={item.count}
              checked={selectedFilters.amenity_codes.includes(item.code)}
              onChange={() =>
                dispatch(
                  toggleHotelArrayFilter({
                    key: item.request_key,
                    value: item.code,
                  }),
                )
              }
            />
          ))}
        </FilterGroup>
      )}

      {filters.meal_plans?.length > 0 && (
        <FilterGroup title="Meal Plan">
          {filters.meal_plans.map((item: any) => (
            <CheckboxFilter
              key={item.id}
              label={item.name}
              count={item.count}
              checked={selectedFilters.meal_plan.includes(item.id)}
              onChange={() =>
                dispatch(
                  toggleHotelArrayFilter({
                    key: item.request_key,
                    value: item.id,
                  }),
                )
              }
            />
          ))}
        </FilterGroup>
      )}

      {filters.refundability?.length > 0 && (
        <FilterGroup title="Refundability">
          {filters.refundability.map((item: any) => (
            <CheckboxFilter
              key={String(item.value)}
              label={item.label}
              count={item.count}
              checked={selectedFilters.refundable === item.value}
              onChange={() =>
                dispatch(
                  setHotelBooleanFilter({
                    key: item.request_key,
                    value: item.value,
                  }),
                )
              }
            />
          ))}
        </FilterGroup>
      )}

      {filters.payment_types?.length > 0 && (
        <FilterGroup title="Payment Type">
          {filters.payment_types.map((item: any) => (
            <CheckboxFilter
              key={String(item.value)}
              label={item.label}
              count={item.count}
              checked={selectedFilters.prepaid === item.value}
              onChange={() =>
                dispatch(
                  setHotelBooleanFilter({
                    key: item.request_key,
                    value: item.value,
                  }),
                )
              }
            />
          ))}
        </FilterGroup>
      )}
    </aside>
  );
};

export default HotelFilterSidebar;

const FilterGroup = ({
  title,
  children,
  scroll = false,
}: {
  title: string;
  children: React.ReactNode;
  scroll?: boolean;
}) => {
  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>

      <div className={scroll ? "max-h-56 space-y-2 overflow-y-auto pr-1" : "space-y-2"}>
        {children}
      </div>
    </div>
  );
};

const CheckboxFilter = ({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-gray-700">
      <span className="flex min-w-0 items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-gray-300"
        />

        <span className="truncate">{label}</span>
      </span>

      {typeof count === "number" && (
        <span className="shrink-0 text-xs text-gray-400">{count}</span>
      )}
    </label>
  );
};