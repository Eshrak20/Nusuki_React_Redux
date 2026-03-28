import { useGetTestsDetailsQuery } from "@/redux/api/educationApi/testApi";
import { useParams } from "react-router-dom";
import DetTestHero from "./DetTestHero";
import DetTestAbout from "./DetTestAbout";
import DetTestStructure from "./DetTestStructure";
import DetTestUpcomingBatches from "./DetTestUpcomingBatches";
import DetTestFaqs from "./DetTestFaqs";
import DetTestOtherDetails from "./DetTestOtherDetails";
import DetTestOfferings from "./DetTestOfferings";
import DetTestHeroSkeleton from "@/components/skeletons/DetTestHeroSkeleton";

const DetailTestMain = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetTestsDetailsQuery({ id: id! }, { skip: !id });

    if (isLoading || !data) {
        return <DetTestHeroSkeleton />;
    }

    const testData = data?.data;
    const detail = testData?.detail_json; 
    const extra = detail?.detail_json; 

    const heroContent = extra?.hero;
    const aboutExam = extra?.about_exam;
    const examStructure = extra?.exam_structure;
    const upcomingBatches = extra?.upcoming_batches || [];
    const faqs = extra?.faqs || [];
    const otherDetails = extra?.other_details;
    const offerings = extra?.offerings || [];

    return (
        <div className="">
            {/* Hero Section */}
            {heroContent && <DetTestHero hero={heroContent} />}
            <div className="max-w-7xl lg:mx-auto py-8">

                {/* About the Exam */}
                {aboutExam && <DetTestAbout about={aboutExam} />}

                {/* Exam Structure / Modules */}
                {examStructure && <DetTestStructure structure={examStructure} />}

                {/* Additional Info Table */}
                {otherDetails && <DetTestOtherDetails details={otherDetails} />}

                {/* Upcoming Batches */}
                {upcomingBatches.length > 0 && (
                    <DetTestUpcomingBatches batches={upcomingBatches} />
                )}
                
                {/* Offerings (3 items in your JSON) */}
                {
                    offerings.length > 0 && <DetTestOfferings offerings={offerings} />
                }

                {/* FAQs */}
                {faqs.length > 0 && <DetTestFaqs faqs={faqs} />}
            </div>
        </div>
    );
};

export default DetailTestMain;