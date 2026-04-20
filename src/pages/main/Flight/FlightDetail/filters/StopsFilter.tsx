import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { RootState } from "@/redux/store";
import type { FilterOptionNumber } from "@/types/flight/flightResults.types";
import FlightFilterSection from "./reusableComponents/FlightFilterSection";
import FilterCheckboxItem from "./reusableComponents/FilterCheckboxItem";

interface Props {
  data: FilterOptionNumber[];
}

const StopsFilter = ({ data }: Props) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.flightSearch.filters.stops
  );

  if (!data.length) return null;

  return (
    <FlightFilterSection value="stops" title="Stops">
      <div className="space-y-2">
        {data.map((item) => (
          <FilterCheckboxItem
            key={item.value}
            checked={selected.includes(item.value)}
            onCheckedChange={() =>
              dispatch(updateFilter({ category: "stops", value: item.value }))
            }
            label={item.label}
          />
        ))}
      </div>
    </FlightFilterSection>
  );
};

export default StopsFilter;