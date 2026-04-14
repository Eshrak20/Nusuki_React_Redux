import { useState, useRef, useEffect, useMemo } from "react";
import { ArrowRightLeft, Calendar as CalendarIcon, Search, Minus, Plus, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setSearchDest } from "@/redux/features/flightFilterSlice";
import type { SearchDests } from "@/types/flight/flightHome.types";
import { DayPicker } from "react-day-picker"; 
import { format, addDays } from "date-fns";
import "react-day-picker/dist/style.css";

interface searchDestsProps {
    searchDests: SearchDests[];
}

const FlightSearch = ({ searchDests }: searchDestsProps) => {
    const dispatch = useDispatch();

    // Redux state for search input
    const searchKeyword = useSelector((state: RootState) => state.flightFilter.searchDest);

    // --- Date Logic ---
    const nextDay = useMemo(() => addDays(new Date(), 1), []);
    const [departureDate, setDepartureDate] = useState<Date | undefined>(nextDay);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // --- State Management ---
    const [tripType, setTripType] = useState("one-way");
    const [fareType, setFareType] = useState("regular");
    const [fromDest, setFromDest] = useState(searchDests[0]);
    const [toDest, setToDest] = useState(searchDests[1]);

    // Dropdown visibility
    const [activeDropdown, setActiveDropdown] = useState<"from" | "to" | "traveler" | null>(null);

    // Traveler Counter States
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [flightClass, setFlightClass] = useState("Economy");

    const dropdownRef = useRef<HTMLDivElement>(null);
    const travelerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    // --- Helpers ---
    const totalTravelers = adults + children + infants;
    const [isClassOpen, setIsClassOpen] = useState(false);
    const flightClasses = ["Economy", "Premium Economy", "Business Class", "First Class"];

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredDests = useMemo(() => {
        const query = (searchKeyword || "").toLowerCase().trim();
        if (!query) return searchDests;

        const filtered = searchDests.filter((dest) => {
            const name = (dest.name || "").toLowerCase();
            const city = (dest.city_name || "").toLowerCase();
            const iata = (dest.iata_code || "").toLowerCase();
            return name.includes(query) || city.includes(query) || iata.includes(query);
        });

        return filtered.sort((a, b) => {
            const aCity = a.city_name.toLowerCase();
            const bCity = b.city_name.toLowerCase();
            const aIata = a.iata_code.toLowerCase();
            const bIata = b.iata_code.toLowerCase();

            if ((aCity.startsWith(query) || aIata.startsWith(query)) &&
                !(bCity.startsWith(query) || bIata.startsWith(query))) return -1;
            if (!(aCity.startsWith(query) || aIata.startsWith(query)) &&
                (bCity.startsWith(query) || bIata.startsWith(query))) return 1;

            return aCity.localeCompare(bCity);
        });
    }, [searchKeyword, searchDests]);

    const handleSelectDest = (dest: SearchDests, type: "from" | "to") => {
        if (type === "from") {
            setFromDest(dest);
        } else {
            setToDest(dest);
        }
        setActiveDropdown(null);
        dispatch(setSearchDest(""));
    };

    return (
        <div className="w-full bg-white dark:bg-slate-950 p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            {/* Top Row: Trip Types & Travelers */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex flex-wrap gap-2 md:gap-4">
                    {["one-way", "round-way", "multi-way"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setTripType(type)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors text-sm font-medium ${tripType === type ? "bg-primary text-white border-primary" : "bg-transparent text-slate-700 border-slate-300"}`}
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${tripType === type ? "border-white" : "border-slate-400"}`}>
                                {tripType === type && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </button>
                    ))}
                </div>

                {/* Traveler & Class Dropdown */}
                <div className="relative" ref={travelerRef}>
                    <button
                        onClick={() => setActiveDropdown(activeDropdown === "traveler" ? null : "traveler")}
                        className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-medium py-2 px-4 rounded-md flex items-center gap-2 min-w-40 hover:bg-slate-200 transition-colors"
                    >
                        <span>{totalTravelers} Traveler{totalTravelers > 1 ? 's' : ''}, {flightClass}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "traveler" ? "rotate-180" : ""}`} />
                    </button>

                    {activeDropdown === "traveler" && (
                        <div className="absolute top-[110%] right-0 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl z-110 p-4">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm">Adults</p>
                                        <p className="text-[10px] text-slate-500">(12 Years and Above)</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setAdults(Math.max(1, adults - 1))} className="p-1 border rounded hover:bg-slate-50"><Minus className="w-3 h-3" /></button>
                                        <span className="font-bold text-sm w-4 text-center">{adults}</span>
                                        <button onClick={() => setAdults(adults + 1)} className="p-1 border rounded hover:bg-slate-50"><Plus className="w-3 h-3" /></button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm">Child</p>
                                        <p className="text-[10px] text-slate-500">(2-11 Years Below)</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setChildren(Math.max(0, children - 1))} className="p-1 border rounded hover:bg-slate-50"><Minus className="w-3 h-3" /></button>
                                        <span className="font-bold text-sm w-4 text-center">{children}</span>
                                        <button onClick={() => setChildren(children + 1)} className="p-1 border rounded hover:bg-slate-50"><Plus className="w-3 h-3" /></button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm">Infants</p>
                                        <p className="text-[10px] text-slate-500">(0-24 Months Below)</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setInfants(Math.max(0, infants - 1))} className="p-1 border rounded hover:bg-slate-50"><Minus className="w-3 h-3" /></button>
                                        <span className="font-bold text-sm w-4 text-center">{infants}</span>
                                        <button onClick={() => setInfants(infants + 1)} className="p-1 border rounded hover:bg-slate-50"><Plus className="w-3 h-3" /></button>
                                    </div>
                                </div>

                                <div className="relative w-full">
                                    <div
                                        onClick={() => setIsClassOpen(!isClassOpen)}
                                        className="w-full p-2 border rounded-md text-sm cursor-pointer flex justify-between items-center bg-transparent border-slate-300"
                                    >
                                        {flightClass}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isClassOpen ? "rotate-180" : ""}`} />
                                    </div>

                                    {isClassOpen && (
                                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-md shadow-lg z-130 overflow-hidden">
                                            {flightClasses.map((cls) => (
                                                <div
                                                    key={cls}
                                                    onClick={() => { setFlightClass(cls); setIsClassOpen(false); }}
                                                    className={`px-4 py-2 text-sm cursor-pointer transition-colors ${flightClass === cls ? "bg-primary text-white" : "hover:bg-slate-100 text-slate-700"}`}
                                                >
                                                    {cls}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setActiveDropdown(null)}
                                    className="w-full bg-primary text-white py-2 rounded-md font-bold text-sm hover:opacity-90 transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Middle Row: Search Inputs */}
            <div className="flex flex-col lg:flex-row items-center gap-2 mb-6 relative" ref={dropdownRef}>
                <div className="flex flex-col md:flex-row w-full lg:w-2/3 gap-2 relative">

                    {/* FROM Input */}
                    <div
                        className={`flex-1 border rounded-md transition-all cursor-pointer bg-white dark:bg-slate-950 relative min-h-18 flex items-center ${activeDropdown === "from" ? "border-primary ring-1 ring-primary" : "border-slate-300 dark:border-slate-700 hover:border-primary"}`}
                        onClick={() => setActiveDropdown("from")}
                    >
                        {activeDropdown === "from" ? (
                            <div className="flex items-center w-full px-3">
                                <Search className="w-5 h-5 text-slate-400 mr-2" />
                                <input
                                    autoFocus
                                    className="flex-1 bg-transparent outline-none text-lg font-medium"
                                    placeholder="From where?"
                                    value={searchKeyword}
                                    onChange={(e) => dispatch(setSearchDest(e.target.value))}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 p-3 w-full">
                                <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{fromDest?.iata_code}</span>
                                <div className="flex flex-col truncate">
                                    <span className="text-sm font-semibold truncate text-slate-900 dark:text-slate-100">{fromDest?.city_name}</span>
                                    <span className="text-xs text-slate-500 truncate">{fromDest?.name}</span>
                                </div>
                            </div>
                        )}

                        {activeDropdown === "from" && (
                            <div className="absolute top-[105%] left-0 w-full md:w-[130%] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl z-120 max-h-72 overflow-y-auto mt-1">
                                {filteredDests.map((dest, idx) => (
                                    <div key={idx} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b last:border-0" onClick={(e) => { e.stopPropagation(); handleSelectDest(dest, "from"); }}>
                                        <div className="font-bold text-sm">{dest.city_name} ({dest.iata_code})</div>
                                        <div className="text-[10px] text-slate-500">{dest.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Swap Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const temp = fromDest; setFromDest(toDest); setToDest(temp);
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-950 border border-slate-200 shadow-md p-2 rounded-full text-primary hover:scale-110 transition-transform hidden md:flex"
                    >
                        <ArrowRightLeft className="w-4 h-4" />
                    </button>

                    {/* TO Input */}
                    <div
                        className={`flex-1 border rounded-md transition-all cursor-pointer bg-white dark:bg-slate-950 relative min-h-18 flex items-center ${activeDropdown === "to" ? "border-primary ring-1 ring-primary" : "border-slate-300 dark:border-slate-700 hover:border-primary"}`}
                        onClick={() => setActiveDropdown("to")}
                    >
                        {activeDropdown === "to" ? (
                            <div className="flex items-center w-full px-3">
                                <Search className="w-5 h-5 text-slate-400 mr-2" />
                                <input
                                    autoFocus
                                    className="flex-1 bg-transparent outline-none text-lg font-medium"
                                    placeholder="To where?"
                                    value={searchKeyword}
                                    onChange={(e) => dispatch(setSearchDest(e.target.value))}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 p-3 w-full">
                                <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{toDest?.iata_code}</span>
                                <div className="flex flex-col truncate">
                                    <span className="text-sm font-semibold truncate text-slate-900 dark:text-slate-100">{toDest?.city_name}</span>
                                    <span className="text-xs text-slate-500 truncate">{toDest?.name}</span>
                                </div>
                            </div>
                        )}

                        {activeDropdown === "to" && (
                            <div className="absolute top-[105%] right-0 w-full md:w-[130%] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl z-120 max-h-72 overflow-y-auto mt-1">
                                {filteredDests.map((dest, idx) => (
                                    <div key={idx} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b last:border-0" onClick={(e) => { e.stopPropagation(); handleSelectDest(dest, "to"); }}>
                                        <div className="font-bold text-sm">{dest.city_name} ({dest.iata_code})</div>
                                        <div className="text-[10px] text-slate-500">{dest.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Dates & Search */}
                <div className="flex flex-col md:flex-row w-full lg:w-auto flex-1 gap-2 relative">
                    {/* Departure Date Field */}
                    <div
                        className={`flex-1 border rounded-md p-3 cursor-pointer transition-all ${isCalendarOpen ? 'border-primary ring-1 ring-primary' : 'border-slate-300 dark:border-slate-700 hover:border-primary'}`}
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                        <div className="flex items-center gap-2 mb-1 text-xs text-slate-500">
                            <CalendarIcon className="w-4 h-4" /> Departure
                        </div>
                        <div className="text-sm font-semibold">
                            {departureDate ? format(departureDate, "dd/MM/yyyy") : "Select Date"}
                        </div>

                        {/* Floating Calendar Card */}
                        {isCalendarOpen && (
                            <div
                                ref={calendarRef}
                                className="absolute top-[110%] left-0 z-150 bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 rounded-xl p-2"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside calendar
                            >
                                <DayPicker
                                    mode="single"
                                    selected={departureDate}
                                    onSelect={(date) => {
                                        setDepartureDate(date);
                                        setIsCalendarOpen(false);
                                    }}
                                    disabled={{ before: new Date() }}
                                    showOutsideDays
                                    className="m-0"
                                    classNames={{
                                        day_selected: "bg-primary text-white hover:bg-primary hover:text-white rounded-full",
                                        day_today: "text-primary font-bold underline",
                                        head_cell: "text-slate-500 font-medium text-sm w-9",
                                        cell: "w-9 h-9 text-center text-sm p-0 relative",
                                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors",
                                        nav_button: "border border-slate-200 rounded-md p-1 hover:bg-slate-100",
                                        caption: "flex justify-center pt-1 relative items-center mb-4 text-sm font-bold",
                                    }}
                                    // Fix: Use 'Chevron' instead of 'IconLeft'/'IconRight'
                                    components={{
                                        Chevron: ({ orientation }) => {
                                            const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
                                            return <Icon className="h-4 w-4" />;
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Return Date Field */}
                    <div className="flex-1 border border-slate-300 dark:border-slate-700 rounded-md p-3 opacity-60 bg-slate-50 dark:bg-slate-900/50">
                        <div className="flex items-center gap-2 mb-1 text-xs text-slate-500">
                            <CalendarIcon className="w-4 h-4" /> Return
                        </div>
                        <div className="text-sm font-semibold">Save More</div>
                    </div>
                </div>

                <button className="w-full lg:w-14 lg:h-14 bg-primary hover:opacity-90 text-white rounded-md lg:rounded-xl flex items-center justify-center transition-colors shrink-0 shadow-lg">
                    <Search className="w-6 h-6" />
                </button>
            </div>

            {/* Bottom Row: Fare Type Radios */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
                {["Regular Fare", "Student Fare", "Umrah Fare"].map((fare) => {
                    const fareId = fare.toLowerCase().split(' ')[0];
                    return (
                        <label key={fare} className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${fareType === fareId ? "border-primary" : "border-slate-400 group-hover:border-primary"}`}>
                                {fareType === fareId && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <span className={`text-sm font-medium transition-colors ${fareType === fareId ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>
                                {fare}
                            </span>
                            <input type="radio" className="hidden" name="fareType" value={fareId} checked={fareType === fareId} onChange={(e) => setFareType(e.target.value)} />
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default FlightSearch;