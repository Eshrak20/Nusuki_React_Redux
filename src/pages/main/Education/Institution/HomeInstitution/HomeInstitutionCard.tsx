import type { University } from "@/types/education/type.uni";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface HomeInstitutionCardProps {
  universities: University[];
}

const HomeInstitutionCard = ({ universities }: HomeInstitutionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {universities.map((uni) => (
        <motion.div
          key={uni.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          layout
          className="bg-card dark:bg-card-dark rounded-2xl shadow-sm border border-muted dark:border-muted-dark flex flex-col h-full transition-shadow hover:shadow-md"
        >
          {/* Logo */}
          <div className="h-32 w-full flex items-center  justify-center bg-white p-6">
            <img
              src={uni.uni_logo}
              alt={uni.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <hr className="border-muted dark:border-muted-dark mb-5" />
          <div className="p-4">
            {/* Content */}
            <div className="grow">
              <h3 className="font-bold text-foreground dark:text-foreground-dark text-[15px] leading-tight mb-2 line-clamp-2 min-h-10">
                {uni.name}
              </h3>

              <p className="text-sm text-foreground mb-1">
                {uni.location || uni.country}
              </p>

              <p className="text-sm text-foreground dark:text-foreground-dark font-medium truncate mb-4">
                {uni.universityUrl}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-auto">
              <Link
                to={`${uni.id}`}
                className="flex-1 py-2.5 px-2 border border-primary/40 text-primary text-sm font-semibold rounded-lg hover:bg-primary/10 transition-colors text-center flex items-center justify-center"
              >
                Know More
              </Link>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-2.5 px-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md flex items-center justify-center"
              >
                Apply Now
              </motion.button>
            </div>
          </div>

        </motion.div>
      ))}
    </motion.div>
  );
};

export default HomeInstitutionCard;