import type { Image } from "@/types/shop/types.productDetail";
import { motion } from "framer-motion";
interface Props {
  images: Image[];
  thumbnail: string;
}

const ProductGallery = ({ images, thumbnail }: Props) => {
  return (
    <div className="space-y-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="overflow-hidden rounded-2xl border border-border bg-muted/30 aspect-square"
      >
        <img
          src={thumbnail}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </motion.div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="shrink-0 w-24 h-24 rounded-lg border border-border overflow-hidden cursor-pointer hover:border-primary transition-colors"
          >
            <img src={img.url} className="w-full h-full object-cover" alt="" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
