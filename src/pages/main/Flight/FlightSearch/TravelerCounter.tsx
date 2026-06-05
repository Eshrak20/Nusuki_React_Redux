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
  disabled?: boolean;
  className?: string;
}

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
  const isDecreaseDisabled = disabled || value <= min;
  const isIncreaseDisabled =
    disabled || total >= totalMax || (max !== undefined && value >= max);

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-sm border p-3 transition-colors",
        "bg-card text-card-foreground border-border",
        disabled && "opacity-50 bg-muted/40 cursor-not-allowed",
        className
      )}
    >
      <div className="flex flex-col">
        <p className={cn(
          "text-sm font-semibold", 
          disabled && "text-muted-foreground"
        )}>
          {label}
        </p>
        {subLabel && (
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground/80 font-medium">
            {subLabel}
          </p>
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
            "h-8 w-8 rounded-full border-input bg-background hover:bg-accent",
            isDecreaseDisabled && "opacity-50 pointer-events-none"
          )}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>

        <span className={cn(
          "w-5 text-center text-sm font-bold tabular-nums", 
          disabled && "text-muted-foreground"
        )}>
          {value}
        </span>

        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            if (!isIncreaseDisabled) onChange(value + 1);
          }}
          disabled={isIncreaseDisabled}
          className={cn(
            "h-8 w-8 rounded-full shadow-sm",
            isIncreaseDisabled && "opacity-50 pointer-events-none"
          )}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};