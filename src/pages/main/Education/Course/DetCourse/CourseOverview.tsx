import { motion } from "framer-motion";
import type { CourseDetailJson } from "@/types/education/type.course";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Wallet, ArrowUpRight } from "lucide-react";

interface CourseOverviewProps {
  detail: CourseDetailJson;
}

const CourseOverview = ({ detail }: CourseOverviewProps) => {
  // Animation configuration for the grid items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const stats = [
    {
      label: "Next Intake",
      value: detail.next_intake.raw,
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
      gradient: "from-blue-500/10 to-transparent",
    },
    {
      label: "Entry Score",
      value: `${detail.entry_score.test} ${detail.entry_score.score}`,
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      gradient: "from-yellow-500/10 to-transparent",
    },
    {
      label: "Tuition Fee",
      value: detail.tuition.raw,
      icon: <Wallet className="w-5 h-5 text-emerald-500" />,
      gradient: "from-emerald-500/10 to-transparent",
    },
  ];

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-2 px-1">
        <h2 className="text-2xl font-bold tracking-tight">Course Overview</h2>
        <div className="h-px flex-1 bg-border ml-4" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={item}>
            <Card className="relative overflow-hidden group hover:border-primary/50 transition-colors duration-300">
              {/* Subtle background gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`} />
              
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-background border shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CourseOverview;