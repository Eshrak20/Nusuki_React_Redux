const ShopCartProList = ({
  items,
  selectedItems,
  onSelect,
  onSelectAll,
}: any) => {
  return (
    <div>
      {/* Select All */}
      <div>
        <input
          type="checkbox"
          checked={selectedItems.length === items.length}
          onChange={onSelectAll}
        />
        Select All
      </div>

      {/* Items */}
      {items.map((item: any) => (
        <div key={item.id} className="flex gap-4 border p-3 my-2">
          <input
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => onSelect(item.id)}
          />

          <img
            src={item.thumbnail}
            className="w-20 h-20 object-cover"
          />

          <div>
            <h3>{item.title}</h3>
            <p>৳ {item.unit_price}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopCartProList;