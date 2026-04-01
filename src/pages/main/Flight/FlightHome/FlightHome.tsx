import AppSection from "@/components/AppSection";
import FlightDestination from "./FlightDestination";
import FlightPromotions from "./FlightPromotions";
import FlightTourPackages from "./FlightTourPackages";

const FlightHome = () => {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero / Destination */}
      <section className="max-w-7xl mx-auto px-4 pt-12 md:pt-16 lg:pt-20">
        <FlightDestination />
      </section>

      {/* Promotions */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <FlightPromotions />
      </section>

      {/* Tour Packages with soft background */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <FlightTourPackages />
        </div>
      </section>

      {/* App CTA (final section, more breathing space) */}
      <section className="pt-16 md:pt-20 lg:pt-24">
        <AppSection />
      </section>
    </div>
  );
};

export default FlightHome;
