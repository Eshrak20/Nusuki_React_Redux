import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTourId, setPage } from "@/redux/features/holidayPackageFilterSlice";

import HolidayPackageGrid from "./HolidayPackageGrid";
import HolidayPackageFilter from "./holidayFilters/HolidayPackageFilter";
import HolidayPackageHeader from "./HolidayPackageHeader";

import { Button } from "@/components/ui/button";
import { useGetTourPackagesListQuery } from "@/redux/api/holidayApi/holidayApi";
import HolidayPackageSkeleton from "@/components/skeletons/HolidayPackageSkeleton";

const HolidayPackageLists = () => {
  const { tourId } = useParams<{ tourId: string }>();
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
    },
  );

  const packages = data?.data?.data ?? [];
  const dynamicFilters = data?.data?.filters;
  const pagination = data?.data?.pagination;

  return (
    <div className="mt-20 bg-background pb-16 text-foreground lg:mt-22.5">
      <HolidayPackageHeader
        videoUrl="https://assets.sharetrip.net/hero-bg-cover.mp4"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
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
                <p className="text-sm font-medium text-primary">Updating...</p>
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