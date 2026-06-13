import { useCallback, useEffect } from "react";

import FlightHomeSkeleton from "@/components/skeletons/FlightHomeSkeleton";
import FlightSearch from "../FlightSearch/FlightSearch";
import CommonHomeLayout from "@/layouts/CommonHomeLayout/CommonHomeLayout";

import { useFlightDestinationListsQuery } from "@/redux/api/flightApi/flightDest";
import {
  useFlightSearchListsQuery,
  useLazyFlightSearchListsQuery,
} from "@/redux/api/flightApi/flightSearch";

import type { SearchDests } from "@/types/flight/flightHome.types";

const getAirportList = (payload: unknown): SearchDests[] => {
  const response = payload as {
    data?: {
      data?: SearchDests[];
      items?: SearchDests[];
    };
  };

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  if (Array.isArray(response?.data?.items)) {
    return response.data.items;
  }

  return [];
};

const FlightHome = () => {
  const { data: searchList } = useFlightSearchListsQuery({
    page: 1,
    size: 1000000000,
  });

  const [triggerAirportSearch] = useLazyFlightSearchListsQuery();

  const searchDestinationList = getAirportList(searchList);

  const { data, isLoading, error } = useFlightDestinationListsQuery();

  const handleDestinationSearch = useCallback(
    async (keyword: string): Promise<SearchDests[]> => {
      const response = await triggerAirportSearch({
        page: 1,
        size: 20,
        search: keyword,
      }).unwrap();

      return getAirportList(response);
    },
    [triggerAirportSearch],
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) return <FlightHomeSkeleton />;

  if (error) {
    return (
      <div className="pt-44 pb-20 text-center text-destructive">
        Error loading destinations
      </div>
    );
  }

  const destinations = data?.data?.data || [];

  const popularDests = destinations.filter(
    (destination) => destination.is_popular === "1",
  );

  const dreamDests = destinations.filter(
    (destination) => destination.is_dream === "1",
  );

  return (
    <CommonHomeLayout
      popularDests={popularDests}
      dreamDests={dreamDests}
      searchSection={
        <div className="absolute top-70 left-0 right-0 bottom-0 translate-y-1/2 z-20">
          <section className="max-w-screen-2xl mx-auto lg:px-8">
            <FlightSearch
              searchDests={searchDestinationList}
              onDestinationSearch={handleDestinationSearch}
            />
          </section>
        </div>
      }
    />
  );
};

export default FlightHome;