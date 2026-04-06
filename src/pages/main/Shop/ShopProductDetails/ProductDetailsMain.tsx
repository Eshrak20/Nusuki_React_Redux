import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/redux/api/shopApi/shopProductApi";
import ProductInfo from "./ProductInfo";
import ProductGallery from "./ProductGallery";
import ProductDeliveryInfo from "./ProductDeliveryInfo";
import ProductOptions from "./ProductOptions";
import ProductPrice from "./ProductPrice";
import ProductMeta from "./ProductMeta";
import ProAddToCart from "./ProAddToCart";

const ShopProductDetailsMain = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetProductDetailsQuery(id as string, { skip: !id });

  if (isLoading) return <div className="h-screen flex items-center justify-center text-primary animate-pulse">Loading Premium Experience...</div>;
  if (error || !data?.product) return <div className="h-screen flex items-center justify-center text-destructive">Product not found.</div>;

  const { product } = data;

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mt-20 mx-auto px-4 py-12 lg:py-20 bg-background text-foreground min-h-screen"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Left Column: Visuals */}
        <div className="space-y-8">
          <ProductGallery images={product.images} thumbnail={product.thumbnail} />
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col space-y-8">
          <section className="space-y-4">
            <ProductInfo product={product} />
            <ProductPrice variants={product.variants} />
          </section>

          <div className="border-y border-border py-6 space-y-6">
            <ProductOptions options={product.options} />
            <ProAddToCart product={product} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductDeliveryInfo />
            <ProductMeta product={product} />
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default ShopProductDetailsMain;