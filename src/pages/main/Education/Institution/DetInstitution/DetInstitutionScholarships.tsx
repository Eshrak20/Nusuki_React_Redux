import type { DetInstitutionScholarshipsProps } from "@/types/education/type.uniDet";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, DollarSign, BookOpen } from "lucide-react";
import { useState } from "react";
import FormSubmissionModal from "@/components/FormSubmissionModal";

const DetInstitutionScholarships = ({ scholarships }: DetInstitutionScholarshipsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!scholarships || !scholarships.scholarshipsCard || scholarships.scholarshipsCard.length === 0) {
    return null;
  }

  // Helper function to get icon based on detail type
  const getDetailIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'type':
        return <Award className="w-4 h-4 text-primary" />;
      case 'level':
        return <BookOpen className="w-4 h-4 text-primary" />;
      case 'amount':
        return <DollarSign className="w-4 h-4 text-primary" />;
      default:
        return null;
    }
  };

  // Helper function to parse scholarship details
  const parseDetail = (detail: string) => {
    const [label, value] = detail.split(':');
    return {
      label: label.trim(),
      value: value?.trim() || ''
    };
  };

  return (
    <section className="py-16 bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-primary dark:bg-primary/10">
            {scholarships.iconImage ? (
              <img
                src={scholarships.iconImage.imageUrl}
                alt={scholarships.iconImage.imageAltTag || "Scholarships"}
                className="w-8 h-8"
              />
            ) : (
              <GraduationCap className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">{scholarships.heading}</h2>
            <Badge variant="secondary" className="mt-2">
              {scholarships.scholarshipsCard.length} Scholarship{scholarships.scholarshipsCard.length > 1 ? 's' : ''} Available
            </Badge>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-3xl">
          <div
            className="text-muted-foreground prose prose-headings:text-foreground prose-p:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: scholarships.description }}
          />
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.scholarshipsCard.map((scholarship) => (
            <Card key={scholarship.id} className="group py-5 hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {scholarship.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {scholarship.detail.map((detail, index) => {
                  const { label, value } = parseDetail(detail);
                  const Icon = getDetailIcon(label);

                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1">
                        {Icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{label}</p>
                        <p className="text-base font-semibold text-foreground">{value}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setIsOpen(true)}
                >
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Need Help?</h4>
              <p className="text-sm text-muted-foreground">
                Contact the International Student & Scholar Services (ISSS) for more information about scholarship opportunities and application procedures.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FormSubmissionModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Apply with NUSUKI"
        type="education"
      />
    </section>
  );
};

export default DetInstitutionScholarships;