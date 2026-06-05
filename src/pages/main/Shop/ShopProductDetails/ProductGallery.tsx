import type { Image, Variant } from "@/types/shop/types.productDetail";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  images: Image[];
  thumbnail: string;
  variant: Variant;
}

const ProductGallery = ({ images, thumbnail, variant }: Props) => {
  const [selectedThumb, setSelectedThumb] = useState(variant?.thumbnail || thumbnail)

  return (
    <div className="space-y-4">
      {/* Main Image Display with smooth layout transitions */}
      <div className="overflow-hidden rounded-sm border border-border bg-muted/30 aspect-square relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedThumb}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            src={selectedThumb}
            alt={variant?.title || "Product"}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </AnimatePresence>
      </div>

      {/* Variant Thumbnails Carousel */}
      <div className="flex gap-4 overflow-x-auto pt-0.75 pb-2 scrollbar-hide">
        {images?.map((image, i) => {
          const isSelected = selectedThumb === image.url;
          return (
            <motion.div
              key={image.id}
              onClick={() => setSelectedThumb(image.url)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-sm border-2 overflow-hidden cursor-pointer transition-all duration-300 group ${isSelected
                ? "border-primary shadow-lg scale-105"
                : "border-transparent hover:border-primary/30"
                }`}
            >
              <img
                src={image.url}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={`Product thumbnail ${i + 1}`}
              />

              <div className={`absolute inset-0 transition-colors ${isSelected ? "bg-transparent" : "bg-black/5 dark:bg-white/5 group-hover:bg-transparent"
                }`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallery;