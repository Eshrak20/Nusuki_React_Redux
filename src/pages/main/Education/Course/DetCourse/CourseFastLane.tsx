import type { Section } from "@/types/education/type.course";
import { Zap, CheckCircle, Clock, Send, Award } from "lucide-react";

interface CourseFastLaneProps {
    sections: Section[];
}

const CourseFastLane = ({ sections }: CourseFastLaneProps) => {
    if (!sections || sections.length === 0) return null;

    return (
        <div className="border border-gray-200 rounded-lg p-6 bg-linear-to-r from-amber-50 to-orange-50">
            <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold text-gray-900">IDP FastLane</h2>
                <span className="bg-amber-200 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Offer in Principle
                </span>
            </div>

            {sections.map((section, index) => (
                <div key={index} className="space-y-4">
                    {section.heading && section.heading !== "How does IDP FastLane work?" && (
                        <h3 className="text-lg font-semibold text-gray-800">
                            {section.heading}
                        </h3>
                    )}
                    
                    {section.text && (
                        <p className="text-gray-600 mb-4">{section.text}</p>
                    )}

                    {/* Visual representation of FastLane steps */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-6">
                        <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                            <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="font-bold text-blue-600">1</span>
                            </div>
                            <p className="text-xs font-medium">Select Course</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                            <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="font-bold text-blue-600">2</span>
                            </div>
                            <p className="text-xs font-medium">Create Profile</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                            <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="font-bold text-blue-600">3</span>
                            </div>
                            <p className="text-xs font-medium">Submit</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                            <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="font-bold text-green-600">4</span>
                            </div>
                            <p className="text-xs font-medium">Get Decision</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                            <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="font-bold text-purple-600">5</span>
                            </div>
                            <p className="text-xs font-medium">Apply with Counselor</p>
                        </div>
                    </div>

                    {/* Benefits section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span className="text-sm">Decision in minutes</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">Instant in-principle offer</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="text-sm">Guaranteed pathway</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full md:w-auto bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 font-semibold mt-4">
                        <Send className="w-4 h-4" />
                        Check Your Eligibility Now
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CourseFastLane;