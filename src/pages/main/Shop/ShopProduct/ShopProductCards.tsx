import { motion } from "framer-motion";
import type { Product } from "@/types/shop/types.shop";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/shop/SectionHeader";
import type { Dispatch, SetStateAction } from "react";

interface ShopProductCardsProps {
  products: Product[];
  offset: Dispatch<SetStateAction<number>>;
}

const ShopProductCards = ({ products, offset }: ShopProductCardsProps) => {

  return (
    <section className="">
      <SectionHeader
        title="New Arrivals"
        subtitle="Premium quality products curated specifically for our community."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={`/shop/products/${product.id}`}
              className="group block relative bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Product Image */}
              <div className="relative aspect-4/5 overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Modern Price Badge */}
                <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md text-[#002365] px-4 py-2 rounded-2xl text-sm font-black shadow-sm ring-1 ring-black/5">
                  ৳{product.price.toLocaleString()}
                </div>

                {/* Glassmorphism Hover Button */}
                <div className="absolute inset-0 bg-[#002365]/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[3px]">
                  <span className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                    View Detail
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">
                    {product.brand || "HavenHood"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#002365] dark:text-gray-100 line-clamp-1 mb-4 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>

                <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through font-medium">
                      ৳{(product.price * 1.2).toFixed(0)}
                    </span>
                    <span className="text-2xl font-black text-[#002365] dark:text-white">
                      ৳{product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-12 w-12 rounded-2xl bg-[#002365] text-white flex items-center justify-center group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Static Show More Button */}
      <div className="mt-16 flex justify-center pb-8">
        <button onClick={() => offset((prev) => prev + 8)} className="flex items-center gap-3 px-8 py-4 bg-primary dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 text-white hover:opacity-90 rounded-full font-bold dark:hover:bg-gray-800 transition-colors shadow-sm">
          <svg
            className="animate-spin h-5 w-5 text-primary hidden" 
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Show More Products
        </button>
      </div>
    </section>
  );
};

export default ShopProductCards;