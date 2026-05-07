import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetFlightBookingDetailsQuery } from "@/redux/api/fligtBookingApi/flightBookingApi";
import FlightBookingDetailsHeader from "./FlightBookingDetailsHeader";
import FlightBookingDetailsSkeleton from "@/components/skeletons/FlightBookingDetailsSkeleton";
import BookingOverviewCard from "./BookingOverviewCard";
import BookingSegmentsCard from "./BookingSegmentsCard";
import BookingPricingCard from "./BookingPricingCard";
import BookingTicketsCard from "./BookingTicketsCard";
import BookingPassengersCard from "./BookingPassengersCard";

const FlightBookingDetails = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const numericBookingId = Number(bookingId);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetFlightBookingDetailsQuery(numericBookingId, {
      skip: !numericBookingId,
    });

  const booking = data?.data;

  if (!numericBookingId) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-center">
        <h2 className="text-xl font-bold text-destructive">
          Invalid booking ID
        </h2>

        <Button asChild className="mt-4 rounded-xl">
          <Link to="/dashboard/flight-bookings">Back to Bookings</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <FlightBookingDetailsHeader
        booking={booking}
        isFetching={isFetching}
        onBack={navigate}
        onRefresh={refetch}
      />

      {isLoading ? <FlightBookingDetailsSkeleton /> : null}

      {isError ? (
        <Card className="rounded-2xl border-destructive/20 bg-destructive/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold text-destructive">
              Failed to load booking details
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Please try again or check if this booking exists.
            </p>

            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-4 rounded-xl"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {!isLoading && !isError && booking ? (
        <>
          <BookingOverviewCard booking={booking} />

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <BookingSegmentsCard segments={booking.segments} />

            <div className="space-y-6">
              <BookingPricingCard pricing={booking.pricing} />
              <BookingTicketsCard tickets={booking.tickets} />
            </div>
          </div>

          <BookingPassengersCard passengers={booking.passengers} />
        </>
      ) : null}
    </section>
  );
};

export default FlightBookingDetails;