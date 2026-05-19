import { CalendarDays, UsersRound } from "lucide-react";

const HotelStaySummary = ({ stay }: { stay: any }) => {
  if (!stay) return null;

  const room = stay?.rooms?.[0];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">Stay Summary</h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Check In"
          value={stay.check_in}
        />

        <SummaryCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Check Out"
          value={stay.check_out}
        />

        <SummaryCard
          icon={<UsersRound className="h-5 w-5" />}
          label="Guests"
          value={`${room?.adults || 0} Adults, ${room?.children || 0} Children`}
        />
      </div>
    </section>
  );
};

export default HotelStaySummary;

const SummaryCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14275f] text-white">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};