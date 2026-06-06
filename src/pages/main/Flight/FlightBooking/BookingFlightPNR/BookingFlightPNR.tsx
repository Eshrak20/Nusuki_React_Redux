import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getProfileFromResponse,
  mapProfileToPnrForm,
} from "@/lib/pnrProfileMapper";

import PnrPageHeader from "./Pnr/PnrPageHeader";
import PnrMissingParamsAlert from "./Pnr/PnrMissingParamsAlert";
import BookingFlightPNRForm from "./Pnr/BookingFlightPNRForm";
import { useGetUserProfileQuery } from "@/redux/api/authApi/authApi";
import { useGetFlightDetailQuery } from "@/redux/api/fligtBookingApi/flightBookingApi";
import BookingStepIndicator from "./BookingStepIndicator";

const BookingFlightPNR = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const flightId = searchParams.get("flight_id") ?? "";
  const searchId = searchParams.get("search_id") ?? "";

  const { data: profileResponse, isLoading: isProfileLoading } =
    useGetUserProfileQuery();

  const { data: flightDetailResponse, isLoading: isFlightDetailLoading } =
    useGetFlightDetailQuery(
      {
        flight_id: flightId,
        search_id: searchId,
      },
      {
        skip: !flightId || !searchId,
      },
    );

  const initialForm = useMemo(() => {
    const profile = getProfileFromResponse(profileResponse);

    return mapProfileToPnrForm(profile);
  }, [profileResponse]);

  const documentRequirements =
    flightDetailResponse?.data?.document_requirements ??
    flightDetailResponse?.data?.flight?.document_requirements;

  const showPassportFields = documentRequirements
    ? documentRequirements.is_domestic === false
    : true;

  return (
    <div className="mt-24 min-h-screen bg-gray-200 py-4 text-foreground dark:bg-muted md:py-8">
      <div className="mx-auto max-w-7xl space-y-8 px-4">
        <BookingStepIndicator />

        <PnrPageHeader />

        <PnrMissingParamsAlert flightId={flightId} searchId={searchId} />

        {isProfileLoading || isFlightDetailLoading ? (
          <div className="rounded-sm border bg-card p-4 text-sm text-muted-foreground shadow-sm">
            Loading your booking information...
          </div>
        ) : (
          <BookingFlightPNRForm
            key={`${profileResponse?.data?.id ?? "guest"}-${flightId}-${searchId}-${showPassportFields}`}
            flightId={flightId}
            searchId={searchId}
            initialForm={initialForm}
            showPassportFields={showPassportFields}
            documentRequirementMessage={
              documentRequirements?.passport?.message
            }
          />
        )}
      </div>
    </div>
  );
};

export default BookingFlightPNR;