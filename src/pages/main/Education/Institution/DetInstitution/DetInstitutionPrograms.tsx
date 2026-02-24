"use client";
import { motion } from "framer-motion";
import { BookOpen, Clock, GraduationCap, Award, Calendar } from "lucide-react";
import type { TopCourseCategory } from "@/types/education/type.uniDet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Typewriter } from "@/components/Typewriter";

interface Props {
  programs?: TopCourseCategory[];
}

const DetInstitutionPrograms = ({ programs }: Props) => {
  if (!programs) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 space-y-20">
      {programs.map((category, catIndex) => (
        <div key={category.id || catIndex} className="space-y-10">
          {/* Enhanced Category Header */}
          <div className="relative">
            {/* Background accent */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border/40" />
            </div>
            
            <div className="relative flex items-center gap-4 bg-background pr-8">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <Typewriter 
                  text={category.name || "Available Programs"} 
                  className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
                />
              </div>
              <Badge variant="outline" className="hidden sm:flex gap-1 items-center text-sm px-3 py-1">
                <Award className="w-3.5 h-3.5" />
                {category.cardDetail?.length || 0} Programs
              </Badge>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {category.cardDetail?.map((course, index) => (
              <motion.div
                key={course.id || index}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="group pt-7 relative h-full hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm hover:bg-card overflow-hidden">
                  
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  <CardHeader className="pb-4 relative">
                    <div className="flex items-start justify-between">
                      <Badge 
                        variant="secondary" 
                        className="w-fit mb-3 font-medium bg-primary/10 text-primary hover:bg-primary/20 border-0"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Program Details
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {course.courseName}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-5 relative">
                    {/* Decorative element */}
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Course Detail Row 1 */}
                    <div className="flex items-start gap-4 group/item">
                      <div className="mt-0.5 p-2.5 rounded-xl bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                          {course.title1}
                        </p>
                        <p className="text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors mt-0.5">
                          {course.subTitle1}
                        </p>
                      </div>
                    </div>

                    {/* Course Detail Row 2 */}
                    <div className="flex items-start gap-4 group/item">
                      <div className="mt-0.5 p-2.5 rounded-xl bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                          {course.title2}
                        </p>
                        <p className="text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors mt-0.5">
                          {course.subTitle2}
                        </p>
                      </div>
                    </div>

                    {/* Subtle divider */}
                    <div className="pt-2">
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
};

export default DetInstitutionPrograms;