import { useEffect } from "react";
import HolidaySearch from "./HolidaySearch";
import FlightPromotions from "../../Flight/FlightHome/FlightPromotions";

const HolidayHome = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className="mt-44 mb-20">
            <HolidaySearch />
            <div className="max-w-7xl mx-auto space-y-20 mt-16">
                <FlightPromotions />
            </div>
        </div>
    );
};

export default HolidayHome;