import type { Variant } from "@/types/shop/types.productDetail";

interface Props {
  variants: Variant[];
}

const ProductPrice = ({ variants }: Props) => {
  const price = variants?.[0]?.prices?.[0];

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-foreground">
        {price?.amount}
      </span>
      <span className="text-lg font-medium text-muted-foreground uppercase">
        BDT
      </span>
    </div>
  );
};

export default ProductPrice;
