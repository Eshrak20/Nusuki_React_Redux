import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { RootState } from "@/redux/store";
import type { AirlineFilterOption } from "@/types/flight/flightResults.types";

interface Props {
  data: AirlineFilterOption[];
}

const AirlinesFilter = ({ data }: Props) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.flightSearch.filters.airlines);

  if (!data.length) return null;

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Airlines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.map((item) => (
          <label key={item.code} className="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3">
            <Checkbox
              checked={selected.includes(item.code)}
              onCheckedChange={() => dispatch(updateFilter({ category: "airlines", value: item.code }))}
            />
            <img src={item.logo} alt={item.name} className="h-6 w-6 rounded-full object-cover" />
            <span className="flex-1 text-sm font-medium text-slate-700">{item.name}</span>
            <span className="text-xs text-slate-400">{item.count}</span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
};

export default AirlinesFilter;