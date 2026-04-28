import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useGetTourPackageDetailsQuery } from "@/redux/api/holidayApi/holidayApi";

import HolidayHero from "./HolidayHero";
import HolidayInfoAccordion from "./HolidayInfoAccordion";
import HolidayOfferSidebar from "./HolidayOfferSidebar";
import HolidayImageGallery from "./HolidayImageGallery";

const HolidayDetails = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const { tourPacId } = useParams();
  const { data, isLoading, isError } = useGetTourPackageDetailsQuery(
    tourPacId!,
    {
      skip: !tourPacId,
    },
  );

  const details = data?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading holiday details...
      </div>
    );
  }

  if (isError || !details) {
    return (
      <div className="py-24 text-center text-destructive">
        Failed to load holiday details.
      </div>
    );
  }

  const infoItems = [
    {
      title: "Highlights",
      content: details.highlights,
    },
    {
      title: "Itinerary",
      content: details.itinerary,
    },
    {
      title: "Pickup Note",
      content: details.pickup_note,
    },
    {
      title: "Cancellation Policy",
      content: details.cancelation_policy,
    },
    {
      title: "Tax",
      content: details.tax,
    },
    {
      title: "Included Service",
      content: details.included_service,
    },
    {
      title: "Excluded Service",
      content: details.excluded_service,
    },
    {
      title: "General Condition",
      content: details.general_condition,
    },
    {
      title: "Equated Monthly Installment",
      content: details.equated_monthly_installment,
    },
  ];

  return (
    <>
      <section className="mx-auto mt-20 max-w-7xl px-4 py-8">
        <HolidayImageGallery
          images={details.images || []}
          title={details.name}
        />

        <div className="mt-8">
          <HolidayHero
            name={details.name}
            cityName={details.city_name}
            countryName={details.country_name}
            durationDays={details.duration_days}
          />
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0">
            <HolidayInfoAccordion items={infoItems} />
          </div>

          <HolidayOfferSidebar offers={details.offers || []} />
        </div>
      </section>
    </>
  );
};

export default HolidayDetails;
