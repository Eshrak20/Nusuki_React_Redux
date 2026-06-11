import type { FlightBookingSummary } from "@/types/flight/flightBooking.types";
import {
  Ban,
  CheckCircle2,
  Clock3,
  PlaneTakeoff,
  RotateCcw,
  Ticket,
  // WalletCards,
  XCircle,
} from "lucide-react";


type Props = {
  summary: FlightBookingSummary;
};

const FlightBookingStats = ({ summary }: Props) => {
  const stats = [
    {
      label: "Total Bookings",
      value: summary.total_bookings,
      icon: Ticket,
      className:
        "border-primary/20 bg-primary/10 text-primary dark:bg-primary/15",
    },
    {
      label: "Paid",
      value: summary.paid,
      icon: CheckCircle2,
      className:
        "border-emerald-500/25 bg-gradient-to-r from-emerald-500/15 to-emerald-500/10 text-emerald-700 shadow-emerald-500/10 dark:text-emerald-300",
    },
    // {
    //   label: "Unpaid",
    //   value: summary.unpaid,
    //   icon: CreditCard,
    //   className:
    //     "border-amber-500/30 bg-gradient-to-r from-amber-400/25 to-amber-400/10 text-amber-700 shadow-amber-500/10 dark:text-amber-300",
    // },
    {
      label: "Ticketed",
      value: summary.ticketed,
      icon: PlaneTakeoff,
      className:
        "border-sky-500/25 bg-gradient-to-r from-sky-500/15 to-sky-500/10 text-sky-700 shadow-sky-500/10 dark:text-sky-300",
    },
    {
      label: "Cancelled",
      value: summary.cancelled,
      icon: Ban,
      className:
        "border-red-500/25 bg-gradient-to-r from-red-500/15 to-red-500/10 text-red-700 shadow-red-500/10 dark:text-red-300",
    },
    {
      label: "Expired",
      value: summary.expired,
      icon: XCircle,
      className:
        "border-orange-500/25 bg-gradient-to-r from-orange-500/15 to-orange-500/10 text-orange-700 shadow-orange-500/10 dark:text-orange-300",
    },
    // {
    //   label: "Voided",
    //   value: summary.voided,
    //   icon: WalletCards,
    //   className:
    //     "border-purple-500/25 bg-gradient-to-r from-purple-500/15 to-purple-500/10 text-purple-700 shadow-purple-500/10 dark:text-purple-300",
    // },
    {
      label: "Refunded",
      value: summary.refunded,
      icon: RotateCcw,
      className:
        "border-teal-500/25 bg-gradient-to-r from-teal-500/15 to-teal-500/10 text-teal-700 shadow-teal-500/10 dark:text-teal-300",
    },
    {
      label: "Pending Payment",
      value: summary.pending_payment,
      icon: Clock3,
      className:
        "border-yellow-500/30 bg-gradient-to-r from-yellow-400/25 to-yellow-400/10 text-yellow-700 shadow-yellow-500/10 dark:text-yellow-300",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`rounded-sm border p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${stat.className}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase opacity-80">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-extrabold">{stat.value}</p>
                </div>

                <div className="rounded-sm bg-background/70 p-3 dark:bg-background/30">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-sm border bg-card p-4 shadow-sm dark:bg-card/80">
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-foreground">
            Booking Status
          </h3>

          <div className="mt-4 space-y-3">
            {Object.entries(summary.by_booking_status).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-3 rounded-sm bg-muted/40 px-3 py-2 dark:bg-muted/10"
              >
                <span className="text-sm font-semibold capitalize text-muted-foreground">
                  {key.replaceAll("_", " ")}
                </span>

                <span className="rounded-sm bg-background px-2 py-1 text-sm font-extrabold text-foreground shadow-sm dark:bg-background/40">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-sm border bg-card p-4 shadow-sm dark:bg-card/80">
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-foreground">
            Payment Status
          </h3>

          <div className="mt-4 space-y-3">
            {Object.entries(summary.by_payment_status).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-3 rounded-sm bg-muted/40 px-3 py-2 dark:bg-muted/10"
              >
                <span className="text-sm font-semibold capitalize text-muted-foreground">
                  {key.replaceAll("_", " ")}
                </span>

                <span className="rounded-sm bg-background px-2 py-1 text-sm font-extrabold text-foreground shadow-sm dark:bg-background/40">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FlightBookingStats;