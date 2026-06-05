"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BedDouble,
  Coffee,
  CreditCard,
  GlassWater,
  ShieldCheck,
  Users,
} from "lucide-react";

import type {
  HotelAvailableRoom,
  HotelRatePlan,
} from "@/types/hotel/hotelDetail.types";
import { formatCurrency } from "@/lib/util.hotel";


type HotelRoomCardProps = {
  room: HotelAvailableRoom;
  index: number;
  onPriceCheck: (room: HotelAvailableRoom, ratePlan: HotelRatePlan) => void;
};

const HotelRoomCard = ({ room, index, onPriceCheck }: HotelRoomCardProps) => {
  const ratePlan = room.rate_plans?.[0];
  const rateInfo = ratePlan?.rate_info;
  const cancellation = rateInfo?.cancellation_policy;

  const currency = rateInfo?.currency || "BDT";

  const bedText = room.bed_types?.length
    ? room.bed_types.map((bed) => bed.name).join(", ")
    : room.room_id || "Room";

  const handleSelectRoom = () => {
    if (!ratePlan) return;
    onPriceCheck(room, ratePlan);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-sm border border-border bg-muted/35 p-4 text-card-foreground shadow-sm transition-colors hover:bg-muted/45 md:p-5"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_270px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <RoomBadge variant="muted">Room {index + 1}</RoomBadge>

            {room.type ? (
              <RoomBadge variant="primary">{room.type}</RoomBadge>
            ) : null}

            {room.non_smoking ? (
              <RoomBadge variant="success">Non Smoking</RoomBadge>
            ) : (
              <RoomBadge variant="muted">
                <span className="inline-flex items-center gap-1">
                  <GlassWater className="size-3" />
                  Smoking info N/A
                </span>
              </RoomBadge>
            )}
          </div>

          <h3 className="mt-3 text-base font-bold leading-7 text-foreground md:text-lg">
            {room.name || ratePlan?.name || "Room Option"}
          </h3>

          {ratePlan?.description ? (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {ratePlan.description}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <MiniBadge
              icon={<Users className="size-3.5" />}
              text={`Max ${room.occupancy?.max || "N/A"} guests`}
            />

            <MiniBadge icon={<BedDouble className="size-3.5" />} text={bedText} />

            <MiniBadge
              icon={<Coffee className="size-3.5" />}
              text={getMealText(ratePlan)}
            />

            <MiniBadge
              icon={<CreditCard className="size-3.5" />}
              text={ratePlan?.prepaid ? "Prepaid" : "Pay at hotel"}
            />

            <MiniBadge
              icon={<ShieldCheck className="size-3.5" />}
              text={
                cancellation?.is_refundable ? "Refundable" : "Non refundable"
              }
            />
          </div>
        </div>

        <div className="rounded-sm border border-border bg-card p-4 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Total price
          </p>

          <h4 className="mt-2 text-2xl font-black tracking-tight text-primary">
            {formatCurrency(rateInfo?.total_price, currency)}
          </h4>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Avg/night:{" "}
            <span className="font-semibold text-foreground">
              {formatCurrency(rateInfo?.average_nightly_rate, currency)}
            </span>
          </p>

          {rateInfo?.tax_and_fees !== undefined ? (
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Tax & fees: {formatCurrency(rateInfo.tax_and_fees, currency)}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handleSelectRoom}
            disabled={!ratePlan}
            className="mt-4 w-full rounded-sm bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Select Room
          </button>
        </div>
      </div>

      {cancellation?.description ? (
        <div className="mt-4 rounded-sm border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Cancellation Policy
            </p>
          </div>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {cancellation.description}
          </p>
        </div>
      ) : null}
    </motion.div>
  );
};

export default HotelRoomCard;

const MiniBadge = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm transition-colors hover:bg-muted/60">
      <span className="text-primary">{icon}</span>
      <span>{text}</span>
    </span>
  );
};

const RoomBadge = ({
  children,
  variant = "muted",
}: {
  children: ReactNode;
  variant?: "primary" | "success" | "muted";
}) => {
  const variantClass = {
    primary: "border-primary/15 bg-primary/10 text-primary",
    success:
      "border-emerald-500/15 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    muted: "border-border bg-background text-muted-foreground",
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${variantClass}`}
    >
      {children}
    </span>
  );
};

const getMealText = (ratePlan?: HotelRatePlan) => {
  if (!ratePlan?.meal) return "Meal info N/A";

  if (!ratePlan.meal.has_meal) return "No meal included";

  return ratePlan.meal.type || "Meal included";
};