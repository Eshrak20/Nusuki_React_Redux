import { Users, Globe, MessageCircle } from "lucide-react";

interface Section {
    heading?: string;
    level?: number;
    text?: string;
}

interface CourseCommunityProps {
    sections: Section[];
}

const CourseCommunity = ({ sections }: CourseCommunityProps) => {
    if (!sections || sections.length === 0) return null;

    return (
        <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Study Abroad Community</h2>
            </div>
            
            <div className="space-y-4">
                {sections.map((section, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                        {section.heading && section.heading !== "Your study abroad community" && (
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-blue-500" />
                                {section.heading}
                            </h3>
                        )}
                        {section.text && (
                            <p className="text-gray-600">{section.text}</p>
                        )}
                        
                        {/* Add community action button */}
                        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Explore Community
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCommunity;