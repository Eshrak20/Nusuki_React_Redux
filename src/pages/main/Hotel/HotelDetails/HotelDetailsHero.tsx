import { Building2, MapPin } from "lucide-react";

const HotelDetailsHero = ({ hotel }: { hotel: any }) => {
  const address = hotel?.address?.full_address || "Address not available";
  const image = hotel?.images?.[0]?.url || hotel?.images?.[0] || hotel?.logo;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr]">
        <div className="relative h-64 bg-slate-100 lg:h-full">
          {image ? (
            <img
              src={image}
              alt={hotel?.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-200">
              <Building2 className="h-16 w-16 text-slate-400" />
            </div>
          )}

          {hotel?.star_rating && (
            <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#14275f] shadow-sm">
              {hotel.star_rating} Star
            </div>
          )}
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            {hotel?.chain?.name && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#14275f]">
                {hotel.chain.name}
              </span>
            )}

            {hotel?.property_type?.name && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {hotel.property_type.name}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
            {hotel?.name || "Hotel Name"}
          </h1>

          <div className="mt-3 flex gap-2 text-sm text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#14275f]" />
            <span>{address}</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <InfoBox label="Hotel Code" value={hotel?.hotel_code || "N/A"} />
            <InfoBox label="Brand" value={hotel?.brand?.name || "N/A"} />
            <InfoBox label="Quality" value={hotel?.property_quality?.name || "N/A"} />
            <InfoBox
              label="Rooms"
              value={hotel?.property_info?.rooms || "N/A"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelDetailsHero;

const InfoBox = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
};