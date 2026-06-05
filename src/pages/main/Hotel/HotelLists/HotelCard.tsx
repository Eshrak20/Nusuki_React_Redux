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

  const hotelImage = hotel?.images?.[0]?.url || hotel?.logo;

  const averageNightlyRate = hotel.rate?.average_nightly_rate;
  const totalPrice = hotel.rate?.total_price;

  const isPrepaid = hotel.rate?.prepaid ?? false;
  const isRefundable = hotel.rate?.cancellation_policy?.is_refundable ?? false;

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

  const search_id = hotel?.search_id;
  const hotel_id = hotel?.hotel_id;

  return (
    <article className="overflow-hidden rounded-[24px] border border-border bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr]">
        
        {/* Left Side: Thumbnail Area */}
        <div className="relative h-52 md:h-full">
          <img
            src={hotelImage}
            alt={hotelName}
            className="h-full w-full object-cover"
          />

          {/* Star Rating Badge */}
          <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur-sm border border-border/40">
            {hotel.star_rating || "N/A"} Star
          </div>
        </div>

        {/* Right Side: Information Content */}
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between">
            
            {/* Left Column: Title & Metadata Badges */}
            <div className="flex-1">
              <h3 className="text-lg font-extrabold text-foreground">
                {hotelName}
              </h3>

              <p className="mt-1 flex items-center gap-2 max-w-118.75 text-sm text-muted-foreground">
                <MapPin size={15} className="shrink-0" />
                <span className="truncate">{addressText}</span>
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
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

            {/* Right Column: Pricing & Link Card */}
            <div className="flex min-w-44 flex-col justify-between rounded-sm bg-muted/40 dark:bg-muted/20 p-4 text-left lg:text-right">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">
                  Starting from
                </p>

                <h4 className="mt-1 text-2xl font-extrabold text-primary dark:text-foreground">
                  {currency} {formatMoney(averageNightlyRate)}
                </h4>

                <p className="text-xs text-muted-foreground">per night</p>

                {totalPrice ? (
                  <p className="mt-1 mb-4 text-xs font-semibold text-muted-foreground/80">
                    Total: {currency} {formatMoney(totalPrice)}
                  </p>
                ) : <div className="mb-4" />}
              </div>

              {/* View Details CTA Button Layout Fixed */}
              <Link 
                to={`/hotel/detail/${search_id}/${hotel_id}`} 
                className="flex h-10 w-full items-center justify-center rounded-sm bg-primary px-4 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
              >
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

/* ==========================================
   SUB-COMPONENTS (Refactored Sub-Badge)
   ========================================== */

const Badge = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm group hover:text-foreground transition-colors">
      <span className="text-primary group-hover:scale-105 transition-transform">{icon}</span>
      {text}
    </span>
  );
};