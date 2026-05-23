import FlightHomeSkeleton from "@/components/skeletons/FlightHomeSkeleton";
import CommonHomeLayout from "@/layouts/CommonHomeLayout/CommonHomeLayout";
import { useFlightDestinationListsQuery } from "@/redux/api/flightApi/flightDest";
import { useEffect } from "react";
import HotelSearch from "./HotelSearch/HotelSearch";

const HotelHome = () => {

  const { data, isLoading, error } = useFlightDestinationListsQuery();

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
    <>
      <CommonHomeLayout
        popularDests={popularDests}
        dreamDests={dreamDests}
        searchSection={
          <div className="absolute top-70 left-0 right-0 bottom-0 translate-y-1/2 z-20">
            <section className="max-w-screen-2xl mx-auto lg:px-8">
              <HotelSearch />
            </section>
          </div>
        }
      />
    </>
  );
};

export default HotelHome;
