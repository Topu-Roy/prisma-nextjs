"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/zustand/cart/cartStore";
import { ShoppingCart } from "lucide-react";

export default function CartIconWithUser() {
  const [willShow, setWillShow] = useState(false);
  const products_store = useCartStore((store) => store.products);

  useEffect(() => {
    if (products_store.length > 0) {
      setWillShow(true);
    } else {
      setWillShow(false);
    }
  }, [products_store]);

  return (
    <Link href={"/cart"}>
      <Button variant={"ghost"} className="relative p-1">
        <ShoppingCart />
        <div
          className={cn(
            "absolute -right-[5%] top-[20%] z-[51] hidden h-2 w-2 rounded-full bg-destructive",
            willShow ? "block" : "",
          )}
        />
      </Button>
    </Link>
  );
}
