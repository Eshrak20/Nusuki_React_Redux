import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import { setSearchField } from "@/redux/features/flightSearchSlice";
import { flightClasses } from "./FlightConfigData";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const FlightClassDropdown = () => {
  const dispatch = useDispatch();
  const flightClass = useSelector(
    (state: RootState) => state.flightSearch.flightClass
  );

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-36 justify-between">
          {flightClass}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 p-2">
        {flightClasses.map((cls) => (
          <div
            key={cls}
            onClick={() => {
              dispatch(setSearchField({ flightClass: cls }));
              setOpen(false);
            }}
            className={`px-3 py-2 text-sm cursor-pointer rounded-md ${
              flightClass === cls
                ? "bg-primary text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {cls}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FlightClassDropdown;