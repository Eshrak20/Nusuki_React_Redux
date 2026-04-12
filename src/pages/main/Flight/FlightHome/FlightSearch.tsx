import { useState } from "react";
import { ArrowRightLeft, Calendar, Search } from "lucide-react";
import type { SearchDests } from "@/types/flight/flightHome.types";

interface searchDestsProps {
    searchDests: SearchDests[];
}

const FlightSearch = ({ searchDests }: searchDestsProps) => {
    const [tripType, setTripType] = useState("one-way");
    const [fareType, setFareType] = useState("regular");
    const [passengers, setPassengers] = useState("1 Traveler");
    const [flightClass, setFlightClass] = useState("Economy");

    const [fromDest, setFromDest] = useState(searchDests[0]);
    const [toDest, setToDest] = useState(searchDests[1]);

    const handleSwap = () => {
        if (fromDest && toDest) {
            setFromDest(toDest);
            setToDest(fromDest);
        }
    };

    // Prevent crashing if state isn't initialized yet
    if (!fromDest || !toDest) {
        return <div className="w-full h-32 bg-slate-100 animate-pulse rounded-xl" />;
    }

    return (
        <div className="w-full bg-white dark:bg-slate-950 p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">

            {/* Top Row: Trip Types & Travelers */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex flex-wrap gap-2 md:gap-4">
                    {["one-way", "round-way", "multi-way"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setTripType(type)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors text-sm font-medium ${tripType === type
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900"
                                }`}
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${tripType === type ? "border-primary-foreground" : "border-slate-400"
                                }`}>
                                {tripType === type && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                            </div>
                            {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-none text-sm font-medium py-2 px-4 rounded-md outline-none cursor-pointer flex-1 md:flex-none"
                    >
                        <option>1 Traveler</option>
                        <option>2 Travelers</option>
                        <option>3 Travelers</option>
                    </select>
                    <select
                        value={flightClass}
                        onChange={(e) => setFlightClass(e.target.value)}
                        className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-none text-sm font-medium py-2 px-4 rounded-md outline-none cursor-pointer flex-1 md:flex-none"
                    >
                        <option>Economy</option>
                        <option>Premium Economy</option>
                        <option>Business</option>
                        <option>First Class</option>
                    </select>
                </div>
            </div>

            {/* Middle Row: Search Inputs */}
            <div className="flex flex-col lg:flex-row items-center gap-2 mb-6 relative">

                {/* From & To Container */}
                <div className="flex flex-col md:flex-row w-full lg:w-1/2 gap-2 relative">
                    {/* FROM Input */}
                    <div className="flex-1 border border-slate-300 dark:border-slate-700 rounded-md p-3 hover:border-primary dark:hover:border-primary transition-colors cursor-pointer bg-transparent">
                        <div className="flex items-center gap-3">
                            {/* UPDATED: iata_code */}
                            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{fromDest.iata_code}</span>
                            <div className="flex flex-col overflow-hidden">
                                {/* UPDATED: city_name */}
                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{fromDest.city_name}</span>
                                {/* UPDATED: name (Airport Name) */}
                                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{fromDest.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <button
                        onClick={handleSwap}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm p-2 rounded-full text-primary hover:bg-slate-50 dark:hover:bg-slate-900 transition-transform hover:scale-105 hidden md:flex"
                    >
                        <ArrowRightLeft className="w-4 h-4" />
                    </button>

                    {/* TO Input */}
                    <div className="flex-1 border border-slate-300 dark:border-slate-700 rounded-md p-3 hover:border-primary dark:hover:border-primary transition-colors cursor-pointer bg-transparent">
                        <div className="flex items-center gap-3 pl-0 md:pl-4">
                            {/* UPDATED: iata_code */}
                            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{toDest.iata_code}</span>
                            <div className="flex flex-col overflow-hidden">
                                {/* UPDATED: city_name */}
                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{toDest.city_name}</span>
                                {/* UPDATED: name (Airport Name) */}
                                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{toDest.name}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dates Container */}
                <div className="flex flex-col md:flex-row w-full lg:w-auto flex-1 gap-2">
                    <div className="flex-1 border border-slate-300 dark:border-slate-700 rounded-md p-3 hover:border-primary dark:hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            <span className="text-xs text-slate-500 dark:text-slate-400">Departure Date</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">13/04/2026</div>
                    </div>

                    <div className={`flex-1 border rounded-md p-3 transition-colors cursor-pointer ${tripType === 'one-way'
                        ? 'border-slate-200 dark:border-slate-800 opacity-60 bg-slate-50 dark:bg-slate-900/50'
                        : 'border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary'
                        }`}
                        onClick={() => tripType === 'one-way' && setTripType('round-way')}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            <span className="text-xs text-slate-500 dark:text-slate-400">Return Date</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {tripType === 'one-way' ? 'Save More' : 'Select Date'}
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <button className="w-full lg:w-14 lg:h-14 mt-4 lg:mt-0 shrink-0 bg-[#0f172a] hover:bg-[#1e293b] dark:bg-primary dark:hover:bg-primary/90 text-white rounded-md lg:rounded-xl flex items-center justify-center transition-colors p-4 lg:p-0">
                    <Search className="w-6 h-6 mr-2 lg:mr-0" />
                    <span className="lg:hidden font-semibold">Search Flights</span>
                </button>
            </div>

            {/* Bottom Row: Fare Types */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
                {["Regular Fare", "Student Fare", "Umrah Fare"].map((fare) => (
                    <label key={fare} className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${fareType === fare.toLowerCase().split(' ')[0]
                            ? "border-primary"
                            : "border-slate-400 group-hover:border-primary"
                            }`}>
                            {fareType === fare.toLowerCase().split(' ')[0] && (
                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 select-none">
                            {fare}
                        </span>
                        <input
                            type="radio"
                            name="fareType"
                            className="hidden"
                            value={fare.toLowerCase().split(' ')[0]}
                            checked={fareType === fare.toLowerCase().split(' ')[0]}
                            onChange={(e) => setFareType(e.target.value)}
                        />
                    </label>
                ))}
            </div>

        </div>
    );
};

export default FlightSearch;