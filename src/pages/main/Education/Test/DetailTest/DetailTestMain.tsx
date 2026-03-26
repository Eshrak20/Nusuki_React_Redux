import { useGetTestsDetailsQuery } from "@/redux/api/educationApi/testApi";
import { useParams } from "react-router-dom";
import EduFormSubmission from "@/components/education/EduFormSubmission";

// You will create/import these components similarly to your Course components
import DetTestHero from "./DetTestHero";
import DetTestAbout from "./DetTestAbout";
import DetTestStructure from "./DetTestStructure";
import DetTestUpcomingBatches from "./DetTestUpcomingBatches";
import DetTestFaqs from "./DetTestFaqs";
import DetTestOtherDetails from "./DetTestOtherDetails";

const DetailTestMain = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetTestsDetailsQuery({ id: id! }, { skip: !id });

    if (isLoading || !data) {
        return <div className="p-10 text-center animate-pulse text-muted-foreground">Loading test details...</div>;
    }

    // Mapping data based on your JSON structure
    const testData = data?.data; // The root object
    const detail = testData?.detail_json; // Contains batch, date, time, etc.
    const extra = detail?.detail_json; // Contains about_exam, exam_structure, hero, etc.

    // Data Extraction (Equivalent to Filtering)
    const heroContent = extra?.hero;
    const aboutExam = extra?.about_exam;
    const examStructure = extra?.exam_structure;
    const upcomingBatches = extra?.upcoming_batches || [];
    const faqs = extra?.faqs || [];
    const otherDetails = extra?.other_details;
    const offerings = extra?.offerings || [];

    return (
        <div className="container lg:mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
                
                {/* RIGHT SIDE: CONTENT (8 Columns) */}
                <main className="lg:col-span-8 order-1 space-y-12">
                    
                    {/* Hero Section */}
                    {heroContent && <DetTestHero hero={heroContent} />}

                    {/* About the Exam */}
                    {aboutExam && <DetTestAbout about={aboutExam} />}

                    {/* Exam Structure / Modules */}
                    {examStructure && <DetTestStructure structure={examStructure} />}

                    {/* Offerings (3 items in your JSON) */}
                    {offerings.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {offerings.map((offering: any, i: number) => (
                                <div key={i} className="p-4 border rounded-xl bg-card">
                                    <h4 className="font-bold text-primary">{offering.title}</h4>
                                    <p className="text-sm text-muted-foreground">{offering.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Upcoming Batches */}
                    {upcomingBatches.length > 0 && (
                        <DetTestUpcomingBatches batches={upcomingBatches} />
                    )}

                    {/* Additional Info Table */}
                    {otherDetails && <DetTestOtherDetails details={otherDetails} />}

                    {/* FAQs */}
                    {faqs.length > 0 && <DetTestFaqs faqs={faqs} />}
                </main>

                {/* LEFT SIDE: STICKY FORM (4 Columns) */}
                <aside className="lg:col-span-4 order-2 lg:sticky lg:top-36">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary/5 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

                        <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
                            <EduFormSubmission title={`Enquire for ${detail?.examType?.toUpperCase()} Coaching`} />
                        </div>

                        <div className="mt-4 p-4 text-center">
                            <p className="text-xs text-muted-foreground italic">
                                * Join our {detail?.testDesc} starting on {detail?.date}.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DetailTestMain;