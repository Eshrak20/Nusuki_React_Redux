import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetToursQuery } from "@/redux/api/holidayApi/holidayApi";
import HolidaySearchSkeleton from "@/components/skeletons/HolidaySearchSkeleton";

const HolidaySearch = () => {
  const navigate = useNavigate();

  const [tourTypeId, setTourTypeId] = useState<number>(1);
  const [regionId] = useState<number | undefined>(1);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);

  const queryParams = useMemo(
    () => ({
      tour_type_id: tourTypeId,
      tour_region_id: regionId,
    }),
    [tourTypeId, regionId]
  );

  const { data, isLoading, isError } = useGetToursQuery(queryParams);

  const tourData = data?.data;
  const tours = tourData?.tours ?? [];

  useEffect(() => {
    if (tours.length > 0) {
      setSelectedTourId(tours[0].id);
    }
  }, [tours]);

  const goToLists = (id: number, newTab = false) => {
    const url = `/holiday/${id}`;
    if (newTab) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
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
      <div className="mx-auto max-w-7xl border bg-card p-6 shadow-lg">

        {/* 🔥 BIG SEARCH BAR */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tourData?.tour_types?.map((type) => (
              <button
                key={type.id}
                onClick={() => setTourTypeId(type.id)}
                className={cn(
                  "border px-5 py-3 text-sm font-semibold transition",
                  "hover:border-primary",
                  tourTypeId === type.id &&
                    "border-primary bg-primary text-white"
                )}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Search Button */}
          <Button
            onClick={() => selectedTourId && goToLists(selectedTourId)}
            className="h-16 px-10 text-lg font-bold shadow-lg"
          >
            <Search className="mr-2 h-6 w-6" />
            Search Tour
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>

        {/* 🔥 CARDS */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tours.map((tour) => (
            <button
              key={tour.id}
              onClick={() => goToLists(tour.id, true)}
              className={cn(
                "group relative h-40 overflow-hidden border text-left shadow-sm transition",
                "hover:-translate-y-1 hover:shadow-xl",
                selectedTourId === tour.id &&
                  "border-primary ring-2 ring-primary/40"
              )}
            >
              <img
                src={tour.bg_image_url}
                alt={tour.display_name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

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
          ))}
        </div>
      </div>
    </section>
  );
};

export default HolidaySearch;