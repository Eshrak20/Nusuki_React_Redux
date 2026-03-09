import { motion } from "framer-motion";
import { useState } from "react";
import type { Table } from "@/types/education/type.course";
import { CalendarDays, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import FormSubmissionModal from "@/components/FormSubmissionModal";

interface CourseIntakesProps {
  tables: Table[];
}

const CourseIntakes = ({ tables }: CourseIntakesProps) => {
  const intakeTable = tables[0];

  const [isOpen, setIsOpen] = useState(false);

  if (!intakeTable || !intakeTable.rows) return null;

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
          <div className="hidden lg:block p-2.5 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <CalendarDays className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Available Intakes
            </h2>

            <div className="flex items-center gap-2 text-xs text-primary/70 uppercase tracking-widest mt-1">
              <Clock className="w-3 h-3" />
              Plan your start date
            </div>
          </div>
        </div>

        {/* Intake Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {intakeTable.rows.map((row, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => setIsOpen(true)}
              className={cn(
                "cursor-pointer group/item flex items-center justify-between p-5 rounded-2xl border transition-all duration-300",
                "bg-card border-border hover:border-primary/40",
                "shadow-sm hover:shadow-md hover:-translate-y-1"
              )}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {row[0] || "Semester"}
                </span>

                <p className="text-lg font-bold text-foreground">
                  {row[1] || "TBA"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 pb-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-[10px] font-bold text-primary uppercase">
                    Open
                  </span>
                </div>

                <ArrowRight className="hidden lg:block w-4 h-4 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Banner */}
        <div className="flex items-center gap-3 bg-muted/30 rounded-2xl p-4 border border-border/40">
          <div className="hidden lg:block p-1.5 rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="w-4 h-4" />
          </div>

          <div className="block lg:hidden w-3 h-2 rounded-full bg-primary animate-pulse" />

          <p className="text-sm font-medium text-muted-foreground">
            Applications are currently being accepted for the above dates. We recommend applying at least 4 months in advance.
          </p>
        </div>

      </div>

      {/* Modal */}
      <FormSubmissionModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Apply for Your Preferred Intake"
      />

    </motion.div>
  );
};

export default CourseIntakes;