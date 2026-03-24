import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetTestsQuery } from "@/redux/api/educationApi/testApi";
import { setPage } from "@/redux/features/testFilterSlice";
import EduFilter from "@/components/education/EduFilter";
import EduPagination from "@/components/education/EduPagination";
import EduSearch from "@/components/education/EduSearch";
import HomeTestCardSkeleton from "@/components/skeletons/HomeTestCardSkeleton";
import HomeTestCard from "./HomeTestCard";

const HomeTest = () => {
  const dispatch = useDispatch();

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { examType, page } = useSelector(
    (state: RootState) => state.testFilter
  );

  const [debouncedExamType, setDebouncedExamType] = useState(examType);

  // ONLY ONE useEffect for debouncing
  useEffect(() => {
    // If examType is empty (cleared), delay is 0. Otherwise, wait 500ms.
    const delay = examType ? 500 : 0;

    const handler = setTimeout(() => {
      setDebouncedExamType(examType);
    }, delay);

    return () => clearTimeout(handler);
  }, [examType]);

  // Grab isFetching as well to track background loading
  const { data, isLoading, isFetching } = useGetTestsQuery({
    page,
    examType: debouncedExamType,
  });

  const tests = data?.data?.data ?? [];
  const pagination = data?.data;

  // Use a combined loading state for the initial load OR when a search is actively fetching
  const showSkeleton = isLoading || (isFetching && tests.length === 0);

  return (
    <div className="lg:pt-16 pb-3 max-w-7xl mx-auto min-h-screen">
      {/* Search and Filter Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-7 gap-6 md:gap-10 pl-2">
        {/* Showing Results Info */}
        <p className="text-foreground/80 text-sm font-medium order-3 md:order-1 whitespace-nowrap mr-auto">
          Showing Results for:{" "}
          <span className="text-foreground font-semibold">
            {examType || "All Exams"}
          </span>
        </p>

        {/* Search Bar */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <EduSearch placeholder="test preparations (IELTS, PTE...)" />
        </div>

        {/* Filter Dropdown */}
        <div className="w-full md:w-1/4 order-2 md:order-3">
          <EduFilter />
        </div>
      </div>

      {/* Grid Section */}
      {/* Added transition-opacity so the grid subtly fades while new data fetches, preventing jarring visual glitches */}
      <div className={`mb-10 transition-opacity duration-300`}>
        {showSkeleton ? (
          <HomeTestCardSkeleton />
        ) : tests.length > 0 ? (
          <HomeTestCard tests={tests} />
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No test preparations found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="max-w-7xl mx-auto">
        {pagination && pagination.last_page > 1 && (
          <EduPagination
            pagination={{
              current_page: pagination.current_page,
              last_page: pagination.last_page,
            }}
            onPageChange={(newPage: number) => dispatch(setPage(newPage))}
          />
        )}
      </div>
    </div>
  );
};

export default HomeTest;