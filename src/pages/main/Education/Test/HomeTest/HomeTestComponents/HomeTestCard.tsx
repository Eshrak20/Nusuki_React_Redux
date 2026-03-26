import type { TestPreparation } from "@/types/education/type.tests";
import EduTestCmnBtn from "@/components/education/EduTestCmnBtn"
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

interface HomeTestCardProps {
    tests: TestPreparation[];
}

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const HomeTestCard = ({ tests }: HomeTestCardProps) => {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 max-w-7xl mx-auto"
        >
            {tests.map((test) => (
                <motion.div
                    key={test.id}
                    variants={cardVariants}
                    whileHover={{
                        y: -8,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                    }}
                    className="group bg-card text-card-foreground rounded-2xl p-8 flex flex-col items-center justify-between border border-border shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_10px_30px_-10px_rgba(var(--primary),0.2)] transition-all duration-300 relative overflow-hidden"
                >
                    <div className="flex flex-col items-center w-full relative z-10">
                        <div className="h-16 flex items-center justify-center mb-3 lg:mb-6">
                            <motion.img
                                src={test.image}
                                alt={test.examType}
                                className="max-h-full max-w-35 object-contain"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        </div>

                        <h3 className="text-primary font-bold lg:font-medium text-base mb-5 lg:mb-8 opacity-80 group-hover:opacity-100 transition-opacity text-center">
                            {test.testDesc}
                        </h3>

                        <div className="flex flex-col items-center space-y-1 lg:space-y-2.5 text-[15px] font-medium text-muted-foreground dark:text-gray-300">
                            <p className="hover:text-primary transition-colors">Date: {formatDate(test.date)}</p>
                            <p className="hover:text-primary transition-colors">Time: {test.time}</p>
                            <p className="hover:text-primary transition-colors">Duration : {test.duration}</p>
                            <p className="hover:text-primary transition-colors">Batch : {test.batch}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-6 lg:mt-8 space-y-5 w-full relative z-10">
                        <Link to={`/education/tests/${test.id}`} className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300">
                            View More
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ x: [0, 3, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                                <path d="m9 18 6-6-6-6" />
                            </motion.svg>
                        </Link>

                        <EduTestCmnBtn title="Enroll Now"/>

                    </div>

                    <div className="absolute inset-0 bg-linear-to-b from-primary/5 dark:from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default HomeTestCard;