import { useState, useEffect } from "react";
import { motion, useAnimation, type PanInfo } from "framer-motion";
import type { Expert } from "@/types/education/type.tests";

interface ExpertsProps {
    experts?: Expert[];
}

const OurExpertTeam = ({ experts = [] }: ExpertsProps) => {
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(4);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(experts.length / itemsPerPage);

    // This ensures the slider stays in the right spot when the page index changes
    useEffect(() => {
        controls.start({ x: `-${currentPage * 100}%` });
    }, [currentPage, controls]);

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50;
        const velocityThreshold = 500; // Snaps if you swipe fast even if distance is short

        if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
            if (currentPage < totalPages - 1) {
                setCurrentPage((prev) => prev + 1);
            } else {
                // Shake effect if trying to go past last page
                controls.start({ x: `-${currentPage * 100}%`, transition: { type: "spring", stiffness: 300 } });
            }
        } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
            if (currentPage > 0) {
                setCurrentPage((prev) => prev - 1);
            } else {
                // Shake effect if trying to go before first page
                controls.start({ x: "0%", transition: { type: "spring", stiffness: 300 } });
            }
        } else {
            // Snap back if threshold not met
            controls.start({ x: `-${currentPage * 100}%` });
        }
    };

    if (!experts || experts.length === 0) return null;

    return (
        <div className="w-full max-w-7xl mx-auto py-16 px-4 overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-card-foreground mb-12">
                Our Expert Team
            </h2>

            <div className="relative overflow-visible">
                <motion.div
                    className="flex cursor-grab active:cursor-grabbing"
                    drag="x"
                    // IMPORTANT: This makes it follow your finger but stay within bounds
                    dragConstraints={{ left: 0, right: 0 }} 
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        mass: 1
                    }}
                >
                    {experts.map((expert) => (
                        <div
                            key={expert.id}
                            className="w-full md:w-1/2 lg:w-1/4 shrink-0 flex flex-col items-center text-center"
                        >
                            <div className="w-48 h-48 mb-6 rounded-[2rem] overflow-hidden bg-primary/10 dark:bg-primary/5 flex items-end justify-center shadow-sm border border-border/50 transition-colors">
                                <img
                                    src={expert.image}
                                    alt={expert.name}
                                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                                    draggable="false"
                                />
                            </div>

                            <h3 className="text-lg font-bold text-card-foreground mb-3 px-2">
                                {expert.name}
                            </h3>
                            
                            <p className="text-sm font-medium text-muted-foreground mb-2 leading-relaxed px-4 line-clamp-2">
                                {expert.title}
                            </p>
                            
                            <p className="text-sm font-semibold text-primary/80 dark:text-primary mt-auto">
                                {expert.years_in_industry} Years in the industry
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`h-2.5 rounded-full transition-all duration-500 ${
                                currentPage === index
                                    ? "w-10 bg-primary"
                                    : "w-2.5 bg-primary/20 hover:bg-primary/40 dark:bg-primary/20"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OurExpertTeam;