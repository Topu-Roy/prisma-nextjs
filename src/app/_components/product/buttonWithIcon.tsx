"use client";
import React from "react";
import { Button } from "../../../components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useCartStore } from "@/zustand/cart/cartStore";
import { addToCart } from "@/actions/cartAction";

type Props = {
  children: React.JSX.Element;
  productId: string;
  quantity: number;
  productTitle: string;
  price: number;
};

export default function ButtonWithIcon(props: Props) {
  const { children, productId, quantity, price, productTitle } = props;
  const { getUser } = useKindeBrowserClient()
  const user = getUser();
  const { toast } = useToast();
  const router = useRouter();

  const products_store = useCartStore((store) => store.products);
  const setProducts_store = useCartStore((store) => store.setProducts);

  async function handleAddToCart() {
    if (!user) {
      return toast({
        variant: "destructive",
        title: "Please login first",
        description: "Oh no, you are not logged in...!",
      });
    }

    const response = await addToCart({
      authId: user?.id,
      price: price,
      productId: productId,
      productTitle: productTitle,
      quantity: quantity,
    }).finally(() => {
      router.refresh();
    })

    if (!response) {
      return toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    }

    if (response.action === "alreadyInCart") {
      return toast({
        title: "Already in cart",
        description: "Product already exist in the cart",
      });
    }

    if (response.action === "updated") {
      setProducts_store(
        products_store.map((product) =>
          product.id === productId
            ? { ...product, ...response.product }
            : product,
        ),
      );

      toast({
        title: "Updated cart",
        description: "Product updated successfully",
      });
    }

    if (response.action === "created") {
      if (response.product) {
        setProducts_store([...products_store, response.product]);
      }
      toast({
        title: "Added to cart",
        description: "Product successfully added to cart",
      });
    }
  }

  return (
    <Button
      onClick={() => handleAddToCart()}
      className="flex items-center justify-center rounded-full bg-white p-2 text-gray-700 hover:text-white"
    >
      {children}
    </Button>
  );
}
