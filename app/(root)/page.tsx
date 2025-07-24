//import sampleData from "@/db/sample-data";
import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icon-boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

export default async function Home() {
  const laestProduct = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 1 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={laestProduct} limit={4} title="Newest Arrivals" />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </>
  );
}
