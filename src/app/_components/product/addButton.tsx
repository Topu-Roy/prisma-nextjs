"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
// import { api } from "@/trpc/react";
import { useCartStore } from "@/zustand/cart/cartStore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { z, TypeOf } from "zod";
import { addToCartBodySchema, addToCartResponseSchema } from "@/zod/cart/addToCart";

type Props = {
  productId: string;
  quantity: number;
  className?: string;
  productTitle: string;
  price: number;
};

export default function AddButton(props: Props) {
  const { productId, quantity, className, price, productTitle } = props;

  const [isLoading, setIsLoading] = useState(false)

  const products_store = useCartStore((store) => store.products);
  const setProducts_store = useCartStore((store) => store.setProducts);

  const { toast } = useToast();
  const { getUser } = useKindeBrowserClient()
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

    const response = await fetch('/api/cart/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authId: user?.id,
        price: price,
        productId: productId,
        productTitle: productTitle,
        quantity: quantity,
      } as TypeOf<typeof addToCartBodySchema>)
    }).then((res) => {
      const jsonData = res.json();
      const validatedData = addToCartResponseSchema.parse(jsonData);
      return validatedData;
    }).finally(() => {
      setIsLoading(false)
    })

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



  // const { mutate, isPending, data } = api.cart.createNewCartItem.useMutation();

  // function giveFeedback() {
  //   if (data === undefined) return;

  //   if (data) {
  //     if (data.action === "alreadyInCart") {
  //       return toast({
  //         title: "Already in cart",
  //         description: "Product already exist in the cart",
  //       });
  //     }

  //     if (data.action === "updated") {
  //       setProducts_store(
  //         products_store.map((product) =>
  //           product.id === productId
  //             ? { ...product, ...data.updatedCartProduct }
  //             : product,
  //         ),
  //       );
  //       toast({
  //         title: "Updated cart",
  //         description: "Product updated successfully",
  //       });
  //     }

  //     if (data.action === "created") {
  //       if (data.createdCartProduct) {
  //         setProducts_store([...products_store, data.createdCartProduct]);
  //       }
  //       toast({
  //         title: "Added to cart",
  //         description: "Product successfully added to cart",
  //       });
  //     }
  //   }
  // }

  // useEffect(() => {
  //   giveFeedback();
  // }, [data]);

  // const handleClick = () => {
  //   if (!user) {
  //     return toast({
  //       variant: "destructive",
  //       title: "Please login first",
  //       description: "Oh no, you are not logged in...!",
  //     });
  //   }

  //   mutate({
  //     productId,
  //     authId: user.id,
  //     productTitle,
  //     price,
  //     quantity,
  //   });
  // };

  return (
    <Button
      onClick={() => handleAddToCart()}
      size="lg"
      className={cn("rounded-md font-bold", className)}
    >
      {isLoading ? (
        "Adding to cart"
      ) : (
        "Add to cart"
      )}
    </Button>
  );
}
