// import { useDispatch, useSelector } from "react-redux";
// import { setCountry } from "@/redux/features/universityFilterSlice";
// import type { RootState } from "@/redux/store";
// import { ChevronDown } from "lucide-react";
// import { useState } from "react";
// import { countries } from "../../../../../data/education/countries"
// import { degrees } from "../../../../../data/education/degrees"
// import { useLocation } from "react-router-dom";
// import { setDegree } from "@/redux/features/courseFilterSlice";

// const HomeInstitutionCountrySearch = () => {
//   const location = useLocation();
//   const options = location.pathname.startsWith("/education/institution") ? countries : degrees;
//   const setOption = location.pathname.startsWith("/education/institution") ? setCountry : setDegree;
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const { option } = useSelector((state: RootState) => {
//     if (location.pathname.startsWith("/education/institution")) {
//       return state.universityFilter;
//     }
//     else if (location.pathname.startsWith("/education/courses")) {
//       return state.courseFilter;
//     }
//   });

//   const handleSelect = (val: string) => {
//     dispatch(setOption(val));
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative w-full">
//       <div
//         className={`absolute -inset-1 bg-linear-to-r from-primary/10 via-primary/10 to-primary/10
//       rounded-lg opacity-75 blur-xl transition-all duration-700
//       ${isOpen ? "opacity-100 blur-2xl animate-pulse" : "opacity-0"}`}
//       />

//       {/* Trigger Button */}
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative flex items-center justify-between w-full bg-background border border-border py-2.5 px-4 rounded-lg cursor-pointer text-sm shadow-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
//       >
//         <span className={option? "text-primary font-medium" : "text-muted-foreground"}>
//           {option|| "Filter By"}
//         </span>
//         <ChevronDown
//           className={`h-4 w-4 text-gray-400 transition-transform dark:text-gray-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </div>

//       {/* Custom Dropdown Menu */}
//       {isOpen && (
//         <>
//           {/* Overlay to close when clicking outside */}
//           <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

//           <ul className="absolute z-20 w-full mt-2 bg-background border border-border rounded-lg shadow-xl max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar">
//             <li
//               onClick={() => handleSelect("")}
//               className="px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
//             >
//               All {location.pathname.startsWith("/education/institution") ? "Countries" : "Degrees"}
//             </li>
//             {options.map((c) => (
//               <li
//                 key={c}
//                 onClick={() => handleSelect(c)}
//                 className={`px-4 py-2 text-sm cursor-pointer transition-colors
//               ${option=== c ? "bg-accent text-accent-foreground font-bold" : "text-foreground"}
//               hover:bg-accent hover:text-accent-foreground`}
//               >
//                 {c}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default HomeInstitutionCountrySearch;