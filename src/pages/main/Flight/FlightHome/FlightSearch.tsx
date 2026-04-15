import { useState, useRef, useEffect, useMemo } from "react";
import { ArrowRightLeft, Calendar as CalendarIcon, Search, Minus, Plus, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { DayPicker } from "react-day-picker"; 
import { format, parseISO } from "date-fns";

import type { RootState } from "@/redux/store";
import type { SearchDests } from "@/types/flight/flightHome.types";

import { setSearchDest } from "@/redux/features/flightFilterSlice"; 
import { setSearchField, updateTravelers, swapDestinations } from "@/redux/features/flightSearchSlice";

import "react-day-picker/dist/style.css";

interface FlightSearchProps {
    searchDests: SearchDests[];
}

const FlightSearch = ({ searchDests }: FlightSearchProps) => {
    const dispatch = useDispatch();

    const searchKeyword = useSelector((state: RootState) => state.flightFilter.searchDest);
    const searchData = useSelector((state: RootState) => state.flightSearch);

    const [activeDropdown, setActiveDropdown] = useState<"from" | "to" | "traveler" | null>(null);
    const [isClassOpen, setIsClassOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isReturnCalendarOpen, setIsReturnCalendarOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const travelerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const returnCalendarRef = useRef<HTMLDivElement>(null);

    const flightClasses = ["Economy", "Premium Economy", "Business Class", "First Class"];
    
    // Updated calculation for total travelers
    const totalTravelers = (searchData?.travelers?.adults || 0) + 
                          (searchData?.travelers?.children || 0) + 
                          (searchData?.travelers?.infants || 0);

    useEffect(() => {
        if (!searchData.fromDest && searchDests.length > 0) {
            dispatch(setSearchField({ fromDest: searchDests[0], toDest: searchDests[1] }));
        }
    }, [searchDests, searchData.fromDest, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (dropdownRef.current && !dropdownRef.current.contains(target) && travelerRef.current && !travelerRef.current.contains(target)) {
                setActiveDropdown(null);
                dispatch(setSearchDest(""));
            }
            if (calendarRef.current && !calendarRef.current.contains(target)) setIsCalendarOpen(false);
            if (returnCalendarRef.current && !returnCalendarRef.current.contains(target)) setIsReturnCalendarOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dispatch]);

    const filteredDests = useMemo(() => {
        const query = (searchKeyword || "").toLowerCase().trim();
        if (!query) return searchDests;
        return searchDests.filter(d => 
            d.name?.toLowerCase().includes(query) || 
            d.city_name?.toLowerCase().includes(query) || 
            d.iata_code?.toLowerCase().includes(query)
        ).sort((a, b) => a.city_name.localeCompare(b.city_name)); //! Sorting must be come from backend
    }, [searchKeyword, searchDests]);

    if (!searchData || !searchData.travelers) return null;

    return (
        <div className="w-full bg-white dark:bg-slate-950 p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            {/* Top Row: Trip Types & Travelers */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex flex-wrap gap-2 md:gap-4">
                    {["one-way", "round-way", "multi-way"].map((type) => (
                        <button
                            key={type}
                            onClick={() => dispatch(setSearchField({ tripType: type }))}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors text-sm font-medium ${searchData.tripType === type ? "bg-primary text-white border-primary" : "bg-transparent text-slate-700 dark:text-primary border-slate-300"}`}
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${searchData.tripType === type ? "dark:bg-black border-white" : "border-slate-400"}`}>
                                {searchData.tripType === type && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </button>
                    ))}
                </div>

                <div className="relative" ref={travelerRef}>
                    <button
                        onClick={() => setActiveDropdown(activeDropdown === "traveler" ? null : "traveler")}
                        className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-medium py-2 px-4 rounded-md flex items-center gap-2 min-w-40 hover:bg-slate-200 transition-colors"
                    >
                        <span>{totalTravelers} Traveler{totalTravelers > 1 ? 's' : ''}, {searchData.flightClass}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "traveler" ? "rotate-180" : ""}`} />
                    </button>

                    {activeDropdown === "traveler" && (
                        <div className="absolute top-[110%] right-0 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl z-110 p-4">
                            <div className="space-y-4">
                                {/* Adult Counter */}
                                <div className="flex justify-between items-center">
                                    <div><p className="font-bold text-sm">Adults</p><p className="text-[10px] text-slate-500">(12+ Years)</p></div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => dispatch(updateTravelers({ adults: Math.max(1, searchData.travelers.adults - 1) }))} className="p-1 border rounded hover:bg-slate-50"><Minus className="w-3 h-3" /></button>
                                        <span className="font-bold text-sm w-4 text-center">{searchData.travelers.adults}</span>
                                        <button onClick={() => dispatch(updateTravelers({ adults: searchData.travelers.adults + 1 }))} className="p-1 border rounded hover:bg-slate-50"><Plus className="w-3 h-3" /></button>
                                    </div>
                                </div>

                                {/* Child Counter */}
                                <div className="flex justify-between items-center">
                                    <div><p className="font-bold text-sm">Child</p><p className="text-[10px] text-slate-500">(2-11 Years)</p></div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => dispatch(updateTravelers({ children: Math.max(0, searchData.travelers.children - 1) }))} className="p-1 border rounded hover:bg-slate-50"><Minus className="w-3 h-3" /></button>
                                        <span className="font-bold text-sm w-4 text-center">{searchData.travelers.children}</span>
                                        <button onClick={() => dispatch(updateTravelers({ children: searchData.travelers.children + 1 }))} className="p-1 border rounded hover:bg-slate-50"><Plus className="w-3 h-3" /></button>
                                    </div>
                                </div>

                                {/* Infants Counter */}
                                <div className="flex justify-between items-center">
                                    <div><p className="font-bold text-sm">Infants</p><p className="text-[10px] text-slate-500">(0-24 Months)</p></div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => dispatch(updateTravelers({ infants: Math.max(0, searchData.travelers.infants - 1) }))} className="p-1 border rounded hover:bg-slate-50"><Minus className="w-3 h-3" /></button>
                                        <span className="font-bold text-sm w-4 text-center">{searchData.travelers.infants}</span>
                                        <button onClick={() => dispatch(updateTravelers({ infants: searchData.travelers.infants + 1 }))} className="p-1 border rounded hover:bg-slate-50"><Plus className="w-3 h-3" /></button>
                                    </div>
                                </div>

                                <div className="relative w-full">
                                    <div onClick={() => setIsClassOpen(!isClassOpen)} className="w-full p-2 border rounded-md text-sm cursor-pointer flex justify-between items-center bg-transparent border-slate-300">
                                        {searchData.flightClass} <ChevronDown className={`w-4 h-4 transition-transform ${isClassOpen ? "rotate-180" : ""}`} />
                                    </div>
                                    {isClassOpen && (
                                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded shadow-lg z-130 overflow-hidden">
                                            {flightClasses.map((cls) => (
                                                <div key={cls} onClick={() => { dispatch(setSearchField({ flightClass: cls })); setIsClassOpen(false); }} className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-100 ${searchData.flightClass === cls ? "bg-primary text-white" : "text-slate-700"}`}>{cls}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => setActiveDropdown(null)} className="w-full bg-primary text-white py-2 rounded-md font-bold text-sm hover:opacity-90 transition-colors">Done</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Middle Row: Search Inputs (Restored your layout) */}
            <div className="flex flex-col lg:flex-row items-center gap-2 mb-6 relative" ref={dropdownRef}>
                <div className="flex flex-col md:flex-row w-full lg:w-2/3 gap-2 relative">
                    {/* FROM Input */}
                    <div className={`flex-1 border rounded-md transition-all cursor-pointer bg-white dark:bg-slate-950 min-h-18 flex items-center ${activeDropdown === "from" ? "border-primary ring-1 ring-primary" : "border-slate-300 dark:border-slate-700 hover:border-primary"}`} onClick={() => setActiveDropdown("from")}>
                        {activeDropdown === "from" ? (
                            <div className="flex items-center w-full px-3">
                                <Search className="w-5 h-5 text-slate-400 mr-2" />
                                <input autoFocus className="flex-1 bg-transparent outline-none text-lg font-medium" placeholder="From where?" value={searchKeyword} onChange={(e) => dispatch(setSearchDest(e.target.value))} />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 p-3 w-full">
                                <span className="text-2xl font-bold">{searchData.fromDest?.iata_code}</span>
                                <div className="flex flex-col truncate">
                                    <span className="text-sm font-semibold truncate">{searchData.fromDest?.city_name}</span>
                                    <span className="text-xs text-slate-500 truncate">{searchData.fromDest?.name}</span>
                                </div>
                            </div>
                        )}
                        {activeDropdown === "from" && (
                            <div className="absolute top-[105%] left-0 w-full md:w-[130%] bg-white dark:bg-slate-900 border rounded-lg shadow-2xl z-120 max-h-72 overflow-y-auto">
                                {filteredDests.map((dest, idx) => (
                                    <div key={idx} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b last:border-0" onClick={(e) => { e.stopPropagation(); dispatch(setSearchField({ fromDest: dest })); setActiveDropdown(null); dispatch(setSearchDest("")); }}>
                                        <div className="font-bold text-sm">{dest.city_name} ({dest.iata_code})</div>
                                        <div className="text-[10px] text-slate-500">{dest.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={(e) => { e.stopPropagation(); dispatch(swapDestinations()); }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-950 border border-slate-200 shadow-md p-2 rounded-full text-primary hover:scale-110 transition-transform hidden md:flex"><ArrowRightLeft className="w-4 h-4" /></button>

                    {/* TO Input */}
                    <div className={`flex-1 border rounded-md cursor-pointer bg-white dark:bg-slate-950 min-h-18 flex items-center ${activeDropdown === "to" ? "border-primary ring-1 ring-primary" : "border-slate-300 dark:border-slate-700 hover:border-primary"}`} onClick={() => setActiveDropdown("to")}>
                        {activeDropdown === "to" ? (
                             <div className="flex items-center w-full px-3">
                                <Search className="w-5 h-5 text-slate-400 mr-2" />
                                <input autoFocus className="flex-1 bg-transparent outline-none text-lg font-medium" placeholder="To where?" value={searchKeyword} onChange={(e) => dispatch(setSearchDest(e.target.value))} />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 p-3 w-full">
                                <span className="text-2xl font-bold">{searchData.toDest?.iata_code}</span>
                                <div className="flex flex-col truncate">
                                    <span className="text-sm font-semibold truncate">{searchData.toDest?.city_name}</span>
                                    <span className="text-xs text-slate-500 truncate">{searchData.toDest?.name}</span>
                                </div>
                            </div>
                        )}
                        {activeDropdown === "to" && (
                            <div className="absolute top-[105%] right-0 w-full md:w-[130%] bg-white dark:bg-slate-900 border rounded-lg shadow-2xl z-120 max-h-72 overflow-y-auto">
                                {filteredDests.map((dest, idx) => (
                                    <div key={idx} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b" onClick={(e) => { e.stopPropagation(); dispatch(setSearchField({ toDest: dest })); setActiveDropdown(null); dispatch(setSearchDest("")); }}>
                                        <div className="font-bold text-sm">{dest.city_name} ({dest.iata_code})</div>
                                        <div className="text-[10px] text-slate-500">{dest.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Date Fields & Search Button */}
                <div className="flex flex-col md:flex-row w-full lg:w-auto flex-1 gap-2 relative">
                    <div className={`flex-1 border rounded-md p-3 cursor-pointer ${isCalendarOpen ? 'border-primary ring-1' : 'border-slate-300 dark:border-slate-700 hover:border-primary'}`} onClick={() => { setIsCalendarOpen(!isCalendarOpen); setIsReturnCalendarOpen(false); }}>
                        <div className="flex items-center gap-2 mb-1 text-xs text-slate-500"><CalendarIcon className="w-4 h-4" /> Departure Date</div>
                        <div className="text-sm font-semibold">{format(parseISO(searchData.departureDate), "dd/MM/yyyy")}</div>
                        {isCalendarOpen && (
                            <div ref={calendarRef} className="absolute top-[110%] left-0 z-150 bg-white dark:bg-slate-900 shadow-2xl border rounded-xl p-2" onClick={(e) => e.stopPropagation()}>
                                <DayPicker mode="single" selected={parseISO(searchData.departureDate)} onSelect={(d) => d && (dispatch(setSearchField({ departureDate: d.toISOString() })), setIsCalendarOpen(false))} disabled={{ before: new Date() }} showOutsideDays />
                            </div>
                        )}
                    </div>

                    {searchData.tripType !== "one-way" ? (
                        <div className={`flex-1 border rounded-md p-3 cursor-pointer ${isReturnCalendarOpen ? 'border-primary ring-1' : 'border-slate-300 dark:border-slate-700 hover:border-primary'}`} onClick={() => { setIsReturnCalendarOpen(!isReturnCalendarOpen); setIsCalendarOpen(false); }}>
                            <div className="flex items-center gap-2 mb-1 text-xs text-slate-500"><CalendarIcon className="w-4 h-4" /> Return Date</div>
                            <div className="text-sm font-semibold">{format(parseISO(searchData.returnDate), "dd/MM/yyyy")}</div>
                            {isReturnCalendarOpen && (
                                <div ref={returnCalendarRef} className="absolute top-[110%] right-0 z-150 bg-white dark:bg-slate-900 shadow-2xl border rounded-xl p-2" onClick={(e) => e.stopPropagation()}>
                                    <DayPicker mode="single" selected={parseISO(searchData.returnDate)} onSelect={(d) => d && (dispatch(setSearchField({ returnDate: d.toISOString() })), setIsReturnCalendarOpen(false))} disabled={{ before: parseISO(searchData.departureDate) }} showOutsideDays />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 border border-slate-300 dark:border-slate-700 rounded-md p-3 opacity-60 bg-slate-50 dark:bg-slate-900/50 cursor-not-allowed">
                            <div className="flex items-center gap-2 mb-1 text-xs text-slate-500"><CalendarIcon className="w-4 h-4" /> Return</div>
                            <div className="text-sm font-semibold">Save More</div>
                        </div>
                    )}
                </div>

                <button className="w-full lg:w-14 lg:h-14 bg-primary hover:opacity-90 text-white rounded-md lg:rounded-xl flex items-center justify-center transition-colors shadow-lg">
                    <Search className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Bottom Row: Fare Type */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
                {["Regular Fare", "Student Fare", "Umrah Fare"].map((fare) => {
                    const fareId = fare.toLowerCase().split(' ')[0];
                    return (
                        <label key={fare} className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${searchData.fareType === fareId ? "border-primary" : "border-slate-400"}`}>
                                {searchData.fareType === fareId && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <span className={`text-sm font-medium ${searchData.fareType === fareId ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>{fare}</span>
                            <input type="radio" className="hidden" name="fareType" value={fareId} checked={searchData.fareType === fareId} onChange={(e) => dispatch(setSearchField({ fareType: e.target.value }))} />
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default FlightSearch;