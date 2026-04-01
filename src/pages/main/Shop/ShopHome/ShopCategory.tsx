import { Card, CardContent } from "@/components/ui/card";
import type { ProductCategory } from "@/types/shop/types.shop";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shop/SectionHeader";

const ShopCategory = ({ categories }: { categories: ProductCategory[] }) => {
  return (
    <section className="">
      <SectionHeader
        title="Shop by Category"
        subtitle="Explore our curated collections designed for your lifestyle."
        viewAllLink="/categories"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8 }}
          >
            <Link to={`/category/${category.id}`}>
              <Card className="group overflow-hidden border-none bg-secondary/10 hover:bg-white dark:hover:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem]">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-muted mb-4 ring-4 ring-transparent group-hover:ring-[#ba9863]/20 transition-all duration-500">
                    <img
                      src={
                        category.metadata?.Image ||
                        "https://placehold.co/400x400"
                      }
                      alt={category.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-125"
                    />
                  </div>
                  <p className="text-sm font-bold text-[#002365] dark:text-gray-200 group-hover:text-[#ba9863] transition-colors text-center">
                    {category.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShopCategory;
