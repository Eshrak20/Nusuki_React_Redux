import { motion } from "framer-motion";
import type { CourseData } from "@/types/education/type.course";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap } from "lucide-react";

interface CourseHeaderProps {
  course: CourseData;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
  // Animation variants for the typewriter-style reveal
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-background via-background to-primary/5 shadow-xl dark:shadow-primary/5">
      <CardContent className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Left Side: Animated Logo Container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center justify-center bg-card border w-32 h-32 md:w-44 md:h-44 rounded-2xl p-4 shadow-2xl">
              <img
                src={course.logo}
                alt={course.university}
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
          </motion.div>

          {/* Right Side: Text with Typewriter-style Entry */}
          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center md:text-left space-y-4"
          >
            <div className="space-y-1">
              <motion.h1 
                variants={itemVars}
                className="text-3xl md:text-5xl font-black tracking-tight text-foreground"
              >
                {course.name.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p 
                variants={itemVars}
                className="text-lg md:text-xl font-medium text-primary/80 italic"
              >
                {course.university}
              </motion.p>
            </div>

            <motion.div variants={itemVars} className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <Badge variant="secondary" className="px-3 py-1 flex gap-2 items-center text-sm font-semibold">
                <MapPin className="w-4 h-4 text-primary" />
                {course.city}, {course.country}
              </Badge>
              
              <Badge variant="outline" className="px-3 py-1 flex gap-2 items-center text-sm font-semibold border-primary/30">
                <GraduationCap className="w-4 h-4 text-primary" />
                {course.study_level}
              </Badge>
            </motion.div>

            {/* Subtle Divider Decoration */}
            <motion.div 
              variants={itemVars}
              className="h-1 w-20 bg-primary rounded-full hidden md:block"
            />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseHeader;