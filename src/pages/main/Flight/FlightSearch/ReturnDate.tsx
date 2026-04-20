import { format, parseISO, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ReturnDateProps {
  departureDate?: string;
  returnDate?: string;
  tripType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSearchField: (payload: any) => void;
}

const ReturnDate: React.FC<ReturnDateProps> = ({
  departureDate,
  returnDate,
  tripType,
  dispatch,
  setSearchField,
}) => {
  // use dashed value if your redux state stores one-way / round-way / multi-way
  if (tripType === "one-way") {
    return (
      <div className="flex-1 cursor-not-allowed rounded-xl border bg-muted p-3 opacity-60">
        <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          Return Date
        </div>
        <div className="text-sm font-semibold text-foreground">Save More</div>
      </div>
    );
  }

  const selectedDate = returnDate ? parseISO(returnDate) : undefined;
  const today = startOfDay(new Date());
  const minDate = departureDate ? parseISO(departureDate) : today;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex-1 rounded-xl border p-3 cursor-pointer transition",
            "bg-background hover:border-primary",
            "border-border"
          )}
        >
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            Return Date
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
        className="w-auto rounded-xl border bg-popover p-0 shadow-lg"
        align="end"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return;

            dispatch(
              setSearchField({
                returnDate: date.toISOString(),
              })
            );
          }}
          disabled={{ before: minDate }}
          fromDate={minDate}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};

export default ReturnDate;