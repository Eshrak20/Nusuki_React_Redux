import { PlaneTakeoff } from "lucide-react";

const FlightBookingEmptyState = () => {
  return (
    <div className="flex min-h-90 flex-col items-center justify-center rounded-sm border border-dashed bg-card p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <PlaneTakeoff className="h-8 w-8" />
      </div>

      <h3 className="mt-5 text-xl font-bold text-foreground">
        No flight bookings found
      </h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Your booked flights will appear here after you create a flight booking.
      </p>
    </div>
  );
};

export default FlightBookingEmptyState;