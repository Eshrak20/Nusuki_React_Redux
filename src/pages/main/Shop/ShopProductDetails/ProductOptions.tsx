/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { ProductOption } from "@/types/shop/types.productDetail";

interface Props {
  options: ProductOption[];
}

const ProductOptions = ({ options }: Props) => {
  // Local state just to handle the visual selection of options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleSelect = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  return (
    <div className="space-y-6">
      {options.map((opt) => (
        <div key={opt.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">
              {opt.title}
            </h4>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {opt.values.map((val: any) => {
              const isSelected = selectedOptions[opt.id] === val.id;
              return (
                <button
                  key={val.id}
                  onClick={() => handleSelect(opt.id, val.id)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 border ${
                    isSelected
                      ? "border-[#002365] bg-[#002365] text-white dark:border-white dark:bg-white dark:text-black shadow-md"
                      : "border-gray-200 bg-transparent text-gray-700 hover:border-[#002365] dark:border-gray-700 dark:text-gray-300 dark:hover:border-white"
                  }`}
                >
                  {val.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;