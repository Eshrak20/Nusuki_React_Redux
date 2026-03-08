import type { Course } from "@/types/education/type.course";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import FormSubmissionModal from "@/components/FormSubmissionModal";

interface HomeCourseCardProps {
    courses: Course[];
}
const MotionLink = motion(Link);

const HomeCourseCard = ({ courses }: HomeCourseCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="my-6 lg:my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 lg:p-6"
        >
            {courses.map((course, index) => (
                <motion.div
                    key={course.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    layout
                    // 1. Added 'group' class here to detect hover across the whole card
                    className="group bg-card dark:bg-card-dark rounded-2xl border border-muted dark:border-muted-dark flex flex-col relative shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                    {/* Content Wrapper */}
                    <div className="p-5 flex flex-col grow">
                        {/* Titles - Upgraded Typography & Animation */}
                        <div className="mb-5">
                            {/* 2. Changed to motion.h3 for the typography reveal */}
                            <motion.h3
                                initial={{ opacity: 0, filter: "blur(6px)", x: -10 }}
                                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1), ease: "easeOut" }}
                                className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground dark:text-foreground-dark group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 leading-snug mb-2 line-clamp-2 min-h-14"
                            >
                                {course.name}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                                className="text-xs sm:text-sm font-semibold text-muted-foreground dark:text-gray-400 uppercase tracking-widest"
                            >
                                {course.university}
                            </motion.p>
                        </div>

                        <hr className="border-muted dark:border-muted-dark mb-4" />

                        {/* Details List & Logo Row */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex flex-col gap-3 text-sm text-foreground/80 dark:text-foreground-dark/80 grow pr-4">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-muted-foreground dark:text-gray-400 min-w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                                    <span className="font-medium">{course.study_level}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground dark:text-gray-400 min-w-4"><FaLocationDot /></span>
                                    <span>{course.city}, {course.country}</span>
                                </div>
                            </div>

                            {/* Logo */}
                            <div className="w-16 h-16 shrink-0 bg-white rounded-md border border-muted dark:border-muted-dark p-1 flex items-center justify-center shadow-sm">
                                <img
                                    src={course.logo}
                                    alt={`${course.university} logo`}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-auto">
                            {/* Only show "Apply Now" on the first card */}
                            <MotionLink
                                to={`/education/courses/${course.id}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-transparent border border-primary/40 text-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors text-center flex items-center justify-center"
                            >
                                View details
                            </MotionLink>
                            <motion.button
                                onClick={() => setIsOpen(true)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-primary text-primary-foreground font-semibold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-sm text-center flex items-center justify-center"
                            >
                                Apply Now
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            ))}
            <FormSubmissionModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title="Apply With NUSUKI"
            />
        </motion.div>
    );
};

export default HomeCourseCard;