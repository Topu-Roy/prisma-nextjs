"use client";
import React, { useEffect, useState } from "react";
import { type CartProduct } from "@prisma/client";
import CartItem from "./cartItem";
import { useCartStore } from "@/zustand/cart/cartStore";

type Props = {
  products: CartProduct[];
};

export default function RenderCart({ products: productsFromProp }: Props) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const setProducts_store = useCartStore((state) => state.setProducts);
  const products_store = useCartStore((state) => state.products);

  // Set products in store once on mount
  useEffect(() => {
    setProducts_store(productsFromProp);
    setLoading(false);
  }, [productsFromProp, setProducts_store]);

  // Sync local products state with store
  useEffect(() => {
    setProducts(products_store);
  }, [products_store]);

  if (loading) {
    return <div className="w-[55rem]">Loading...</div>;
  }

  return (
    <div className="lg:w-[55rem] w-[95%] mx-auto space-y-2">
      {products.map((item) => (
        <div key={item.id}>
          <CartItem
            setProducts={setProducts}
            cartItemId={item.id}
            quantity={item.quantity}
            isSelected={item.isSelected}
            productId={item.id}
          />
        </div>
      ))}
    </div>
  );
}
