import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.action";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { Decimal } from "@prisma/client/runtime/library";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) notFound();

  function normalizeDecimal(value: unknown): string {
    if (typeof value === "string") return value;
    if (typeof value === "number") return value.toFixed(2);
    if (value instanceof Decimal) return value.toFixed(2);
    return "0.00"; // fallback
  }

  return (
    <>
      <OrderDetailsTable
        order={{
          ...order,
          itemsPrice: normalizeDecimal(order.itemsPrice),
          shippingPrice: normalizeDecimal(order.shippingPrice),
          taxPrice: normalizeDecimal(order.taxPrice),
          totalPrice: normalizeDecimal(order.totalPrice),
          orderitems: order.orderitems.map((item) => ({
            ...item,
            price: normalizeDecimal(item.price),
          })),
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
      />
    </>
  );
};

export default OrderDetailsPage;
