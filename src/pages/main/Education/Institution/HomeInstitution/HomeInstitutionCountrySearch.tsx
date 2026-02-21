import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "@/redux/features/universityFilterSlice";

const countries = ["USA", "UK", "Canada", "Australia", "Germany", "India"];

const HomeInstitutionCountrySearch = () => {
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.universityFilter);

  const handleChange = (e) => {
    dispatch(setCountry(e.target.value));
  };

  return (
    <select
      value={country}
      onChange={handleChange}
      className="border p-2 rounded w-full md:w-1/2"
    >
      <option value="">All Countries</option>
      {countries.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default HomeInstitutionCountrySearch;