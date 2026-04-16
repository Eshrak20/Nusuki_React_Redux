import type { Product } from "@/types/shop/types.productDetail";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  
  return (
    <div >
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight -mt-1.5 mb-1.5 text-primary dark:text-gray-50 leading-[1.1]">
        {product.title}
      </h1>
      
      {product.subtitle && (
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight">
          {product.subtitle}
        </p>
      )}
      
      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-prose pt-5.75">
        {product.description}
      </p>
    </div>
  );
};

export default ProductInfo;