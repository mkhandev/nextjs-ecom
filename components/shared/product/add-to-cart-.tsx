"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { CartItem } from "@/types";
import { toast } from "sonner";

import { AddItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handelAddToCart = async () => {
    const res = await AddItemToCart(item);

    if (!res.success) {
      toast.error("Something went wrong", {
        description: "Could not add item to cart.",
      });
      return;
    }

    // Handle success add to cart
    toast(res.message, {
      // description: "",
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handelAddToCart}>
      <Plus className="w-4 h-4" /> Add To Cart
    </Button>
  );
};

export default AddToCart;
