/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import { Search } from "lucide-react"; // Added AlertCircle for icons
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Assuming you use Shadcn (which uses Sonner)

import type { RootState } from "@/redux/store";
import type { SearchDests } from "@/types/flight/flightHome.types";
import { setSearchField } from "@/redux/features/flightSearchSlice";

// Components
import DepartureDate from "./DepartureDate";
import ReturnDate from "./ReturnDate";
import FareType from "./FareType";
import TripTypeSelector from "./TripTypeSelector";
import DestinationSelector from "./DestinationSelector";
import TravelerSection from "./TravelerSection";
import FlightClassDropdown from "./FlightClassDropdown";
import { formatApiDate } from "@/lib/utils";

interface FlightSearchProps {
  searchDests: SearchDests[];
}

const FlightSearch = ({ searchDests }: FlightSearchProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchData = useSelector((state: RootState) => state.flightSearch);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMultiWay = searchData.tripType === "multi-way";

  const totalTravelers =
    (searchData?.travelers?.adults || 0) +
    (searchData?.travelers?.children?.length || 0) + // Use .length here
    (searchData?.travelers?.infants || 0);

  useEffect(() => {
    if (!searchData.fromDest && searchDests.length > 0) {
      dispatch(
        setSearchField({ fromDest: searchDests[0], toDest: searchDests[1] }),
      );
    }
  }, [searchDests, searchData.fromDest, dispatch]);

  const handleSearch = () => {
    // --- Validation ---
    if (isMultiWay) {
      const incompleteIndex = searchData.segments.findIndex(
        (seg) => !seg.fromDest || !seg.toDest,
      );
      if (incompleteIndex !== -1) {
        toast.error(`Incomplete Flight Information`, {
          description: `Flight #${incompleteIndex + 1} is missing a destination.`,
        });
        return;
      }
    } else {
      if (!searchData.fromDest || !searchData.toDest) {
        toast.error("Where are you flying?", {
          description: "Please select both departure and arrival airports.",
        });
        return;
      }
    }

    // --- Construct the API Body ---
    const requestBody: any = {
      trip_type: searchData.tripType.replace("-", "_"), // "one-way" -> "one_way"
      fare_type: searchData.fareType,
      adults: searchData.travelers.adults,
      children: searchData.travelers.children,
      infants: searchData.travelers.infants,
      cabin: searchData.flightClass,
      max_stops: 0,
      page: 1,
      size: 20,
      sort_by: "price",
      sort_order: "asc",
      refundability: [],
      stops: [],
      airlines: [],
      layover_cities: [],
      flight_schedule_departure: [],
      flight_schedule_arrival: [],
      aircraft: [],
      price_min: null,
      price_max: null,
      layover_duration_min: null,
      layover_duration_max: null,
    };

    // --- Add Trip-Specific Segments ---
    if (isMultiWay) {
      requestBody.segments = searchData.segments.map((seg) => ({
        origin: seg.fromDest?.iata_code,
        destination: seg.toDest?.iata_code,
        departure_date: formatApiDate(seg.departureDate),
      }));
    } else {
      requestBody.origin = searchData.fromDest?.iata_code;
      requestBody.destination = searchData.toDest?.iata_code;
      requestBody.departure_date = formatApiDate(searchData.departureDate);

      if (searchData.tripType === "round-way") {
        requestBody.return_date = formatApiDate(searchData.returnDate);
      }
    }

    // --- Execution ---
    toast.success("Searching for flights...");
    // Option A: Pass data to the next page via state
    navigate("/flight/details", { state: { searchPayload: requestBody } });

    // Option B: If you're calling the API here directly
    // console.log("Final API Body:", JSON.stringify(requestBody, null, 2));
  };
  
  if (!searchData || !searchData.travelers) return null;

  return (
    <div className="w-full bg-white dark:bg-slate-950 p-3 sm:p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <TripTypeSelector />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          <TravelerSection totalTravelers={totalTravelers} />
          <FlightClassDropdown />
        </div>
      </div>

      {/* Middle Row */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch lg:items-center gap-2 sm:gap-3 mb-6"
        ref={dropdownRef}
      >
        <div className="col-span-1 sm:col-span-2 lg:flex-1">
          <DestinationSelector searchDests={searchDests} />
        </div>

        {!isMultiWay && (
          <>
            <div className="col-span-1 min-w-40">
              <DepartureDate
                departureDate={searchData.departureDate}
                returnDate={searchData.returnDate}
                dispatch={dispatch}
                setSearchField={setSearchField}
              />
            </div>
            <div className="col-span-1 min-w-40">
              <ReturnDate
                departureDate={searchData.departureDate}
                returnDate={searchData.returnDate}
                tripType={searchData.tripType}
                dispatch={dispatch}
                setSearchField={setSearchField}
              />
            </div>
          </>
        )}

        <button
          onClick={handleSearch}
          className="col-span-1 sm:col-span-2 w-full h-12 lg:w-14 lg:h-14 bg-primary hover:bg-primary/90 dark:hover:bg-primary/80 text-primary-foreground rounded-md lg:rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>

      <FareType
        fareType={searchData.fareType}
        onChange={(value) => dispatch(setSearchField({ fareType: value }))}
        // No extra logic needed here now!
      />
    </div>
  );
};

export default FlightSearch;
