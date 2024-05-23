"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/zustand/cart/cartStore";

export default function SelectAllAndReset() {
  const products_store = useCartStore((store) => store.products);
  const setProducts_store = useCartStore((store) => store.setProducts);

  function handleSelectAll() {
    setProducts_store(
      products_store.map((item) => ({
        ...item,
        isSelected: true,
      })),
    );
  }

  function handleReset() {
    setProducts_store(
      products_store.map((item) => ({
        ...item,
        isSelected: false,
      })),
    );
  }

  return (
    <>
      <div className="mx-auto lg:w-[55rem] xl:w-[80rem] lg:pl-0 px-3 sm:px-4 flex max-w-7xl items-start justify-start gap-2 pb-4">
        <Button
          variant={"outline"}
          onClick={() => handleSelectAll()}
          className="hover:scale-105"
        >
          Select All
        </Button>
        <Button
          variant={"outline"}
          onClick={() => handleReset()}
          className="hover:scale-105"
        >
          Reset
        </Button>
      </div>
    </>
  );
}
