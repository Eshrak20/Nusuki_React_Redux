/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Users, ArrowRight } from "lucide-react";

const FlightDetailSearch = () => {
  const searchData = useSelector((state: RootState) => state.flightSearch);
  const isMultiWay = searchData.tripType === "multi-way";

  // If it's multi-way, we expect an array. If not, we wrap the single flight in an array.
  // Note: Check if your Redux actually has a 'segments' array. 
  // If not, you need to update your search bar to dispatch an array for multi-way.
  const flights = isMultiWay && searchData.segments 
    ? searchData.segments 
    : [searchData];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "---";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch">
        
        {/* FLIGHT SEGMENTS SECTION */}
        <div className="flex-1 p-5 flex flex-wrap gap-y-4 gap-x-8 items-center">
          {flights.map((flight: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
              {/* Index Circle for Multi-way */}
              {isMultiWay && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">
                  {index + 1}
                </span>
              )}
              
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-lg font-black text-primary leading-none">
                    {flight.fromDest?.iata_code || "---"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {formatDate(flight.departureDate)}
                  </span>
                </div>

                <ArrowRight className="w-3 h-3 text-slate-300" />

                <div className="flex flex-col">
                  <span className="text-lg font-black text-primary leading-none">
                    {flight.toDest?.iata_code || "---"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {flight.toDest?.city_name}
                  </span>
                </div>
              </div>

              {/* Add a divider between segments if not the last one */}
              {index < flights.length - 1 && (
                <div className="hidden lg:block h-8 w-[1px] bg-slate-200 dark:bg-slate-800 ml-4" />
              )}
            </div>
          ))}
        </div>

        {/* SUMMARY & ACTION SECTION */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 flex items-center gap-6 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-slate-400" />
            <div className="leading-tight">
              <p className="text-[10px] uppercase font-bold text-slate-400">Class</p>
              <p className="text-xs font-bold truncate max-w-[80px]">{searchData.flightClass}</p>
            </div>
          </div>

          <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all whitespace-nowrap">
            Modify
          </button>
        </div>

      </div>
    </div>
  );
};

export default FlightDetailSearch;