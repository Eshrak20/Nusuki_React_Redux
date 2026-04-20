import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { RootState } from "@/redux/store";
import type { FilterOptionString } from "@/types/flight/flightResults.types";

interface Props {
  data: FilterOptionString[];
}

const LayoverCitiesFilter = ({ data }: Props) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.flightSearch.filters.layover_cities);

  if (!data.length) return null;

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Layover City</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.map((item) => (
          <label key={item.value} className="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3">
            <Checkbox
              checked={selected.includes(item.value)}
              onCheckedChange={() => dispatch(updateFilter({ category: "layover_cities", value: item.value }))}
            />
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
};

export default LayoverCitiesFilter;