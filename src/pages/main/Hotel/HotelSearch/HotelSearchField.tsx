import type { LucideIcon } from "lucide-react";

type HotelSearchFieldProps = {
  icon: LucideIcon;
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
};

const HotelSearchField = ({
  icon: Icon,
  label,
  title,
  subtitle,
  className = "",
}: HotelSearchFieldProps) => {
  return (
    <div
      className={`flex min-h-[56px] items-center gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-orange-400 ${className}`}
    >
      <div className="border-r border-slate-200 pr-4">
        <Icon className="h-5 w-5 text-slate-400" />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        <input type="hidden" aria-label={label} />
      </div>
    </div>
  );
};

export default HotelSearchField;