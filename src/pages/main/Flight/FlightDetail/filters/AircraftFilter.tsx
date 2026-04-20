import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { RootState } from "@/redux/store";
import type { AircraftFilterOption } from "@/types/flight/flightResults.types";
import FlightFilterSection from "./reusableComponents/FlightFilterSection";
import FilterCheckboxItem from "./reusableComponents/FilterCheckboxItem";

interface Props {
  data: AircraftFilterOption[];
}

const AircraftFilter = ({ data }: Props) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.flightSearch.filters.aircraft
  );

  if (!data.length) return null;

  return (
    <FlightFilterSection value="aircraft" title="Aircraft">
      <ScrollArea className="max-h-72 pr-2">
        <div className="space-y-2">
          {data.map((item) => (
            <FilterCheckboxItem
              key={item.code}
              checked={selected.includes(item.code)}
              onCheckedChange={() =>
                dispatch(updateFilter({ category: "aircraft", value: item.code }))
              }
              label={item.name}
            />
          ))}
        </div>
      </ScrollArea>
    </FlightFilterSection>
  );
};

export default AircraftFilter;