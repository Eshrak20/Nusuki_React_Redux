import type { Course } from "@/types/education/type.course";

interface HomeCourseCardProps {
    courses: Course[];
}

const HomeCourseCard = ({ courses }: HomeCourseCardProps) => {
    return (
        <div className="my-10 lg:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
            {courses.map((course, index) => (
                <div
                    key={course.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col relative shadow-sm hover:shadow-md transition-shadow"
                >
                    {/* Top Row: Fastlane Badge & Favorite Icon */}
                    <div className="flex justify-between items-start mb-4 h-6">
                        {/* Mocking the Fastlane badge condition for the first card */}
                        {/* {index === 0 && (
                            <span className="bg-[#1b6b50] text-white text-[10px] font-bold px-2 py-1 rounded">
                                Fastlane
                            </span>
                        )} */}
                        <button className="ml-auto text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="mb-4 h-12 flex items-center">
                        <img
                            src={course.logo}
                            alt={`${course.university} logo`}
                            className="max-h-full max-w-20 object-contain"
                        />
                    </div>

                    {/* Titles */}
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 line-clamp-2 min-h-12">
                            {course.name}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                            {course.university}
                        </p>
                    </div>

                    <hr className="border-gray-100 mb-4" />

                    {/* Details List */}
                    <div className="flex flex-col gap-2.5 text-sm text-gray-600 mb-6 grow">
                        {/* Optional World Ranking */}
                        {/* {index === 0 && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                <span>THE World Ranking: 39</span>
                            </div>
                        )} */}

                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                            <span>{course.study_level}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Simple placeholder for country flag */}
                            <span className="text-sm">📍</span>
                            <span>{course.city}, {course.country}</span>
                        </div>

                        {/* <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span>Next intake: 20.03.2026</span>
                        </div> */}

                        {/* <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Entry Score: IELTS 5.5</span>
                        </div> */}

                        {/* <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>USD12618 (2026)</span>
                            <svg className="w-3.5 h-3.5 text-gray-500 cursor-pointer ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                        </div> */}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 mt-auto">
                        {/* Only show "See if I qualify" on the first card to match the screenshot */}
                        {index === 0 && (
                            <button className="w-full bg-primary hover:opacity-90 text-white font-medium py-2 px-4 rounded-full transition-colors">
                                See if I qualify
                            </button>
                        )}
                        <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-full transition-colors">
                            View details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeCourseCard;