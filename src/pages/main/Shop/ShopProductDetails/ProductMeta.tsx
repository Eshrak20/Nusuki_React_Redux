/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Product } from "@/types/shop/types.productDetail";

interface Props {
  product: Product;
}

const ProductMeta = ({ product }: Props) => {
  return (
    <div className="p-4 rounded-xl border border-border bg-muted/20 backdrop-blur-sm">
      <h3 className="text-sm font-bold mb-2 uppercase tracking-tighter">
        Information
      </h3>
      <div className="text-sm space-y-1 text-muted-foreground">
        <p>
          Collection:{" "}
          <span className="text-foreground">{product.collection?.title}</span>
        </p>
        <div className="flex gap-1 flex-wrap pt-2">
          {product.tags.map((tag: any) => (
            <span
              key={tag.id}
              className="bg-secondary text-[10px] px-2 py-0.5 rounded-full uppercase font-bold"
            >
              #{tag.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductMeta;
