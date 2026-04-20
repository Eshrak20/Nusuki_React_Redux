import { useState } from "react";
import { CheckCircle2, FileText } from "lucide-react";
import type { VisaDetails } from "@/types/visa/types.visa";

interface RequirementProps {
  details: VisaDetails;
}

const requirementTabs = [
  "Basic Requirements",
  "For Students",
  "For Job Holder",
  "For Service Holder",
  "For HouseWife",
];

const Requirements = ({ details }: RequirementProps) => {
  const requirements = details.requirements || [];
  
  const [activeTab, setActiveTab] = useState("Basic Requirements");

  return (
    <div className="mx-auto max-w-7xl pt-1 lg:pt-2 lg:-mt-5 lg:p-4">
      <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 lg:h-12 lg:w-12">
            <FileText className="h-5 w-5 lg:h-6 lg:w-6" />
          </div>
          <h2 className="text-2xl font-bold">Documents</h2>
        </div>

        {/* Toggle Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          {requirementTabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Active Section Title */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{activeTab}</h3>
        </div>

        {/* Requirements List */}
        {requirements.length > 0 ? (
          <div className="space-y-3">
            {requirements.map((req) => (
              <div
                key={req.id}
                className="flex items-center gap-3 rounded-lg px-4 py-3.5 transition-colors hover:bg-muted lg:bg-muted/50"
              >
                <div className="shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <span className="text-base font-medium">
                  {req.requirement_name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-muted-foreground">
            No specific requirements listed.
          </p>
        )}
      </div>
    </div>
  );
};

export default Requirements;