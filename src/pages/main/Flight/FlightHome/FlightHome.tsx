import AppSection from "@/components/AppSection";
import FlightDestination from "./FlightDestination";
import FlightPromotions from "./FlightPromotions";
import FlightTourPackages from "./FlightTourPackages";
import { useFlightDestinationListsQuery } from "@/redux/api/flightApi/flightDest";
import FlightCollection from "./FlightCollection";
import FlightHomeSkeleton from "@/components/skeletons/FlightHomeSkeleton";

const FlightHome = () => {

  const { data, isLoading, error } = useFlightDestinationListsQuery();

  if (isLoading) return <FlightHomeSkeleton />;
  if (error) return <div className="py-20 text-center text-destructive">Error loading destinations</div>;

  const destinations = data?.data?.data || [];
  const popularDests = destinations.filter(destination => destination.is_popular === "1")
  const dreamDests = destinations.filter(destination => destination.is_dream === "1")

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Promotions */}
      <section className="max-w-7xl mx-auto px-4 pt-12 md:pt-16 lg:pt-32">
        <FlightPromotions />
      </section>

      {/* Hero / Destination */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Most Popular Destinations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Discover new horizons and explore the world. Choose your ideal destinations across Asia, Europe, the Americas, Australia, and beyond with Nusuki.
          </p>
        </div>
        <FlightDestination dests={popularDests} />
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <FlightCollection />
      </section>

      {/* Tour Packages with soft background */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <FlightTourPackages />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Dream Destinations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Discover new horizons and explore the world. Choose your ideal destinations across the globe with our exclusive travel deals.
          </p>
        </div>
        <FlightDestination dests={dreamDests} />
      </section>

      <section className="pt-16 md:pt-20 lg:pt-24">
        <AppSection />
      </section>
    </div>
  );
};

export default FlightHome;
