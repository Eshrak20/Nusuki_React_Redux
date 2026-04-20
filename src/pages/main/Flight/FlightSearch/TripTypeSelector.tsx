import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setSearchField } from "@/redux/features/flightSearchSlice";
import { cn } from "@/lib/utils";

const TripTypeSelector = () => {
  const dispatch = useDispatch();
  const tripType = useSelector(
    (state: RootState) => state.flightSearch.tripType
  );

  const types = ["one_way", "round_way", "multi_way"];

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 mb-5">
      {types.map((type) => {
        const isActive = tripType === type;
        
        return (
          <button
            key={type}
            type="button"
            onClick={() => dispatch(setSearchField({ tripType: type }))}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-background text-muted-foreground border-input hover:border-primary hover:text-foreground"
            )}
          >
            {/* Custom Radio Icon */}
            <div
              className={cn(
                "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                isActive 
                  ? "border-primary-foreground bg-transparent" 
                  : "border-muted-foreground"
              )}
            >
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
              )}
            </div>

            {/* Label Formatting */}
            <span className="capitalize">
              {type.replace("_", "")}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TripTypeSelector;