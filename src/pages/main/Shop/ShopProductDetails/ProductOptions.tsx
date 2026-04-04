/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProductOption } from "@/types/shop/types.productDetail";

interface Props {
  options: ProductOption[];
}

const ProductOptions = ({ options }: Props) => {
  return (
    <div className="space-y-4">
      {options.map((opt) => (
        <div key={opt.id} className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {opt.title}
          </h4>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((val: any) => (
              <button
                key={val.id}
                className="px-4 py-2 text-sm border border-border rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95"
              >
                {val.value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;
