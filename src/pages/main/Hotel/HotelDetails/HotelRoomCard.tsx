import {
  BedDouble,
  Coffee,
  CreditCard,
  ShieldCheck,
  Users,
} from "lucide-react";

const HotelRoomCard = ({ room, index }: { room: any; index: number }) => {
  const ratePlan = room?.rate_plans?.[0];
  const rateInfo = ratePlan?.rate_info;
  const cancellation = rateInfo?.cancellation_policy;

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
              Room {index + 1}
            </span>

            {room?.type && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#14275f]">
                {room.type}
              </span>
            )}

            {room?.non_smoking && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Non Smoking
              </span>
            )}
          </div>

          <h3 className="mt-3 text-base font-bold text-slate-950">
            {room?.name || ratePlan?.name || "Room Option"}
          </h3>

          {ratePlan?.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
              {ratePlan.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <MiniBadge
              icon={<Users className="h-3.5 w-3.5" />}
              text={`Max ${room?.occupancy?.max || "N/A"} guests`}
            />

            <MiniBadge
              icon={<BedDouble className="h-3.5 w-3.5" />}
              text={room?.room_id || "Room"}
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

        <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-400">Total price</p>

          <h4 className="mt-1 text-2xl font-black text-[#14275f]">
            {rateInfo?.currency || "BDT"}{" "}
            {formatMoney(rateInfo?.total_price)}
          </h4>

          <p className="mt-1 text-xs text-slate-500">
            Avg/night: {rateInfo?.currency || "BDT"}{" "}
            {formatMoney(rateInfo?.average_nightly_rate)}
          </p>

          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-[#14275f] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f1f4d]"
          >
            Select Room
          </button>
        </div>
      </div>

      {cancellation?.description && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Cancellation Policy
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {cancellation.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default HotelRoomCard;

const MiniBadge = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
      {icon}
      {text}
    </span>
  );
};

const formatMoney = (value?: number) => {
  if (!value) return "N/A";

  return new Intl.NumberFormat("en-BD").format(value);
};