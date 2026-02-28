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
      viewport={{ once: true, amount: 0.25 }}
      className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-14"
    >
      {data.map((pkg: HajjPackageItem) => {
        return (
          <motion.article
            key={pkg.id}
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            // Changed bg-[#f2f2f2] to bg-card and added border-border
            className="relative flex flex-col overflow-hidden rounded-[2rem] bg-card border border-border shadow-xl transition-shadow duration-300 hover:shadow-2xl"
          >
            {/* Package Image */}
            <div className="relative h-96 w-full overflow-hidden rounded-b-[1.5rem]">
              <img
                src={pkg.card_image}
                alt={pkg.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col items-center px-6 pb-8 pt-6 text-center">
              {/* Title */}
              {/* Changed text color to use foreground and a more subtle dark-mode friendly gradient */}
              <h3 className="text-3xl font-black tracking-tight h-12 inline-flex items-center gap-2 bg-linear-to-r from-foreground to-hajj-secondary bg-clip-text text-transparent">
                {pkg.name}
              </h3>

              {/* Tagline */}
              <p className="mt-2 text-lg font-bold text-hajj">{pkg.tagline}</p>

              {/* Pricing */}
              {/* Changed text-[#1a1a1a] to text-foreground and gray-600 to muted-foreground */}
              <div className="mt-6 flex items-center gap-2 text-xl font-extrabold text-foreground">
                <span className="font-medium text-muted-foreground">Begins At</span>
                <span className="text-2xl">
                  {Number(pkg.price).toLocaleString()}
                </span>
                <span className="font-medium text-muted-foreground">BDT</span>
              </div>

              {/* View Details Button */}
              <MotionLink
                to={`${pkg.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                // Standardizing button colors: text-white usually stays white on the primary brand color
                className="mt-8 flex items-center gap-3 rounded-full bg-hajj px-8 py-3 text-lg font-bold text-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-hajj">
                  <Play fill="currentColor" size={16} className="ml-0.5" />
                </div>
                View Details
              </MotionLink>
            </div>
          </motion.article>
        );
      })}
    </motion.section>
  );
};

export default HajjUmPackCard;