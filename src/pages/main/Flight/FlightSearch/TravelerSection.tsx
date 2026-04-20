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
        <div className="space-y-4">
          {travelerConfig.map((item) => {
            const isChildren = item.key === "children";
            const isAdult = item.key === "adults";
            const isDisabled = isStudentFare && !isAdult;

            const value = isChildren
              ? searchData.travelers.children.length
              : searchData.travelers[
                  item.key as keyof typeof searchData.travelers
                ];

            return (
              <div key={item.key} className="space-y-3">
                <TravelerCounter
                  label={item.label}
                  subLabel={item.sub}
                  value={value as number}
                  min={item.min}
                  total={totalTravelers}
                  disabled={isDisabled}
                  onChange={(val) => {
                    if (isDisabled) return;

                    if (isChildren) {
                      dispatch(updateTravelers({ childrenCount: val }));
                    } else {
                      dispatch(updateTravelers({ [item.key]: val }));
                    }
                  }}
                />

                {/* Dynamic Age Dropdowns for Children */}
                  {isChildren && !isStudentFare && searchData.travelers.children.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-2 border-t pt-2">
                    {searchData.travelers.children.map((age, index) => (
                      <div key={index} className="flex flex-col gap-1">
                        <label className="text-[10px] font-medium text-muted-foreground">
                          Child {index + 1} Age
                        </label>
                        <select
                          value={age}
                          className="bg-background border rounded px-2 py-1 text-xs outline-none focus:ring-1 ring-primary"
                          onChange={(e) =>
                            dispatch(
                              updateTravelers({
                                childAgeUpdate: {
                                  index,
                                  age: parseInt(e.target.value),
                                },
                              }),
                            )
                          }
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 2} value={i + 2}>
                              {i + 2}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
