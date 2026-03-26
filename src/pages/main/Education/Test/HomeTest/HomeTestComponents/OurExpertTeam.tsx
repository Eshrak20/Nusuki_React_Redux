import { useState, useEffect, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import type { Expert } from "@/types/education/type.tests";

interface ExpertsProps {
    experts?: Expert[];
}

const OurExpertTeam = ({ experts = [] }: ExpertsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);

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
    const activePage = Math.max(0, Math.min(currentPage, totalPages - 1));

    if (!experts || experts.length === 0) return null;

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50;
        const velocityThreshold = 500;

        if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
        } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
            setCurrentPage((prev) => Math.max(prev - 1, 0));
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto py-16 overflow-hidden" ref={containerRef}>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-card-foreground mb-12">
                Our Expert Team
            </h2>

            <div className="relative overflow-visible">
                <motion.div
                    className="flex cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0}
                    onDragEnd={handleDragEnd}
                    animate={{ x: `-${(activePage * 100) / totalPages}%` }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 30,
                    }}
                    style={{ width: `${totalPages * 100}%` }}
                >
                    {experts.map((expert) => (
                        <div
                            key={expert.id}
                            style={{ width: `${100 / (totalPages * itemsPerPage)}%` }}
                            className="shrink-0 flex flex-col items-center text-center"
                        >
                            <div className="w-56 h-56 mb-6 rounded-[2rem] overflow-hidden bg-primary/10 dark:bg-primary/5 flex items-end justify-center shadow-sm border border-border/50">
                                <img
                                    src={expert.image}
                                    alt={expert.name}
                                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                                    draggable="false"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-card-foreground h-14 mb-2">{expert.name}</h3>
                            <p className="text-sm font-medium text-muted-foreground mb-4 px-4 line-clamp-2">{expert.title}</p>
                            <div className="mt-auto">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    {expert.years_in_industry} Years Exp
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`h-2.5 rounded-full transition-all duration-500 ${activePage === index ? "w-10 bg-primary" : "w-2.5 bg-primary/20"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OurExpertTeam;