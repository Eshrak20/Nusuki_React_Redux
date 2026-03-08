import { motion } from "framer-motion";
import type { Section } from "@/types/education/type.course";
import { Info, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseApplicationInfoProps {
  sections: Section[];
}

const CourseApplicationInfo = ({ sections }: CourseApplicationInfoProps) => {
  if (!sections || sections.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20 dark:bg-primary/20 dark:ring-primary/30">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground/90">
                Application Information
              </h2>
              <div className="flex items-center gap-2 text-primary/60 text-xs font-medium uppercase tracking-widest mt-1">
                <Calendar className="w-3 h-3" />
                Deadlines & Procedures
              </div>
            </div>
          </div>
        </div>

        {/* Content Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "relative p-6 rounded-3xl border transition-all duration-300",
                "bg-white dark:bg-card border-border/60 hover:border-primary/40",
                "shadow-sm hover:shadow-md"
              )}
            >
              {/* Subtle Icon Indicator for each section */}
              <div className="absolute top-6 right-6 opacity-10">
                <FileText className="w-12 h-12" />
              </div>

              {section.heading && (
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  {section.heading}
                </h3>
              )}

              {section.text && (
                <div className="text-lg leading-[1.8] text-muted-foreground/90 font-normal tracking-wide whitespace-pre-line">
                  {/* Parsing text for better paragraph spacing */}
                  {section.text.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx} className="mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Tip */}
        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-2xl p-4">
            <p className="text-xs text-center font-medium text-primary/80">
                Ensure all documents are translated to English before submission.
            </p>
        </div>
      </div>

      {/* Hover Background Layer */}
      <div className="absolute inset-0 -m-6 border border-transparent group-hover:border-border group-hover:bg-muted/5 rounded-[2.5rem] transition-all duration-500 -z-10" />
    </motion.div>
  );
};

export default CourseApplicationInfo;