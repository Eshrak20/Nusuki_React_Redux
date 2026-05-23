import { Hotel } from "lucide-react";

const HotelBookingEmptyState = () => {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border bg-card p-6 text-center text-card-foreground shadow-sm">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Hotel size={28} />
      </div>

      <h3 className="mt-4 text-lg font-semibold">No hotel bookings found</h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Your hotel booking list is empty right now. Once a hotel PNR is created,
        it will appear here.
      </p>
    </div>
  );
};

export default HotelBookingEmptyState;