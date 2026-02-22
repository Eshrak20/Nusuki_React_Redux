import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "@/redux/features/universityFilterSlice";
import type { RootState } from "@/redux/store";

const countries = ['USA', 'Canada', 'UK', 'Ireland', 'Australia', 'NewZealand',
  'Germany', 'Sweden', 'Netherlands', 'France', 'Finland', 'Dubai', 'Singapore',
  'Malta', 'Hungary', 'Spain', 'Poland', 'Malaysia', 'Denmark', 'Italy', 'Switzerland',
  'Lithuania', 'Cyprus', 'China', 'Vietnam', 'Japan', 'Mauritius', 'Austria', 'Belgium',
  'Russia', 'SouthKorea', 'Georgia', 'Monaco', 'Croatia', 'India', 'SriLanka', 'Indonesia',
  'AbuDhabi', 'Ajman', 'Sharjah', 'Latvia', 'RasAlKhaimah', 'Thailand', 'UmmAlQuwain',
  'Luxembourg', 'Greece', 'Kazakhstan', 'SaudiArabia'];

const HomeInstitutionCountrySearch = () => {
  const dispatch = useDispatch();
  const { country } = useSelector((state: RootState) => state.universityFilter);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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