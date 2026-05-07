import { Ban, CheckCircle2, Clock3, Ticket } from "lucide-react";

import type { FlightBooking } from "@/types/flight/flightTicketPayment.types";

type Props = {
  bookings: FlightBooking[];
};

const FlightBookingStats = ({ bookings }: Props) => {
  const total = bookings.length;

  const paid = bookings.filter(
    (item) =>
      item.payment_status === "paid" || item.booking_status === "ticketed",
  ).length;

  const cancelled = bookings.filter(
    (item) => item.booking_status === "cancelled",
  ).length;

  const pending = bookings.filter(
    (item) =>
      item.booking_status !== "cancelled" &&
      item.booking_status !== "ticketed" &&
      item.payment_status !== "paid",
  ).length;

  const stats = [
    {
      label: "Total Bookings",
      value: total,
      icon: Ticket,
      className:
        "border-primary/20 bg-primary/10 text-primary dark:bg-primary/15",
    },
    {
      label: "Paid / Ticketed",
      value: paid,
      icon: CheckCircle2,
      className:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Payment Pending",
      value: pending,
      icon: Clock3,
      className:
        "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: Ban,
      className:
        "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className={`rounded-2xl border p-4 shadow-sm ${stat.className}`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase opacity-80">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-extrabold">{stat.value}</p>
              </div>

              <div className="rounded-2xl bg-background/70 p-3">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlightBookingStats;