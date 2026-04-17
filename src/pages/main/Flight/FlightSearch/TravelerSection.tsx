// TravelerSection.tsx

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
        <Button variant="outline" className="min-w-40 justify-between bg-white">
          <span className="text-slate-700">
            {totalTravelers} Traveler{totalTravelers > 1 ? "s" : ""}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4 shadow-xl border-slate-200">
        <div className="space-y-1">
          {travelerConfig.map((item) => {
            // If it's student fare, the entire row is locked.
            const isRowDisabled = isStudentFare;

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
                disabled={isRowDisabled} // CRITICAL
                onChange={(val) => {
                  if (!isRowDisabled) {
                    dispatch(updateTravelers({ [item.key]: val }));
                  }
                }}
              />
            );
          })}
        </div>

        {/* This must be OUTSIDE the TravelerCounter component map loop */}
        {isStudentFare && (
          <div className="mt-4 p-2 bg-orange-50 rounded border border-orange-100">
            <p className="text-[11px] text-orange-600 leading-relaxed italic">
              * Student fares are restricted to 1 Adult traveler only.
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TravelerSection;
