import { useNavigate } from "react-router-dom";

interface ShopCartCheckOutProps {
  total: number;
  count: number;
  cartId : string | null;
}

const ShopCartCheckOut = ({ total, count, cartId }: ShopCartCheckOutProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border rounded">
      <h2>{count} items selected</h2>
      <h1 className="text-xl font-bold">৳ {total}</h1>

      <button
        onClick={() => navigate(`/shop/checkout/${cartId}`)}
        className="bg-primary text-white w-full py-2 mt-3"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default ShopCartCheckOut;