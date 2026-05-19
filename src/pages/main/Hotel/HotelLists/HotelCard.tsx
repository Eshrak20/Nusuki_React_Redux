import type { HotelAddress, HotelItem } from "@/types/hotel/types.hotelList";
import { MapPin, RefreshCcw, WalletCards, Wifi } from "lucide-react";

type Props = {
  hotel: HotelItem;
  currency: string;
};

const formatAddress = (
  address?: string | HotelAddress,
  fallback?: string | HotelAddress
) => {
  const source = address || fallback;

  if (!source) return "Location not available";

  if (typeof source === "string") return source;

  return (
    source.full_address ||
    [source.line1, source.line2, source.city, source.state, source.postal_code, source.country]
      .filter(Boolean)
      .join(", ") ||
    source.location ||
    "Location not available"
  );
};

const HotelCard = ({ hotel, currency }: Props) => {
  const hotelName = hotel.name || hotel.hotel_name || "Hotel Name";

  const hotelImage =
    hotel.image ||
    hotel.images?.[0] ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80";

  const price = hotel.average_nightly_rate || hotel.total_price || 0;

  const addressText = formatAddress(
    hotel.address,
    hotel.location || `${hotel.city || "New York"}, ${hotel.country || "US"}`
  );

  return (
    <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr]">
        <div className="relative h-52 md:h-full">
          <img
            src={hotelImage}
            alt={hotelName}
            className="h-full w-full object-cover"
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#13275f] backdrop-blur">
            {hotel.star_rating || hotel.rating || 4} Star
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-950">
                {hotelName}
              </h3>

              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={15} />
                {addressText}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge icon={<Wifi size={14} />} text="Free WiFi" />

                <Badge
                  icon={<WalletCards size={14} />}
                  text={hotel.prepaid ? "Prepaid" : "Pay at hotel"}
                />

                <Badge
                  icon={<RefreshCcw size={14} />}
                  text={hotel.refundable ? "Refundable" : "Non refundable"}
                />
              </div>
            </div>

            <div className="min-w-44 rounded-2xl bg-slate-50 p-4 text-left lg:text-right">
              <p className="text-xs font-semibold text-slate-400">
                Starting from
              </p>

              <h4 className="mt-1 text-2xl font-extrabold text-[#13275f]">
                {currency} {price || "N/A"}
              </h4>

              <p className="text-xs text-slate-400">per night</p>

              <button className="mt-4 h-10 w-full rounded-xl bg-[#13275f] px-4 text-sm font-bold text-white transition hover:bg-[#0f1f4c]">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;

const Badge = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
      <span className="text-[#13275f]">{icon}</span>
      {text}
    </span>
  );
};