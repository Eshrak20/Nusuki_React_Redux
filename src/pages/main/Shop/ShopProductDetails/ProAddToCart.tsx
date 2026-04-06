import { useState } from "react";
import { ShoppingBag, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useCreateCartMutation,
} from "@/redux/api/shopApi/shopCartApi";

// 👉 import your RTK hooks (adjust path)

interface Props {
  product: any;
}

const ProAddToCart = ({ product }: Props) => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const [createCart] = useCreateCartMutation();
  const [addToCart] = useAddToCartMutation();

  const variantId = product?.variants?.[0]?.id;

  if (!variantId) {
    console.error("Variant ID missing");
    return;
  }

  const getOrCreateCart = async () => {
    let cartId = localStorage.getItem("cart_id");

    if (!cartId) {
      const res = await createCart().unwrap();
      cartId = res.cart.id as string;
      localStorage.setItem("cart_id", cartId);
    }

    return cartId;
  };

  const handleAddToCart = async () => {
    const cartId = await getOrCreateCart();

    const see = await addToCart({
      cartId,
      variant_id: variantId,
      quantity: qty,
    }).unwrap();
    console.log(see);
  };

  const handleBuyNow = async () => {
    const cartId = await getOrCreateCart();

    await addToCart({
      cartId,
      variant_id: variantId,
      quantity: qty,
    }).unwrap();

    navigate(`/checkout?cart_id=${cartId}`);
  };

  return (
    <div className="w-full space-y-4">
      {/* Quantity Control */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
        <button
          onClick={() => setQty((p) => Math.max(1, p - 1))}
          className="text-xl font-bold"
        >
          -
        </button>

        <span className="font-bold">{qty}</span>

        <button
          onClick={() => setQty((p) => p + 1)}
          className="text-xl font-bold"
        >
          +
        </button>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleAddToCart}
          className="bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="bg-[#002365] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Zap size={18} />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProAddToCart;
