import {
  CalendarDays,
  Hotel,
  MapPin,
  ReceiptText,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { HotelBookingItem } from "@/types/hotel/hotelBookingList.types";
import HotelBookingStatusBadge from "./HotelBookingStatusBadge";
import { formatStatus } from "@/lib/util.hotel";

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
  const navigate = useNavigate();

  const hotel = booking.hotel;
  const pricing = booking.pricing;

  const handleViewDetails = () => {
    navigate(`/dashboard/hotel-bookings/${booking.id}`);
  };

  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md">
      <div className="p-4 sm:p-5">
        {/* Top section */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Hotel size={22} />
            </div>

            <div className="min-w-0">
              <h3 className="line-clamp-1 text-base font-semibold text-foreground sm:text-lg">
                {hotel?.name || "Hotel Name Not Available"}
              </h3>

              <div className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin size={14} className="shrink-0" />
                <span className="line-clamp-1">
                  {[hotel?.city, hotel?.country_code].filter(Boolean).join(", ") ||
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

          <div className="flex shrink-0 flex-wrap gap-2 lg:flex-col lg:items-end">
            <HotelBookingStatusBadge status={booking.status} />
            <HotelBookingStatusBadge
              status={booking.payment_status}
              type="payment"
            />
          </div>
        </div>

        {/* Booking identity boxes */}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <InfoBox label="Booking Code" value={booking.booking_code} />
          <InfoBox label="PNR" value={booking.pnr} />
          <InfoBox
            label="Confirmation Number"
            value={booking.supplier_confirmation_number}
          />
        </div>

        {/* Details info grid */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
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

          <SmallInfo
            icon={<UserRound size={16} />}
            label="Lead Guest"
            value={getLeadGuestName(booking)}
          />

          <SmallInfo
            icon={<ReceiptText size={16} />} 
            label="Payment Type"
            value={formatStatus(booking.payment_type) || "N/A"}
          />

          <SmallInfo
            icon={<CalendarDays size={16} />}
            label="Created"
            value={formatDateTime(booking.created_at)}
            className="sm:col-span-2 xl:col-span-2"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end border-t border-border bg-muted/30 px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={handleViewDetails}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelBookingCard;

type InfoBoxProps = {
  label: string;
  value?: string | null;
};

const InfoBox = ({ label, value }: InfoBoxProps) => {
  return (
    <div className="min-h-17.5 rounded-xl border border-border bg-background px-3 py-2.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 wrap-break-word text-sm font-semibold leading-5 text-foreground">
        {value || "N/A"}
      </p>
    </div>
  );
};

type SmallInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
};

const SmallInfo = ({ icon, label, value, className = "" }: SmallInfoProps) => {
  return (
    <div
      className={`flex min-h-14.5 min-w-0 items-center gap-3 rounded-xl bg-background/70 px-3 py-2.5 ${className}`}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-0.5 line-clamp-1 text-sm font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
};