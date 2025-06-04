import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";

export default function Home() {
  return (
    <>
      <ProductList
        data={sampleData.products}
        limit={4}
        title="Newest Arrivals"
      />
    </>
  );
}
