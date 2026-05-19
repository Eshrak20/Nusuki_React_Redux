import { Building2, MapPin, Phone } from "lucide-react";

const HotelContactCard = ({ hotel }: { hotel: any }) => {
  const address = hotel?.address;

  return (
    <aside className="sticky top-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">Hotel Information</h2>

      <div className="mt-4 space-y-3">
        <InfoRow
          icon={<Building2 className="h-4 w-4" />}
          label="Chain"
          value={hotel?.chain?.name || "N/A"}
        />

        <InfoRow
          icon={<Phone className="h-4 w-4" />}
          label="Phone"
          value={hotel?.contact?.phone || "N/A"}
        />

        <InfoRow
          icon={<MapPin className="h-4 w-4" />}
          label="Location"
          value={address?.full_address || "N/A"}
        />
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold text-slate-500">Check-in / out</p>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-slate-400">Check In</p>
            <p className="text-sm font-bold text-slate-900">
              {formatPolicyTime(hotel?.property_info?.policies, "CheckIn")}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Check Out</p>
            <p className="text-sm font-bold text-slate-900">
              {formatPolicyTime(hotel?.property_info?.policies, "CheckOut")}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default HotelContactCard;

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="mt-0.5 text-[#14275f]">{icon}</div>

      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
};

const formatPolicyTime = (policies: any[] = [], type: string) => {
  const value = policies.find((item) => item.type === type)?.value;

  if (!value) return "N/A";

  const text = String(value).padStart(4, "0");
  const hour = text.slice(0, 2);
  const minute = text.slice(2, 4);

  return `${hour}:${minute}`;
};