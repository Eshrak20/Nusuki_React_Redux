import { motion } from "framer-motion";
import type { Section } from "@/types/education/type.course";
import { ClipboardCheck, ShieldCheck, ArrowRight } from "lucide-react";

interface CourseEntryRequirementsProps {
  sections: Section[];
}

const CourseEntryRequirements = ({ sections }: CourseEntryRequirementsProps) => {
  const entry = sections.find((s) =>
    s.heading.toLowerCase().includes("entry")
  );

  if (!entry) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mt-12 group"
    >
      <div className="space-y-6 pl-4">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20">
            <ClipboardCheck className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              {entry.heading}
            </h2>

            <div className="flex items-center gap-2 text-primary/70 text-xs font-medium uppercase tracking-widest mt-1">
              <ShieldCheck className="w-3 h-3" />
              Admission Criteria
            </div>
          </div>
        </div>

        {/* Requirements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-background border border-border rounded-3xl p-8 shadow-sm group-hover:border-primary/40 transition-colors duration-500"
        >
          <div className="text-lg leading-[1.8] text-muted-foreground font-normal tracking-wide">
            {entry.text
              .split("\n")
              .filter((t) => t.trim() !== "")
              .map((line, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={idx}
                  className="flex items-start gap-4 mb-5 last:mb-0"
                >
                  <div className="mt-2 text-primary shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <p className="whitespace-pre-line">{line.trim()}</p>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Note */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-xs font-medium text-primary">
            Meeting minimum requirements does not guarantee admission.
          </p>
        </div>

      </div>

      {/* Glow */}
      <div className="absolute inset-0 -m-6 border border-transparent group-hover:border-border group-hover:bg-muted/5 rounded-[2rem] transition-all duration-500 -z-10" />
    </motion.div>
  );
};

export default CourseEntryRequirements;