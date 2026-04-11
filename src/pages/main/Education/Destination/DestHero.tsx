import EduFormSubmission from "@/components/education/EduFormSubmission";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { HeroSection } from "@/types/education/type.country";
import { MousePointerClick } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  hero: HeroSection;
}

const DestHero = ({ hero }: Props) => {
  const location = useLocation();
  const countryName = location.pathname.endsWith("/us") ? "USA" :
    location.pathname.endsWith("/au") ? "Australia" :
      location.pathname.endsWith("/nz") ? "New Zealand" :
        location.pathname.endsWith("/ca") ? "Canada" :
          location.pathname.endsWith("/gb") ? "UK" :
            "";
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="relative w-full overflow-hidden min-h-80 md:min-h-100 flex items-center lg:shadow-lg mb-4">
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
      <div className="relative z-10 flex flex-col items-start px-24 md:px-40 w-full md:w-3/4 lg:w-1/2">
        {/* Title */}
        <h1 className="text-4xl md:text-7xl lg:text-[80px] font-bold text-white leading-tight tracking-tight mb-5 lg:mb-8">
          {hero.title}
        </h1>

        {/* Call to Action Button */}
        <div className="shrink-0 pt-4 lg:pt-0">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group relative inline-flex items-center gap-5 px-7 lg:px-14 py-6 lg:py-7 bg-primary text-primary-foreground rounded-full overflow-hidden shadow-2xl hover:shadow-primary/30 hover:shadow-2xl"
              >
                {/* Multiple gradient layers for depth */}
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Glowing ring effect */}
                <span className="absolute -inset-0.5 bg-linear-to-r from-primary via-primary/80 to-primary/60 rounded-full opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-700 -z-10" />

                <span className="relative z-10 flex items-center gap-4">
                  <span className="flex flex-col items-start text-left">
                    <span className="text-xs hidden lg:block font-light tracking-[0.5em] text-primary-foreground/70 mb-1 group-hover:text-primary-foreground/90 transition-colors duration-500">
                      LIMITED SPOTS
                    </span>
                    <span className="font-black tracking-[0.3em] text-lg lg:text-xl flex items-center gap-3">
                      APPLY NOW
                      <span className="w-8 h-0.5 hidden lg:block bg-primary-foreground/50 group-hover:w-12 group-hover:bg-primary-foreground transition-all duration-500" />
                    </span>
                  </span>

                  {/* Animated mouse click icon */}
                  <span className="relative hidden lg:block">
                    <span
                      className="absolute inset-0 rounded-full bg-primary-foreground/30 animate-ping opacity-0 group-hover:opacity-100"
                      style={{ animationDuration: '1.5s' }}
                    />
                    <MousePointerClick
                      size={24}
                      className="relative transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </span>

                {/* Bottom shine line */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-transparent via-primary-foreground to-transparent group-hover:w-full transition-all duration-700 delay-300" />

                {/* Corner accents */}
                <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-primary-foreground/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-primary-foreground/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-120 p-0 overflow-hidden border-none rounded-[2rem] bg-background/95 backdrop-blur-2xl shadow-2xl">
              <DialogHeader className="hidden">
                <DialogTitle>Application Form</DialogTitle>
              </DialogHeader>
              <div className="max-h-[85vh] overflow-y-auto">
                {/* Dynamic title based on context */}
                <EduFormSubmission title={`Apply for ${countryName}`} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default DestHero;