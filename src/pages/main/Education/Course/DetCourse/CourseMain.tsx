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
  const { data, isLoading } = useGetCoursesDetailsQuery(
    { id: id! },
    { skip: !id },
  );

  if (isLoading || !data) {
    return (
      <div className="p-10 text-center animate-pulse">
        Loading course details...
      </div>
    );
  }

  const course = data.data;
  const detail = course.detail_json;
  const extra = detail.detail_json;

  const filterSectionsByHeading = (keywords: string[]) => {
    return (
      extra?.sections?.filter((section) =>
        keywords.some((keyword) =>
          section.heading?.toLowerCase().includes(keyword.toLowerCase()),
        ),
      ) || []
    );
  };

  // Data Filtering
  const descriptionSections = filterSectionsByHeading([
    "Course info",
    "About the course",
  ]);
  const entryRequirementSections = filterSectionsByHeading([
    "Entry requirements",
  ]);
  const applicationSections = filterSectionsByHeading([
    "Application Deadline",
    "Further information",
  ]);
  const careerSections = filterSectionsByHeading([
    "Career outcomes",
    "Pathway options",
  ]);
  const communitySections = filterSectionsByHeading(["study abroad community"]);
  const actionPlanSections = filterSectionsByHeading([
    "Shortlist",
    "Check your eligibility",
    "Apply through IDP Live",
  ]);
  const fastLaneSections = filterSectionsByHeading([
    "How does IDP FastLane work",
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Full Width Header */}
      <CourseHeader course={course} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 mt-12 items-start">
        {/* LEFT SIDE: MAIN CONTENT (8 Columns) */}
        {/* Added bg-card/shadow to prevent the "sunk" feeling */}
        <main className="lg:col-span-8 order-1 space-y-12">
          <div className="space-y-10">
            <CourseOverview detail={detail} />

            <div className="space-y-12">
              <CourseDescription sections={descriptionSections} />
              <CourseEntryRequirements sections={entryRequirementSections} />

              {applicationSections.length > 0 && (
                <CourseApplicationInfo sections={applicationSections} />
              )}

              {careerSections.length > 0 && (
                <section className="bg-muted/30 p-8 rounded-3xl border border-border/50 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">
                    Career Outcomes
                  </h2>
                  <div className="grid gap-6">
                    {careerSections.map((section, index) => (
                      <div key={index} className="space-y-2">
                        {section.heading && (
                          <h3 className="font-bold text-primary">
                            {section.heading}
                          </h3>
                        )}
                        <p className="text-muted-foreground leading-relaxed">
                          {section.text}
                        </p>
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
          </div>
        </main>

        {/* RIGHT SIDE: STICKY FORM (4 Columns) */}
        <aside className="lg:col-span-4 order-2 sticky top-32 self-start">
          <div className="relative group">
            {/* Refined Decorative Glow: Softened and aligned */}
            <div className="absolute -inset-2 bg-linear-to-tr from-primary/20 via-primary/5 to-transparent rounded-[2rem] blur-xl opacity-50 group-hover:opacity-80 transition duration-700"></div>

            {/* The Form Card: Removed negative margins, added border and clean shadow */}
            <div className="relative bg-card border border-border/60 shadow-2xl shadow-primary/5 rounded-3xl overflow-hidden">
              <div className="">
                {" "}
                {/* Tiny padding to let the form border breathe */}
                <EduFormSubmission title="Enquire for this Course" />
              </div>
            </div>

            {/* Quick Trust Badge: Better spacing and typography */}
            <div className="mt-6 px-4 py-3 bg-muted/20 rounded-sm border border-dashed border-border/60">
              <p className="text-[11px] text-muted-foreground leading-tight text-center">
                <span className="font-semibold text-primary/80">
                  🔒 Secure Inquiry:
                </span>{" "}
                Your information is encrypted and shared only with the
                university admissions team.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseMain;
