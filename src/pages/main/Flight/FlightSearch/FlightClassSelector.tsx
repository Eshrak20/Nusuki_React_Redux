import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import { setSearchField } from "@/redux/features/flightSearchSlice";
import { flightClasses } from "./FlightConfigData";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FlightClassDropdown = () => {
  const dispatch = useDispatch();
  const flightClass = useSelector(
    (state: RootState) => state.flightSearch.flightClass
  );

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="min-w-[150px] justify-between border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <span className="truncate">{flightClass}</span>
          <ChevronDown className={cn(
            "w-4 h-4 ml-2 transition-transform duration-200",
            open ? "rotate-180" : "rotate-0"
          )} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 p-1 shadow-md border-border bg-popover" align="start">
        {flightClasses.map((cls) => {
          const isSelected = flightClass === cls;
          
          return (
            <DropdownMenuItem
              key={cls}
              onClick={() => {
                dispatch(setSearchField({ flightClass: cls }));
                setOpen(false);
              }}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-sm cursor-pointer rounded-sm transition-colors",
                isSelected 
                  ? "bg-primary text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground" 
                  : "focus:bg-accent focus:text-accent-foreground"
              )}
            >
              {cls}
              {isSelected && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FlightClassDropdown;