import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import HandTap from "@/assets/Lottie/Handtap.json";
import type { UniversityItem } from "@/types/education/type.country";

interface Props {
  universities: UniversityItem[];
}

const DestTopUniversities = ({ universities }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [showTap, setShowTap] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView || universities.length === 0) return;

    const interval = setInterval(() => {

      // pick random card
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
      ref={ref}
      className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >

      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Top Universities
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Explore some of the most prestigious institutions for your study abroad journey.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {universities.map((u, i) => (
          <div key={i} className="relative">

            {/* Tap animation above active card */}
            {showTap && activeIndex === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 pointer-events-none"
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
                group
                bg-card
                border
                rounded-xl
                p-6
                flex
                flex-col
                items-center
                justify-center
                text-center
                shadow-sm
                hover:shadow-xl
                transition
                duration-300
                cursor-pointer
                ${activeIndex === i ? "border-primary shadow-lg ring-2 ring-primary/40" : "border-border"}
              `}
            >
              {/* Logo */}
              <div className="h-16 flex items-center justify-center mb-4">
                <img
                  src={u.image}
                  alt={u.name}
                  loading="lazy"
                  className="max-h-14 object-contain transition duration-300 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {u.name}
              </p>

            </motion.a>

          </div>
        ))}
      </div>
    </section>
  );
};

export default DestTopUniversities;