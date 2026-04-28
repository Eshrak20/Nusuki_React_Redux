import { useMemo, useState } from "react";
import { Search, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetToursQuery } from "@/redux/api/holidayApi/holidayApi";
import HolidaySearchSkeleton from "@/components/skeletons/HolidaySearchSkeleton";

const HolidaySearch = () => {
  const [tourTypeId, setTourTypeId] = useState<number>(1);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [cardTouched, setCardTouched] = useState(false);

  const queryParams = useMemo(() => {
    return {
      tour_type_id: tourTypeId,
      ...(regionId !== null ? { tour_region_id: regionId } : {}),
    };
  }, [tourTypeId, regionId]);

  const { data, isLoading, isError } = useGetToursQuery(queryParams);

  const tourData = data?.data;
  const tourTypes = tourData?.tour_types ?? [];
  const regions = tourData?.regions ?? [];
  const tours = useMemo(() => {
    return tourData?.tours ?? [];
  }, [tourData]);

  const activeRegionId = regionId ?? tourData?.selected_tour_region_id ?? null;

  const activeTourId = useMemo(() => {
    if (selectedTourId && tours.some((tour) => tour.id === selectedTourId)) {
      return selectedTourId;
    }

    return tours[0]?.id ?? null;
  }, [selectedTourId, tours]);

  const handleTourTypeChange = (id: number) => {
    setTourTypeId(id);
    setRegionId(null);
    setSelectedTourId(null);
    setCardTouched(false);
  };

  const handleRegionChange = (id: number) => {
    setRegionId(id);
    setSelectedTourId(null);
    setCardTouched(false);
  };

  const handleCardSelect = (id: number) => {
    setSelectedTourId(id);
    setCardTouched(true);
  };

  const goToLists = (id: number) => {
    window.open(`/holiday/${id}`, "_blank", "noopener,noreferrer");
  };

  if (isLoading) return <HolidaySearchSkeleton />;

  if (isError) {
    return (
      <div className="py-20 text-center text-destructive">
        Failed to load tours
      </div>
    );
  }

  return (
    <section className="w-full py-10">
      <div
        className={cn(
          "mx-auto max-w-7xl border bg-card p-6 shadow-lg transition-all duration-300",
          cardTouched && "border-primary/40 shadow-primary/10",
        )}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {tourTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleTourTypeChange(type.id)}
                  className={cn(
                    "border px-5 py-3 text-sm font-semibold transition hover:border-primary",
                    tourTypeId === type.id &&
                      "border-primary bg-primary text-muted",
                  )}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {regions.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-sm font-semibold text-muted-foreground">
                  Regions:
                </span>

                {regions.map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => handleRegionChange(region.id)}
                    className={cn(
                      "border px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary",
                      activeRegionId === region.id &&
                        "border-primary bg-primary text-white hover:text-white",
                    )}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={() => activeTourId && goToLists(activeTourId)}
            disabled={!activeTourId}
            className={cn(
              "h-16 px-10 text-lg font-bold shadow-lg transition-all duration-300",
              activeTourId &&
                "hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl",
              cardTouched && "animate-pulse ring-4 ring-primary/20",
            )}
          >
            <Search className="mr-2 h-6 w-6" />
            {cardTouched ? "Search Selected Tour" : "Search Tour"}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {tours.map((tour) => {
            const isSelected = activeTourId === tour.id;

            return (
              <button
                key={tour.id}
                type="button"
                onClick={() => handleCardSelect(tour.id)}
                className={cn(
                  "group relative h-40 overflow-hidden border text-left shadow-sm transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-xl",
                  isSelected &&
                    "border-primary shadow-xl ring-4 ring-primary/30",
                )}
              >
                <img
                  src={tour.bg_image_url}
                  alt={tour.display_name}
                  className={cn(
                    "h-full w-full object-cover transition duration-500 group-hover:scale-110",
                    isSelected && "scale-105",
                  )}
                />

                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent",
                    isSelected && "bg-primary/15",
                  )}
                />

                {isSelected && (
                  <div className="absolute right-3 top-3 flex items-center gap-1 bg-primary px-2.5 py-1 text-xs font-semibold text-muted shadow-md">
                    <CheckCircle2 className="h-3.5 w-3.5 text-muted" />
                    Selected
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white">
                    {tour.city_name}
                  </h3>

                  <p className="flex items-center gap-1 text-xs text-white/80">
                    <MapPin className="h-3.5 w-3.5" />
                    {tour.country_name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HolidaySearch;
