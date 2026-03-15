import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { CityItem } from "@/types/education/type.country";
import { MapPin, ArrowRight } from "lucide-react";

interface Props {
  cities: CityItem[];
  id?: string; // Used to connect to the sticky navbar
}

const DestTopCities = ({ cities, id = "cities" }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!cities || cities.length === 0) return null;

  return (
    <section
      id={id}
      ref={ref}
      className="relative w-full my-16 scroll-mt-40 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-6"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide uppercase">Top Destinations</span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Top Cities for Your Journey
        </h2>

        <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
          Discover vibrant cities with world-class education, rich culture, and endless opportunities.
        </p>
      </motion.div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cities.map((city, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Number Badge (e.g., "001") */}
            {city.number && (
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-background/80 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-border/50">
                  {city.number}
                </div>
              </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              <motion.img
                src={city.image}
                alt={city.city}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* City Name positioned over the image */}
              <div className="absolute bottom-4 left-6 z-20">
                <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                  {city.city}
                </h3>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col p-6 flex-grow bg-card">
              <p className="text-muted-foreground text-[15px] leading-relaxed line-clamp-3 mb-6">
                {city.description}
              </p>

              {/* Explore Link */}
              <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-primary font-semibold text-sm group-hover:text-primary/80 transition-colors cursor-pointer">
                <span>Explore {city.city}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DestTopCities;