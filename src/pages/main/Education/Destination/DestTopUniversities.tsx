import { motion } from "framer-motion";
import type { UniversityItem } from "@/types/education/type.country";

interface Props {
  universities: UniversityItem[];
}

const DestTopUniversities = ({ universities }: Props) => {
  if (!universities || universities.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Top Universities
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Explore some of the most prestigious institutions for your study abroad journey.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {universities.map((u, i) => (
          <motion.a
            key={i}
            href={u.website}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="
            group
            bg-card
            border
            border-border
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
          "
          >
            {/* Logo */}
            <div className="h-16 flex items-center justify-center mb-4">
              <img
                src={u.image}
                alt={u.name}
                loading="lazy"
                className="
                  max-h-14
                  object-contain
                  transition
                  duration-300
                  group-hover:scale-110
                "
              />
            </div>

            {/* Name */}
            <p
              className="
                text-sm
                font-semibold
                text-foreground
                group-hover:text-primary
                transition-colors
                line-clamp-2
              "
            >
              {u.name}
            </p>

            {/* subtle underline hover */}
            <span
              className="
                mt-2
                h-[2px]
                w-0
                bg-primary
                transition-all
                duration-300
                group-hover:w-8
              "
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default DestTopUniversities;