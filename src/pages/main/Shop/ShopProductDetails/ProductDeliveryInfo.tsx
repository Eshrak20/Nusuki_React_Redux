import { Truck } from "lucide-react";

const ProductDeliveryInfo = () => {
  return (
    <div className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md transition-all hover:shadow-sm">
      <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
        <Truck size={16} className="text-[#002365] dark:text-primary" />
        Shipping Details
      </h3>
      <div className="text-sm space-y-3">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
          <span className="text-gray-500 dark:text-gray-400">Inside Dhaka</span>
          <span className="font-bold text-gray-900 dark:text-white">৳1,000</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400">Outside Dhaka</span>
          <span className="font-bold text-gray-900 dark:text-white">৳1,500</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDeliveryInfo;