//import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export default async function Home() {
  const laestProduct = await getLatestProducts();

  return (
    <>
      <ProductList data={laestProduct} limit={4} title="Newest Arrivals" />
    </>
  );
}
