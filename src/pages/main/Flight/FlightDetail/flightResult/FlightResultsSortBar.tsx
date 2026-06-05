import { ArrowDownUp, ArrowUpAZ, Clock3, Sunrise } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SortBy, SortOrder } from "./FlightResultsHeader";

interface Props {
  isLoading: boolean;
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange?: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

const FlightResultsSortBar = ({
  isLoading,
  sortBy,
  sortOrder,
  onSortChange,
}: Props) => {
  if (!onSortChange) return null;

  const sortButtons: {
    key: SortBy;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { key: "price", label: "Cheapest", icon: ArrowDownUp },
    { key: "duration", label: "Shortest Duration", icon: Clock3 },
    { key: "departure_at", label: "Earliest", icon: Sunrise },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {sortButtons.map((item) => {
          const Icon = item.icon;
          const isActive = sortBy === item.key;

          return (
            <Button
              key={item.key}
              variant={isActive ? "default" : "outline"}
              onClick={() =>
                onSortChange(item.key, isActive ? sortOrder : "asc")
              }
              disabled={isLoading}
              className="h-11 rounded-sm"
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={sortOrder === "asc" ? "default" : "outline"}
          onClick={() => onSortChange(sortBy, "asc")}
          disabled={isLoading}
          className="h-11 rounded-sm"
        >
          <ArrowUpAZ className="mr-2 h-4 w-4" />
          Asc
        </Button>

        <Button
          variant={sortOrder === "desc" ? "default" : "outline"}
          onClick={() => onSortChange(sortBy, "desc")}
          disabled={isLoading}
          className="h-11 rounded-sm"
        >
          <ArrowDownUp className="mr-2 h-4 w-4" />
          Desc
        </Button>
      </div>
    </div>
  );
};

export default FlightResultsSortBar;
