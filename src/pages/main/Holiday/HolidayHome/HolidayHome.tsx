import { useGetToursQuery } from "@/redux/api/holidayApi/holidayApi";
import { useEffect } from "react";

const HolidayHome = () => {
    // API call
    const { data, isLoading, isError } = useGetToursQuery();

    // Scroll to top (only once on mount)
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    // Log API response
    useEffect(() => {
        if (data) {
            console.log("Tours API Response:", data);
            console.log("Tours:", data.data.tours);
            console.log("Tour Types:", data.data.tour_types);
            console.log("Regions:", data.data.regions);
        }
    }, [data]);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching tours</p>}
        </div>
    );
};

export default HolidayHome;