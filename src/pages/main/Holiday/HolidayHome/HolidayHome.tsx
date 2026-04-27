import { useEffect } from "react";
import HolidaySearch from "./HolidaySearch";

const HolidayHome = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);


    return (
        <div className="mt-44">
         <HolidaySearch/>
        </div>
    );
};

export default HolidayHome;