"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useCartStore } from "@/zustand/cart/cartStore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { type addToCartBodyType, addToCartResponseSchema } from "@/zod/cart/addToCart";
import axios from "axios";

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

    const res = await axios
      .post(
        "http://localhost:3000/api/cart/addToCart",
        {
          authId: user?.id,
          price: price,
          productId: productId,
          productTitle: productTitle,
          quantity: quantity,
        } satisfies addToCartBodyType,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .finally(() => {
        setIsLoading(false);
      });

    const validatedData = addToCartResponseSchema.parse(res.data);

    if (validatedData.action === "alreadyInCart") {
      return toast({
        title: "Already in cart",
        description: "Product already exist in the cart",
      });
    }

    if (validatedData.action === "updated") {
      setProducts_store(
        products_store.map((product) =>
          product.id === productId
            ? { ...product, ...validatedData.product }
            : product,
        ),
      );

      toast({
        title: "Updated cart",
        description: "Product updated successfully",
      });
    }

    if (validatedData.action === "created") {
      if (validatedData.product) {
        setProducts_store([...products_store, validatedData.product]);
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
