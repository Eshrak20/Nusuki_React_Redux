import { ShoppingBag } from "lucide-react";
interface Props {
  productId: string;
}
const ProAddToCart = ({ productId }: Props) => {
  
  return (
    <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
      <ShoppingBag size={20} />
      Add to Shopping Bag {productId}
    </button>
  );
};

export default ProAddToCart;
