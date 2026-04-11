import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import HandTap from "@/assets/Lottie/Handtap.json";
import type { UniversityItem } from "@/types/education/type.country";
import { useLocation } from "react-router-dom";

interface Props {
  universities: UniversityItem[];
  id?: string;
}

const DestTopUniversities = ({ universities, id = "universities" }: Props) => {
  const location = useLocation();

  // Mapping country names based on URL path
  const countryName = location.pathname.endsWith("/us") ? "in USA" :
    location.pathname.endsWith("/au") ? "in Australia" :
      location.pathname.endsWith("/nz") ? "in New Zealand" :
        location.pathname.endsWith("/ca") ? "in Canada" :
          location.pathname.endsWith("/gb") ? "in UK" :
            "";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [showTap, setShowTap] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView || universities.length === 0) return;

    const interval = setInterval(() => {
      // Pick a random card to highlight
      const randomIndex = Math.floor(Math.random() * universities.length);
      setActiveIndex(randomIndex);
      setShowTap(true);

      setTimeout(() => {
        setShowTap(false);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, universities.length]);

  if (!universities || universities.length === 0) return null;

  return (
    <section
      id={id}
      ref={ref}
      className="relative max-w-7xl mx-auto py-6 lg:py-12 px-4"
    >
      {/* Header */}
      <div className="text-center mb-10 lg:mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Top Universities {countryName}
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Explore some of the most prestigious institutions for your study {countryName} journey.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 px-4 lg:px-0 lg:gap-6">
        {universities.map((u, i) => (
          <div key={i} className="relative">
            {/* Tap animation above active card */}
            {showTap && activeIndex === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 z-10 pointer-events-none"
              >
                <Lottie animationData={HandTap} loop />
              </motion.div>
            )}

            <motion.a
              href={u.website}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`
                group bg-card border rounded-xl px-6 pt-6 pb-3 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition duration-300 cursor-pointer ${activeIndex === i ? "border-primary shadow-lg ring-2 ring-primary/40" : "border-border"}
              `}
            >
              {/* Logo Container */}
              <div className="flex items-center justify-center h-16 w-full">
                <img
                  src={u.image}
                  alt={u.name || "University Logo"}
                  loading="lazy"
                  className="max-h-14 w-auto object-contain transition duration-300 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              {
                u?.name && (
                  <p className="text-sm h-10.5 font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {u.name}
                  </p>
                )
              }

            </motion.a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestTopUniversities;