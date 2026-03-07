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

const CourseMain = () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetCoursesDetailsQuery(
        { id: id! },
        { skip: !id }
    );

    if (isLoading || !data) {
        return <div className="p-10">Loading...</div>;
    }

    const course = data.data;
    const detail = course.detail_json;
    const extra = detail.detail_json;

    // Filter sections by heading to distribute to appropriate components
    const filterSectionsByHeading = (keywords: string[]) => {
        return extra?.sections?.filter(section =>
            keywords.some(keyword =>
                section.heading?.toLowerCase().includes(keyword.toLowerCase())
            )
        ) || [];
    };

    const descriptionSections = filterSectionsByHeading(['Course info', 'About the course']);
    const entryRequirementSections = filterSectionsByHeading(['Entry requirements']);
    const applicationSections = filterSectionsByHeading(['Application Deadline', 'Further information']);
    const careerSections = filterSectionsByHeading(['Career outcomes', 'Pathway options']);
    const communitySections = filterSectionsByHeading(['study abroad community']);
    const actionPlanSections = filterSectionsByHeading(['Shortlist', 'Check your eligibility', 'Apply through IDP Live']);
    const fastLaneSections = filterSectionsByHeading(['How does IDP FastLane work']);

    return (
        <div className="space-y-4">
            <CourseHeader course={course} />
            <CourseOverview detail={detail} />
 
            {/* Description - only course info sections */}
            <CourseDescription sections={descriptionSections} />

            {/* Entry Requirements - only entry requirement sections */}
            <CourseEntryRequirements sections={entryRequirementSections} />

            {/* Application Info - new component */}
            {applicationSections.length > 0 && (
                <CourseApplicationInfo sections={applicationSections} />
            )}

            {/* Career Outcomes - new component */}
            {careerSections.length > 0 && (
                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Career Outcomes</h2>
                    {careerSections.map((section, index) => (
                        <div key={index} className="mb-4">
                            {section.heading && <h3 className="font-semibold">{section.heading}</h3>}
                            <p className="text-gray-700">{section.text}</p>
                        </div>
                    ))}
                </div>
            )}

            <CourseFees tuition={detail.tuition} />
            <CourseIntakes tables={extra?.tables || []} />
            <UniversityRanking ranking={detail.ranking} />

            {/* Community Section - new component */}
            {communitySections.length > 0 && (
                <CourseCommunity sections={communitySections} />
            )}

            {/* Action Plan Section - new component */}
            {actionPlanSections.length > 0 && (
                <CourseActionPlan sections={actionPlanSections} />
            )}

            {/* FastLane Section - new component */}
            {fastLaneSections.length > 0 && (
                <CourseFastLane sections={fastLaneSections} />
            )}

            <CourseProvider provider={extra?.jsonld?.[0]?.provider} />
        </div>
    );
};

export default CourseMain;