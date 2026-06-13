import { useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import type { RootState } from "@/redux/store";
import type { SearchDests } from "@/types/flight/flightHome.types";
import {
  resetFilters,
  resetFlightUiState,
  setSearchField,
} from "@/redux/features/flightSearchSlice";

import DepartureDate from "./DepartureDate";
import ReturnDate from "./ReturnDate";
import FareType from "./FareType";
import TripTypeSelector from "./TripTypeSelector";
import DestinationSelector from "./DestinationSelector";
import TravelerSection from "./TravelerSection";
import FlightClassDropdown from "./FlightClassDropdown";
import { buildFlightSearchPayload } from "../FlightDetail/flightDetails.helpers";

type DestinationSearchHandler = (
  keyword: string,
) => Promise<SearchDests[]> | SearchDests[];

interface FlightSearchProps {
  searchDests: SearchDests[];
  onSearchSubmit?: (
    payload: ReturnType<typeof buildFlightSearchPayload>,
  ) => void;
  onDestinationSearch?: DestinationSearchHandler;
}

const FlightSearch = ({
  searchDests,
  onSearchSubmit,
  onDestinationSearch,
}: FlightSearchProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchData = useSelector((state: RootState) => state.flightSearch);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMultiWay = searchData.tripType === "multi_way";

  const totalTravelers =
    (searchData?.travelers?.adults || 0) +
    (searchData?.travelers?.children?.length || 0) +
    (searchData?.travelers?.infants || 0);

  useEffect(() => {
    if (!searchData.fromDest && searchDests.length > 0) {
      dispatch(
        setSearchField({
          fromDest: searchDests[0],
          toDest: searchDests[1] ?? searchDests[0],
        }),
      );
    }
  }, [searchDests, searchData.fromDest, dispatch]);

  const handleSearch = () => {
    if (isMultiWay) {
      const incompleteIndex = searchData.segments.findIndex(
        (seg) => !seg.fromDest || !seg.toDest || !seg.departureDate,
      );

      if (incompleteIndex !== -1) {
        toast.error("Incomplete Flight Information", {
          description: `Flight #${incompleteIndex + 1} is missing route or date.`,
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

      if (!searchData.departureDate) {
        toast.error("Departure date missing", {
          description: "Please select a departure date.",
        });
        return;
      }

      if (searchData.tripType === "round_way" && !searchData.returnDate) {
        toast.error("Return date missing", {
          description: "Please select a return date.",
        });
        return;
      }
    }

    dispatch(resetFilters());
    dispatch(resetFlightUiState());

    const DEFAULT_PAGE_SIZE = 20;

    const requestBody = buildFlightSearchPayload({
      searchData,
      currentPage: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      sortBy: "price",
      sortOrder: "asc",
    });

    toast.success("Searching for flights...");

    if (onSearchSubmit) {
      onSearchSubmit(requestBody);
      return;
    }

    navigate("/flight/details", {
      state: { searchPayload: requestBody },
    });
  };

  if (!searchData || !searchData.travelers) return null;

  return (
    <div className="w-full bg-white dark:bg-slate-950 p-3 sm:p-4 md:p-6 rounded-sm shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <TripTypeSelector />

        <div className="flex gap-7 lg:items-start lg:gap-3 w-full md:w-auto mx-4 lg:mx-0">
          <TravelerSection totalTravelers={totalTravelers} />
          <FlightClassDropdown />
        </div>
      </div>

      {/* Search Row */}
      <div
        ref={dropdownRef}
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-2
          xl:flex
          items-stretch
          xl:items-center
          gap-2
          sm:gap-3
          mb-6
        "
      >
        {/* Destination */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:flex-1 min-w-0">
          <DestinationSelector
            searchDests={searchDests}
            onDestinationSearch={onDestinationSearch}
          />
        </div>

        {!isMultiWay && (
          <>
            {/* Departure */}
            <div className="col-span-1 min-w-0">
              <DepartureDate
                departureDate={searchData.departureDate}
                returnDate={searchData.returnDate}
                dispatch={dispatch}
                setSearchField={setSearchField}
              />
            </div>

            {/* Return */}
            <div className="col-span-1 min-w-0">
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

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="
            col-span-1
            sm:col-span-2
            lg:col-span-2
            xl:col-auto
            w-full
            h-12
            xl:w-14
            xl:h-14
            bg-primary
            hover:bg-primary/90
            dark:hover:bg-primary/80
            text-primary-foreground
            rounded-sm
            flex
            items-center
            justify-center
            transition-all
            duration-200
            shadow-lg
            active:scale-95
          "
        >
          <Search className="w-6 h-6" />
        </button>
      </div>

      <FareType
        fareType={searchData.fareType}
        onChange={(value) => dispatch(setSearchField({ fareType: value }))}
      />
    </div>
  );
};

export default FlightSearch;