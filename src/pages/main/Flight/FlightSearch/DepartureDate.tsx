import { format, parseISO, startOfDay } from "date-fns";
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
  const today = startOfDay(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex-1 rounded-sm border p-3 cursor-pointer transition",
            "bg-background hover:border-primary",
            "border-border"
          )}
        >
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            Departure Date
          </div>

          <div className="text-sm font-semibold text-foreground">
            {selectedDate ? format(selectedDate, "EEE, dd MMM yyyy") : "Select date"}
          </div>

          {selectedDate && (
            <div className="mt-1 text-[11px] text-muted-foreground">
              {format(selectedDate, "MMMM yyyy")}
            </div>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto rounded-sm border bg-popover p-0 shadow-lg"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          disabled={{ before: today }}
          onSelect={(date) => {
            if (!date) return;

            dispatch(
              setSearchField({
                departureDate: date.toISOString(),
              })
            );

            if (returnDate && date > parseISO(returnDate)) {
              dispatch(
                setSearchField({
                  returnDate: "",
                })
              );
            }
          }}
          captionLayout="dropdown"
          fromDate={today}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DepartureDate;