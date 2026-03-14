import { useGetVisaDetailsQuery } from "@/redux/api/visaApi";
import { useParams } from "react-router-dom";
import Banner from "./Banner";
import QuickInfo from "./QuickInfo";
import Requirements from "./Requirements";
import Processes from "./Processes";
import ImportantInfo from "./ImportantInfo";
import VisaActionCard from "./ActionCard";
import NeedAssistance from "./NeedAssistance";
import OfficeHours from "./OfficeHours";

const DetVisaMain = () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useGetVisaDetailsQuery(
        id!,
        { skip: !id }
    );

    const details = data?.data;

    if (isLoading) return <div>Loading........</div>

    if (isError || !details) {
        return <div>Visa details not found.</div>;
    }

    return (
        <>
            <div className="mt-19">
                <Banner details={details} />
            </div>
            <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
                {/* Grid: 1 col on mobile, 3 cols on desktop */}
                <div className="grid grid-cols-1 gap-5 -px-5 lg:px-0 lg:grid-cols-3">

                    {/* Left Side (Takes up 2/3 width) */}
                    <div className="lg:col-span-2 space-y-4">
                        <QuickInfo details={details} />
                        <Requirements details={details} />
                        <Processes details={details} />
                        <ImportantInfo details={details} />
                    </div>

                    {/* Right Side (Takes up 1/3 width, sticks to top) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <VisaActionCard details={details} />
                            <NeedAssistance />
                            <OfficeHours />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default DetVisaMain;