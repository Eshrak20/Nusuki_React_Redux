import { useGetTourPackageDetailsQuery } from "@/redux/api/holidayApi/holidayApi";
import { useEffect } from "react";

const HolidayDetails = () => {
    // call API (id = 1 for now)
    const { data, isLoading, isError } = useGetTourPackageDetailsQuery(1);

    // scroll to top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    // console log
    useEffect(() => {
        if (data) {
            console.log("Tour Package Details:", data);
            console.log("Main Data:", data.data);
            console.log("Images:", data.data.images);
            console.log("Offers:", data.data.offers);
        }
    }, [data]);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching tour package</p>}
        </div>
    );
};

export default HolidayDetails;