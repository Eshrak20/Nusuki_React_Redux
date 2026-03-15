import type { OverviewSection } from "@/types/education/type.country";

interface Props {
  overview: OverviewSection;
}

const DestOverview = ({ overview }: Props) => {

  return (
    <section className="w-full bg-muted/30 dark:bg-muted/10 rounded-[2rem] p-6 md:p-10 lg:p-14 my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* Left Column: Text Content (Takes up 7 out of 12 columns on desktop) */}
        <div className="lg:col-span-7 flex flex-col space-y-10">

          {/* We interleave the first title and paragraph to match the visual hierarchy of the image */}
          {overview?.section_titles?.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-foreground leading-tight">
                {overview.section_titles[0]}
              </h2>
              {overview?.paragraphs?.[0] && (
                <p className="text-base text-foreground/80 leading-relaxed">
                  {overview.paragraphs[0]}
                </p>
              )}
            </div>
          )}

          {/* Render remaining titles and paragraphs */}
          {overview?.section_titles?.length > 1 && (
            <div className="space-y-4">
              {overview.section_titles.slice(1).map((title, i) => (
                <h3 key={i} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight mt-8 mb-4">
                  {title}
                </h3>
              ))}

              <div className="space-y-3">
                <div className="space-y-3 mt-4">
                  {overview?.lists[0]?.map((listItem, i) => {
                    // Strips out any literal leading/trailing quotation marks just in case
                    const cleanText = listItem.replace(/^"|"$/g, '').trim();

                    return (
                      <div key={i} className="flex items-start space-x-3">
                        {/* The Bullet Point */}
                        <span className="text-foreground text-xl leading-none mt-0.5 md:mt-1">•</span>

                        {/* The String (placed on the right side) */}
                        <p className="text-base text-foreground/80 leading-relaxed">
                          {cleanText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Form Placeholder (Takes up 5 out of 12 columns on desktop) */}
        <div className="lg:col-span-5 bg-card border border-border rounded-[1.5rem] p-6 md:p-8 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
              Book your free consultation with certified counsellors
            </h3>
          </div>

          {/* TODO: Drop your Form Component here! 
            <StudyAbroadForm />
          */}
          <div className="flex flex-col space-y-4 animate-pulse">
            <div className="h-12 bg-muted rounded-full w-full"></div>
            <div className="h-12 bg-muted rounded-full w-full"></div>
            <div className="h-12 bg-muted rounded-full w-full"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-muted rounded-full w-full"></div>
              <div className="h-12 bg-muted rounded-full w-full"></div>
            </div>
            <div className="h-12 bg-primary/20 rounded-full w-full mt-4"></div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DestOverview;