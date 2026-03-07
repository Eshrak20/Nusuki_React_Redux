import type { Section } from "@/types/education/type.course";

interface CourseApplicationInfoProps {
    sections: Section[];
}

const CourseApplicationInfo = ({ sections }: CourseApplicationInfoProps) => {
    if (!sections || sections.length === 0) return null;

    return (
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Information</h2>
            <div className="space-y-4">
                {sections.map((section, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                        {section.heading && (
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {section.heading}
                            </h3>
                        )}
                        {section.text && (
                            <p className="text-gray-600 whitespace-pre-line">
                                {section.text}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseApplicationInfo;