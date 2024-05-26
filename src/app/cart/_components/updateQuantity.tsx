"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useDebounce from "@/hooks/debounce";
import { useCartStore } from "@/zustand/cart/cartStore";
import { updateCartItemQuantity } from "@/actions/cartAction";

type Props = {
  cartItemId: string;
  quantity: number;
  price: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function UpdateQuantity(props: Props) {
  const { cartItemId, quantity, price, setTotalPrice } = props;

  const [quantityState, setQuantityState] = useState(quantity);
  const [prevQuantity, setPrevQuantity] = useState(quantity);
  const debouncedQuantity = useDebounce(quantityState, 300);

  const products_store = useCartStore((store) => store.products);
  const setProducts_store = useCartStore((store) => store.setProducts);

  const { toast } = useToast();

  function handleQuantityChange({ action }: { action: "increment" | "decrement" }) {
    if (action === "decrement" && quantity === 1) {
      return;
    }

    if (action === "increment") {
      setQuantityState(quantityState + 1);
    }

    if (action === "decrement") {
      setQuantityState(quantityState - 1);
    }
  }

  useEffect(() => {
    async function handleUpdateQuantity() {
      try {
        const response = await updateCartItemQuantity({
          id: cartItemId,
          quantity: debouncedQuantity,
        }).catch(err => console.log(err));

        if (response) {
          setPrevQuantity(quantityState);
          setProducts_store(
            products_store.map((product) =>
              product.id === cartItemId
                ? { ...product, quantity: quantityState }
                : product
            )
          );
        } else {
          setQuantityState(prevQuantity);
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Failed to update the quantity",
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          setQuantityState(prevQuantity);
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Something went wrong while updating the quantity",
          });
        }
      }
    }

    void handleUpdateQuantity()
  }, [debouncedQuantity]);

  useEffect(() => {
    setTotalPrice(quantityState * price);
  }, [quantityState, price, setTotalPrice]);

  return (
    <div className="flex items-center">
      <Button
        onClick={() => handleQuantityChange({ action: "decrement" })}
        className="flex size-6 items-center justify-center rounded-md border border-gray-300 bg-gray-100 p-0 hover:bg-gray-200"
      >
        <svg
          className="size-3 text-gray-900/75"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </Button>
      <input
        type="text"
        id="counter-input"
        data-input-counter
        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
        placeholder=""
        value={quantityState}
        required
      />
      <Button
        onClick={() => handleQuantityChange({ action: "increment" })}
        className="flex size-6 items-center justify-center rounded-md border border-gray-300 bg-gray-100 p-0 hover:bg-gray-200"
      >
        <svg
          className="size-3 text-gray-900/75"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </Button>
    </div>
  );
}
