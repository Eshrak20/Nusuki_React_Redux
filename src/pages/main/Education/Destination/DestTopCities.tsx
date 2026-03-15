import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { CityItem } from "@/types/education/type.country";
import { MapPin, GraduationCap, Building2, Users } from "lucide-react";

interface Props {
  cities: CityItem[];
}

const DestTopCities = ({ cities }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Mock data for additional stats (you can replace with real data)
  const getCityStats = (city: string) => ({
    universities: Math.floor(Math.random() * 30) + 10,
    students: Math.floor(Math.random() * 50) + 20,
    ranking: Math.floor(Math.random() * 20) + 1,
  });

  if (!cities || cities.length === 0) return null;

  return (
    <section
      ref={ref}
      className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">Popular Destinations</span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Top Cities for Your Journey
          </span>
        </h2>
        
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover vibrant cities with world-class education, rich culture, and endless opportunities
        </p>
      </motion.div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cities.map((city, i) => {
          const stats = getCityStats(city.city);
          
          return (
            <motion.div
              key={city.city + i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container with Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Image */}
                <motion.img
                  src={city.image}
                  alt={city.city}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* City Name Badge on Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-4 left-4 z-20"
                >
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {city.city}
                  </h3>
                </motion.div>

                {/* Country Flag/Badge (if available) */}
                {city.country && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
                      {city.country}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col p-6">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <Building2 className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Uni's</span>
                    <p className="text-sm font-bold text-foreground">{stats.universities}+</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <GraduationCap className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Students</span>
                    <p className="text-sm font-bold text-foreground">{stats.students}k+</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <MapPin className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Rank</span>
                    <p className="text-sm font-bold text-foreground">#{stats.ranking}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                  {city.description}
                </p>

                {/* Features/Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {city.features?.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      {feature}
                    </span>
                  )) || (
                    <>
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        Top Universities
                      </span>
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        Student Friendly
                      </span>
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        Cultural Hub
                      </span>
                    </>
                  )}
                </div>

                {/* Explore Button (Hidden by default, shows on hover) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group/btn">
                    <span>Explore Universities</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </button>
                </motion.div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute transform rotate-45 bg-primary/20 w-28 h-28 -top-14 -right-14 group-hover:bg-primary/30 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mt-12"
      >
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium group">
          <span>View All Destinations</span>
          <Users className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

export default DestTopCities;