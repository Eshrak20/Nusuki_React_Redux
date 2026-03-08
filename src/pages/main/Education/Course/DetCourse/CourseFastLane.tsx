import { motion } from "framer-motion";
import { useState } from "react";
import type { Section } from "@/types/education/type.course";
import { Zap,  Send,  ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormSubmissionModal from "@/components/FormSubmissionModal";

interface CourseFastLaneProps {
  sections: Section[];
}

const CourseFastLane = ({ sections }: CourseFastLaneProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  if (!sections || sections.length === 0) return null;

  const handleEligibilityClick = (heading: string) => {
    setModalTitle(`Check Eligibility for "${heading}"`);
    setIsOpen(true);
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
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20 dark:bg-primary/20 dark:ring-primary/30">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                NUSUKI FastLane
              </h2>
              <div className="flex items-center gap-2 text-primary/60 text-xs font-medium uppercase tracking-widest mt-1">
                Offer in Principle
              </div>
            </div>
          </div>
          <div className="px-4 py-1 rounded-full bg-secondary text-secondary-foreground border border-border text-[10px] font-bold uppercase tracking-tighter">
            Instant Decision
          </div>
        </div>

        {/* Main Content Card */}
        <div className="relative overflow-hidden p-8 rounded-[2.5rem] border border-border bg-accent/30 dark:bg-card/50">
          {sections.map((section, index) => (
            <div key={index} className="space-y-8">
              {/* Text */}
              <div className="max-w-3xl">
                {section.heading && (
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {section.heading}
                  </h3>
                )}
                <p className="text-lg leading-[1.8] text-muted-foreground tracking-wide">
                  {section.text}
                </p>
              </div>

              {/* CTA Section */}
              <div className="pt-4 flex justify-center md:justify-start">
                <Button
                  className="rounded-full px-10 py-7 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 group/btn"
                  onClick={() => handleEligibilityClick(section.heading || "FastLane")}
                >
                  <Send className="mr-2 w-5 h-5 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                  Check Your Eligibility Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}

          {/* Modal */}
          <FormSubmissionModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            title={modalTitle}
          />

          {/* Abstract background */}
          <Zap className="absolute -right-10 -bottom-10 w-48 h-48 text-primary/5 rotate-12 -z-10" />
        </div>
      </div>

      {/* Card Shadow Layer */}
      <div className="absolute inset-0 -m-6 border border-transparent group-hover:border-border group-hover:bg-muted/5 rounded-[2.5rem] transition-all duration-500 -z-10" />
    </motion.div>
  );
};

export default CourseFastLane;