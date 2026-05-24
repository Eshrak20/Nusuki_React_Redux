"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CalendarCheck2, CalendarDays, UsersRound } from "lucide-react";

import type { HotelStay } from "@/types/hotel/hotelDetail.types";
import { formatGuestText, safeText } from "@/lib/util.hotel";

type HotelStaySummaryProps = {
  stay?: HotelStay | null;
};

const HotelStaySummary = ({ stay }: HotelStaySummaryProps) => {
  if (!stay) return null;

  const room = stay.rooms?.[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <CalendarCheck2 className="size-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Stay Summary
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Your selected stay dates and guest details.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          icon={<CalendarDays className="size-5" />}
          label="Check In"
          value={safeText(stay.check_in)}
        />

        <SummaryCard
          icon={<CalendarDays className="size-5" />}
          label="Check Out"
          value={safeText(stay.check_out)}
        />

        <SummaryCard
          icon={<UsersRound className="size-5" />}
          label="Guests"
          value={formatGuestText(room?.adults, room?.children)}
        />
      </div>
    </motion.section>
  );
};

export default HotelStaySummary;

const SummaryCard = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-border bg-muted/35 p-4 transition-colors hover:bg-muted/55">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 wrap-break-word text-sm font-bold leading-6 text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
};