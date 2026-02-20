import type { HajjUmPackCardProps } from "@/types/hajj/types.pack";
import { useState } from "react";
import {
  Phone,
  Download,
  Clock,
  Plane,
  Bed,
  Building2,
  Building,
  Utensils,
  MapPin,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* ======================================================
   Motion Configuration
====================================================== */

type Direction = "left" | "center" | "right";

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
   Helpers
====================================================== */

const getDirectionByIndex = (index: number): Direction => {
  if (index === 0) return "left";
  if (index === 2) return "right";
  return "center";
};

// Get center indexes of each row (3 cards per row)
const getCenterIndexes = (length: number) => {
  const centers: number[] = [];
  for (let i = 0; i < length; i += 3) {
    if (i + 1 < length) centers.push(i + 1);
  }
  return centers;
};

/* ======================================================
   Feature Row
====================================================== */

interface FeatureRowProps {
  icon: ReactNode;
  label: string;
  value?: string | number;
  isFeatured: boolean;
}

const FeatureRow = ({ icon, label, value, isFeatured }: FeatureRowProps) => (
  <div
    className={`flex items-center justify-between border-b py-2 last:border-0 ${
      isFeatured ? "border-white" : "border-hajj"
    }`}
  >
    <div className="flex items-center gap-2">
      <span className={isFeatured ? "text-white" : "text-hajj"}>{icon}</span>
      <span className="font-semibold">{label}:</span>
    </div>
    <span className="font-light">{value || "N/A"}</span>
  </div>
);

/* ======================================================
   Main Component
====================================================== */

const HajjUmPackCard = ({ packages }: HajjUmPackCardProps) => {
  const [featuredIndex, setFeaturedIndex] = useState<number | null>(null);

  if (!packages?.length) return null;

  // Compute center indexes
  const centerIndexes = getCenterIndexes(packages.length);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="mt-12 grid  grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"
    >
      {packages.map((pkg, index) => {
        // ✅ Determine if featured
        const isFeatured =
          featuredIndex !== null
            ? index === featuredIndex
            : centerIndexes.includes(index);

        const direction = getDirectionByIndex(index);

        return (
          <motion.article
            key={pkg.id}
            custom={direction}
            onClick={() => setFeaturedIndex(index)}
            variants={cardVariants}
            whileHover={{
              y: -6,
              scale: isFeatured ? 1.05 : 1.02,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`relative flex flex-col p-6 cursor-pointer ${
              isFeatured
                ? "z-10 rounded-xl bg-hajj py-12 text-white shadow-2xl"
                : "rounded-lg border border-gray-100 bg-white py-8 text-gray-800 shadow-lg"
            }`}
          >
            {/* Header */}
            <header className="mb-4 flex items-start gap-3">
              <div className={isFeatured ? "text-white" : "text-hajj"}>
                {index === 0 && <Utensils size={32} />}
                {index === 1 && <Building2 size={32} />}
                {index === 2 && <Building size={32} />}
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold">{pkg.title}</h3>
                <p
                  className={`mt-1 text-xs ${
                    isFeatured ? "text-gray-200" : "text-gray-500"
                  }`}
                >
                  {pkg.short_description}
                </p>
              </div>
            </header>

            <hr
              className={`my-4 ${
                isFeatured ? "border-white" : "border-dotted border-hajj"
              }`}
            />

            {/* Price */}
            <section className="mb-6 flex items-baseline gap-1">
              <span className="text-xs font-bold uppercase">BDT</span>
              <span className="text-5xl font-black">{pkg.price}</span>
              <span
                className={`ml-2 text-[10px] font-bold uppercase ${
                  isFeatured ? "text-white" : "text-hajj"
                }`}
              >
                Starts From
              </span>
            </section>

            {/* Features */}
            <section className="grow text-sm">
              <FeatureRow
                icon={<Clock size={16} />}
                label="Duration"
                value={pkg.duration}
                isFeatured={isFeatured}
              />

              <FeatureRow
                icon={<Plane size={16} />}
                label="Flight"
                value={pkg.flight}
                isFeatured={isFeatured}
              />

              <FeatureRow
                icon={<Bed size={16} />}
                label="Hotel Aziziyah/Shisha"
                value={pkg.hotel_aziziyah_shisha}
                isFeatured={isFeatured}
              />

              <FeatureRow
                icon={<Building2 size={16} />}
                label="Hotel Makkah"
                value={pkg.hotel_makkah}
                isFeatured={isFeatured}
              />

              <FeatureRow
                icon={<Building size={16} />}
                label="Hotel Madinah"
                value={pkg.hotel_madinah}
                isFeatured={isFeatured}
              />

              <FeatureRow
                icon={<Utensils size={16} />}
                label="Food"
                value={pkg.food}
                isFeatured={isFeatured}
              />

              <FeatureRow
                icon={<MapPin size={16} />}
                label="Services"
                value={pkg.services}
                isFeatured={isFeatured}
              />
            </section>

            {/* Actions */}
            <footer className="mt-8 space-y-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`flex w-full items-center justify-center gap-2 rounded-md py-3 text-xs font-bold uppercase tracking-widest shadow-md transition-colors ${
                  isFeatured
                    ? "bg-white text-hajj hover:bg-gray-100"
                    : "bg-hajj text-white hover:bg-hajj/80"
                }`}
              >
                <Phone size={14} /> Call Now
              </motion.button>

              <motion.a
                href={pkg.attachment}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`flex w-full items-center justify-center gap-2 rounded-md py-3 text-xs font-bold uppercase tracking-widest shadow-md transition-colors ${
                  isFeatured
                    ? "bg-white text-hajj hover:bg-gray-100"
                    : "bg-hajj text-white hover:bg-hajj/80"
                }`}
              >
                <Download size={14} /> Download Itinerary
              </motion.a>
            </footer>

            <p className="mt-4 text-center text-[10px]">
              *Terms & Conditions Applicable
            </p>
          </motion.article>
        );
      })}
    </motion.section>
  );
};

export default HajjUmPackCard;
