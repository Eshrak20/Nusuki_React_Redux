import type { ReactNode } from "react";
import {
  BedDouble,
  Coffee,
  CreditCard,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { HotelAvailableRoom, HotelRatePlan } from "@/types/hotel/hotelDetail.types";

type HotelRoomCardProps = {
  room: HotelAvailableRoom;
  index: number;
  onPriceCheck: (room: HotelAvailableRoom, ratePlan: HotelRatePlan) => void;
};

const HotelRoomCard = ({ room, index, onPriceCheck }: HotelRoomCardProps) => {
  const ratePlan = room.rate_plans?.[0];
  const rateInfo = ratePlan?.rate_info;
  const cancellation = rateInfo?.cancellation_policy;

  const bedText = room.bed_types?.length
    ? room.bed_types.map((bed) => bed.name).join(", ")
    : room.room_id || "Room";

  const handleSelectRoom = () => {
    if (!ratePlan) return;
    onPriceCheck(room, ratePlan);
  };

  return (
    <div className="rounded-3xl border bg-muted/40 p-4 text-card-foreground">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
              Room {index + 1}
            </span>

            {room.type && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {room.type}
              </span>
            )}

            {room.non_smoking && (
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Non Smoking
              </span>
            )}
          </div>

          <h3 className="mt-3 text-base font-bold">
            {room.name || ratePlan?.name || "Room Option"}
          </h3>

          {ratePlan?.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {ratePlan.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <MiniBadge
              icon={<Users className="h-3.5 w-3.5" />}
              text={`Max ${room.occupancy?.max || "N/A"} guests`}
            />

            <MiniBadge
              icon={<BedDouble className="h-3.5 w-3.5" />}
              text={bedText}
            />

            <MiniBadge
              icon={<Coffee className="h-3.5 w-3.5" />}
              text={ratePlan?.meal?.type || "Meal info N/A"}
            />

            <MiniBadge
              icon={<CreditCard className="h-3.5 w-3.5" />}
              text={ratePlan?.prepaid ? "Prepaid" : "Pay at hotel"}
            />

            <MiniBadge
              icon={<ShieldCheck className="h-3.5 w-3.5" />}
              text={
                cancellation?.is_refundable ? "Refundable" : "Non refundable"
              }
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-4 text-center shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground">
            Total price
          </p>

          <h4 className="mt-1 text-2xl font-black text-primary">
            {rateInfo?.currency || "BDT"} {formatMoney(rateInfo?.total_price)}
          </h4>

          <p className="mt-1 text-xs text-muted-foreground">
            Avg/night: {rateInfo?.currency || "BDT"}{" "}
            {formatMoney(rateInfo?.average_nightly_rate)}
          </p>

          <button
            type="button"
            onClick={handleSelectRoom}
            disabled={!ratePlan}
            className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Select Room
          </button>
        </div>
      </div>

      {cancellation?.description && (
        <div className="mt-4 rounded-2xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Cancellation Policy
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {cancellation.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default HotelRoomCard;

const MiniBadge = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
      {icon}
      {text}
    </span>
  );
};

const formatMoney = (value?: number) => {
  if (!value) return "N/A";
  return new Intl.NumberFormat("en-BD").format(value);
};