"use client";
import { motion } from "framer-motion";
import type { RankingSection } from "@/types/education/type.uniDet";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Typewriter } from "@/components/Typewriter";

interface Props {
  ranking?: RankingSection;
}

const DetInstitutionRanking = ({ ranking }: Props) => {
  if (!ranking) return null;

  return (
    <section className="py-10 space-y-8">
      {/* Reusable Typewriter for the Heading */}
      <Typewriter 
        text={ranking.heading || "Global Rankings"} 
        className="text-3xl font-bold tracking-tight sm:text-4xl"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ranking.rankingCard?.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <Card className="h-full border-none bg-secondary/40 backdrop-blur-sm hover:bg-secondary/60 transition-all">
              <CardHeader className="text-center flex flex-col items-center justify-center space-y-2 p-8">
                {/* The Rank Number/Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: (index * 0.1) + 0.3 }}
                >
                  <CardTitle className="text-4xl font-extrabold text-primary tracking-tighter">
                    #{item.title.replace('#', '')} 
                  </CardTitle>
                </motion.div>
                
                {/* The Description */}
                <CardDescription className="text-base font-medium text-muted-foreground line-clamp-2">
                  {item.subTitle}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DetInstitutionRanking;