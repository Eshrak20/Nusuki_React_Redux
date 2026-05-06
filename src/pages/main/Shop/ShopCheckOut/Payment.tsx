import { useState } from "react";
import {
  useAddShippingMethodMutation,
  useGetShippingOptionsQuery,
} from "@/redux/api/shopApi/shopCartApi";

const Payment = ({ cartId }: { cartId: string | undefined }) => {
  const [loading, setLoading] = useState(false);

  // Fetch available shipping options for this cart
  const { data: shippingData, isLoading: fetchingOptions } = useGetShippingOptionsQuery(
    cartId as string,
    { skip: !cartId }
  );

  const [addShippingMethod] = useAddShippingMethodMutation();
console.log(import.meta.env.VITE_MEDUSA_OPTION_ID);
  const handlePayment = async () => {
    if (!cartId) return;

    // Get the first available shipping option dynamically
    const shippingOptions = shippingData?.shipping_options || [];
    if (shippingOptions.length === 0) {
      alert("No shipping options available for this address.");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Add the dynamically fetched shipping method

      const res = await addShippingMethod({
        cartId,
        option_id: import.meta.env.VITE_MEDUSA_OPTION_ID,
      }).unwrap();


      // // 2️⃣ Create payment sessions
      // await createPaymentSessions(cartId).unwrap();

      // // 3️⃣ Select payment provider
      // await setPaymentSession({
      //   cartId,
      //   provider_id: "manual",
      // }).unwrap();

      // // 4️⃣ Complete cart → ORDER CREATED
      // const res = await completeCart(cartId).unwrap();

      console.log("ORDER SUCCESS:", res);
      alert("Order placed successfully!");
    } catch (err) {
      console.log("Payment Error:", err);
      alert("Payment failed! Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingOptions) return <p>Loading shipping options...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">Payment</h2>

      <button
        onClick={handlePayment}
        disabled={loading || !cartId}
        className="bg-green-600 text-white px-4 py-2 mt-4 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default Payment;