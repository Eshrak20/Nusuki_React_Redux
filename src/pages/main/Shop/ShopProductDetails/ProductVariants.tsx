import { useMemo } from "react";
import type { ProductOption, Variant } from "@/types/shop/types.productDetail";

interface Props {
  variants: Variant[];
  options: ProductOption[]; // Changed from OptionValue[] to ProductOption[]
  selectedVariant: Variant;
  setVariant: (variant: Variant) => void;
}

const ProductVariants = ({ variants, options, selectedVariant, setVariant }: Props) => {
  // 1. Derive active options from the selected variant
  const activeOptions = useMemo(() => {
    return selectedVariant?.options?.reduce((acc, optVal) => {
      // In your JSON, the ID to match against is option_id
      acc[optVal.option_id] = optVal.value;
      return acc;
    }, {} as Record<string, string>) || {};
  }, [selectedVariant]);

  // 2. Selection Handler
  const handleSelect = (optionId: string, value: string) => {
    const newSelection = { ...activeOptions, [optionId]: value };

    // Find exact match
    let newVariant = variants.find((v) =>
      v.options.every((opt) => newSelection[opt.option_id] === opt.value)
    );

    // Fallback: Find any variant that has this specific option value
    if (!newVariant) {
      newVariant = variants.find((v) =>
        v.options.some((opt) => opt.option_id === optionId && opt.value === value)
      );
    }

    if (newVariant) {
      setVariant(newVariant);
    }
  };

  return (
    <div className="space-y-6">
      {options?.map((opt) => {
        const isColorOpt = opt.title.toLowerCase().includes("color");

        return (
          <div key={opt.id} className="space-y-4">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              {opt.title}
            </h4>

            <div className="flex flex-wrap gap-3">
              {opt.values.map((val) => {
                // Check selection using the parent option ID
                const isSelected = activeOptions[opt.id] === val.value;

                if (isColorOpt) {
                  const colorThumbnail = variants.find((v) =>
                    v.options.some((o) => o.option_id === opt.id && o.value === val.value)
                  )?.thumbnail;

                  return (
                    <button
                      key={val.id}
                      onClick={() => handleSelect(opt.id, val.value)}
                      className={`relative w-14 h-14 rounded-sm border-2 overflow-hidden transition-all ${
                        isSelected
                          ? "border-orange-500"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {colorThumbnail && (
                        <img
                          src={colorThumbnail}
                          alt={val.value}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {isSelected && (
                        <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-[2px]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                }

                return (
                  <button
                    key={val.id}
                    onClick={() => handleSelect(opt.id, val.value)}
                    className={`
                      min-w-[80px] px-6 py-3 text-sm font-bold rounded-full border transition-all duration-200 
                      flex items-center justify-center shadow-sm
                      ${isSelected
                        ? "bg-[#002261] border-[#002261] text-white dark:bg-white dark:text-black shadow-md"
                        : "bg-white border-gray-200 text-gray-700 hover:border-[#002261] dark:bg-transparent dark:border-gray-700 dark:text-gray-300"
                      }
                    `}
                  >
                    {val.value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariants;