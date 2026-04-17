import type { Variant } from "@/types/shop/types.productDetail";

interface Props {
  variant: Variant;
}

const ProductPrice = ({ variant }: Props) => {

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-primary dark:text-white">
          ৳{variant?.prices[0]?.amount || "0"}
        </span>
        <span className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          BDT
        </span>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
        Taxes included. Shipping calculated at checkout.
      </span>
    </div>
  );
};

export default ProductPrice;