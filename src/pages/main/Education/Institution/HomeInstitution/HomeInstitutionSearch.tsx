import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/redux/features/universityFilterSlice";
import type { RootState } from "@/redux/store";
import { Search } from "lucide-react";

const HomeInstitutionSearch = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.universityFilter.keyword);

  return (
    <div className="relative group">
      <input
        type="text"
        placeholder="Search Universities"
        value={keyword}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="w-full border border-gray-300 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-sm placeholder:text-gray-400 shadow-sm"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
    </div>
  );
};

export default HomeInstitutionSearch;