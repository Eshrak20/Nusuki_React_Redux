import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetExpertsQuery, useGetTestsQuery } from "@/redux/api/educationApi/testApi";
import { setPage } from "@/redux/features/testFilterSlice";
import EduFilter from "@/components/education/EduFilter";
import EduPagination from "@/components/education/EduPagination";
import EduSearch from "@/components/education/EduSearch";
import HomeTestCardSkeleton from "@/components/skeletons/HomeTestCardSkeleton";
import HomeTestCard from "./HomeTestCard";
import OurExpertTeam from "./OurExpertTeam";

const HomeTest = () => {
  const dispatch = useDispatch();

  const { examType, page } = useSelector(
    (state: RootState) => state.testFilter
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [examType, page]);

  const { data, isLoading } = useGetTestsQuery({
    page,
    examType,
  });

  const { data: expertsData, isLoading: expertsLoading } = useGetExpertsQuery();

  const tests = data?.data?.data ?? [];
  const pagination = data?.data;
  const experts = expertsData?.data

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
        {isLoading ? (
          <HomeTestCardSkeleton />
        ) : tests.length > 0 ? (
          <div>
            <HomeTestCard key={examType} tests={tests} />
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No test preparations found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination Section */}
      <div key={examType} className="max-w-7xl mx-auto">
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

      <div className={`mb-10 transition-opacity duration-300`}>
        {expertsLoading ? (
          <HomeTestCardSkeleton />
        ) : (
          <div>
            <OurExpertTeam experts={experts} />
          </div>
        )
        }
      </div>
    </div>
  );
};

export default HomeTest;