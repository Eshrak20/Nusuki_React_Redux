import { useState } from "react";
import {
  useCreatePaymentSessionsMutation,
  useSetPaymentSessionMutation,
  useCompleteCartMutation,
} from "@/redux/api/shopApi/shopCartApi";

const Payment = ({ cartId }: { cartId: string | undefined }) => {
  const [loading, setLoading] = useState(false);

  const [createPaymentSessions] = useCreatePaymentSessionsMutation();
  const [setPaymentSession] = useSetPaymentSessionMutation();
  const [completeCart] = useCompleteCartMutation();

  const handlePayment = async () => {
    if (!cartId) return;

    try {
      setLoading(true);

      // 1️⃣ Create payment sessions
      await createPaymentSessions(cartId).unwrap();

      // 2️⃣ Select payment provider
      // 👉 IMPORTANT: provider_id depends on your Medusa setup
      await setPaymentSession({
        cartId,
        provider_id: "manual", // or "stripe", "sslcommerz"
      }).unwrap();

      

      // 3️⃣ Complete cart → ORDER CREATED
      const res = await completeCart(cartId).unwrap();

      console.log("ORDER SUCCESS:", res);
      alert("Order placed successfully!");

    } catch (err) {
      console.log("Payment Error:", err);
      alert("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Payment</h2>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 mt-4"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default Payment;