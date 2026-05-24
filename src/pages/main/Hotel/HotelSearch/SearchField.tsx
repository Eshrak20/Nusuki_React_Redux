import { cn } from "@/lib/utils";

type SearchFieldProps = {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function SearchField({
  label,
  icon,
  children,
  className,
}: SearchFieldProps) {
  return (
    <div
      className={cn(
        "flex min-h-[58px] items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition",
        "dark:border-[#2B2544] dark:bg-[#0B0B10]",
        className,
      )}
    >
      <div className="flex shrink-0 items-center text-slate-500 dark:text-[#8B93FF]">
        {icon}
      </div>

      <div className="min-w-0 flex-1 border-l border-slate-200 pl-3 dark:border-[#2B2544]">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>

        {children}
      </div>
    </div>
  );
}