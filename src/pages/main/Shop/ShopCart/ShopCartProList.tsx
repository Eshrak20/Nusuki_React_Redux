interface CartItem {
  id: string;
  thumbnail: string;
  title: string;
  unit_price: number;
  quantity: number;
}

interface ShopCartProListProps {
  items: CartItem[];
  selectedItems: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
}

const ShopCartProList = ({
  items,
  selectedItems,
  onSelect,
  onSelectAll,
}: ShopCartProListProps) => {
  return (
    <div>
      {/* Select All */}
      <div className="flex items-center gap-2 mb-4 font-medium">
        <input
          type="checkbox"
          checked={items.length > 0 && selectedItems.length === items.length}
          onChange={onSelectAll}
        />
        <span>Select All</span>
      </div>

      {/* Items */}
      {items.map((item: CartItem) => (
        <div key={item.id} className="flex gap-4 border p-3 my-2 items-center">
          <input
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => onSelect(item.id)}
          />

          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-20 object-cover rounded"
          />

          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-gray-600">৳ {item.unit_price}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopCartProList;