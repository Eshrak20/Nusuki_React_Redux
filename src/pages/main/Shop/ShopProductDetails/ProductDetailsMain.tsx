import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/redux/api/shopApi/shopProductApi";
import ProductInfo from "./ProductInfo";
import ProductGallery from "./ProductGallery";
import ProductDeliveryInfo from "./ProductDeliveryInfo";
import ProductVariants from "./ProductVariants";
import ProductPrice from "./ProductPrice";
import ProductMeta from "./ProductMeta";
import ProAddToCart from "./ProAddToCart";

const ShopProductDetailsMain = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetProductDetailsQuery(id as string, { skip: !id });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  if (isLoading) return <div className="h-screen flex items-center justify-center text-primary animate-pulse font-medium tracking-wide">Loading Premium Experience...</div>;
  if (error || !data?.product) return <div className="h-screen flex items-center justify-center text-destructive font-medium">Product not found.</div>;

  const activeVariant = selectedVariant ?? data.product.variants[0];

  const { product } = data;

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-transparent text-foreground min-h-screen"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-start">
        {/* Left Column: Visuals */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <ProductGallery
            images={product.images}
            thumbnail={product.thumbnail}
            variant={activeVariant}
          />
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-5 lg:col-start-8 flex flex-col space-y-10">
          <section className="space-y-6">
            <ProductInfo product={product} />
            {/* Pass the selected variant to update the price dynamically */}
            <ProductPrice variant={activeVariant} />
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800/60 space-y-8">
            {/* If options dictate the variant, you can also pass selectedVariant here */}
            <ProductVariants variants={product.variants} options={product.options} selectedVariant={activeVariant} setVariant={setSelectedVariant} />
            <ProAddToCart product={product} selectedVariant={selectedVariant} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800/60">
            <ProductDeliveryInfo />
            <ProductMeta product={product} />
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default ShopProductDetailsMain;