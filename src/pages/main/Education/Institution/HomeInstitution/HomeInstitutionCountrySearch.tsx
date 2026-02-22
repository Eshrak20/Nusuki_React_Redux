import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "@/redux/features/universityFilterSlice";
import type { RootState } from "@/redux/store";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const countries = [
  "USA",
  "Canada",
  "UK",
  "Ireland",
  "Australia",
  "NewZealand",
  "Germany",
  "Sweden",
  "Netherlands",
  "France",
  "Finland",
  "Dubai",
  "Singapore",
  "Malta",
  "Hungary",
  "Spain",
  "Poland",
  "Malaysia",
  "Denmark",
  "Italy",
  "Switzerland",
  "Lithuania",
  "Cyprus",
  "China",
  "Vietnam",
  "Japan",
  "Mauritius",
  "Austria",
  "Belgium",
  "Russia",
  "South Korea",
  "Georgia",
  "Monaco",
  "Croatia",
  "India",
  "SriLanka",
  "Indonesia",
  "AbuDhabi",
  "Ajman",
  "Sharjah",
  "Latvia",
  "RasAlKhaimah",
  "Thailand",
  "UmmAlQuwain",
  "Luxembourg",
  "Greece",
  "Kazakhstan",
  "Saudi Arabia",
];

const HomeInstitutionCountrySearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { country } = useSelector((state: RootState) => state.universityFilter);

  const handleSelect = (val: string) => {
    dispatch(setCountry(val));
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white border border-gray-300 py-2.5 px-4 rounded-lg cursor-pointer text-sm shadow-sm"
      >
        <span
          className={country ? "text-primary font-medium" : "text-gray-500"}
        >
          {country || "Filter By"}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay to close when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <ul className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <li
              onClick={() => handleSelect("")}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white cursor-pointer transition-colors"
            >
              All Countries
            </li>
            {countries.map((c) => (
              <li
                key={c}
                onClick={() => handleSelect(c)}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors
                  ${country === c ? "bg-primary text-white font-bold" : "text-gray-700"}
                  hover:bg-primary hover:text-white`}
              >
                {c}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default HomeInstitutionCountrySearch;
