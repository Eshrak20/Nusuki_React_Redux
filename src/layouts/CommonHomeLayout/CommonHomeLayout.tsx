import AppSection from "@/components/AppSection";
import VideoBanner from "@/components/VideoBanner";
import CMCollection from "@/layouts/CommonHomeLayout/CMCollection";
import CMDestination from "@/layouts/CommonHomeLayout/CMDestination";
import CMPromotions from "@/layouts/CommonHomeLayout/CMPromotions";
import CMTourPackages from "@/layouts/CommonHomeLayout/CMTourPackages";
import type { TourDestination } from "@/types/flight/flightHome.types";
import { useLocation } from "react-router-dom";

interface Props {
  searchSection?: React.ReactNode;
  popularDests?: TourDestination[];
  dreamDests?: TourDestination[];
  showDestinations?: boolean;
}

const CommonHomeLayout = ({
  searchSection,
  popularDests = [],
  dreamDests = [],
  showDestinations = true,
}: Props) => {
  const location = useLocation();

  const isFlightPage = location.pathname.startsWith("/flight");
  const isHolidayPage = location.pathname.startsWith("/holiday");
  const isHotelPage = location.pathname.startsWith("/hotel");

  const promotionTopSpacing = isFlightPage
    ? "pt-28 md:pt-32"
    : isHolidayPage
      ? "pt-24 md:pt-28"
      : isHotelPage
        ? "pt-20 md:pt-24"
        : "pt-28 md:pt-36";

  const sectionContainer = "mx-auto w-full px-4 md:max-w-4xl 2xl:max-w-7xl";

  return (
    <main className="bg-gray-100 text-slate-900 dark:bg-gray-950 dark:text-white">
      <section className="relative">
        <VideoBanner
          title="Welcome to Nusuki"
          subtitle="Find Flights, Hotels, Visa & Holidays"
        />

        {searchSection && (
          <div className="absolute left-1/2 -top-20 z-20 w-full px-4 md:max-w-4xl 2xl:max-w-6xl -translate-x-1/2 md:-top-20">
            {searchSection}
          </div>
        )}
      </section>

      <section
        className={`${sectionContainer} mt-110 md:mt-0 ${promotionTopSpacing}`}
      >
        <CMPromotions />
      </section>

      {showDestinations && (
        <>
          <section className={`${sectionContainer} py-10`}>
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                Most Popular Destinations
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
                Discover new horizons and explore the world with Nusuki.
              </p>
            </div>

            <CMDestination dests={popularDests} />
          </section>

          <section className={`${sectionContainer} py-8`}>
            <CMCollection />
          </section>

          <section className={`${sectionContainer} py-8`}>
            <CMTourPackages />
          </section>

          <section className={`${sectionContainer} py-10`}>
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                Dream Destinations
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
                Explore beautiful destinations with exclusive travel deals.
              </p>
            </div>

            <CMDestination dests={dreamDests} />
          </section>
        </>
      )}

      <section className="pt-10 md:pt-16">
        <AppSection />
      </section>
    </main>
  );
};

export default CommonHomeLayout;