import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { RootState } from "@/redux/store";
import type { AirlineFilterOption } from "@/types/flight/flightResults.types";
import FlightFilterSection from "./reusableComponents/FlightFilterSection";
import FilterCheckboxItem from "./reusableComponents/FilterCheckboxItem";
import AirlineLogo from "@/components/AirlineLogo";

interface Props {
  data: AirlineFilterOption[];
}

const AirlinesFilter = ({ data }: Props) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.flightSearch.filters.airlines,
  );

  if (!data.length) return null;

  return (
    <FlightFilterSection value="airlines" title="Airlines">
      <ScrollArea className="max-h-72 pr-2">
        <div className="space-y-2">
          {data.map((item) => (
            <FilterCheckboxItem
              key={item.code}
              checked={selected.includes(item.code)}
              onCheckedChange={() =>
                dispatch(
                  updateFilter({ category: "airlines", value: item.code }),
                )
              }
              label={item.name}
              leading={
                <AirlineLogo
                  logo={item.logo}
                  name={item.name}
                  code={item.code}
                  className="h-6 w-6"
                  iconClassName="h-3 w-3"
                  textClassName="text-[8px]"
                />
              }
              trailing={<span>{item.count}</span>}
            />
          ))}
        </div>
      </ScrollArea>
    </FlightFilterSection>
  );
};

export default AirlinesFilter;
