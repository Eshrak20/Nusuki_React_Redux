import type { Section } from "@/types/education/type.course";
import { CheckCircle, Target, FileText, ChevronRight } from "lucide-react";

interface CourseActionPlanProps {
    sections: Section[];
}

const CourseActionPlan = ({ sections }: CourseActionPlanProps) => {
    if (!sections || sections.length === 0) return null;

    // Map section headings to action steps
    const getStepIcon = (heading: string) => {
        if (heading.toLowerCase().includes('shortlist')) return <Target className="w-5 h-5" />;
        if (heading.toLowerCase().includes('eligibility')) return <CheckCircle className="w-5 h-5" />;
        if (heading.toLowerCase().includes('apply')) return <FileText className="w-5 h-5" />;
        return <ChevronRight className="w-5 h-5" />;
    };

    const getStepColor = (index: number) => {
        const colors = [
            'bg-blue-100 text-blue-600 border-blue-200',
            'bg-green-100 text-green-600 border-green-200',
            'bg-purple-100 text-purple-600 border-purple-200',
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Action Plan</h2>
            
            <div className="space-y-4">
                {sections.map((section, index) => (
                    <div 
                        key={index} 
                        className={`border rounded-lg p-4 ${getStepColor(index)}`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                {getStepIcon(section.heading || '')}
                            </div>
                            <div className="flex-1">
                                {section.heading && (
                                    <h3 className="font-semibold text-gray-800 mb-1">
                                        Step {index + 1}: {section.heading}
                                    </h3>
                                )}
                                {section.text && (
                                    <p className="text-gray-600 text-sm mb-3">
                                        {section.text}
                                    </p>
                                )}
                                <button className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1">
                                    Get Started <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseActionPlan;