import { motion } from "framer-motion";
import { useState } from "react";
import type { Section } from "@/types/education/type.course";
import { CheckCircle, Target, FileText, ChevronRight, Sparkles, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FormSubmissionModal from "@/components/FormSubmissionModal";

interface CourseActionPlanProps {
  sections: Section[];
}

const CourseActionPlan = ({ sections }: CourseActionPlanProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  if (!sections || sections.length === 0) return null;

  const getStepIcon = (heading: string) => {
    const h = heading.toLowerCase();
    if (h.includes("shortlist")) return <Target className="w-5 h-5" />;
    if (h.includes("eligibility")) return <CheckCircle className="w-5 h-5" />;
    if (h.includes("apply")) return <FileText className="w-5 h-5" />;
    return <Flag className="w-5 h-5" />;
  };

  const handleGetStarted = (heading: string) => {
    setModalTitle(`Get Started with "${heading}"`);
    setIsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mt-12 group"
    >
      <div className="space-y-8 pl-4">
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block p-2.5 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Target className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-foreground">
              Your Action Plan
            </h2>
            <div className="flex items-center gap-2 text-primary/60 text-xs uppercase tracking-widest mt-1">
              <Sparkles className="w-3 h-3" />
              Your journey starts here
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="relative space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex gap-6 group/step"
            >
              {/* Connector */}
              {index !== sections.length - 1 && (
                <div className="absolute hidden lg:block left-6 top-12 -bottom-6 w-0.5 bg-border/40 group-hover/step:bg-primary/20 transition-colors" />
              )}

              {/* Step Icon */}
              <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-white dark:bg-card border-2 border-primary/20 hidden lg:flex items-center justify-center text-primary font-bold shadow-sm group-hover/step:border-primary group-hover/step:bg-primary group-hover/step:text-white transition-all duration-300">
                {getStepIcon(section.heading || "")}
              </div>

              {/* Step Card */}
              <div
                className={cn(
                  "flex-1 p-6 rounded-3xl border transition-all duration-300",
                  "bg-white dark:bg-card border-border/60 hover:border-primary/30 shadow-sm",
                  "group-hover/step:shadow-md"
                )}
              >
                {section.heading && (
                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <span className="hidden lg:block text-primary/40 text-sm font-mono tracking-tighter">
                      0{index + 1}
                    </span>
                    {section.heading}
                  </h3>
                )}

                {section.text && (
                  <p className="text-lg leading-[1.7] text-muted-foreground/90 mb-4">
                    {section.text}
                  </p>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 -ml-2 lg:ml-0 h-auto font-bold text-primary hover:bg-transparent group/btn"
                  onClick={() => handleGetStarted(section.heading || "Action Plan")}
                >
                  Get Started
                  <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <FormSubmissionModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={modalTitle}
      />

    </motion.div>
  );
};

export default CourseActionPlan;