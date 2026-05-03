import { useState } from "react";
import { useSetShippingAddressMutation } from "@/redux/api/shopApi/shopCartApi";

interface ShippingAddressProps {
  cartId: string | undefined;
  onNext: () => void;
}

interface ShippingAddressForm {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  country_code: string;
  postal_code: string;
  phone: string;
}

const ShippingAddress = ({ onNext, cartId }: ShippingAddressProps) => {
  const [setShippingAddress, { isLoading }] = useSetShippingAddressMutation();

  const [form, setForm] = useState<ShippingAddressForm>({
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cartId) {
      console.error("No Cart ID found");
      return;
    }

    try {
      const result = await setShippingAddress({
        cartId,
        data: {
          shipping_address: form,
          email: "test@example.com", // You should probably make this a form input too!
        },
      }).unwrap();

      // console.log("Success:", result);
      onNext();
    } catch (err) {
      console.error("Shipping error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="first_name"
        value={form.first_name}
        placeholder="First Name"
        onChange={handleChange}
        className="border p-2 block w-full"
      />
      <input
        name="last_name"
        value={form.last_name}
        placeholder="Last Name"
        onChange={handleChange}
        className="border p-2 block w-full"
      />

      <input
        name="address_1"
        value={form.address_1}
        placeholder="Address"
        onChange={handleChange}
        className="border p-2 block w-full"
      />

      <input
        name="city"
        value={form.city}
        placeholder="City"
        onChange={handleChange}
        className="border p-2 block w-full"
      />

      <input
        name="postal_code"
        value={form.postal_code}
        placeholder="Postal Code"
        onChange={handleChange}
        className="border p-2 block w-full"
      />

      <input
        name="phone"
        value={form.phone}
        placeholder="Phone"
        onChange={handleChange}
        className="border p-2 block w-full"
      />

      <button
        type="submit"
        disabled={isLoading || !cartId}
        className="bg-primary text-white px-4 py-2 disabled:bg-gray-400"
      >
        {isLoading ? "Processing..." : "Continue to Payment"}
      </button>
    </form>
  );
};

export default ShippingAddress;