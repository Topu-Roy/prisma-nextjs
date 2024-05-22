"use client";
import React from "react";
import { Button } from "../../../components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useCartStore } from "@/zustand/cart/cartStore";
import { addToCartBodySchema, addToCartResponseSchema } from "@/zod/cart/addToCart";
import { TypeOf } from "zod";

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
      router.refresh();
      return validatedData;
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

  // const { mutate } = api.cart.createNewCartItem.useMutation({
  //   onSuccess: () => {
  //     router.refresh();
  //     toast({
  //       title: "Added to cart",
  //       description: "Product successfully added to cart",
  //     });
  //   },
  //   onError: () => {
  //     toast({
  //       variant: "destructive",
  //       title: "Something went wrong",
  //       description: "Product not added to cart",
  //     });
  //   },
  // });

  // const handleClick = () => {
  //   if (!user) {
  //     return toast({
  //       variant: "destructive",
  //       title: "Please login first",
  //       description: "Oh no, you are not logged in",
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
      className="flex items-center justify-center rounded-full bg-white p-2 text-gray-700 hover:text-white"
    >
      {children}
    </Button>
  );
}
