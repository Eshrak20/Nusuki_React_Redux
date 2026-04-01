import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const images: string[] = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", // headphones
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30", // watch (fixed)
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d", // shoes
];

const ShopBanner = () => {
  const [current, setCurrent] = useState<number>(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full top-10 h-[600px] overflow-hidden rounded-2xl shadow-lg">
      {/* Image */}
      <img
        src={`${images[current]}?auto=format&fit=crop&w=1600&q=80`}
        alt="banner"
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Left Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
      >
        <ChevronLeft />
      </Button>

      {/* Right Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
      >
        <ChevronRight />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
              current === index ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopBanner;
