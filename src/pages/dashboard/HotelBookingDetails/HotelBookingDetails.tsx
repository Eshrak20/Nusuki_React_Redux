import {
  ArrowLeft,
  CalendarDays,
  Hotel,
  MapPin,
  Phone,
  ReceiptText,
  UsersRound,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelBookingDetailsQuery } from "@/redux/api/hotelApi/hotelApi";

import HotelBookingStatusBadge from "../HotelBookings/HotelBookingStatusBadge";
import HotelBookingDetailsSkeleton from "./HotelBookingDetailsSkeleton";
import HotelBookingDetailsError from "./HotelBookingDetailsError";
import HotelBookingInfoCard from "./HotelBookingInfoCard";
import HotelBookingGuestList from "./HotelBookingGuestList";
import HotelBookingPricingCard from "./HotelBookingPricingCard";

const formatDate = (date?: string | null) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
};

const formatDateTime = (date?: string | null) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const HotelBookingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isFetching, isError, refetch } =
    useGetHotelBookingDetailsQuery(id as string, {
      skip: !id,
    });

  const booking = data?.data;

  if (isLoading) {
    return <HotelBookingDetailsSkeleton />;
  }

  if (isError || !booking) {
    return <HotelBookingDetailsError onRetry={() => refetch()} />;
  }

  const hotel = booking.hotel;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex h-10 items-center gap-2 rounded-xl border bg-background px-4 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Hotel Booking Details
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Full overview of hotel booking #{booking.booking_code}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <HotelBookingStatusBadge status={booking.status} />
          <HotelBookingStatusBadge
            status={booking.payment_status}
            type="payment"
          />
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Hotel size={25} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold">
                {hotel?.name || "Hotel Name Not Available"}
              </h2>

              {hotel?.chain_name && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {hotel.chain_name}
                </p>
              )}

              <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  {hotel?.address ||
                    [hotel?.city, hotel?.country_code]
                      .filter(Boolean)
                      .join(", ") ||
                    "Location not available"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-10 rounded-xl border bg-background px-4 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HotelBookingInfoCard
          icon={<ReceiptText size={20} />}
          label="Booking Code"
          value={booking.booking_code}
        />

        <HotelBookingInfoCard
          icon={<ReceiptText size={20} />}
          label="PNR"
          value={booking.pnr}
        />

        <HotelBookingInfoCard
          icon={<CalendarDays size={20} />}
          label="Stay Date"
          value={`${formatDate(booking.check_in)} - ${formatDate(
            booking.check_out,
          )}`}
        />

        <HotelBookingInfoCard
          icon={<UsersRound size={20} />}
          label="Guests / Rooms"
          value={`${booking.guest_count} Guest(s), ${booking.room_count} Room(s)`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
            <h3 className="text-lg font-semibold">Booking Information</h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <DetailRow
                label="Supplier Confirmation"
                value={booking.supplier_confirmation_number}
              />

              <DetailRow label="Payment Type" value={booking.payment_type} />

              <DetailRow label="Search ID" value={booking.search_id} />

              <DetailRow label="Booking Key" value={booking.booking_key} />

              <DetailRow
                label="Created At"
                value={formatDateTime(booking.created_at)}
              />

              <DetailRow
                label="Support"
                value={`${booking.support_phone} (${booking.support_hours})`}
                icon={<Phone size={15} />}
              />
            </div>
          </div>

          <HotelBookingGuestList guests={booking.guests} />
        </div>

        <HotelBookingPricingCard pricing={booking.pricing} />
      </div>
    </div>
  );
};

type DetailRowProps = {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
};

const DetailRow = ({ label, value, icon }: DetailRowProps) => {
  return (
    <div className="rounded-xl border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>

      <div className="mt-1 flex min-w-0 items-center gap-2">
        {icon && <span className="shrink-0 text-primary">{icon}</span>}

        <p className="break-words text-sm font-semibold text-foreground">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default HotelBookingDetails;
