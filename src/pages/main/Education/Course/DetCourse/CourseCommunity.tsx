import { motion } from "framer-motion";
import { useState } from "react";
import type { Section } from "@/types/education/type.course";
import { Users, Globe, MessageCircle, ArrowRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FormSubmissionModal from "@/components/FormSubmissionModal";

interface CourseCommunityProps {
  sections: Section[];
}

const CourseCommunity = ({ sections }: CourseCommunityProps) => {
  
  const [isOpen, setIsOpen] = useState(false);

  if (!sections || sections.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
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
            <Users className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-[26px] lg:text-3xl font-bold text-foreground">
              Study Abroad Community
            </h2>

            <div className="flex items-center gap-2 text-xs text-primary/70 uppercase tracking-widest mt-1">
              <Share2 className="w-3 h-3" />
              Connect with Global Peers
            </div>
          </div>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "relative overflow-hidden p-6 lg:p-8 rounded-3xl border",
                "bg-primary/5 border-border hover:border-primary/30",
                "shadow-sm transition-all duration-300"
              )}
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-3">
                  {section.heading &&
                    section.heading !== "Your study abroad community" && (
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        {section.heading}
                      </h3>
                    )}

                  {section.text && (
                    <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
                      {section.text}
                    </p>
                  )}
                </div>

                {/* Button */}
                <div className="shrink-0">
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full px-7 py-6 font-semibold group/btn"
                  >
                    <Globe className="hidden lg:block mr-2 w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                    Explore Community
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>

              {/* Decorative background */}
              <div className="absolute -right-8 -bottom-8 opacity-5 text-primary">
                <Users className="w-40 h-40" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <FormSubmissionModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Get Guidance From Our Study Abroad Community"
      />

    </motion.div>
  );
};

export default CourseCommunity;