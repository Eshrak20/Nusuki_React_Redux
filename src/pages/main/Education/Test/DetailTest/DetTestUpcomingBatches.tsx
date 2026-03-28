import { useState, useEffect, useRef } from "react";
import { motion, type PanInfo, type Variants } from "framer-motion";
import type { UpcomingBatch } from "@/types/education/type.tests";
import EduTestCmnBtn from "@/components/education/EduTestCmnBtn";

interface DetTestUpcomingBatchesProps {
    batches: UpcomingBatch[];
}

const DetTestUpcomingBatches = ({ batches = [] }: DetTestUpcomingBatchesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!batches || batches.length === 0) return null;

    const totalPages = Math.ceil(batches.length / itemsPerPage);
    const activePage = Math.max(0, Math.min(currentPage, totalPages - 1));

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50;
        const velocityThreshold = 500;

        if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
        } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
            setCurrentPage((prev) => Math.max(prev - 1, 0));
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Check if we have fewer batches than what can fit on the screen
    const isUnderfilled = batches.length < itemsPerPage;

    return (
        <div className="w-full max-w-7xl mx-auto py-6 lg:py-10 overflow-hidden" ref={containerRef}>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                Upcoming Batches
            </h2>

            <div className="relative overflow-visible px-4">
                <motion.div
                    // Conditionally add justify-center to center 1 or 2 items
                    className={`flex ${isUnderfilled ? "justify-center" : ""} ${
                        totalPages > 1 ? "cursor-grab active:cursor-grabbing" : ""
                    }`}
                    // Disable drag if all items fit on one page
                    drag={totalPages > 1 ? "x" : false}
                    dragConstraints={containerRef}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    animate={{ x: `-${(activePage * 100) / totalPages}%` }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 30,
                    }}
                    style={{ width: `${totalPages * 100}%` }}
                >
                    {batches.map((batch, index) => (
                        <div
                            key={index}
                            style={{ width: `${100 / (totalPages * itemsPerPage)}%` }}
                            className="shrink-0 p-4"
                        >
                            <motion.div
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.02,
                                    transition: { duration: 0.4, ease: "backOut" }
                                }}
                                className="group bg-card text-card-foreground rounded-2xl p-8 flex flex-col items-center border border-border relative overflow-hidden h-full transition-all duration-300
                                shadow-[0_8px_40px_rgba(var(--primary),0.08)]
                                dark:shadow-[0_8px_40px_rgba(var(--primary),0.05)] 
                                dark:border-primary/10
                                hover:shadow-[0_30px_60px_-15px_rgba(var(--primary),0.2)]
                                dark:hover:shadow-[0_20px_40px_-12px_rgba(var(--primary),0.3)]
                                dark:hover:border-primary/30"
                            >
                                <div className="relative z-10 flex flex-col items-center w-full">
                                    <div className="h-14 flex items-center justify-center mb-6">
                                        <h3 className="text-primary font-bold text-2xl tracking-tight">IELTS™</h3>
                                    </div>

                                    <h4 className="text-foreground font-bold text-lg mb-6 text-center group-hover:text-primary transition-colors">
                                        {batch.title}
                                    </h4>

                                    <div className="flex flex-col items-center space-y-2 text-[15px] font-medium text-muted-foreground dark:text-gray-300">
                                        <p className="hover:text-primary transition-colors">Date : {batch.date}</p>
                                        <p className="hover:text-primary transition-colors">Time : {batch.time}</p>
                                        <p className="hover:text-primary transition-colors">Duration : {batch.duration}</p>
                                        <p className="hover:text-primary transition-colors">Batch : {batch.batch_mode}</p>
                                    </div>
                                </div>

                                <div className="mt-8 relative z-10 w-full flex justify-center">
                                    <EduTestCmnBtn title="Enroll Now" />
                                </div>

                                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
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
                                activePage === index ? "w-10 bg-primary" : "w-2.5 bg-primary/20"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DetTestUpcomingBatches;