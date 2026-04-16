import type { Image } from "@/types/shop/types.productDetail";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  images: Image[];
  thumbnail: string;
  variants: any[];
  selectedVariant: any;
}

const ProductGallery = ({ images, thumbnail, variants, selectedVariant }: Props) => {
  console.log(selectedVariant);
  
  // Determine which image to show in the main view
  // If the selected variant has a specific thumbnail, show it. Otherwise, fallback to the default product thumbnail.
  const currentDisplayImage = selectedVariant?.thumbnail || thumbnail;

  return (
    <div className="space-y-4">
      {/* Main Image Display with smooth layout transitions */}
      <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 aspect-square relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentDisplayImage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            src={currentDisplayImage}
            alt={selectedVariant?.title || "Product"}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </AnimatePresence>
      </div>

      {/* Variant Thumbnails Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {variants?.map((variant, i) => {
          const isSelected = selectedVariant?.id === variant.id;
          const variantImage = variant.thumbnail || thumbnail;

          return (
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`shrink-0 w-24 h-24 rounded-lg border-2 overflow-hidden cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? "border-primary shadow-md scale-105" // Highlight the active variant
                  : "border-border hover:border-primary/50"
              }`}
            >
              <img 
                src={variantImage} 
                className="w-full h-full object-cover" 
                alt={variant.title} 
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallery;