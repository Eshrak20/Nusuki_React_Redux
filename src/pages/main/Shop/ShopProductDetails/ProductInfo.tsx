import { motion } from "framer-motion";
import type { Product } from "@/types/shop/types.productDetail";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  console.log(product);
  
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-primary"
      >
        <span>{product.material || "Premium"}</span>
        <span className="w-1 h-1 rounded-full bg-primary/50"></span>
        <span>{product.weight || "Standard"}</span>
      </motion.div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#002365] dark:text-gray-50 leading-[1.1]">
        {product.title}
      </h1>
      
      {product.subtitle && (
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight">
          {product.subtitle}
        </p>
      )}
      
      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-prose pt-2">
        {product.description}
      </p>
    </div>
  );
};

export default ProductInfo;