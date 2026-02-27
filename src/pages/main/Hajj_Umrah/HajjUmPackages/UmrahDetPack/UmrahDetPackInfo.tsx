import { motion, type Variants } from "framer-motion";
import {
  Calendar,
  BadgeCheck,
  Building2,
  Quote,
  DollarSign,
  Star,
  Moon,
  Tag,
} from "lucide-react";
import type { HajjPackageDetails } from "@/types/hajj/types.pack";

interface Props {
  pack: HajjPackageDetails;
}

const UmrahDetPackInfo = ({ pack }: Props) => {
  // Explicitly typing the variants to fix the TypeScript error
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        // Using "as any" or a tuple to satisfy the Easing type
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const formatCurrency = (val: string) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(Number(val));

  return (
    <div className="bg-background overflow-x-hidden">
      {/* --- SECTION 1: THE SPECS & SECONDARY GALLERY --- */}
      {/* Added a subtle gradient background: from background to a hint of hajj color */}
      <section className="w-full py-20 lg:py-32 px-8 lg:px-24 bg-linear-to-br from-background via-background to-hajj/10 dark:to-hajj/20">
        <div className="flex flex-col lg:flex-row-reverse items-start gap-20">
          {/* STAGGERED IMAGE BOX (Kept as is) */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-[40%] space-y-8"
          >
            <div className="relative group overflow-hidden">
              <img
                src={pack.images[0]?.image_url || pack.card_image}
                className="w-full h-125 object-cover  transition-all duration-1000 shadow-xl"
                alt="Detail"
              />
            </div>
          </motion.div>

          {/* BEAUTIFIED SPEC GRID */}
          <div className="w-full lg:w-[55%]">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              className="space-y-12"
            >
              {/* Header Section */}
              <div className="space-y-2">
                <h2 className="text-5xl font-light text-foreground tracking-tight">
                  {pack.name}
                </h2>
                <p className="text-hajj text-lg font-medium tracking-wide">
                  {pack.tagline}
                </p>
              </div>

              {/* Detail List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-12">
                <DetailItem
                  icon={<Building2 size={16} />}
                  label="Company Name"
                  value={pack.company_name}
                />
                <DetailItem
                  icon={<DollarSign size={16} />}
                  label="TOTAL INVESTMENT"
                  value={formatCurrency(pack.price)}
                />
                <DetailItem
                  icon={<BadgeCheck size={16} />}
                  label="PER Person"
                  value={formatCurrency(pack.per_person_price)}
                />
                <DetailItem
                  icon={<Tag size={16} />}
                  label="CATEGORY"
                  value={pack.package_type}
                />
              </div>

              {/* Experience Section */}
              <div className="bg-hajj/5 dark:bg-hajj/20 p-8 rounded-2xl border border-hajj/10">
                <p className="text-hajj flex items-center gap-2 mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">
                  <Quote size={14} /> The Experience
                </p>
                <p className="text-xl text-foreground/80 italic leading-relaxed">
                  "This package covers all logistics, from visa processing to
                  luxury accommodation near the Haram, ensuring your focus
                  remains solely on your Ibadah."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: STATS BAR --- */}
      <section className="bg-hajj dark:bg-hajj/30 py-16 text-white border-y border-hajj-secondary/20">
        <div className="max-w-7xl mx-auto px-8 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatItem
              icon={<Calendar size={24} />}
              label="Date"
              value={pack.date}
            />
            <StatItem
              icon={<Moon size={24} />}
              label="Number of Nights"
              value={pack.num_of_nights}
            />
            <StatItem
              icon={<Star size={24} />}
              label="Package Type"
              value={pack.package_type}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

/* --- SHARED SUB-COMPONENTS --- */

const DetailItem = ({
  icon,
  label,
  value,
  isPrimary = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isPrimary?: boolean;
}) => (
  <div className="group flex flex-col gap-2">
    <div className="flex items-center gap-2.5">
      <span className="p-1.5 rounded-sm bg-hajj/5 group-hover:bg-hajj/10 transition-colors">
        {icon}
      </span>
      <span className="text-muted-foreground uppercase tracking-[0.2em] text-[9px] font-bold">
        {label}
      </span>
    </div>
    {value && (
      <p
        className={`
      ${isPrimary ? "text-3xl font-medium" : "text-2xl font-light"} 
      text-foreground tracking-tight transition-all duration-300 group-hover:translate-x-1
    `}
      >
        {value}
      </p>
    )}
  </div>
);

const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="group relative"
  >
    {/* Subtle highlight card */}
    <div
      className="relative bg-white/5 rounded-lg p-6 
                    border border-white/10 
                    transition-all duration-300
                    group-hover:bg-white/10 group-hover:border-white/20
                    group-hover:shadow-lg"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Icon with subtle background */}
        <div
          className="p-3 rounded-full bg-white 
                        transition-all duration-300
                        group-hover:bg-white group-hover:scale-105"
        >
          <div className="text-hajj group-hover:text-hajj transition-colors duration-300">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div>
          <h4
            className="text-[16px] font-medium text-white mb-1 
                         group-hover:text-white transition-colors duration-300"
          >
            {label}
          </h4>
          <p
            className="text-lg font-semibold text-white 
                        group-hover:text-white transition-colors duration-300"
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default UmrahDetPackInfo;
