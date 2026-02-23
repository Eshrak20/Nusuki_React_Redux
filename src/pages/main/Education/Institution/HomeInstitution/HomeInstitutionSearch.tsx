import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/redux/features/universityFilterSlice";
import type { RootState } from "@/redux/store";
import { useState, useRef } from "react";
import { X, GraduationCap } from "lucide-react";

const HomeInstitutionSearch = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.universityFilter.keyword);

  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    dispatch(setSearch(""));
    inputRef.current?.focus();
  };

  return (
    <div className="w-full mx-auto px-4">
      {/* Main Search Container */}
      <div
        className={`relative transition-all duration-500 ease-out ${
          isFocused || isHovered ? "scale-[1.02]" : "scale-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background Gradient */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
          rounded-[32px] opacity-75 blur-xl transition-all duration-700
          ${isFocused ? "opacity-100 blur-2xl animate-pulse" : "opacity-0"}`}
        />

        {/* Search Input Container */}
        <div
          className={`relative flex items-center bg-white dark:bg-gray-900
          rounded-2xl border-2 transition-all duration-300 shadow-lg
          ${isFocused
            ? "border-primary shadow-2xl shadow-primary/30"
            : "border-gray-200 dark:border-gray-700 hover:border-primary"}
          `}
        >
          {/* Left Icon with Animation */}
          <div className="flex items-center pl-6">
            <GraduationCap
              className={`w-6 h-6 transition-all duration-300
                ${isFocused ? "text-primary scale-110" : "text-gray-400 dark:text-gray-400"}`}
            />
          </div>

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for universities, programs, locations..."
            value={keyword}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full py-5 px-4 text-lg bg-transparent focus:outline-none
            text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500
            font-medium transition-all"
          />

          {/* Right Actions */}
          <div className="flex items-center gap-2 pr-4">
            {/* Clear Button - Shows when there's text */}
            {keyword && (
              <button
                onClick={clearSearch}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
                transition-all duration-200 group/clear"
                aria-label="Clear search"
              >
                <X
                  className="w-5 h-5 text-gray-400 dark:text-gray-400
                  group-hover/clear:text-gray-600 dark:group-hover/clear:text-gray-300
                  transition-colors"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInstitutionSearch;