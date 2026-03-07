import { motion } from "framer-motion";
import type { CourseData } from "@/types/education/type.course";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap } from "lucide-react";

interface CourseHeaderProps {
  course: CourseData;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
  // Animation variants
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

  // Replace this URL with your actual hosted image path or the generated one provided
  const bgImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj9F_jdn0XQg4hKvGzMQKYZHdcIIEa5Wn7VQ&s";

  return (
    <Card 
      className="relative overflow-hidden border-none shadow-xl dark:shadow-primary/10 rounded-3xl"
      style={{
        backgroundImage: `url(${course.logo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    {/* <Card 
      className="relative overflow-hidden border-none shadow-xl dark:shadow-primary/10 rounded-3xl"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    > */}
      {/* Glassmorphism Overlay: 
          This layer ensures text contrast while letting the background peak through.
      */}
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-[2px] bg-linear-to-br from-background/90 via-background/80 to-primary/20" />

      <CardContent className="relative z-10 p-6 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          
          {/* Left Side: Animated Logo Container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -8, rotate: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative group"
          >
            {/* Soft glow behind the logo */}
            <div className="absolute -inset-2 bg-primary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative flex items-center justify-center bg-white border border-white/20 w-36 h-36 md:w-48 md:h-48 rounded-3xl p-6 shadow-2xl overflow-hidden">
              <img
                src={course.logo}
                alt={course.university}
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
          </motion.div>

          {/* Right Side: Text with Typewriter-style Entry */}
          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center md:text-left space-y-5"
          >
            <div className="space-y-2">
              <motion.h1 
                className="text-3xl md:text-6xl font-black tracking-tight text-foreground leading-tight"
              >
                {course.name.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(5px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: index * 0.02, duration: 0.2 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p 
                variants={itemVars}
                className="text-xl md:text-2xl font-semibold text-primary/90"
              >
                {course.university}
              </motion.p>
            </div>

            <motion.div variants={itemVars} className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
              <Badge 
                variant="secondary" 
                className="px-4 py-1.5 flex gap-2 items-center text-sm font-bold bg-white/50 dark:bg-accent/50 backdrop-blur-md border-none shadow-sm"
              >
                <MapPin className="w-4 h-4 text-primary" />
                {course.city}, {course.country}
              </Badge>
              
              <Badge 
                variant="outline" 
                className="px-4 py-1.5 flex gap-2 items-center text-sm font-bold border-primary/40 bg-primary/5 backdrop-blur-md shadow-sm"
              >
                <GraduationCap className="w-4 h-4 text-primary" />
                {course.study_level}
              </Badge>
            </motion.div>

            {/* Decorative underline */}
            <motion.div 
              variants={itemVars}
              className="h-1.5 w-24 bg-linear-to-r from-primary to-transparent rounded-full hidden md:block"
            />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseHeader;