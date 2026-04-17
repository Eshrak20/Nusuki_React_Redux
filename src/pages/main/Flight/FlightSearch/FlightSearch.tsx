import { useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
import FlightClassDropdown from "./FlightClassSelector";

interface FlightSearchProps {
  searchDests: SearchDests[];
}

const FlightSearch = ({ searchDests }: FlightSearchProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const searchData = useSelector((state: RootState) => state.flightSearch);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMultiWay = searchData.tripType === "multi-way";

  const totalTravelers =
    (searchData?.travelers?.adults || 0) +
    (searchData?.travelers?.children || 0) +
    (searchData?.travelers?.kids || 0) +
    (searchData?.travelers?.infants || 0);

  useEffect(() => {
    if (!searchData.fromDest && searchDests.length > 0) {
      dispatch(
        setSearchField({ fromDest: searchDests[0], toDest: searchDests[1] }),
      );
    }
  }, [searchDests, searchData.fromDest, dispatch]);

  // --- Search Handler ---
  const handleSearch = () => {
    // 1. Basic Validation (Optional but recommended)
    if (!searchData.fromDest || !searchData.toDest) {
      alert("Please select both origin and destination");
      return;
    }

    // 2. Redirect to flight-details
    // Since your route is a child of the current route, use a relative path 
    // or absolute path "/flight-details" depending on your App.tsx setup.
    navigate("flight-details");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch lg:items-center gap-2 sm:gap-3 mb-6" ref={dropdownRef}>
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

        {/* Search Button Linked to Handler */}
        <button
          onClick={handleSearch}
          className="col-span-1 sm:col-span-2 lg:w-14 lg:h-14 w-full h-12 bg-primary hover:opacity-90 text-white rounded-md lg:rounded-xl flex items-center justify-center transition-colors shadow-lg"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Row */}
      <FareType
        fareType={searchData.fareType}
        onChange={(value) => dispatch(setSearchField({ fareType: value }))}
      />
    </div>
  );
};

export default FlightSearch;