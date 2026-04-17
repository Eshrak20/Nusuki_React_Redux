import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DepartureDateProps {
  departureDate?: string;
  returnDate?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSearchField: (payload: any) => void;
}

const DepartureDate: React.FC<DepartureDateProps> = ({
  departureDate,
  returnDate,
  dispatch,
  setSearchField,
}) => {
  const selectedDate = departureDate ? parseISO(departureDate) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex-1 rounded-xl border p-3 cursor-pointer transition",
            "bg-background hover:border-primary",
            "border-border",
          )}
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            Departure Date
          </div>

          {/* Value */}
          <div className="text-sm font-semibold text-foreground">
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Select date"}
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 rounded-xl border bg-popover shadow-lg"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          disabled={{
            before: selectedDate as Date,
          }}
          onSelect={(date) => {
            if (!date) return;

            // ✅ Set departure
            dispatch(
              setSearchField({
                departureDate: date.toISOString(),
              }),
            );

            // 🔥 Fix invalid return date
            if (returnDate && date > parseISO(returnDate)) {
              dispatch(
                setSearchField({
                  returnDate: "",
                }),
              );
            }
          }}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DepartureDate;
