import { useRef, useState, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import type { ApiFilters } from "@/types/flight/flightResults.types";
import PriceRangeFilter from "./PriceRangeFilter";
import LayoverDurationFilter from "./LayoverDurationFilter";
import RefundabilityFilter from "./RefundabilityFilter";
import StopsFilter from "./StopsFilter";
import AirlinesFilter from "./AirlinesFilter";
import LayoverCitiesFilter from "./LayoverCitiesFilter";
import FlightScheduleFilter from "./FlightScheduleFilter";
import AircraftFilter from "./AircraftFilter";
import { useDispatch } from "react-redux";
import { resetFilters } from "@/redux/features/flightSearchSlice";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  availableFilters?: ApiFilters;
  isLoading: boolean;
  className?: string;
  isDrawer?: boolean;

  // Add this for drawer swipe close
  onDrawerClose?: () => void;

  // left drawer = swipe left to close
  // right drawer = swipe right to close
  drawerSide?: "left" | "right";
}

const FlightFilter = ({
  availableFilters,
  isLoading,
  className,
  isDrawer = false,
  onDrawerClose,
  drawerSide = "left",
}: Props) => {
  const dispatch = useDispatch();

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);

  const handlePointerDown = (e: PointerEvent<HTMLElement>) => {
    if (!isDrawer || !onDrawerClose) return;
    if (e.pointerType === "mouse") return;

    startX.current = e.clientX;
    startY.current = e.clientY;
    startTime.current = Date.now();

    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!isDragging || !isDrawer) return;

    const diffX = e.clientX - startX.current;
    const diffY = e.clientY - startY.current;

    // allow normal vertical scrolling inside drawer
    if (Math.abs(diffY) > Math.abs(diffX)) return;

    if (drawerSide === "left") {
      // left drawer closes by swiping left
      setDragX(Math.min(diffX, 0));
    } else {
      // right drawer closes by swiping right
      setDragX(Math.max(diffX, 0));
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLElement>) => {
    if (!isDragging || !isDrawer) return;

    const diffX = e.clientX - startX.current;
    const duration = Date.now() - startTime.current;
    const velocity = Math.abs(diffX) / Math.max(duration, 1);

    const shouldClose =
      drawerSide === "left"
        ? diffX < -90 || (diffX < -45 && velocity > 0.45)
        : diffX > 90 || (diffX > 45 && velocity > 0.45);

    if (shouldClose) {
      onDrawerClose?.();
    }

    setDragX(0);
    setIsDragging(false);
  };

  return (
    <aside
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={
        isDrawer
          ? {
            transform: `translateX(${dragX}px)`,
            transition: isDragging ? "none" : "transform 180ms ease",
          }
          : undefined
      }
      className={cn(
        "w-full rounded-sm py-3 md:py-4",
        isDrawer &&
        "touch-pan-y rounded-none border-0 bg-transparent p-0 shadow-none",
        className,
      )}
    >
      {!isDrawer && (
        <div className="mb-3 flex items-center justify-between rounded-sm border border-border bg-background px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary/10 text-primary">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Filters</h3>
              <p className="text-xs text-muted-foreground">
                Refine your flights
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="rounded-sm"
            onClick={() => dispatch(resetFilters())}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      )}

      {isDrawer && (
        <div className="mb-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-sm"
            onClick={() => dispatch(resetFilters())}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      )}

      <div className="space-y-3">
        <AirlinesFilter data={availableFilters?.airlines || []} />
        <AircraftFilter data={availableFilters?.aircraft || []} />

        <PriceRangeFilter
          data={availableFilters?.price_range}
          isLoading={isLoading}
        />

        <LayoverDurationFilter
          data={availableFilters?.layover_duration}
          isLoading={isLoading}
        />

        <FlightScheduleFilter data={availableFilters?.flight_schedules} />
        <StopsFilter data={availableFilters?.stops || []} />
        <RefundabilityFilter data={availableFilters?.refundability || []} />
        <LayoverCitiesFilter data={availableFilters?.layover_cities || []} />
      </div>
    </aside>
  );
};

export default FlightFilter;