import * as React from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TravelerCounterProps {
  label: string
  subLabel?: string
  value: number
  min?: number
  max?: number
  total: number          
  totalMax?: number
  onChange: (value: number) => void
  className?: string
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
  className,
}) => {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1)
  }

  const handleIncrease = () => {
    if (total < totalMax && (!max || value < max)) {
      onChange(value + 1)
    }
  }

  const isIncreaseDisabled =
    total >= totalMax || (max !== undefined && value >= max)

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border p-3",
        "bg-background text-foreground",
        "dark:border-slate-700 border-slate-200",
        className
      )}
    >
      {/* Left */}
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {subLabel && (
          <p className="text-xs text-muted-foreground">{subLabel}</p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrease}
          disabled={value <= min}
          className="h-8 w-8"
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="w-6 text-center text-sm font-bold text-foreground">
          {value}
        </span>

        <Button
          variant="default"
          size="icon"
          onClick={handleIncrease}
          disabled={isIncreaseDisabled}
          className="h-8 w-8"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}