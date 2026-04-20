import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { RootState } from "@/redux/store";
import { updateFilter } from "@/redux/features/flightSearchSlice";

interface FlightFilterProps {
  availableFilters: any;
  isLoading: boolean;
}

const FlightFilter = ({ availableFilters, isLoading }: FlightFilterProps) => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.flightSearch.filters);

  // Helper to handle checkbox toggles
  const handleToggle = (category: string, value: any) => {
    dispatch(updateFilter({ category, value }));
  };

  if (isLoading) return <FilterSkeleton />;
  if (!availableFilters) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-lg">Filters</h3>
        <button 
          onClick={() => dispatch({ type: 'flightSearch/resetFilters' })}
          className="text-xs text-primary hover:underline"
        >
          Reset All
        </button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["price", "airlines", "stops"]}
        className="w-full space-y-3 border-none"
      >
        {/* PRICE RANGE */}
        {availableFilters.price_range && (
          <AccordionItem value="price" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
            <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
              Price Range
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6 px-1">
              <Slider
                defaultValue={[
                  selectedFilters.price_min || availableFilters.price_range.absolute_min,
                  selectedFilters.price_max || availableFilters.price_range.absolute_max
                ]}
                min={availableFilters.price_range.absolute_min}
                max={availableFilters.price_range.absolute_max}
                step={500}
                onValueChange={(vals) => {
                  dispatch(updateFilter({ category: 'price_min', value: vals[0] }));
                  dispatch(updateFilter({ category: 'price_max', value: vals[1] }));
                }}
              />
              <div className="flex justify-between mt-4 text-[12px] font-medium">
                <span>৳ {selectedFilters.price_min || availableFilters.price_range.min}</span>
                <span>৳ {selectedFilters.price_max || availableFilters.price_range.max}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* STOPS */}
        <AccordionItem value="stops" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Stops
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {availableFilters.stops?.map((stop: any) => (
              <div key={stop.value} className="flex items-center space-x-3">
                <Checkbox 
                  id={`stop-${stop.value}`} 
                  checked={selectedFilters.stops.includes(stop.value)}
                  onCheckedChange={() => handleToggle('stops', stop.value)}
                />
                <Label htmlFor={`stop-${stop.value}`} className="text-sm font-normal flex-1 flex justify-between">
                  <span>{stop.label}</span>
                  <span className="text-muted-foreground text-xs">{stop.count}</span>
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* AIRLINES */}
        <AccordionItem value="airlines" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Airlines
          </AccordionTrigger>
          <AccordionContent className="space-y-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {availableFilters.airlines?.map((airline: any) => (
              <div key={airline.code} className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors">
                <Checkbox 
                  id={airline.code} 
                  checked={selectedFilters.airlines.includes(airline.code)}
                  onCheckedChange={() => handleToggle('airlines', airline.code)}
                />
                <label htmlFor={airline.code} className="text-[13px] font-medium cursor-pointer flex-1 flex justify-between">
                  <span>{airline.name}</span>
                  <span className="text-[11px] text-muted-foreground">৳{airline.min_price}</span>
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* REFUNDABILITY */}
        <AccordionItem value="refund" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Refundability
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            {availableFilters.refundability?.map((item: any) => (
              <div key={item.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={item.value} 
                  checked={selectedFilters.refundability.includes(item.value)}
                  onCheckedChange={() => handleToggle('refundability', item.value)}
                />
                <Label htmlFor={item.value} className="text-sm">{item.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* LAYOVER CITIES */}
        <AccordionItem value="city" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Layover Cities
          </AccordionTrigger>
          <AccordionContent className="space-y-1">
            {availableFilters.layover_cities?.map((city: any) => (
              <div key={city.code} className="flex items-center space-x-2 p-1">
                <Checkbox 
                  id={city.code} 
                  checked={selectedFilters.layover_cities?.includes(city.code)}
                  onCheckedChange={() => handleToggle('layover_cities', city.code)}
                />
                <Label htmlFor={city.code} className="text-sm">{city.name} ({city.code})</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// UI Loading State
const FilterSkeleton = () => (
  <div className="space-y-4 w-full">
    {[1, 2, 3, 4].map((i) => (
      <Skeleton key={i} className="h-12 w-full rounded-lg" />
    ))}
  </div>
);

export default FlightFilter;