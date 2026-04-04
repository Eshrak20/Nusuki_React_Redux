import { motion } from "framer-motion";
import type { Product } from "@/types/shop/types.productDetail";
interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  return (
    <div className="space-y-2">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-primary text-xs font-bold tracking-widest uppercase"
      >
        {product.material} • {product.weight}
      </motion.span>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl text-foreground">
        {product.title}
      </h1>
      <p className="text-xl text-muted-foreground font-medium">
        {product.subtitle}
      </p>
      <p className="text-base text-muted-foreground leading-relaxed max-w-prose pt-4">
        {product.description}
      </p>
    </div>
  );
};

export default ProductInfo;
