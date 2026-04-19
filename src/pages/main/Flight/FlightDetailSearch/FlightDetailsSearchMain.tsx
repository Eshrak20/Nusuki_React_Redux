import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import FlightDetailsCard from "./FlightDetailsCard";
import FlightDetailSearch from "./FlightDetailSearch";
import FlightFilter from "./FlightFilter";
import FlightTimer from "./FlightTimer";
import { useFlightSearchTicketListsQuery } from "@/redux/api/flightApi/flightSearch";

const FlightDetailsMain = () => {
  const searchData = useSelector((state: RootState) => state.flightSearch);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // --- Helper: Transform Redux State to API Payload ---
  const apiPayload = useMemo(() => {
    const formatDate = (isoString: string) =>
      isoString ? isoString.split("T")[0] : "";

    const mapCabin = (cls: string) => {
      const mapping: Record<string, string> = {
        Economy: "Y",
        "Premium Economy": "S",
        "Business Class": "C",
        "First Class": "F",
      };
      return mapping[cls] || "Y";
    };

    // 1. Shared Base Payload
    const basePayload: any = {
      fare_type: searchData.fareType || "regular",
      adults: searchData.travelers?.adults || 1,
      children:
        (searchData.travelers?.children || 0) +
        (searchData.travelers?.kids || 0),
      infants: searchData.travelers?.infants || 0,
      cabin: mapCabin(searchData.flightClass),
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

    // 2. Conditional Logic based on Trip Type
    if (searchData.tripType === "multi-way") {
      // --- MULTI WAY STRUCTURE ---
      basePayload.trip_type = "multi_way"; // Ensure underscore
      basePayload.segments = searchData.segments.map((seg) => ({
        origin: seg.fromDest?.iata_code,
        destination: seg.toDest?.iata_code,
        departure_date: formatDate(seg.departureDate),
      }));

      // CRITICAL: For multi-way, ensure the top-level flight keys are NOT present
      delete basePayload.origin;
      delete basePayload.destination;
      delete basePayload.departure_date;
      delete basePayload.return_date;
    } else {
      // --- ONE WAY / ROUND WAY STRUCTURE ---
      basePayload.trip_type = searchData.tripType.replace("-", "_");
      basePayload.origin = searchData.fromDest?.iata_code;
      basePayload.destination = searchData.toDest?.iata_code;
      basePayload.departure_date = formatDate(searchData.departureDate);

      if (searchData.tripType === "round-way") {
        basePayload.return_date = formatDate(searchData.returnDate);
      }
    }

    return basePayload;
  }, [searchData]);

  // 2. Prevent the 422 by skipping the query if payload is null
  const { data, isLoading } = useFlightSearchTicketListsQuery(apiPayload, {
    skip:
      searchData.tripType === "multi-way"
        ? !searchData.segments[0]?.fromDest // Skip if multi-way segments are empty
        : !searchData.fromDest, // Skip if one-way data is empty
  });
  console.log(data);

  return (
    <div className="mt-44 container mx-auto px-4 pb-20">
      <div className="mt-44 container mx-auto px-4 pb-20">
        {/* ... filter and list components ... */}
        {isLoading ? (
          <p>Loading flights...</p>
        ) : (
          <p>Found {data?.length} flights</p>
        )}
      </div>
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
