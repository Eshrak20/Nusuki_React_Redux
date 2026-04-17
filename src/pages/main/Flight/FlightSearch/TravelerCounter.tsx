import * as React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TravelerCounterProps {
  label: string;
  subLabel?: string;
  value: number;
  min?: number;
  max?: number;
  total: number;
  totalMax?: number;
  onChange: (value: number) => void;
  disabled?: boolean; // Controls the entire row's interactivity
  className?: string;
}

// TravelerCounter.tsx
export const TravelerCounter: React.FC<TravelerCounterProps> = ({
  label,
  subLabel,
  value,
  min = 0,
  max,
  total,
  totalMax = 9,
  onChange,
  disabled = false,
  className,
}) => {
  // Logic: Both buttons are disabled if the entire row is disabled
  const isDecreaseDisabled = disabled || value <= min;
  const isIncreaseDisabled =
    disabled || total >= totalMax || (max !== undefined && value >= max);

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border p-3 transition-all",
        "bg-background dark:border-slate-800 border-slate-200",
        disabled &&
          "opacity-60 bg-slate-50/50 dark:bg-slate-900/50 cursor-not-allowed",
        className,
      )}
    >
      <div>
        <p
          className={cn(
            "text-sm font-semibold",
            disabled && "text-muted-foreground",
          )}
        >
          {label}
        </p>
        {subLabel && (
          <p className="text-[11px] text-muted-foreground">{subLabel}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            if (!isDecreaseDisabled) onChange(value - 1);
          }}
          disabled={isDecreaseDisabled}
          className={cn(
            "h-8 w-8 rounded-full",
            isDecreaseDisabled && "pointer-events-none opacity-40",
          )}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>

        <span
          className={cn(
            "w-5 text-center text-sm font-bold",
            disabled && "text-muted-foreground",
          )}
        >
          {value}
        </span>

        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            if (!isIncreaseDisabled) onChange(value + 1);
          }}
          disabled={isIncreaseDisabled}
          className={cn(
            "h-8 w-8 rounded-full",
            !isIncreaseDisabled && "bg-primary text-primary-foreground",
            isIncreaseDisabled && "pointer-events-none opacity-40",
          )}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
