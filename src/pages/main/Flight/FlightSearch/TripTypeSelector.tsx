import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setSearchField } from "@/redux/features/flightSearchSlice";

const TripTypeSelector = () => {
  const dispatch = useDispatch();
  const tripType = useSelector(
    (state: RootState) => state.flightSearch.tripType
  );

  const types = ["one-way", "round-way", "multi-way"];

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 mb-5">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => dispatch(setSearchField({ tripType: type }))}
          className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
            tripType === type
              ? "bg-primary text-white border-primary"
              : "bg-transparent text-slate-700 dark:text-primary border-slate-300"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              tripType === type ? "dark:bg-black border-white" : "border-slate-400"
            }`}
          >
            {tripType === type && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>

          {type
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")}
        </button>
      ))}
    </div>
  );
};

export default TripTypeSelector;