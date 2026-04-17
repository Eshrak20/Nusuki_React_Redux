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

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-40 justify-between">
          {totalTravelers} Traveler{totalTravelers > 1 ? "s" : ""}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4">
        {travelerConfig.map((item) => (
          <TravelerCounter
            key={item.key}
            label={item.label}
            subLabel={item.sub}
            value={searchData.travelers[item.key]}
            min={item.min}
            max={item.max}
            total={totalTravelers}
            totalMax={9}
            onChange={(val) =>
              dispatch(updateTravelers({ [item.key]: val }))
            }
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TravelerSection;