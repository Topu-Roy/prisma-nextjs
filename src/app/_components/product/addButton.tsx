"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useCartStore } from "@/zustand/cart/cartStore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { addToCart } from "@/actions/cartAction";

type Props = {
  productId: string;
  quantity: number;
  className?: string;
  productTitle: string;
  price: number;
};

export default function AddButton(props: Props) {
  const { productId, quantity, className, price, productTitle } = props;

  const [isLoading, setIsLoading] = useState(false);

  const products_store = useCartStore((store) => store.products);
  const setProducts_store = useCartStore((store) => store.setProducts);

  const { toast } = useToast();
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  async function handleAddToCart() {
    if (!user) {
      return toast({
        variant: "destructive",
        title: "Please login first",
        description: "Oh no, you are not logged in...!",
      });
    }

    setIsLoading(true);

    const response = await addToCart({
      authId: user.id,
      price: price,
      productId: productId,
      productTitle: productTitle,
      quantity: quantity,
    }).finally(() => {
      setIsLoading(false);
    });

    if (!response) {
      return toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      })
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
      size="lg"
      className={cn("rounded-md font-bold", className)}
    >
      {isLoading ? "Adding to cart" : "Add to cart"}
    </Button>
  );
}
