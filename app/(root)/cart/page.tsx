import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "./cart-table";

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};

export default CartPage;
