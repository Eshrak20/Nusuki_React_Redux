import { CheckCircle2, MapPin, Tent, Star } from "lucide-react";
import type { SignificanceGuide, StepSection } from "@/types/hajj/types.sig";

const StepGuide = ({
  guide_title,
  guide_des,
  requirements,
}: SignificanceGuide) => {
  return (
    <div className="py-12 space-y-10">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hajj/10 text-hajj text-sm font-medium">
          <Star className="w-4 h-4 fill-hajj" />
          <span>Step-by-Step Guide</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {guide_title}
        </h2>
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          {guide_des}
        </p>
      </div>

      {/* Requirements Sections */}
      <div className="grid gap-8">
        {requirements.map((section: StepSection, sIdx: number) => (
          <div
            key={section.id}
            className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
          >
            {/* Section Header */}
            <div className="bg-muted/30 px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-hajj text-white text-sm">
                  {sIdx + 1}
                </span>
                {section.title}
              </h3>
              <MapPin className="text-hajj/40 w-5 h-5" />
            </div>

            {/* Ritual Items List */}
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {section.items?.map((item) => (
                  <div key={item.id} className="relative pl-8 group">
                    {/* Vertical Line Connector */}
                    <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-hajj/10 group-last:bg-transparent" />

                    {/* Bullet Point Icon */}
                    <div className="absolute left-0 top-1">
                      <CheckCircle2 className="w-6 h-6 text-hajj transition-transform group-hover:scale-110" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-foreground group-hover:text-hajj transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
              <Tent className="w-32 h-32 text-hajj" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepGuide;
