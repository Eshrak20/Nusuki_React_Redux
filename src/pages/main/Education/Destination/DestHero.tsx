import type { HeroSection } from "@/types/education/type.country";
import { ChevronRight } from "lucide-react";

interface Props {
  hero: HeroSection;
}

const DestHero = ({ hero }: Props) => {
  return (
    <section className="relative w-full overflow-hidden min-h-100 md:min-h-100 flex items-center lg:shadow-lg mb-4">
      {/* Background Image */}
      <img
        src={hero.background_image}
        alt={hero.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlay 
        Light Mode: Replicates the deep magenta/rose tint from the design.
        Dark Mode: Uses Shadcn's background variable to ensure it fades smoothly into dark themes.
      */}
      <div className="absolute inset-0 bg-linear-to-r from-primary to-transparent dark:from-background dark:via-background/80 dark:to-transparent/20" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-start px-8 md:px-16 lg:px-64 w-full md:w-3/4 lg:w-1/2">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold text-white leading-tight tracking-tight mb-8">
          {hero.title}
        </h1>

        {/* Call to Action Button */}
        <a
          href={hero.cta_url}
          className="group flex items-center justify-between gap-4 bg-primary-foreground text-primary pl-6 pr-2 py-2 rounded-full hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
        >
          {/* Setting max-w helps the text wrap into two lines like "Get started for \n free" 
            if the string is long enough, replicating the image's layout.
          */}
          <span className="text-sm md:text-base font-semibold leading-tight text-left max-w-30">
            {hero.cta_text}
          </span>

          {/* Inner Circle Icon with Inverted Shadcn Colors */}
          <div className="bg-primary text-primary-foreground p-3 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
            <ChevronRight size={20} strokeWidth={3} />
          </div>
        </a>
      </div>
    </section>
  );
};

export default DestHero;