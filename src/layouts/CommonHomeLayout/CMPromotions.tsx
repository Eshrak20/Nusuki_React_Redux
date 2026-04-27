import { useState, useEffect, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import { useFlightPromoListsQuery } from "@/redux/api/flightApi/flightPromo";

const CMPromotions = () => {
  const { data } = useFlightPromoListsQuery();
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

  const promotions = data?.data?.data || [];
  if (!promotions || promotions.length === 0) return null;

  // Calculate total pages based on items per page
  const totalPages = Math.ceil(promotions.length / itemsPerPage);
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

  return (
    <div className="w-full -mt-14 lg:mt-15 px-4 overflow-hidden" ref={containerRef}>
      <h2 className="text-3xl md:text-4xl mt-20 lg:mt-0 text-center lg:text-left font-bold text-foreground mb-8">
        Exclusive Offers
      </h2>

      <div className="relative overflow-visible">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          // The "activePage * 100" moves one full container width per page
          // Dividing by totalPages is necessary because the width is multiplied by totalPages
          animate={{ x: `-${(activePage * 100) / totalPages}%` }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 30,
          }}
          style={{ width: `${totalPages * 100}%` }}
        >
          {promotions.map((promo) => (
            <div
              key={promo.id}
              // Width must be relative to the entire expanded width (totalPages * 100)
              style={{ width: `${100 / (totalPages * itemsPerPage)}%` }}
              className="shrink-0 px-2 flex flex-col"
            >
              {/* Card Container */}
              <div className="relative aspect-16/10 group overflow-hidden rounded-2xl bg-muted border border-border/50">
                <img
                  src={promo.image_url}
                  alt={promo.title}
                  className="w-full h-full object-fit pointer-events-none select-none transition-transform duration-700 group-hover:scale-110"
                  draggable="false"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/75 dark:bg-black/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center">
                    <h3 className="font-bold text-xl text-white mb-2 line-clamp-1">{promo.title}</h3>
                    <p className="text-sm font-medium text-white/90 mb-3 line-clamp-1">{promo.subtitle}</p>
                    <p className="text-xs text-gray-300 mb-5 line-clamp-3">{promo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all duration-500 ${activePage === index ? "w-10 bg-primary" : "w-2 bg-primary/20"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CMPromotions;