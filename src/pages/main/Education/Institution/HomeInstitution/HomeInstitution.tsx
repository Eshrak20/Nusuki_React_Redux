import { useGetUniversitiesQuery } from "@/redux/api/educationApi/universityApi";
import HomeInstitutionCard from "./HomeInstitutionCard";
import HomeInstitutionSearch from "./HomeInstitutionSearch";
import HomeInstitutionCountrySearch from "./HomeInstitutionCountrySearch";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { setPage } from "@/redux/features/universityFilterSlice";
import EduPagination from "@/components/education/EduPagination";
import HomeInstitutionCardSkeleton from "@/components/skeletons/HomeInstitutionCardSkeleton";

const HomeInstitution = () => {
  const dispatch = useDispatch();
  const { keyword, country, page } = useSelector(
    (state: RootState) => state.universityFilter,
  );

  const { data, isLoading } = useGetUniversitiesQuery({
    page,
    keyword,
    country,
  });


  const universities = data?.data?.data ?? [];
  const pagination = data?.data;

  return (
    <div className="pt-32 pb-3 max-w-7xl mx-auto min-h-screen">
      {/* Search and Filter Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-7 gap-6 md:gap-10 pl-2">
        {/* Showing Results */}
        <p className="text-foreground/80 text-sm font-medium order-3 md:order-1 whitespace-nowrap mr-auto">
          Showing Results in:{" "}
          <span className="text-foreground font-semibold">{country || "All Countries"}</span>
        </p>

        {/* First Search Bar */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <HomeInstitutionSearch />
        </div>

        {/* Second Search Bar */}
        <div className="w-full md:w-1/4 order-2 md:order-3">
          <HomeInstitutionCountrySearch />
        </div>
      </div>

      {/* Grid Section */}


      <div className="">
        {isLoading ? (
          <HomeInstitutionCardSkeleton />
        ) : universities.length > 0 ? (
          <HomeInstitutionCard universities={universities} />
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No universities found matching your criteria.
          </div>
        )}
      </div>


      <div className="max-w-7xl mx-auto">
        {pagination && (
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

export default HomeInstitution;
