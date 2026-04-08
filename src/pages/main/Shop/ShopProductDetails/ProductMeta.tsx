/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Product } from "@/types/shop/types.productDetail";
import { Info } from "lucide-react";

interface Props {
  product: Product;
}

const ProductMeta = ({ product }: Props) => {
  return (
    <div className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md transition-all hover:shadow-sm">
      <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
        <Info size={16} className="text-[#002365] dark:text-primary" />
        Information
      </h3>
      
      <div className="text-sm space-y-4">
        {product.collection && (
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
            <span className="text-gray-500 dark:text-gray-400">Collection</span>
            <span className="font-bold text-gray-900 dark:text-white">{product.collection.title}</span>
          </div>
        )}
        
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Tags</span>
            <div className="flex gap-2 flex-wrap">
              {product.tags.map((tag: any) => (
                <span
                  key={tag.id}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[11px] px-3 py-1 rounded-full uppercase font-bold tracking-wider"
                >
                  {tag.value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMeta;