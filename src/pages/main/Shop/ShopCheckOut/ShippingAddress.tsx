import { useState } from "react";
import { useSetShippingAddressMutation } from "@/redux/api/shopApi/shopCartApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShippingAddress = ({ onNext, cartId }: any) => {
  const [setShippingAddress, { isLoading }] = useSetShippingAddressMutation();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    city: "",
    country_code: "bd",
    postal_code: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const see = await setShippingAddress({
  //       cartId,
  //       address: form,
  //     }).unwrap();

  //     onNext();
  //     console.log(see);
  //   } catch (err) {
  //     console.log("Shipping error:", err);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const see = await setShippingAddress({
        cartId,
        address: form,
        // CRITICAL: You must also set the email on the cart
        email: "test@example.com",
      }).unwrap();
      onNext();
      console.log(see);
    } catch (err) {
      console.log("Shipping error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
      />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="address_1" placeholder="Address" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input
        name="postal_code"
        placeholder="Postal Code"
        onChange={handleChange}
      />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white px-4 py-2"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default ShippingAddress;
