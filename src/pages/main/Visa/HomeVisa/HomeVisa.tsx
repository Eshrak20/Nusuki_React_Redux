import HelpDesk from "./HelpDesk";
import HowItWorks from "./HowItWorks";
import VisaBanner from "./VisaBanner";
import VisaStats from "./VisaStats";

const HomeVisa = () => {
    return (
        <>
            <div className="mt-22">
                <VisaBanner />

                <VisaStats />
                <div className="max-w-7xl mx-auto">
                    <HowItWorks />
                </div>
                <HelpDesk />
            </div>
        </>
    );
};

export default HomeVisa;