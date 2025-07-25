import { getProductById } from "@/lib/actions/product.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth-guard";
import ProductForm from "@/components/admin/product-from";

export const metadata: Metadata = {
  title: "Update Product",
};

const AdminProductUpdatePage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();

  const { id } = await props.params;

  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="h2-bold">Update Product</h1>

      <ProductForm
        type="Update"
        product={{
          ...product,
          price: product.price.toString(),
          rating: product.rating.toString(),
        }}
        productId={product.id}
      />
    </div>
  );
};

export default AdminProductUpdatePage;
