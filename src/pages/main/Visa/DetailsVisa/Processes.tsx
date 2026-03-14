import { ListChecks } from 'lucide-react';
import type { VisaDetails } from "@/types/visa/types.visa";

interface ProcessesProps {
    details: VisaDetails;
}

const Processes = ({ details }: ProcessesProps) => {
    // Fallback to empty array if processes is undefined
    const processes = details?.processes || [];

    return (
        <div className="mx-auto max-w-7xl pt-6 lg:pt-0 lg:p-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8 text-card-foreground">

                {/* Header Section */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                        <ListChecks className="h-5 w-5 lg:h-6 lg:w-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Application Process</h2>
                </div>

                {/* Process Steps List */}
                <div className="space-y-6">
                    {processes.map((step, index) => {

                        return (
                            <div key={step.id} className="flex items-start gap-4">
                                {/* Number Circle */}
                                <div className={`flex h-9 w-9 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-full text-base font-bold bg-primary text-primary-foreground shadow-sm`}>
                                    {index + 1}
                                </div>

                                {/* Text Content */}
                                <div className="pt-1.5">
                                    <h3 className="text-base font-semibold">
                                        {step.step_title}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Fallback if no processes exist */}
                {processes.length === 0 && (
                    <p className="italic text-muted-foreground">No application steps listed.</p>
                )}

            </div>
        </div>
    );
};

export default Processes;