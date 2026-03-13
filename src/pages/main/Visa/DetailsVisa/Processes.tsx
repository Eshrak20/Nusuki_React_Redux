import { ListChecks } from 'lucide-react';
import type { VisaDetails } from "@/types/visa/types.visa";

interface ProcessesProps {
    details: VisaDetails;
}

const Processes = ({ details }: ProcessesProps) => {
    // Fallback to empty array if processes is undefined
    const processes = details?.processes || [];

    return (
        <div className="mx-auto max-w-7xl p-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

                {/* Header Section */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                        <ListChecks className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Application Process</h2>
                </div>

                {/* Process Steps List */}
                <div className="space-y-6">
                    {processes.map((step, index) => {

                        return (
                            <div key={step.id} className="flex items-start gap-4">
                                {/* Number Circle */}
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-sm bg-primary`}>
                                    {index + 1}
                                </div>

                                {/* Text Content */}
                                <div className="pt-1.5">
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {step.step_title}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-slate-500">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Fallback if no processes exist */}
                {processes.length === 0 && (
                    <p className="text-slate-400 italic">No application steps listed.</p>
                )}

            </div>
        </div>
    );
};

export default Processes;