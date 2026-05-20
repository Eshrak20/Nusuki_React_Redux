import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label?: string;
  children: ReactNode;
  className?: string;
  asButton?: boolean;
};

export function SearchField({ icon, label, children, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 bg-white px-4 py-3 transition-colors focus-within:border-primary hover:border-primary",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="hidden border-r border-slate-200 pr-4 sm:block">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          {label && (
            <label className="block text-xs font-medium text-slate-400">
              {label}
            </label>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}