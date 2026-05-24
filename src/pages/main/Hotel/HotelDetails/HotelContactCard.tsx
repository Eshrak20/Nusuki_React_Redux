"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Building2, Clock3, MapPin, Phone } from "lucide-react";

import type { HotelDetailHotel } from "@/types/hotel/hotelDetail.types";
import { formatPolicyTime, safeText } from "@/lib/util.hotel";

type HotelContactCardProps = {
  hotel?: HotelDetailHotel | null;
};

const HotelContactCard = ({ hotel }: HotelContactCardProps) => {
  if (!hotel) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-20 rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Building2 className="size-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Hotel Information
          </h2>

          <p className="text-sm leading-6 text-muted-foreground">
            Contact and stay details
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <InfoRow
          icon={<Building2 className="size-4" />}
          label="Chain"
          value={safeText(hotel.chain?.name)}
        />

        <InfoRow
          icon={<Phone className="size-4" />}
          label="Phone"
          value={safeText(hotel.contact?.phone)}
        />

        <InfoRow
          icon={<MapPin className="size-4" />}
          label="Location"
          value={safeText(hotel.address?.full_address)}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4">
        <div className="flex items-center gap-2">
          <Clock3 className="size-4 text-primary" />

          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Check-in / Check-out
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <TimeBox
            label="Check In"
            value={formatPolicyTime(hotel.property_info?.policies, "CheckIn")}
          />

          <TimeBox
            label="Check Out"
            value={formatPolicyTime(hotel.property_info?.policies, "CheckOut")}
          />
        </div>
      </div>
    </motion.aside>
  );
};

export default HotelContactCard;

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

const InfoRow = ({ icon, label, value }: InfoRowProps) => {
  return (
    <div className="group flex gap-3 rounded-2xl border border-border bg-muted/35 p-3 transition-colors hover:bg-muted/60">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>

        <p className="mt-1 break-words text-sm font-semibold leading-6 text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
};

type TimeBoxProps = {
  label: string;
  value: string;
};

const TimeBox = ({ label, value }: TimeBoxProps) => {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-3 transition-colors hover:bg-background">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <p className="mt-1 text-sm font-bold text-foreground">{value}</p>
    </div>
  );
};