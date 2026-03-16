import type { WorkOpportunity } from "@/types/education/type.country";
import { Briefcase } from "lucide-react";

interface Props {
  opportunities: WorkOpportunity[];
  id?: string; 
}

const DestWorkOpportunities = ({ opportunities, id = "work-opportunities" }: Props) => {
  if (!opportunities || opportunities.length === 0) return null;

  return (
    <section id={id} className="w-full my-20 scroll-mt-40">
      {/* Optional Section Header */}
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Work Opportunities & Pathways
        </h2>
        <p className="text-lg text-muted-foreground">
          Explore your options for working while you study and building your career after graduation.
        </p>
      </div>

      {/* Grid Layout (Side-by-side on desktop, stacked on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {opportunities.map((opportunity, i) => (
          <div
            key={i}
            className="group relative flex flex-col bg-card border border-border/50 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-500 overflow-hidden"
          >
            {/* Decorative Background Glow on Hover */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />

            {/* Icon Header */}
            <div className="flex items-start gap-5 mb-6 relative z-10">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                <Briefcase size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-foreground tracking-tight leading-snug mt-1">
                {opportunity.title}
              </h3>
            </div>

            <div className="relative z-10 text-muted-foreground text-[15px] md:text-base leading-relaxed space-y-4">
              {/* If your text just uses line breaks (\n), this splits them into proper paragraphs */}
              {opportunity.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() ? <p key={idx}>{paragraph}</p> : null
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default DestWorkOpportunities;