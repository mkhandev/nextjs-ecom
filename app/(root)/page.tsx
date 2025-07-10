//import sampleData from "@/db/sample-data";
import { auth } from "@/auth";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export default async function Home() {
  const laestProduct = await getLatestProducts();

  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  console.log("User ID:", userId);
  console.log(session);

  return (
    <>
      <ProductList data={laestProduct} limit={4} title="Newest Arrivals" />
    </>
  );
}
