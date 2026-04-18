import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import FlightDetailsCard from "./FlightDetailsCard";
import FlightDetailSearch from "./FlightDetailSearch";
import FlightFilter from "./FlightFilter";
import FlightTimer from "./FlightTimer";

const FlightDetailsMain = () => {
  const searchData = useSelector((state: RootState) => state.flightSearch);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  useEffect(() => {
    // Logging the full object and a clean table for readability
    console.log("✈️ Flight Search Data Loaded:", searchData);
    if (searchData.fromDest) {
      console.table({
        From: searchData.fromDest?.city_name,
        To: searchData.toDest?.city_name,
        Departure: searchData.departureDate,
        Trip: searchData.tripType,
        Class: searchData.flightClass,
      });
    }
  }, [searchData]);

  return (
    <div className="mt-44 container mx-auto px-4 pb-20">
      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        {/* LEFT SIDE: Sidebar (Timer & Filter) */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <FlightTimer />
          <FlightFilter />
        </div>

        {/* RIGHT SIDE: Main Content Area */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          {/* Search Summary at the top */}
          <FlightDetailSearch />

          {/* Flight Results/Details below it */}
          <div className="space-y-4">
            <FlightDetailsCard />
            {/* If you have multiple cards, they will flow naturally here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsMain;
