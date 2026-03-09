import { useParams } from "react-router-dom";
import { useGetCoursesDetailsQuery } from "@/redux/api/educationApi/courseApi";
import CourseDescription from "./CourseDescription";
import CourseEntryRequirements from "./CourseEntryRequirements";
import CourseFees from "./CourseFees";
import CourseHeader from "./CourseHeader";
import CourseIntakes from "./CourseIntakes";
import CourseOverview from "./CourseOverview";
import CourseProvider from "./CourseProvider";
import UniversityRanking from "./UniversityRanking";
import CourseCommunity from "./CourseCommunity";
import CourseFastLane from "./CourseFastLane";
import CourseApplicationInfo from "./CourseApplicationInfo";
import CourseActionPlan from "./CourseActionPlan";
import EduFormSubmission from "@/components/education/EduFormSubmission";

const CourseMain = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetCoursesDetailsQuery({ id: id! }, { skip: !id });

    if (isLoading || !data) {
        return <div className="p-10 text-center animate-pulse">Loading course details...</div>;
    }

    const course = data.data;
    const detail = course.detail_json;
    const extra = detail.detail_json;

    const filterSectionsByHeading = (keywords: string[]) => {
        return extra?.sections?.filter(section =>
            keywords.some(keyword => section.heading?.toLowerCase().includes(keyword.toLowerCase()))
        ) || [];
    };

    // Data Filtering
    const descriptionSections = filterSectionsByHeading(['Course info', 'About the course']);
    const entryRequirementSections = filterSectionsByHeading(['Entry requirements']);
    const applicationSections = filterSectionsByHeading(['Application Deadline', 'Further information']);
    const careerSections = filterSectionsByHeading(['Career outcomes', 'Pathway options']);
    const communitySections = filterSectionsByHeading(['study abroad community']);
    const actionPlanSections = filterSectionsByHeading(['Shortlist', 'Check your eligibility', 'Apply through IDP Live']);
    const fastLaneSections = filterSectionsByHeading(['How does IDP FastLane work']);

    return (
        <div className="lg:mx-auto -mx-3 px-4 sm:px-6 lg:px-8 py-8">
            {/* Full Width Header */}
            <CourseHeader course={course} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">

                {/* RIGHT SIDE: SCROLLABLE CONTENT (8 Columns) */}
                <main className="lg:col-span-8 order-1 lg:order-2 space-y-10">
                    <CourseOverview detail={detail} /> 

                    <div className="space-y-12">
                        <CourseDescription sections={descriptionSections} />

                        <CourseEntryRequirements sections={entryRequirementSections} />

                        {applicationSections.length > 0 && (
                            <CourseApplicationInfo sections={applicationSections} />
                        )}

                        {careerSections.length > 0 && (
                            <section className="bg-muted/30 p-8 rounded-3xl border border-border/50">
                                <h2 className="text-2xl font-bold mb-6 text-foreground">Career Outcomes</h2>
                                <div className="grid gap-6">
                                    {careerSections.map((section, index) => (
                                        <div key={index} className="space-y-2">
                                            {section.heading && <h3 className="font-bold text-primary">{section.heading}</h3>}
                                            <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <CourseFees tuition={detail.tuition} />
                        <CourseIntakes tables={extra?.tables || []} />
                        <UniversityRanking ranking={detail.ranking} />

                        {communitySections.length > 0 && (
                            <CourseCommunity sections={communitySections} />
                        )}

                        {actionPlanSections.length > 0 && (
                            <CourseActionPlan sections={actionPlanSections} />
                        )}

                        {fastLaneSections.length > 0 && (
                            <CourseFastLane sections={fastLaneSections} />
                        )}

                        <CourseProvider provider={extra?.jsonld?.[0]?.provider} />
                    </div>
                </main>
                {/* LEFT SIDE: STICKY FORM (4 Columns) */}

                <aside className="lg:col-span-4 order-2 lg:order-2 lg:sticky lg:top-36">
                    <div className="relative group">
                        {/* Decorative background glow */}
                        <div className="absolute -inset-1 bg-linear-to-r from-primary/10 to-primary/10 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

                        <div className="relative -ml-6 -mr-7.5 lg:rounded-md overflow-hidden">
                            {/* We pass a custom title to the form */}
                            <EduFormSubmission title="Enquire for this Course" />
                        </div>

                        {/* Quick Trust Badge under form */}
                        <div className="mt-4 p-4 text-center">
                            <p className="text-xs text-muted-foreground italic">
                                * Your information is secure and will be shared only with the university admissions team.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>

        </div>
    );
};

export default CourseMain;