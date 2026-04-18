import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { updateTravelers } from "@/redux/features/flightSearchSlice";
import { TravelerCounter } from "./TravelerCounter";
import { travelerConfig } from "./FlightConfigData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  totalTravelers: number;
};

const TravelerSection = ({ totalTravelers }: Props) => {
  const dispatch = useDispatch();
  const searchData = useSelector((state: RootState) => state.flightSearch);
  const [open, setOpen] = useState(false);

  const isStudentFare = searchData.fareType === "student";

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="min-w-40 justify-between bg-background border-input hover:bg-accent hover:text-accent-foreground"
        >
          <span className="text-foreground/90 font-medium">
            {totalTravelers} Traveler{totalTravelers > 1 ? "s" : ""}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform text-muted-foreground ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="start" 
        className="w-80 p-4 shadow-xl border-border bg-popover text-popover-foreground"
      >
        <div className="space-y-2">
          {travelerConfig.map((item) => {
            const isAdult = item.key === "adults";
            const isRowDisabled = isStudentFare && !isAdult;
            return (
              <TravelerCounter
                key={item.key}
                label={item.label}
                subLabel={item.sub}
                value={searchData.travelers[item.key]}
                min={item.min}
                max={item.max}
                total={totalTravelers}
                totalMax={9}
                disabled={isRowDisabled}
                onChange={(val) => {
                  if (!isRowDisabled) {
                    dispatch(updateTravelers({ [item.key]: val }));
                  }
                }}
              />
            );
          })}
        </div>

        {isStudentFare && (
          <div className="mt-4 p-2.5 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-[11px] text-orange-600 dark:text-orange-400 leading-relaxed italic">
              * Student fares are restricted to Adult traveler only.
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TravelerSection;