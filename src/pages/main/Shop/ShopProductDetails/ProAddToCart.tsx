import { useState } from "react";
import { ShoppingBag, Zap, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useCreateCartMutation,
} from "@/redux/api/shopApi/shopCartApi";
import type { Product } from "@/types/shop/types.productDetail";

interface Props {
  product: Product; // Changed from any to Product
}

interface CartResponse {
  cart: {
    id: string;
    [key: string]: unknown; // For other cart properties
  };
}

const ProAddToCart = ({ product }: Props) => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const [createCart] = useCreateCartMutation();
  const [addToCart] = useAddToCartMutation();

  // Safely access the first variant's ID
  const variantId = product?.variants?.[0]?.id;

  if (!variantId) {
    // Return null or a 'Sold Out' button if no variants exist
    return (
      <div className="w-full p-4 text-center bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-500 font-bold">
        Out of Stock
      </div>
    );
  }

 const getOrCreateCart = async () => {
  let cartId = localStorage.getItem("cart_id");
  
  if (!cartId) {
    // Cast the unwrapped result to our interface
    const res = await createCart().unwrap() as CartResponse;
    cartId = res.cart.id;
    localStorage.setItem("cart_id", cartId);
  }
  
  return cartId;
};

  const handleAddToCart = async () => {
    try {
      const cartId = await getOrCreateCart();
      await addToCart({ 
        cartId, 
        variant_id: variantId, 
        quantity: qty 
      }).unwrap();
      // Optional: Add a toast notification here for "Added to Cart!"
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const handleBuyNow = async () => {
    try {
      const cartId = await getOrCreateCart();
      await addToCart({ 
        cartId, 
        variant_id: variantId, 
        quantity: qty 
      }).unwrap();
      navigate(`/checkout?cart_id=${cartId}`);
    } catch (err) {
      console.error("Buy now failed:", err);
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Sleek Quantity Control */}
      <div className="inline-flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setQty((p) => Math.max(1, p - 1))}
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#002365] dark:hover:text-white transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Minus size={16} strokeWidth={2.5} />
        </button>

        <span className="w-12 text-center text-base font-bold text-gray-900 dark:text-white">
          {qty}
        </span>

        <button
          type="button"
          onClick={() => setQty((p) => p + 1)}
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#002365] dark:hover:text-white transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="group relative w-full bg-white dark:bg-gray-900 border-2 border-[#002365] dark:border-gray-100 text-[#002365] dark:text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 overflow-hidden transition-all hover:shadow-lg"
        >
          <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
          <span>Add to Cart</span>
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="group w-full bg-[#002365] dark:bg-white text-white dark:text-[#002365] py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:bg-opacity-90 hover:shadow-lg"
        >
          <Zap size={18} className="group-hover:scale-110 transition-transform" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProAddToCart;