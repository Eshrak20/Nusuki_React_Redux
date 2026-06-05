import { useState } from "react";
import ShopCartCheckOut from "./ShopCartCheckOut";
import ShopCartProList from "./ShopCartProList";
import ShopCartSideInfo from "./ShopCartSideInfo";
import { useGetCartQuery } from "@/redux/api/shopApi/shopCartApi";

// 1. Define strict TypeScript interfaces to remove `any` warnings
export interface CartItem {
  id: string;
  unit_price: number;
  quantity: number;
  thumbnail: string;
  title: string;
}

const ShopCartMain = () => {
  // Safe check for localStorage in case of SSR (Next.js)
  const cartId =
    typeof window !== "undefined" ? localStorage.getItem("cart_id") : null;

  // Added 'skip' so the query doesn't run and error out if cartId is missing
  const { data, isLoading } = useGetCartQuery(cartId as string, {
    skip: !cartId,
  });

  // 2. Use `null` to indicate the user hasn't manually changed the selection yet.
  const [manualSelection, setManualSelection] = useState<string[] | null>(null);

  if (isLoading) return <p>Loading...</p>;

  // Safe fallback if data is undefined
  const items: CartItem[] = data?.cart?.items || [];;


  // 3. DERIVED STATE (Replaces useEffect)
  // If manualSelection is null, default to selecting all items.
  // Otherwise, use the user's manual selection.
  const selectedItems =
    manualSelection !== null ? manualSelection : items.map((item) => item.id);

  // 4. Handlers now update the manual selection based on the derived state
  const handleSelect = (id: string) => {
    setManualSelection(
      selectedItems.includes(id)
        ? selectedItems.filter((itemId) => itemId !== id)
        : [...selectedItems, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      // If everything is selected, deselect all
      setManualSelection([]);
    } else {
      // Otherwise, select all
      setManualSelection(items.map((item) => item.id));
    }
  };

  // Filter products using strict typing
  const selectedProducts = items.filter((item) =>
    selectedItems.includes(item.id),
  );

  const totalPrice = selectedProducts.reduce(
    (acc: number, item: CartItem) => acc + item.unit_price * item.quantity,
    0,
  );

  return (
  
    <div className="container mx-auto px-4 mt-20 lg:mt-32 mb-20">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {/* 2. Responsive Grid: Stack on small screens (col-span-12), Side-by-side on large */}
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT: Product List */}
        <div className="col-span-12 lg:col-span-8">
          <ShopCartProList
            items={items}
            selectedItems={selectedItems}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
          />
        </div>

        {/* RIGHT: Checkout & Info (Sticky Sidebar) */}
        <aside className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="bg-white rounded-sm shadow-sm border p-1">
            <ShopCartCheckOut
              total={totalPrice}
              count={selectedProducts.length}
              cartId={cartId}
            />
          </div>

          <div className="hidden lg:block">
            <ShopCartSideInfo />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ShopCartMain;
