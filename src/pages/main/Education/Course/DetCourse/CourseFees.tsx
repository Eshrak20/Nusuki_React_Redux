import { motion } from "framer-motion";
import type { Tuition } from "@/types/education/type.course";
import { Banknote, CalendarDays, Coins, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseFeesProps {
  tuition: Tuition;
}

const CourseFees = ({ tuition }: CourseFeesProps) => {
  if (!tuition.amount) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-14"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Banknote className="w-6 h-6" />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Tuition & Fees
          </h2>

          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mt-1">
            <Coins className="w-3 h-3" />
            Investment in your future
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border bg-card",
          "border-border shadow-sm transition-all duration-300",
          "hover:shadow-md hover:border-primary/30"
        )}
      >
        {/* Decorative Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />

        <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center">

          {/* Price Section */}
          <div className="space-y-2 text-center md:text-left">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Estimated Tuition
            </p>

            <div className="flex items-end justify-center md:justify-start gap-2">
              <span className="text-5xl md:text-6xl font-black text-primary tracking-tight">
                {tuition.amount}
              </span>

              <span className="text-lg font-semibold text-muted-foreground">
                {tuition.currency}
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Academic Year */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Academic Year
                </p>

                <p className="text-sm font-semibold text-foreground">
                  {tuition.year || "2024 / 2025"}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="w-4 h-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Status
                </p>

                <p className="text-sm font-semibold text-foreground">
                  Official Rate
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-muted/30 px-8 py-3 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            * Fees may change according to university policy. Living expenses
            are not included.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseFees;