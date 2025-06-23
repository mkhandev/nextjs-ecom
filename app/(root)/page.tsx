import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";

import { getLatestProducts } from "@/lib/actions/product.actions";
import { log } from "console";

export default async function Home() {
  const laestProduct = await getLatestProducts();

  console.log("Latest Products:", laestProduct);

  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  return (
    <>
      <ProductList data={laestProduct} limit={4} title="Newest Arrivals" />
    </>
  );
}
