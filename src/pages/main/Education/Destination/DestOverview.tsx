import type { OverviewSection } from "@/types/education/type.country";
import StudyAbroadForm from "./StudyAbroadForm";

interface Props {
  overview: OverviewSection;
}

const DestOverview = ({ overview }: Props) => {

  // Check if there is actual data inside the arrays, not just if the object exists
  const hasOverviewData = 
    (overview?.section_titles && overview.section_titles.length > 0) || 
    (overview?.paragraphs && overview.paragraphs.length > 0);

  return (
    <section id="overview" className="w-full bg-muted/30 dark:bg-muted/10 rounded-[2rem] py-9 px-7 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* Left Column: Text Content (Only renders if there is actual content) */}
        {hasOverviewData && (
          <div className="lg:col-span-7 flex flex-col space-y-10">

            {/* Interleave the first title and paragraph */}
            {overview.section_titles?.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-foreground leading-tight">
                  {overview.section_titles[0]}
                </h2>
                {overview.paragraphs?.[0] && (
                  <p className="text-base text-foreground/80 leading-relaxed">
                    {overview.paragraphs[0]}
                  </p>
                )}
              </div>
            )}

            {/* Render remaining titles and paragraphs */}
            {overview.section_titles?.length > 1 && (
              <div className="space-y-4">
                {overview.section_titles.slice(1).map((title, i) => (
                  <h3 key={i} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight mt-8 mb-4">
                    {title}
                  </h3>
                ))}

                <div className="space-y-3 mt-4">
                  {overview.lists?.[0]?.map((listItem, i) => {
                    const cleanText = listItem.replace(/^"|"$/g, '').trim();

                    return (
                      <div key={i} className="flex items-start space-x-3">
                        <span className="text-foreground text-xl leading-none mt-0.5 md:mt-1">•</span>
                        <p className="text-base text-foreground/80 leading-relaxed">
                          {cleanText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
          
        {/* Right Column: Form Placeholder (Spans 5 columns if data exists, otherwise spans all 12) */}
        <div className={`${hasOverviewData ? 'lg:col-span-5' : 'lg:col-span-12'} bg-card lg:border border-border lg:rounded-[1.5rem] -mx-6 p-6 md:p-8 lg:shadow-sm`}>
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
              Book your free consultation with certified counsellors
            </h3>
          </div>
          <StudyAbroadForm />
        </div>

      </div>
    </section>
  );
};

export default DestOverview;