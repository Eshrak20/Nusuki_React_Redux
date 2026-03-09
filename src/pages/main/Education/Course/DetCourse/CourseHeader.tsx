import { useState } from "react";
import { motion } from "framer-motion";
import type { CourseData } from "@/types/education/type.course";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { MapPin, GraduationCap, MousePointerClick } from "lucide-react";
import EduFormSubmission from "@/components/education/EduFormSubmission";

interface CourseHeaderProps {
  course: CourseData;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <Card
      className="relative overflow-hidden border-none lg:shadow-2xl dark:shadow-primary/10 rounded-none -mx-8 lg:mx-0 lg:rounded-[2.5rem]"
      style={{
        backgroundImage: `url(${course.logo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* THE GLASSY OVERLAY: Re-implemented with backdrop-blur and linear gradients */}
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-[2px] bg-linear-to-br from-background/90 via-background/80 to-primary/20" />
      <CardContent className="relative z-10 p-8 md:p-14">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

          {/* Logo Container with Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -8, rotate: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-primary/30 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

            <div className="relative flex items-center justify-center bg-white border border-white/20 w-40 h-40 md:w-52 md:h-52 rounded-4xl shadow-2xl overflow-hidden">
              <img
                src={course.logo}
                alt={course.university}
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
          </motion.div>

          {/* Text Content Area */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left space-y-6"
          >
            <div className="space-y-3">
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight"
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
                className="text-xl md:text-2xl font-bold text-primary/90"
              >
                {course.university}
              </motion.p>
            </div>

            {/* Badges with Glassy Backgrounds */}
            <motion.div variants={itemVars} className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
              <Badge
                variant="secondary"
                className="px-5 py-2 flex gap-2 items-center text-sm font-bold bg-white/40 dark:bg-accent/40 backdrop-blur-xl border border-white/20 shadow-sm"
              >
                <MapPin className="w-4 h-4 text-primary" />
                {course.city}, {course.country}
              </Badge>

              <Badge
                variant="outline"
                className="px-5 py-2 flex gap-2 items-center text-sm font-bold border-primary/30 bg-primary/10 backdrop-blur-xl shadow-sm"
              >
                <GraduationCap className="w-4 h-4 text-primary" />
                {course.study_level}
              </Badge>
            </motion.div>

            {/* THE UNDERLINE: Now animated with scaleX for a premium feel */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
              className="h-1.5 w-full bg-linear-to-r from-primary to-transparent rounded-full hidden lg:block"
            />
          </motion.div>

          {/* HEADER ACTION: Apply Button + Glassy Modal */}
          <div className="shrink-0 pt-4 lg:pt-0">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group relative inline-flex items-center gap-5 px-7 lg:px-14 py-7 bg-primary text-primary-foreground rounded-full overflow-hidden shadow-2xl hover:shadow-primary/30 hover:shadow-2xl"
                >
                  {/* Multiple gradient layers for depth */}
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Glowing ring effect */}
                  <span className="absolute -inset-0.5 bg-linear-to-r from-primary via-primary/80 to-primary/60 rounded-full opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-700 -z-10" />

                  <span className="relative z-10 flex items-center gap-4">
                    <span className="flex flex-col items-start">
                      <span className="text-xs hidden lg:block font-light tracking-[0.5em] text-primary-foreground/70 mb-1 group-hover:text-primary-foreground/90 transition-colors duration-500">
                        LIMITED SPOTS
                      </span>
                      <span className="font-black tracking-[0.3em] text-lg lg:text-xl flex items-center gap-3">
                        APPLY NOW
                        <span className="w-8 h-0.5 hidden lg:block bg-primary-foreground/50 group-hover:w-12 group-hover:bg-primary-foreground transition-all duration-500" />
                      </span>
                    </span>

                    {/* Animated mouse click icon */}
                    <span className="relative hidden lg:block">
                      <span className="absolute inset-0 rounded-full bg-primary-foreground/30 animate-ping opacity-0 group-hover:opacity-100"
                        style={{ animationDuration: '1.5s' }} />
                      <MousePointerClick
                        size={24}
                        className="relative transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </span>

                  {/* Bottom shine line */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-transparent via-primary-foreground to-transparent group-hover:w-full transition-all duration-700 delay-300" />

                  {/* Corner accents */}
                  <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-primary-foreground/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-primary-foreground/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-120 p-0 overflow-hidden border-none rounded-[2rem] bg-background/95 backdrop-blur-2xl shadow-2xl">
                <DialogHeader className="hidden">
                  <DialogTitle>Application Form</DialogTitle>
                </DialogHeader>
                <div className="max-h-[85vh] overflow-y-auto">
                  <EduFormSubmission title={`Apply for ${course.name}`} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>

      {/* Decorative Blur Circle for extra depth */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
    </Card>
  );
};

export default CourseHeader;