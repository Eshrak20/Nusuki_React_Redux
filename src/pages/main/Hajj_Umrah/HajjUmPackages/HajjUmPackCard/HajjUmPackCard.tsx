import type { HajjPackageItem, HajjPackageList } from "@/types/hajj/types.pack";
import { Play } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

/* ======================================================
   Motion Configuration
====================================================== */

type Direction = "left" | "center" | "right";
const MotionLink = motion(Link);

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: (direction: Direction) => ({
    opacity: 0,
    x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
    y: direction === "center" ? 60 : 40,
    scale: 0.96,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
    },
  },
};

/* ======================================================
   Main Component
====================================================== */

const HajjUmPackCard = ({ data }: HajjPackageList) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-14"
    >
      {data.map((pkg: HajjPackageItem) => {
        return (
          <motion.article
            key={pkg.id}
            variants={cardVariants}
            className="group relative flex flex-col overflow-hidden lg:rounded-[2.5rem] lg:bg-card lg:border border-border lg:shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            {/* Package Image Container */}
            <div className="relative h-80 w-full overflow-hidden">
              <img
                src={pkg.card_image}
                alt={pkg.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Subtle Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

              {/* Floating Badge (Optional UX addition) */}
              <div className="absolute top-4 right-6 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-hajj shadow-sm">
                Available
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col items-center px-6 pb-10 pt-8 text-center">
              <h3 className="text-3xl h-10 font-black tracking-tight bg-linear-to-r from-foreground to-hajj-secondary bg-clip-text text-transparent">
                {pkg.name}
              </h3>

              <p className="mt-2 text-lg font-semibold text-hajj/80 uppercase tracking-wide">
                {pkg.tagline}
              </p>

              {/* Pricing */}
              <div className="mt-3 lg:mt-6 flex items-baseline gap-2 text-foreground">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-tighter">Starts from</span>
                <span className="text-3xl font-black">
                  ৳{Number(pkg.price).toLocaleString()}
                </span>
              </div>

              {/* Enhanced View Details Button */}
              <MotionLink
                to={`${pkg.id}`}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="relative mt-8 flex items-center gap-3 overflow-hidden rounded-full bg-hajj px-6 lg:px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:pr-12"
              >
                {/* Button Shine/Slide Effect */}
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                <motion.div
                  variants={{
                    hover: { scale: 1.2, rotate: [0, -10, 10, 0] }
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-hajj shadow-inner"
                >
                  <Play fill="currentColor" size={12} className="ml-0.5" />
                </motion.div>

                <span className="relative z-10">View Details</span>
              </MotionLink>
            </div>
          </motion.article>
        );
      })}
    </motion.section>
  );
};

export default HajjUmPackCard;