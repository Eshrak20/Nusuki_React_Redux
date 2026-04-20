import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  checked: boolean;
  onCheckedChange: () => void;
  label: string;
  subLabel?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

const FilterCheckboxItem = ({
  checked,
  onCheckedChange,
  label,
  subLabel,
  leading,
  trailing,
  className,
}: Props) => {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background px-3 py-3 transition-all hover:bg-accent/40",
        checked && "border-primary/30 bg-primary/5",
        className
      )}
    >
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} className="mt-0.5" />

      {leading ? <div className="mt-0.5 shrink-0">{leading}</div> : null}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{label}</p>
        {subLabel ? (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{subLabel}</p>
        ) : null}
      </div>

      {trailing ? (
        <div className="shrink-0 text-xs text-muted-foreground">{trailing}</div>
      ) : null}
    </label>
  );
};

export default FilterCheckboxItem;