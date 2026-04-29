import AppSection from "@/components/AppSection";
import VideoBanner from "@/components/VideoBanner";
import CMCollection from "@/layouts/CommonHomeLayout/CMCollection";
import CMDestination from "@/layouts/CommonHomeLayout/CMDestination";
import CMPromotions from "@/layouts/CommonHomeLayout/CMPromotions";
import CMTourPackages from "@/layouts/CommonHomeLayout/CMTourPackages";
import type {
  TourCollection,
  TourDestination,
} from "@/types/flight/flightHome.types";
import { useLocation } from "react-router-dom";

interface Props {
  searchSection?: React.ReactNode;
  popularDests?: TourDestination[];
  dreamDests?: TourDestination[];
  showDestinations?: boolean;
}
const isHolidayPage = location.pathname.startsWith("/holiday");

const CommonHomeLayout = ({
  searchSection,
  popularDests = [],
  dreamDests = [],
  showDestinations = true,
}: Props) => {
  const location = useLocation();

  const isFlightPage = location.pathname.startsWith("/flight");
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="relative">
        <VideoBanner
          title="Welcome to Nusuki BD"
          subtitle="Book flights, visa & holiday packages at the best prices"
        />

        {searchSection}
      </div>

      <section
        className={`max-w-7xl mx-auto px-4 pt-96 mt-44 md:mt-0 ${
          isFlightPage ? "md:pt-32" : isHolidayPage ? "pt-72" : "md:pt-32" // default fallback
        }`}
      >
        <CMPromotions />
      </section>

      {showDestinations && (
        <>
          <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                Most Popular Destinations
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Discover new horizons and explore the world. Choose your ideal
                destinations across Asia, Europe, the Americas, Australia, and
                beyond with Nusuki.
              </p>
            </div>

            <CMDestination dests={popularDests} />
          </section>

          <section className="max-w-7xl mx-auto px-4">
            <CMCollection />
          </section>

          <section className="py-6 md:pb-16">
            <div className="max-w-7xl mx-auto px-4">
              <CMTourPackages />
            </div>
          </section>

          <section className="max-w-7xl mx-auto mt-5 lg:mt-0 px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                Dream Destinations
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Discover new horizons and explore the world. Choose your ideal
                destinations across the globe with our exclusive travel deals.
              </p>
            </div>

            <CMDestination dests={dreamDests} />
          </section>
        </>
      )}

      <section className="md:pt-20 lg:pt-24">
        <AppSection />
      </section>
    </div>
  );
};

export default CommonHomeLayout;
