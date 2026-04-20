import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { RootState } from "@/redux/store";
import type { FilterOptionString } from "@/types/flight/flightResults.types";
import FlightFilterSection from "./reusableComponents/FlightFilterSection";
import FilterCheckboxItem from "./reusableComponents/FilterCheckboxItem";

interface Props {
  data: FilterOptionString[];
}

const LayoverCitiesFilter = ({ data }: Props) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.flightSearch.filters.layover_cities
  );

  if (!data.length) return null;

  return (
    <FlightFilterSection value="layover-city" title="Layover City">
      <ScrollArea className="max-h-80 pr-2">
        <div className="space-y-2">
          {data.map((item) => {
            const parts = item.label.split("(");
            const main = parts[0]?.trim();
            const code = parts[1] ? `(${parts[1]}` : "";

            return (
              <FilterCheckboxItem
                key={item.value}
                checked={selected.includes(item.value)}
                onCheckedChange={() =>
                  dispatch(
                    updateFilter({ category: "layover_cities", value: item.value })
                  )
                }
                label={main}
                subLabel={code}
              />
            );
          })}
        </div>
      </ScrollArea>
    </FlightFilterSection>
  );
};

export default LayoverCitiesFilter;