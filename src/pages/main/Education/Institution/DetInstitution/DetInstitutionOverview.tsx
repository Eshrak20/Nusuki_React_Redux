import { motion } from "framer-motion";
import type { UniversityData } from "@/types/education/type.uniDet";
import { Card, CardContent } from "@/components/ui/card";
import { Typewriter } from "@/components/Typewriter";

interface Props {
  university?: UniversityData;
}

const DetInstitutionOverview = ({ university }: Props) => {
  const overview = university?.detail_json?.overviewSection;

  if (!overview) return null;

  // Process the description to remove inline color styles
  const processDescription = (html: string) => {
    // Remove inline color styles but keep other formatting
    return html.replace(/color:hsl\([^;]+\);?/gi, '');
  };

  return (
    <section className="space-y-10 pt-8">
      <div className="space-y-4">
        {/* Shadcn-style Heading */}
        <Typewriter
          text={overview.heading || "Overview"}
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          textClassName="text-foreground dark:text-foreground"
        />

        {/* Description with a smooth fade-in and slide */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none text-muted-foreground dark:text-muted-foreground leading-relaxed [&_span]:!text-muted-foreground [&_span]:dark:!text-muted-foreground [&_p]:text-muted-foreground [&_p]:dark:text-muted-foreground"
          dangerouslySetInnerHTML={{ 
            __html: processDescription(overview.description || "") 
          }}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overview.overviewCard?.map((card, index) => (
          <motion.div
            key={card.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              type: "spring",
              bounce: 0.4
            }}
          >
            <Card className="overflow-hidden border-muted bg-card hover:bg-accent/50 transition-colors cursor-default">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-1 h-32">
                <motion.span
                  className="text-2xl font-bold text-primary"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: (index * 0.15) + 0.2 }}
                >
                  {card.title}
                </motion.span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {card.subTitle}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DetInstitutionOverview;