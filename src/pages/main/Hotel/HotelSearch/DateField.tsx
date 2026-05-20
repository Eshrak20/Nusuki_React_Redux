import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchField } from "./SearchField";

type Props = {
  label: string;
  date: Date;
  open: boolean;
  month?: Date;
  disabled?: (date: Date) => boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
};

export function DateField({
  label,
  date,
  open,
  month,
  disabled,
  onOpenChange,
  onSelect,
  onMonthChange,
}: Props) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button type="button" className="text-left">
          <SearchField
            label={label}
            icon={<CalendarDays className="h-5 w-5 text-slate-400" />}
            className="cursor-pointer"
          >
            <p className={cn("mt-1 text-sm font-semibold", !date && "text-muted-foreground")}>
              {date ? format(date, "PP") : "Pick a date"}
            </p>
          </SearchField>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          month={month}
          disabled={disabled}
          onMonthChange={onMonthChange}
          onSelect={(selectedDate) => {
            if (selectedDate) onSelect(selectedDate);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}