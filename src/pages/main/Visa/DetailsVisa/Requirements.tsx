import { CheckCircle2, FileText } from 'lucide-react';
import type { VisaDetails } from "@/types/visa/types.visa";

interface RequirementProps {
    details: VisaDetails;
}

const Requirements = ({ details }: RequirementProps) => {
    const requirements = details.requirements;

    return (
        <div className="mx-auto max-w-7xl pt-1 lg:pt-2 lg:-mt-5 lg:p-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8 text-card-foreground">

                {/* Header Section */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                        <FileText className="h-5 w-5 lg:h-6 lg:w-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Visa Requirements</h2>
                </div>

                {/* Sub-heading */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Basic Requirements</h3>
                </div>

                {/* Requirements List */}
                <div className="space-y-3">
                    {requirements.map((req) => (
                        <div
                            key={req.id}
                            className="flex items-center gap-3 rounded-lg lg:bg-muted/50 px-4 py-3.5 transition-colors hover:bg-muted"
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

                {/* Empty State fallback */}
                {requirements.length === 0 && (
                    <p className="italic text-muted-foreground">No specific requirements listed.</p>
                )}
            </div>
        </div>
    );
};

export default Requirements;