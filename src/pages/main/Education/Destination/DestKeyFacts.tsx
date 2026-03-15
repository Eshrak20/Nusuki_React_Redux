import type { KeyFactsCategory } from "@/types/education/type.country";
import { 
  Building, 
  Landmark, 
  Users, 
  Clock, 
  Briefcase, 
  MapPin, 
  TrendingUp, 
  Languages, 
  ThermometerSun 
} from "lucide-react";

interface Props {
  facts: KeyFactsCategory[];
  title?: string; // Added an optional title prop to match the image's header
}

// Helper function to determine the best icon based on the fact's text content
const getDynamicIcon = (label: string, value: string, category: string) => {
  const textToSearch = `${label} ${value} ${category}`.toLowerCase();

  const iconProps = { size: 16, className: "text-foreground/70", strokeWidth: 2.5 };

  if (textToSearch.includes("university") || textToSearch.includes("college")) return <Landmark {...iconProps} />;
  if (textToSearch.includes("student") || textToSearch.includes("population")) return <Users {...iconProps} />;
  if (textToSearch.includes("hour") || textToSearch.includes("time") || textToSearch.includes("week")) return <Clock {...iconProps} />;
  if (textToSearch.includes("work") || textToSearch.includes("permit") || textToSearch.includes("job")) return <Briefcase {...iconProps} />;
  if (textToSearch.includes("capital")) return <MapPin {...iconProps} />;
  if (textToSearch.includes("growth") || textToSearch.includes("economic") || textToSearch.includes("economy")) return <TrendingUp {...iconProps} />;
  if (textToSearch.includes("language") || textToSearch.includes("english")) return <Languages {...iconProps} />;
  if (textToSearch.includes("°c") || textToSearch.includes("weather") || textToSearch.includes("temperature")) return <ThermometerSun {...iconProps} />;

  // Default fallback icon
  return <Building {...iconProps} />;
};

const DestKeyFacts = ({ facts, title = "Key Facts About Studying Abroad" }: Props) => {
  if (!facts || facts.length === 0) return null;

  return (
    <section className="w-full mt-20 mb-12">
      {/* Optional Title Section (Based on your image) */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8 tracking-tight">
        {title}
      </h2>

      {/* Main Grey Background Container */}
      <div className="rounded-[2rem] md:rounded-[3rem] py-8">

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {facts.map((category, i) => (

            /* Individual Column Card */
            <div
              key={i}
              className="bg-card dark:bg-card/50 border border-border shadow-sm rounded-[1.5rem] p-6 md:p-8 flex flex-col h-full"
            >
              {/* Category Header with Bullet */}
              <div className="flex items-center space-x-3 mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {category.category}
                </h3>
              </div>

              {/* List of Facts (Pills) */}
              <div className="flex flex-col space-y-4 grow">
                {category.facts.map((fact, j) => (

                  /* Fact Item Pill */
                  <div
                    key={j}
                    className="flex items-center p-2 pr-4 bg-card border border-border shadow-sm rounded-full hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Icon Circle */}
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-muted/50 rounded-full mr-4">
                      {/* Dynamically render the icon based on the content */}
                      {getDynamicIcon(fact.label, fact.value, category.category)}
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col justify-center">
                      <strong className="text-[15px] font-bold text-foreground leading-snug">
                        {fact.value}
                      </strong>
                      <p className="text-[13px] text-muted-foreground leading-snug">
                        {fact.label}
                      </p>
                    </div>
                  </div>

                ))}
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default DestKeyFacts;