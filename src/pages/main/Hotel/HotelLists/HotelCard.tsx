import type { HotelAddress, HotelItem } from "@/types/hotel/types.hotelList";
import {
  MapPin,
  RefreshCcw,
  WalletCards,
  Wifi,
  Coffee,
  ParkingCircle,
  Dumbbell,
} from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelItem;
  currency: string;
};

const formatAddress = (
  address?: string | HotelAddress,
  fallback?: string,
) => {
  if (!address) return fallback || "Location not available";

  if (typeof address === "string") return address;

  return (
    address.full_address ||
    [
      address.line1,
      address.line2,
      address.city?.name,
      address.state?.name,
      address.postal_code,
      address.country?.name,
    ]
      .filter(Boolean)
      .join(", ") ||
    "Location not available"
  );
};

const formatMoney = (value?: number | null) => {
  if (!value) return "N/A";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
};

const getAmenityIcon = (name: string) => {
  const lower = name.toLowerCase();

  if (lower.includes("wifi") || lower.includes("internet")) return <Wifi size={14} />;
  if (lower.includes("breakfast") || lower.includes("meal")) return <Coffee size={14} />;
  if (lower.includes("parking")) return <ParkingCircle size={14} />;
  if (lower.includes("health") || lower.includes("fitness")) return <Dumbbell size={14} />;

  return <Wifi size={14} />;
};

const HotelCard = ({ hotel, currency }: Props) => {
  const hotelName = hotel.name || "Hotel Name";

  const hotelImage =
    hotel?.images?.[0]?.url ||
    hotel?.logo
  //  || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80";

  const averageNightlyRate = hotel.rate?.average_nightly_rate;
  const totalPrice = hotel.rate?.total_price;

  const isPrepaid = hotel.rate?.prepaid ?? false;
  const isRefundable =
    hotel.rate?.cancellation_policy?.is_refundable ?? false;

  const addressText = formatAddress(
    hotel.address,
    `${hotel.address?.city?.name || ""}, ${hotel.address?.country?.name || ""}`,
  );

  const amenities = [
    ...(hotel.promotional_amenities ?? []),
    ...(hotel.amenities ?? []),
  ]
    .filter((item) => item.name)
    .slice(0, 4);

  const search_id = hotel?.search_id
  const hotel_id = hotel?.hotel_id


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
            {hotel.star_rating || "N/A"} Star
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
                {amenities.map((amenity) => (
                  <Badge
                    key={`${amenity.code}-${amenity.name}`}
                    icon={getAmenityIcon(amenity.name)}
                    text={amenity.name}
                  />
                ))}

                <Badge
                  icon={<WalletCards size={14} />}
                  text={isPrepaid ? "Prepaid" : "Pay at hotel"}
                />

                <Badge
                  icon={<RefreshCcw size={14} />}
                  text={isRefundable ? "Refundable" : "Non refundable"}
                />
              </div>
            </div>

            <div className="min-w-44 rounded-2xl bg-slate-50 p-4 text-left lg:text-right">
              <p className="text-xs font-semibold text-slate-400">
                Starting from
              </p>

              <h4 className="mt-1 text-2xl font-extrabold text-[#13275f]">
                {currency} {formatMoney(averageNightlyRate)}
              </h4>

              <p className="text-xs text-slate-400">per night</p>

              {totalPrice ? (
                <p className="mt-1 mb-6 text-xs font-semibold text-slate-500">
                  Total: {currency} {formatMoney(totalPrice)}
                </p>
              ) : null}

              <Link to={`/hotel/detail/${search_id}/${hotel_id}`} className="mt-19 h-10 w-full rounded-xl bg-[#13275f] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f1f4c]">
                View Details
              </Link>
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