import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getProfileFromResponse,
  mapProfileToPnrForm,
} from "@/lib/pnrProfileMapper";

import PnrPageHeader from "./Pnr/PnrPageHeader";
import PnrMissingParamsAlert from "./Pnr/PnrMissingParamsAlert";
import BookingFlightPNRForm from "./Pnr/BookingFlightPNRForm";
import { useGetUserProfileQuery } from "@/redux/api/authApi/authApi";
import BookingStepIndicator from "./BookingStepIndicator";

const BookingFlightPNR = () => {
  const [searchParams] = useSearchParams();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const flightId = searchParams.get("flight_id") ?? "";
  const searchId = searchParams.get("search_id") ?? "";

  const { data: profileResponse, isLoading: isProfileLoading } =
    useGetUserProfileQuery();

  const initialForm = useMemo(() => {
    const profile = getProfileFromResponse(profileResponse);

    return mapProfileToPnrForm(profile);
  }, [profileResponse]);

  return (
    <>
      <div className="mt-24 min-h-screen bg-background py-4 text-foreground md:py-8">
        <div className="mx-auto max-w-7xl space-y-8 px-4">
          <BookingStepIndicator />

          <PnrPageHeader />

          <PnrMissingParamsAlert flightId={flightId} searchId={searchId} />

          {isProfileLoading ? (
            <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground shadow-sm">
              Loading your profile information...
            </div>
          ) : (
            <BookingFlightPNRForm
              key={`${profileResponse?.data?.id ?? "guest"}-${flightId}-${searchId}`}
              flightId={flightId}
              searchId={searchId}
              initialForm={initialForm}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BookingFlightPNR;
