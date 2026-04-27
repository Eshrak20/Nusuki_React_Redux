import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlaneTakeoff } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTourId, setPage } from "@/redux/features/holidayPackageFilterSlice";

import HolidayPackageGrid from "./HolidayPackageGrid";
import HolidayPackageFilter from "./holidayFilters/HolidayPackageFilter";
import HolidayCustomTourDialog from "./HolidayCustomTourDialog";

import { Button } from "@/components/ui/button";
import { useGetTourPackagesListQuery } from "@/redux/api/holidayApi/holidayApi";
import HolidayPackageSkeleton from "@/components/skeletons/HolidayPackageSkeleton";

const HolidayPackageLists = () => {
  const { tourId } = useParams<{ tourId: string }>();
  console.log(tourId);
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.holidayPackageFilters);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (tourId) {
      dispatch(setTourId(tourId));
    }
  }, [tourId, dispatch]);

  const { data, isLoading, isFetching, isError } = useGetTourPackagesListQuery(
    filters,
    {
      skip: !filters.tour_id,
    }
  );

  const packages = data?.data?.data ?? [];
  const dynamicFilters = data?.data?.filters;
  console.log(dynamicFilters);
  
  const pagination = data?.data?.pagination;

  return (
    <div className="mt-20 bg-background pb-16 text-foreground lg:mt-22.5">
<div className=" border bg-linear-to-r mb-14 from-primary/10 via-card to-primary/5 py-8 shadow-sm">
      <div className=" grid items-center max-w-7xl mx-auto gap-4 px-12 rounded-md md:grid-cols-[1fr_auto]">
          
            <div className="flex items-center gap-4">
            <div className="hidden size-14 items-center justify-center rounded-md bg-primary text-primary-foreground md:flex">
              <PlaneTakeoff size={28} />
            </div>

            <div>
              <p className="text-sm font-medium text-primary">
                Need a customized tour ?
              </p>
              <h1 className="text-2xl font-bold md:text-4xl">
                Build your dream holiday package
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us your destination, budget, and date. Our team will contact you.
              </p>
            </div>
            
          </div>
           <HolidayCustomTourDialog />
          </div>

         
        </div>
      <div className="max-w-7xl mx-auto px-12">
        

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <HolidayPackageFilter filters={dynamicFilters} />
          </div>

          <div className="lg:col-span-9">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Holiday Packages</h2>
                <p className="text-sm text-muted-foreground">
                  {pagination?.total ?? 0} packages found
                </p>
              </div>

              {isFetching && !isLoading && (
                <p className="text-sm text-primary">Updating...</p>
              )}
            </div>

            {isLoading && <HolidayPackageSkeleton />}

            {isError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-6 text-destructive">
                Failed to load packages. Please try again.
              </div>
            )}

            {!isLoading && !isError && <HolidayPackageGrid tours={packages} />}

            {pagination && pagination.last_page > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  disabled={pagination.current_page <= 1}
                  onClick={() => dispatch(setPage(pagination.current_page - 1))}
                  className="rounded-md"
                >
                  Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>

                <Button
                  variant="outline"
                  disabled={pagination.current_page >= pagination.last_page}
                  onClick={() => dispatch(setPage(pagination.current_page + 1))}
                  className="rounded-md"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayPackageLists;