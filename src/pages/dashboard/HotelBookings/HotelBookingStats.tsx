import { BadgeCheck, BedDouble, CreditCard, ReceiptText } from "lucide-react";
import type { HotelBookingItem } from "@/types/hotel/hotelBookingList.types";

type HotelBookingStatsProps = {
  bookings: HotelBookingItem[];
};

const HotelBookingStats = ({ bookings }: HotelBookingStatsProps) => {
  const totalBookings = bookings.length;

  const pnrCreated = bookings.filter(
    (booking) => booking.status === "pnr_created",
  ).length;

  const guaranteed = bookings.filter(
    (booking) => booking.payment_status === "guaranteed",
  ).length;

  const totalAmount = bookings.reduce(
    (sum, booking) => sum + Number(booking.pricing?.total_amount ?? 0),
    0,
  );

  const currency = bookings[0]?.pricing?.currency ?? "BDT";

  const stats = [
    {
      label: "Total Hotel Bookings",
      value: totalBookings,
      icon: BedDouble,
    },
    {
      label: "PNR Created",
      value: pnrCreated,
      icon: ReceiptText,
    },
    {
      label: "Guaranteed Payments",
      value: guaranteed,
      icon: BadgeCheck,
    },
    {
      label: "Total Booking Amount",
      value: `${currency} ${totalAmount.toLocaleString()}`,
      icon: CreditCard,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border bg-card p-4 text-card-foreground shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <h3 className="mt-2 text-2xl font-bold">{item.value}</h3>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelBookingStats;