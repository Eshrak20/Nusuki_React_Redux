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
  "SaudiArabia",
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
      {/* Glowy background */}
      <div
        className={`absolute -inset-1 bg-linear-to-r from-primary/10 via-primary/10 to-primary/10
      rounded-lg opacity-75 blur-xl transition-all duration-700
      ${isOpen ? "opacity-100 blur-2xl animate-pulse" : "opacity-0"}`}
      />

      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-between w-full bg-background border border-border py-2.5 px-4 rounded-lg cursor-pointer text-sm shadow-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <span className={country ? "text-primary font-medium" : "text-muted-foreground"}>
          {country || "Filter By"}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform dark:text-gray-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay to close when clicking outside */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          <ul className="absolute z-20 w-full mt-2 bg-background border border-border rounded-lg shadow-xl max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <li
              onClick={() => handleSelect("")}
              className="px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
            >
              All Countries
            </li>
            {countries.map((c) => (
              <li
                key={c}
                onClick={() => handleSelect(c)}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors
              ${country === c ? "bg-accent text-accent-foreground font-bold" : "text-foreground"}
              hover:bg-accent hover:text-accent-foreground`}
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