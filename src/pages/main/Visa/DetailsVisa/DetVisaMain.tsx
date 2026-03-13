import { useGetVisaDetailsQuery } from "@/redux/api/visaApi";
import { useParams } from "react-router-dom";
import DetBanner from "./Banner";
import QuickInfo from "./QuickInfo";
import Requirements from "./Requirements";
import Processes from "./Processes";
import ImportantInfo from "./ImportantInfo";

const DetVisaMain = () => {

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
                <DetBanner details={details} />
            </div>
            <div className="max-w-7xl mx-auto">
                <QuickInfo details={details} />
                <Requirements details={details} />
                <Processes details={details} />
                <ImportantInfo details={details} />
            </div>
        </>
    );
};

export default DetVisaMain;