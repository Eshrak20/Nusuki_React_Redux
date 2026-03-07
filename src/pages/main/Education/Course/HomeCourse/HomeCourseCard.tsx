import type { Course } from "@/types/education/type.course";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

interface HomeCourseCardProps {
    courses: Course[];
}

const HomeCourseCard = ({ courses }: HomeCourseCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="my-6 lg:my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
        >
            {courses.map((course, index) => (
                <motion.div
                    key={course.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    layout
                    className="bg-card dark:bg-card-dark rounded-2xl border border-muted dark:border-muted-dark flex flex-col relative shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                    {/* Full-Width Logo/Image Container */}
                    {/* Note: bg-white is kept here so transparent logos don't vanish in dark mode */}
                    <div className="w-full h-48 bg-white border-b border-muted dark:border-muted-dark">
                        <img
                            src={course.logo}
                            alt={`${course.university} logo`}
                            className="w-full h-full object-fit"
                        />
                    </div>

                    {/* Content Wrapper */}
                    <div className="p-5 flex flex-col grow">
                        {/* Titles */}
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-foreground dark:text-foreground-dark leading-tight mb-1 line-clamp-2 min-h-12">
                                {course.name}
                            </h3>
                            <p className="text-xs text-muted-foreground dark:text-gray-400 uppercase tracking-wide">
                                {course.university}
                            </p>
                        </div>

                        <hr className="border-muted dark:border-muted-dark mb-4" />

                        {/* Details List */}
                        <div className="flex flex-col gap-2.5 text-sm text-foreground/80 dark:text-foreground-dark/80 mb-6 grow">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-muted-foreground dark:text-gray-400 min-w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                                <span>{course.study_level}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground dark:text-gray-400 min-w-4"><FaLocationDot /></span>
                                <span>{course.city}, {course.country}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 mt-auto">
                            {/* Only show "See if I qualify" on the first card */}
                            {index === 0 && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-primary text-primary-foreground font-semibold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                                >
                                    See if I qualify
                                </motion.button>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-transparent border border-primary/40 text-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                            >
                                View details
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default HomeCourseCard;