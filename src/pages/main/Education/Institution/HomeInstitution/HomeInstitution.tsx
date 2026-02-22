import { useGetUniversitiesQuery } from "@/redux/api/educationApi/universityApi";
import HomeInstitutionCard from "./HomeInstitutionCard";
import EduPagination from "@/components/education/EduPagination";
import HomeInstitutionSearch from "./HomeInstitutionSearch";
import HomeInstitutionCountrySearch from "./HomeInstitutionCountrySearch";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { setPage } from "@/redux/features/universityFilterSlice";

const HomeInstitution = () => {
  const dispatch = useDispatch();
  const { keyword, country, page } = useSelector(
    (state: RootState) => state.universityFilter
  );

  const { data, isLoading } = useGetUniversitiesQuery({
    page,
    keyword,
    country,
  });

  if (isLoading) return <p>Loading universities...</p>;

  const universities = data?.data?.data ?? [];
  const pagination = data?.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <HomeInstitutionSearch />
        <HomeInstitutionCountrySearch />
      </div>

      <div>
        {universities.length ? (
          <HomeInstitutionCard universities={universities} />
        ) : (
          <p>No universities found</p>
        )}
      </div>

      {pagination && (
        <EduPagination
          pagination={{
            current_page: pagination.current_page,
            last_page: pagination.last_page,
          }}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
        />
      )}
    </div>
  );
};

export default HomeInstitution;