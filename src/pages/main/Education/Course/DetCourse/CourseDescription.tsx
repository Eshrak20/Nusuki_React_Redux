import { useState } from "react";
import { motion } from "framer-motion";
import type { Section } from "@/types/education/type.course";
import { Button } from "@/components/ui/button";
import { ChevronDown, BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseDescriptionProps {
  sections: Section[];
}

const CourseDescription = ({ sections }: CourseDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const courseInfo = sections.find((s) => s.heading === "Course info");

  if (!courseInfo) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mt-8 group"
    >
      {/* Decorative Background Element */}
      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-primary via-primary/20 to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-4 pl-2">
        {/* Heading with Icon */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {courseInfo.heading}
          </h2>
          <Sparkles className="w-4 h-4 text-primary/40 animate-pulse" />
        </div>

        {/* Content Area with Gradient Mask */}
        <div className="relative">
          <motion.div
            animate={{ height: isExpanded ? "auto" : "180px" }}
            className="overflow-hidden relative transition-all duration-500 ease-in-out"
          >
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {courseInfo.text}
            </p>

            {/* Fade Overlay when collapsed */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent z-10" />
            )}
          </motion.div>

          {/* Read More / Less Toggle */}
          <div className="flex justify-start mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary hover:bg-primary/5 font-semibold gap-2 group/btn"
            >
              {isExpanded ? "Show Less" : "Read Full Description"}
              <ChevronDown 
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isExpanded ? "rotate-180" : "group-hover:translate-y-1"
                )} 
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Modern Card Styling for the container */}
      <div className="absolute inset-0 -m-4 border border-transparent group-hover:border-border group-hover:bg-muted/5 rounded-2xl transition-all -z-10" />
    </motion.div>
  );
};

export default CourseDescription;