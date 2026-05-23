import type { HotelBookingResponse } from "@/types/hotel/hotelBooking.types";
import { Link, useLocation, useNavigate } from "react-router-dom";


const HotelPNRSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const response = location.state as HotelBookingResponse | null;
  const booking = response?.data?.booking;

  if (!booking) {
    return (
      <section className="min-h-screen bg-background px-4 py-10 text-foreground">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          <h1 className="text-xl font-semibold">No booking data found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please create a booking first.
          </p>

          <button
            onClick={() => navigate("/hotel")}
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Back to Hotel
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          <p className="text-sm font-medium text-primary">Booking Successful</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Your hotel booking has been created
          </h1>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoBox label="PNR" value={booking.pnr} />
            <InfoBox label="Booking Code" value={booking.booking_code} />
            <InfoBox
              label="Confirmation No"
              value={booking.supplier_confirmation_number}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
            <h2 className="text-lg font-semibold">Hotel Details</h2>

            <div className="mt-4 space-y-3 text-sm">
              <InfoRow label="Hotel" value={booking.hotel.name} />
              <InfoRow label="Chain" value={booking.hotel.chain_name || "N/A"} />
              <InfoRow label="City" value={booking.hotel.city} />
              <InfoRow label="Country" value={booking.hotel.country_code} />
              <InfoRow label="Address" value={booking.hotel.address} />
              <InfoRow label="Check In" value={booking.check_in} />
              <InfoRow label="Check Out" value={booking.check_out} />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
            <h2 className="text-lg font-semibold">Payment & Pricing</h2>

            <div className="mt-4 space-y-3 text-sm">
              <InfoRow label="Status" value={booking.status} />
              <InfoRow label="Payment Status" value={booking.payment_status} />
              <InfoRow label="Payment Type" value={booking.payment_type} />
              <InfoRow
                label="Total"
                value={`${booking.pricing.currency} ${booking.pricing.total_amount}`}
              />
              <InfoRow
                label="Base Amount"
                value={`${booking.pricing.currency} ${booking.pricing.base_amount}`}
              />
              <InfoRow
                label="Tax Amount"
                value={`${booking.pricing.currency} ${booking.pricing.tax_amount}`}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold">Guests</h2>

          <div className="mt-4 overflow-hidden rounded-2xl border">
            <div className="grid grid-cols-4 bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground">
              <span>Name</span>
              <span>Type</span>
              <span>Email</span>
              <span>Lead Guest</span>
            </div>

            {booking.guests.map((guest) => (
              <div
                key={guest.guest_index}
                className="grid grid-cols-4 gap-3 border-t px-4 py-3 text-sm"
              >
                <span>{guest.name}</span>
                <span className="capitalize">{guest.type}</span>
                <span className="break-all">{guest.email || "N/A"}</span>
                <span>{guest.lead_guest ? "Yes" : "No"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/hotel"
            className="inline-flex h-11 items-center justify-center rounded-xl border px-5 text-sm font-semibold transition hover:bg-muted"
          >
            Back to Hotel
          </Link>

          <button
            onClick={() => window.print()}
            className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Print Booking
          </button>
        </div>
      </div>
    </section>
  );
};

const InfoBox = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 break-all text-lg font-bold">{value}</p>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between gap-4 border-b pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
};

export default HotelPNRSuccess;