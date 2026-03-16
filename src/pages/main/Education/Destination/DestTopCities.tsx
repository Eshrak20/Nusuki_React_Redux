import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { CityItem } from "@/types/education/type.country";
import { MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Props {
  cities: CityItem[];
  id?: string; // Used to connect to the sticky navbar
}

const DestTopCities = ({ cities, id = "cities" }: Props) => {

  const location = useLocation();
  const countryName = location.pathname.endsWith("/us") ? "in USA" :
    location.pathname.endsWith("/au") ? "in Australia" :
      location.pathname.endsWith("/nz") ? "in New Zealand" :
        location.pathname.endsWith("/ca") ? "in Canada" :
          location.pathname.endsWith("/gb") ? "in UK" :
            "";
            
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
        className="text-center mb-14 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide uppercase">Top Destinations</span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
          Top Cities for Your Journey {countryName}
        </h2>
        
        <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto">
          Discover vibrant cities with world-class education, rich culture, and endless opportunities.
        </p>
      </motion.div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cities.map((city, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            /* CHANGED HERE: aspect-[4/3] for mobile, aspect-[3/2] for desktop to make them significantly shorter */
            className="group relative flex flex-col justify-end overflow-hidden rounded-[24px] shadow-md hover:shadow-2xl transition-all duration-500 aspect-4/3 lg:aspect-3/3"
          >
            {/* Full Cover Image */}
            <motion.img
              src={city.image}
              alt={city.city}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
            />

            {/* Heavy Gradient Overlay for Text Readability - adjusted slightly to match the shorter height */}
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Bottom Content: City Name & Description */}
            <div className="relative z-20 p-5 md:p-6 flex flex-col gap-2 transition-transform duration-500 group-hover:-translate-y-1">
              {/* City Name */}
              <div className="flex items-center gap-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-lg">
                  {city.city}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 drop-shadow-md">
                {city.description}
              </p>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DestTopCities;