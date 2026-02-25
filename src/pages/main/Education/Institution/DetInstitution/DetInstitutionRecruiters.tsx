"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { 
  Briefcase, 
  TrendingUp, 
  Building2, 
  Info, 
  DollarSign, 
  ArrowUpRight 
} from "lucide-react";
import type { PlacementSection } from "@/types/education/type.uniDet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  placement?: PlacementSection;
}

const processHTMLContent = (html: string) => {
  if (!html) return "";
  // Forcefully strip hardcoded colors and justification
  return html
    .replace(/color:hsl\([^;]+\);?/gi, '')
    .replace(/text-align:justify;?/gi, '');
};

const DetInstitutionRecruiters = ({ placement }: Props) => {
  if (!placement) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <section className="overflow-hidden">
      {/* --- Header Section --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md" />
            <div className="relative w-16 h-16 flex items-center justify-center bg-linear-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl border border-primary/30 shadow-lg">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {placement.heading || "Placements"}
            </h2>
            <p className="text-primary font-medium mt-1">{placement.subHeading}</p>
          </div>
        </div>

        {placement.description && (
          <div className="relative max-w-4xl">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary via-primary/50 to-transparent rounded-full" />
            <div
              className="prose prose-lg dark:prose-invert max-w-none pl-6 [&_span]:!text-muted-foreground [&_p]:!text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: processHTMLContent(placement.description) }}
            />
          </div>
        )}
      </motion.div>

      {/* --- Top Recruiters Grid --- */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Global Recruiting Partners</h3>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {placement.placementCard?.map((recruiter) => (
            <motion.div key={recruiter.id} variants={itemVariants}>
              <Card className="group h-28 flex items-center justify-center p-6 bg-white dark:bg-white transition-all hover:shadow-xl hover:border-primary/50 border-border/50">
                {recruiter.image ? (
                  <img
                    src={recruiter.image}
                    alt="Partner"
                    className="max-h-full max-w-full object-contain filter  transition-all duration-300"
                  />
                ) : (
                  <span className="text-muted-foreground font-medium text-sm text-center">{recruiter.title}</span>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- Salary Statistics Grid --- */}
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">{placement.jobHeading}</h3>
          </div>
          <Badge variant="outline" className="hidden sm:flex bg-primary/5 text-primary border-primary/20">
            Average Per Year
          </Badge>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {placement.averageSalary?.map((sal) => (
            <motion.div key={sal.id} variants={itemVariants} whileHover={{ y: -5 }}>
              <Card className="relative overflow-hidden border-border/50 bg-linear-to-br from-card to-card/50">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ArrowUpRight className="w-12 h-12" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-tighter">Est. Package</Badge>
                  </div>
                  
                  <h4 className="font-bold text-lg mb-1 line-clamp-1">{sal.expenceType}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary">{placement.currency}</span>
                    <span className="text-3xl font-black tracking-tight">{sal.totalSalary}</span>
                  </div>
                  
                  <Separator className="my-4 opacity-50" />
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Market standard for UMass Alumni
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- Footer Note --- */}
      {placement.note && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-6 rounded-2xl bg-muted/30 border border-border/50 relative"
        >
          <div className="flex gap-4 items-start">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div 
              className="text-sm text-muted-foreground italic [&_p]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: processHTMLContent(placement.note) }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default DetInstitutionRecruiters;