import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  // Matching the data structure from your JSON
  images: { image_url: string }[]; 
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const currentIndex = Math.abs(page % images.length);

  const paginate = useCallback((newDirection: number) => {
    // 3. Use functional update (prev) => ... 
    // This allows the function to stay the same even when 'page' changes
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page, paginate]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    paginate(-1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    paginate(1);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full group overflow-hidden bg-gray-200">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[currentIndex].image_url}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 100, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-10">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-[#1e8360] text-white hover:bg-opacity-90 transition-all shadow-md active:scale-95"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-[#1e8360] text-white hover:bg-opacity-90 transition-all shadow-md active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;