"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, GraduationCap, Award, Sparkles, 
  Users, Library, Trophy
} from "lucide-react";
import type { TopCourseCategory } from "@/types/education/type.uniDet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typewriter } from "@/components/Typewriter";

interface Props {
  programs?: TopCourseCategory[];
}

const DetInstitutionPrograms = ({ programs }: Props) => {
  if (!programs) return null;
  console.log("programs",programs)

  // Logic for filtering remains the same
  const mastersPrograms = programs.filter(p => 
    /master|postgraduate/i.test(p.name || "")
  );
  const bachelorPrograms = programs.filter(p => 
    /bachelor|undergraduate/i.test(p.name || "")
  );
  const otherPrograms = programs.filter(p => 
    !mastersPrograms.includes(p) && !bachelorPrograms.includes(p)
  );

  const mastersCount = mastersPrograms.reduce((acc, cat) => acc + (cat.cardDetail?.length || 0), 0);
  const bachelorCount = bachelorPrograms.reduce((acc, cat) => acc + (cat.cardDetail?.length || 0), 0);
  const otherCount = otherPrograms.reduce((acc, cat) => acc + (cat.cardDetail?.length || 0), 0);

  const renderProgramTable = (programs: TopCourseCategory[], title: string) => {
    const allCourses = programs.flatMap(category => 
      category.cardDetail?.map(course => ({ ...course, categoryName: category.name })) || []
    );

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8"
      >
        <Card className="overflow-hidden border-primary/20  bg-card/50 backdrop-blur-sm">
          {/* Enhanced Table Header/Hero */}
          <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b border-primary/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl text-center font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Explore our world-class curriculum and specialized career paths.
                </p>
              </div>
              <Badge className="px-4 py-1.5 text-md font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                {allCourses.length} Specializations
              </Badge>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="h-16 border-b border-primary/10">
                  <TableHead className="w-16 text-center font-bold text-primary">#</TableHead>
                  <TableHead className="font-bold text-lg min-w-75">Program & Faculty</TableHead>
                  <TableHead className="font-bold text-lg min-w-50">Specialization</TableHead>
                  <TableHead className="font-bold text-lg min-w-45">Duration</TableHead>
                  <TableHead className="font-bold text-lg text-right pr-8">Degree</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCourses.map((course, index) => (
                  <TableRow 
                    key={course.id || index}
                    className="group hover:bg-primary/5 transition-all duration-300 h-24 border-b border-border/40"
                  >
                    <TableCell className="text-center font-mono text-lg text-muted-foreground/60">
                      {(index + 1).toString().padStart(2, '0')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex w-12 h-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-lg group-hover:text-primary transition-colors leading-tight">
                            {course.courseName}
                          </p>
                          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                            {course.categoryName}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground/90">{course.title1}</span>
                        <span className="text-sm text-muted-foreground">{course.subTitle1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 w-fit">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold">{course.title2}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                       <div className="flex flex-col items-end">
                          <Badge variant="outline" className="border-primary/50 text-primary font-bold">
                            {course.categoryName?.includes('Master') ? "Postgraduate" : "Undergraduate"}
                          </Badge>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <section className="space-y-12">
      {/* Visual Header */}
      <div className="text-center space-y-4">
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
          <Globe className="w-4 h-4" />
          GLOBAL EDUCATION STANDARDS
        </div> */}
        <Typewriter 
          text="Academic Excellence" 
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        />
        {/* <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Choose from our diverse range of accredited programs designed to shape the leaders of tomorrow.
        </p> */}
      </div>

      {/* Stats Section with more "Pop" */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Master's", count: mastersCount, icon: GraduationCap, color: "blue" },
          { label: "Bachelor's", count: bachelorCount, icon: Library, color: "emerald" },
          { label: "Other", count: otherCount, icon: Trophy, color: "amber" },
          { label: "Total Courses", count: mastersCount + bachelorCount + otherCount, icon: Users, color: "primary" }
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="w-12 h-12" />
            </div>
            <CardContent className="p-6">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-4xl font-black mt-2 text-primary">{stat.count}</h4>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Highly Visible Tabs */}
      <Tabs defaultValue="masters" className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList className="h-16 p-2 bg-muted/80 backdrop-blur-md border border-border rounded-2xl shadow-inner gap-2">
            <TabsTrigger 
              value="masters" 
              className="rounded-xl px-8 h-12 text-md font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
            >
              Master's Degrees
            </TabsTrigger>
            <TabsTrigger 
              value="bachelors" 
              className="rounded-xl px-8 h-12 text-md font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
            >
              Bachelor's Degrees
            </TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <TabsContent value="masters" className="focus-visible:outline-none">
            {mastersPrograms.length > 0 ? renderProgramTable(mastersPrograms, "Master's Programs") : (
               <EmptyState icon={GraduationCap} message="No Master's programs available" />
            )}
          </TabsContent>
          <TabsContent value="bachelors" className="focus-visible:outline-none">
            {bachelorPrograms.length > 0 ? renderProgramTable(bachelorPrograms, "Bachelor's Programs") : (
               <EmptyState icon={Library} message="No Bachelor's programs available" />
            )}
          </TabsContent>
          <TabsContent value="other" className="focus-visible:outline-none">
            {otherPrograms.length > 0 ? renderProgramTable(otherPrograms, "Other Academic Programs") : (
               <EmptyState icon={Award} message="No other programs available" />
            )}
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </section>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EmptyState = ({ icon: Icon, message }: { icon: any, message: string }) => (
  <Card className="p-20 text-center border-dashed border-2 bg-muted/10">
    <Icon className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
    <p className="text-xl font-medium text-muted-foreground">{message}</p>
  </Card>
);

export default DetInstitutionPrograms;