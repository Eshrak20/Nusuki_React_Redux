import { motion } from "framer-motion";
import { ClipboardCheck, CheckCircle2 } from "lucide-react";
import type { AdmissionRequirementDetail } from "@/types/education/type.uniDet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typewriter } from "@/components/Typewriter";

interface Props {
  admission?: AdmissionRequirementDetail;
}

/**
 * Remove all inline styles (especially color:black)
 * so dark mode works correctly
 */
const cleanHtml = (html: string) => {
  if (!html) return "";

  return html
    .replace(/style="[^"]*"/gi, "")        // remove all inline styles
    .replace(/color:\s*[^;"]+;?/gi, "")    // extra color safety
    .replace(/✅/g, "")                    // remove check emoji
    .trim();
};

const DetInstitutionAdmissionReq = ({ admission }: Props) => {
  if (!admission || !Array.isArray(admission) || admission.length === 0)
    return null;

  /**
   * Filter out categories that have no requirement cards
   */
  const filteredAdmission = admission.filter(
    (category) =>
      category.requirementCard &&
      Array.isArray(category.requirementCard) &&
      category.requirementCard.length > 0
  );

  if (filteredAdmission.length === 0) return null;

  return (
    <section className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <ClipboardCheck className="w-8 h-8 text-primary" />
          </div>

          <Typewriter
            text="Admission Requirements"
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground"
          />
        </div>

        <p className="text-muted-foreground ml-14 max-w-2xl">
          Everything you need to prepare for your application process,
          categorized by program level.
        </p>
      </div>

      {/* Tabs Section */}
      <Tabs
        defaultValue={filteredAdmission[0]?.name}
        className="w-full"
      >
        <div className="flex justify-center md:justify-start">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-10 p-1 bg-muted/30 border border-border/50 backdrop-blur-md">
            {filteredAdmission.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.name}
                className="rounded-md transition-all duration-300
                           data-[state=active]:bg-primary
                           data-[state=active]:text-primary-foreground
                           data-[state=active]:shadow-md"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {filteredAdmission.map((category) => (
          <TabsContent
            key={category.id}
            value={category.name}
            className="outline-none focus-visible:ring-0"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.requirementCard?.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Card className="pt-7 relative group h-full min-h-[300px] flex flex-col overflow-hidden border-muted bg-gradient-to-b from-card to-muted/20 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                    
                    {/* Hover Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>

                          <CardTitle className="text-base font-bold uppercase tracking-wider text-foreground/90">
                            {item.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="grow overflow-y-auto custom-scrollbar">
                      <div
                        className="text-sm leading-relaxed
                                   text-muted-foreground dark:text-white
                                   prose prose-sm max-w-none
                                   dark:prose-invert"
                        dangerouslySetInnerHTML={{
                          __html: cleanHtml(item.cardDetails || ""),
                        }}
                      />
                    </CardContent>

                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default DetInstitutionAdmissionReq;