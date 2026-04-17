import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import FlightDetailsCard from "./FlightDetailsCard";
import FlightDetailSearch from "./FlightDetailSearch";
import FlightFilter from "./FlightFilter";
import FlightTimer from "./FlightTimer";

const FlightDetailsMain = () => {
    const searchData = useSelector((state: RootState) => state.flightSearch);

    useEffect(() => {
        // Logging the full object and a clean table for readability
        console.log("✈️ Flight Search Data Loaded:", searchData);
        if (searchData.fromDest) {
            console.table({
                From: searchData.fromDest?.city_name,
                To: searchData.toDest?.city_name,
                Departure: searchData.departureDate,
                Trip: searchData.tripType,
                Class: searchData.flightClass
            });
        }
    }, [searchData]);

    return (
        <div className="mt-44 container mx-auto px-4"> 
            {/* Reduced mt-96 to mt-10 for better visibility, adjust as needed */}
            <FlightDetailSearch />
            <FlightTimer />
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                <div className="w-full lg:w-1/4">
                    <FlightFilter />
                </div>
                <div className="w-full lg:w-3/4">
                    <FlightDetailsCard />
                </div>
            </div>
        </div>
    );
};

export default FlightDetailsMain;