import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/redux/features/universityFilterSlice";
import type { RootState, AppDispatch } from "@/redux/store";

const HomeInstitutionSearch = () => {
  const dispatch = useDispatch<AppDispatch>();

  const keyword = useSelector(
    (state: RootState) => state.universityFilter.keyword
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search university..."
      value={keyword}
      onChange={handleChange}
      className="border p-2 rounded w-full md:w-1/2"
    />
  );
};

export default HomeInstitutionSearch;