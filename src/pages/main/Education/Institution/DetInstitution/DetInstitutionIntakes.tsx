import { motion } from "framer-motion";
import type { IntakeSection } from "@/types/education/type.uniDet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { Typewriter } from "@/components/Typewriter";

interface Props {
  intakes?: IntakeSection;
}

const DetInstitutionIntakes = ({ intakes }: Props) => {
  if (!intakes) return null;

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4 flex-1">
          {/* Reusable Typewriter for Heading */}
          <Typewriter 
            text={intakes.heading || "University Intakes"} 
            className="text-3xl font-bold tracking-tight text-foreground"
          />
          
          {/* Description with Dark Mode Support */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none 
                       [&_span]:text-muted-foreground! [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: intakes.description || "" }}
          />
        </div>

        {/* Animated Icon from API */}
        {intakes.iconImge?.imageUrl && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="hidden md:block bg-primary dark:bg-primary/5 p-4 rounded-full border border-primary/10"
          >
            <img 
              src={intakes.iconImge.imageUrl} 
              alt={intakes.iconImge.alt || "Intake Icon"} 
              className="w-24 h-20 object-contain animate-pulse-slow"
            />
          </motion.div>
        )}
      </div>

      {/* Intake Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {intakes.intakeDetail?.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-muted bg-card hover:bg-accent/50 transition-all duration-300 group p-4">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl font-bold tracking-tight">
                  {item.intake}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DetInstitutionIntakes;