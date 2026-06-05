import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import type { ApiFilters } from "@/types/flight/flightResults.types";
import FlightFilter from "../FlightFilter";

interface Props {
  availableFilters?: ApiFilters;
  isLoading: boolean;
}

const FlightFilterDrawer = ({ availableFilters, isLoading }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-11 w-full justify-center rounded-sm border-border bg-background px-3 text-sm font-medium shadow-sm"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
            <span className="font-medium">Filters</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[92vw] max-w-sm overflow-hidden border-l bg-background p-0"
        >
          <SheetHeader className="sticky top-0 z-20 border-b bg-background/95 px-4 py-4 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
                <div>
                  <SheetTitle className="text-left text-base font-bold">
                    Flight Filters
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground">
                    Refine your flights
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          <div className="h-[calc(100vh-81px)] overflow-y-auto p-4">
            <FlightFilter
              availableFilters={availableFilters}
              isLoading={isLoading}
              isDrawer
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FlightFilterDrawer;
