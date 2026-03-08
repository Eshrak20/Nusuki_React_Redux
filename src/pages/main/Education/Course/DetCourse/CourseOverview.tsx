import { motion, type Variants } from "framer-motion";
import type { CourseDetailJson } from "@/types/education/type.course";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Wallet, ArrowUpRight, BookOpen } from "lucide-react";

interface CourseOverviewProps {
  detail: CourseDetailJson;
}

const CourseOverview = ({ detail }: CourseOverviewProps) => {
  // Animation configuration for the grid items
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
  };

  const stats = [
    {
      label: "Next Intake",
      value: detail.next_intake.raw || "Contact for dates",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: "Entry Score",
      // Cleaned up the string concatenation logic
      value: [detail.entry_score.test, detail.entry_score.score].filter(Boolean).join(" ") || "N/A",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      label: "Tuition Fee",
      value: detail.tuition.amount ? `${detail.tuition.currency} ${detail.tuition.amount}` : "Check fees",
      icon: <Wallet className="w-5 h-5" />,
    },
  ];

  return (
    <div className="mt-8 space-y-6 pl-2">
      {/* Animated Header */}
      <div className="flex items-center gap-3 px-1">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground/90">Course Overview</h2>
        <div className="h-px flex-1 bg-border ml-2 opacity-50" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={item}>
            <Card className="relative overflow-hidden group border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-md dark:hover:shadow-primary/5">

              {/* Subtle background glow using Shadcn primary */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-5">
                  <div className="p-2.5 rounded-xl bg-background border border-border text-primary shadow-xs group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {stat.icon}
                  </div>
                  <motion.div
                    whileHover={{ x: 2, y: -2 }}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </motion.div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
                    {stat.label}
                  </p>
                  <p className="text-lg font-bold text-foreground leading-tight tracking-tight truncate">
                    {stat.value}
                  </p>
                </div>

                {/* Bottom decorative line that animates on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-in-out" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CourseOverview;