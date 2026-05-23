import {
  CalendarDays,
  Hotel,
  MapPin,
  ReceiptText,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import type { HotelBookingItem } from "@/types/hotel/hotelBookingList.types";
import HotelBookingStatusBadge from "./HotelBookingStatusBadge";
import { useNavigate } from "react-router-dom";
type HotelBookingCardProps = {
  booking: HotelBookingItem;
};

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

const formatMoney = (amount?: number, currency?: string) => {
  if (amount === undefined || amount === null) return "N/A";

  return `${currency ?? "BDT"} ${Number(amount).toLocaleString()}`;
};

const getLeadGuestName = (booking: HotelBookingItem) => {
  const leadGuest = booking.guests?.find((guest) => guest.lead_guest);
  const firstGuest = booking.guests?.[0];

  return leadGuest?.name || firstGuest?.name || "Guest not available";
};

const HotelBookingCard = ({ booking }: HotelBookingCardProps) => {
  const hotel = booking.hotel;
  const pricing = booking.pricing;

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/dashboard/hotel-bookings/${booking.id}`);
  };

  return (
    <div className="rounded-2xl border bg-card p-4 text-card-foreground shadow-sm transition hover:border-primary/30 hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Hotel size={22} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold">
                {hotel?.name || "Hotel Name Not Available"}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span className="truncate">
                  {[hotel?.city, hotel?.country_code]
                    .filter(Boolean)
                    .join(", ") ||
                    hotel?.address ||
                    "Location not available"}
                </span>
              </div>

              {hotel?.chain_name && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {hotel.chain_name}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <InfoBox label="Booking Code" value={booking.booking_code} />
            <InfoBox label="PNR" value={booking.pnr} />
            <InfoBox
              label="Confirmation Number"
              value={booking.supplier_confirmation_number}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <SmallInfo
              icon={<CalendarDays size={16} />}
              label="Check In"
              value={formatDate(booking.check_in)}
            />

            <SmallInfo
              icon={<CalendarDays size={16} />}
              label="Check Out"
              value={formatDate(booking.check_out)}
            />

            <SmallInfo
              icon={<UsersRound size={16} />}
              label="Guests"
              value={`${booking.guest_count} guest(s), ${booking.room_count} room(s)`}
            />

            <SmallInfo
              icon={<WalletCards size={16} />}
              label="Total"
              value={formatMoney(pricing?.total_amount, pricing?.currency)}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <SmallInfo
              icon={<UserRound size={16} />}
              label="Lead Guest"
              value={getLeadGuestName(booking)}
            />

            <SmallInfo
              icon={<ReceiptText size={16} />}
              label="Payment Type"
              value={booking.payment_type || "N/A"}
            />

            <SmallInfo
              icon={<CalendarDays size={16} />}
              label="Created"
              value={formatDateTime(booking.created_at)}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 xl:max-w-[190px] xl:flex-col xl:items-end">
          <HotelBookingStatusBadge status={booking.status} />
          <HotelBookingStatusBadge
            status={booking.payment_status}
            type="payment"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleViewDetails}
        className="h-10 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        View Details
      </button>
    </div>
  );
};

type InfoBoxProps = {
  label: string;
  value?: string | null;
};

const InfoBox = ({ label, value }: InfoBoxProps) => {
  return (
    <div className="rounded-xl border bg-background px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold">{value || "N/A"}</p>
    </div>
  );
};

type SmallInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const SmallInfo = ({ icon, label, value }: SmallInfoProps) => {
  return (
    <div className="flex min-w-0 items-center gap-2 text-sm">
      <span className="shrink-0 text-primary">{icon}</span>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default HotelBookingCard;
