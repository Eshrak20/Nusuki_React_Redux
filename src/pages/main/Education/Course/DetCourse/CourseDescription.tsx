import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Section } from "@/types/education/type.course";
import { Button } from "@/components/ui/button";
import { ChevronDown, BookOpen, AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseDescriptionProps {
  sections: Section[];
}

const CourseDescription = ({ sections }: CourseDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const courseInfo = sections.find((s) => s.heading === "Course info");

  if (!courseInfo) return null;

  // Animation variants for the "Typing" feel
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.01 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mt-12 group"
    >
      <div className="space-y-6 pl-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground/90">
                {courseInfo.heading}
              </h2>
              <div className="flex items-center gap-2 text-primary/60 text-xs font-medium uppercase tracking-widest mt-1">
                <AlignLeft className="w-3 h-3" />
                Detailed Overview
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="relative">
          <motion.div
            layout
            initial={false}
            animate={{ height: isExpanded ? "auto" : "220px" }}
            className="overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isExpanded ? "expanded" : "collapsed"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={cn(
                  "text-lg leading-[1.8] text-muted-foreground/90 font-normal tracking-[0.01em] whitespace-pre-line",
                  "selection:bg-primary/20 selection:text-primary"
                )}
              >
                {/* Splitting text by double new lines to create nice paragraph spacing */}
                {courseInfo.text.split('\n\n').map((paragraph, idx) => (
                  <motion.p 
                    variants={itemVariants} 
                    key={idx} 
                    className="mb-6 last:mb-0"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Clean Toggle Section (No blurry overlay) */}
          <div className={cn(
            "flex items-center gap-4 mt-4 pt-4 border-t border-border/40 transition-all",
            !isExpanded && "mt-0 pt-8"
          )}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-full border-primary/20 hover:border-primary/50 text-primary bg-primary/5 hover:bg-primary/10 font-bold px-6 py-5 transition-all group/btn"
            >
              <span className="mr-2">
                {isExpanded ? "Collapse Details" : "Read Full Description"}
              </span>
              <ChevronDown 
                className={cn(
                  "w-4 h-4 transition-transform duration-500",
                  isExpanded ? "rotate-180" : "group-hover:translate-y-1"
                )} 
              />
            </Button>
            
            {!isExpanded && (
               <span className="text-xs text-muted-foreground animate-pulse font-medium">
                  Click to reveal hidden insights...
               </span>
            )}
          </div>
        </div>
      </div>

      {/* Background card hover effect */}
      <div className="absolute inset-0 -m-6 border border-transparent group-hover:border-border group-hover:bg-muted/5 rounded-[2rem] transition-all duration-500 -z-10" />
    </motion.div>
  );
};

export default CourseDescription;