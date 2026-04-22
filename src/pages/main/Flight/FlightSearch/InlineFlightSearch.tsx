import { useFlightSearchListsQuery } from "@/redux/api/flightApi/flightSearch";
import FlightSearch from "./FlightSearch";

const InlineFlightSearch = () => {
  const { data: searchList, isLoading } = useFlightSearchListsQuery();
  const searchDestinationList = searchList?.data?.data || [];

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm text-muted-foreground">Loading search options...</p>
      </div>
    );
  }

  return <FlightSearch searchDests={searchDestinationList} />;
};

export default InlineFlightSearch;