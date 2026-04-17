import { format, parseISO } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ReturnDateProps {
  departureDate?: string
  returnDate?: string
  tripType: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSearchField: (payload: any) => void
}

const ReturnDate: React.FC<ReturnDateProps> = ({
  departureDate,
  returnDate,
  tripType,
  dispatch,
  setSearchField,
}) => {
  // 🔒 One-way → disabled UI
  if (tripType === "one-way") {
    return (
      <div className="flex-1 rounded-xl border p-3 opacity-60 bg-muted cursor-not-allowed">
        <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
          <CalendarIcon className="w-4 h-4" />
          Return
        </div>
        <div className="text-sm font-semibold text-foreground">
          Save More
        </div>
      </div>
    )
  }

  const selectedDate = returnDate
    ? parseISO(returnDate)
    : undefined

  const minDate = departureDate
    ? parseISO(departureDate)
    : undefined

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
          {/* Label */}
          <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            Return Date
          </div>

          {/* Value */}
          <div className="text-sm font-semibold text-foreground">
            {selectedDate
              ? format(selectedDate, "dd/MM/yyyy")
              : "Select date"}
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 rounded-xl border bg-popover shadow-lg"
        align="end"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return

            dispatch(
              setSearchField({
                returnDate: date.toISOString(),
              })
            )
          }}
          disabled={{
            before: minDate as Date,
          }}
          
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}

export default ReturnDate