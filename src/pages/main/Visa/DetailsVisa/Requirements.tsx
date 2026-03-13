import { CheckCircle2, FileText } from 'lucide-react';
import type { VisaDetails } from "@/types/visa/types.visa";

interface RequirementProps {
    details: VisaDetails;
}

const Requirements = ({ details }: RequirementProps) => {
    const requirements = details.requirements;

    return (
        <div className="mx-auto max-w-7xl p-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

                {/* Header Section */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-indigo-200">
                        <FileText className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Visa Requirements</h2>
                </div>

                {/* Sub-heading */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Basic Requirements</h3>
                </div>

                {/* Requirements List */}
                <div className="space-y-3">
                    {requirements.map((req) => (
                        <div
                            key={req.id}
                            className="flex items-center gap-3 rounded-lg bg-slate-50/80 px-4 py-3.5 transition-colors hover:bg-slate-100"
                        >
                            <div className="shrink-0">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            </div>
                            <span className="text-base font-medium text-slate-600">
                                {req.requirement_name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Empty State fallback */}
                {requirements.length === 0 && (
                    <p className="text-slate-400 italic">No specific requirements listed.</p>
                )}
            </div>
        </div>
    );
};

export default Requirements;