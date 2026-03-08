import { motion } from "framer-motion";
import { useState } from "react";
import type { Provider } from "@/types/education/type.course";
import { School, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FormSubmissionModal from "@/components/FormSubmissionModal";

interface CourseProviderProps {
  provider: Provider;
}

const CourseProvider = ({ provider }: CourseProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  if (!provider) return null;

  const handleApplyClick = () => {
    setModalTitle(`Apply Now for ${provider.name}`);
    setIsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mt-16 group"
    >
      <div className="space-y-6 pl-4">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20 dark:bg-primary/20 dark:ring-primary/30">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground/90">
                Course Provider
              </h2>
              <div className="flex items-center gap-2 text-primary/60 text-xs font-medium uppercase tracking-widest mt-1">
                <ShieldCheck className="w-3 h-3" />
                Verified Institution
              </div>
            </div>
          </div>
        </div>

        {/* Provider Profile Card */}
        <div
          className={cn(
            "relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-sm transition-all duration-500",
            "group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5"
          )}
        >
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            {/* Logo Section */}
            <div className="relative shrink-0">
              <div className="absolute -inset-2 bg-primary/5 rounded-full blur-xl" />
              <div className="relative w-24 h-24 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border group-hover:ring-primary/20 transition-all duration-500 flex items-center justify-center">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Provider Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {provider.name}
              </h3>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                  <MapPin className="w-4 h-4 text-primary/60" />
                  Main Campus
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-wider">
                  Official Partner
                </div>
              </div>

              <p className="text-muted-foreground/80 text-sm leading-relaxed max-w-xl">
                This course is officially provided and accredited by {provider.name}.
                Click below to apply now.
              </p>
            </div>

            {/* Apply Now Button */}
            <div className="shrink-0">
              <Button
                className="rounded-full px-8 py-6 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group/btn"
                onClick={handleApplyClick}
              >
                Apply Now
              </Button>
            </div>
          </div>

          {/* Bottom Accreditation Banner */}
          <div className="bg-muted/30 dark:bg-muted/10 px-8 py-3 border-t border-border/40">
            <p className="text-[10px] text-center md:text-left text-muted-foreground font-bold uppercase tracking-[0.2em]">
              Academic Excellence Since Founding
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <FormSubmissionModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={modalTitle}
      />

      {/* Card Shadow Layer */}
      <div className="absolute inset-0 -m-6 border border-transparent group-hover:border-border group-hover:bg-muted/5 rounded-[2.5rem] transition-all duration-500 -z-10" />
    </motion.div>
  );
};

export default CourseProvider;