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
    <div className="pt-44 pb-20 max-w-7xl mx-auto min-h-screen">
      {/* Search and Filter Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-15">
        <p className="text-foreground/80 text-sm font-medium order-3 md:order-1">
          Showing Results in:{" "}
          <span className="text-foreground">{country || "All Countries"}</span>
        </p>

        <div className="w-full md:w-1/3 order-1 md:order-2">
          <HomeInstitutionSearch />
        </div>

        <div className="w-full md:w-1/5 order-2 md:order-3">
          <HomeInstitutionCountrySearch />
        </div>
      </div>

      {/* Grid Section */}


      <div className="my-20">
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
