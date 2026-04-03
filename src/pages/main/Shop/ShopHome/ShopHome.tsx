import {
  useShopHomeApiCategoryListsQuery,
} from "@/redux/api/shopApi/shopHomeApi";
import ShopCategory from "./ShopCategory";
import ShopProductCards from "../ShopProduct/ShopProductCards";
import ShopBanner from "./ShopBanner";
import AppSection from "@/components/AppSection";
import { useGetProductListsQuery } from "@/redux/api/shopApi/shopProductApi";

const ShopHome = () => {
  // Aliasing destructuring to handle multiple hooks
  const {
    data: productData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductListsQuery({ type: "new" });
  const {
    data: categoryData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useShopHomeApiCategoryListsQuery();

  const isLoading = isProductsLoading || isCategoriesLoading;
  const isError = isProductsError || isCategoriesError;

  if (isLoading)
    return <div className="flex justify-center p-10">Loading Store...</div>;
  if (isError)
    return (
      <div className="text-destructive text-center p-10">
        Failed to load shop data.
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 flex flex-col gap-16 md:gap-20 lg:gap-24">
      <ShopBanner />

      <ShopCategory categories={categoryData?.product_categories || []} />

      <ShopProductCards products={productData?.products || []} />

      <AppSection />
      <ShopProductCards products={productData?.products || []} />
    </div>
  );
};

export default ShopHome;
