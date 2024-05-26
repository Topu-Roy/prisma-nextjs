"use client";
import React, { useEffect, useState } from "react";
import Chip from "./chip";
import UpdateQuantity from "./updateQuantity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type CartProduct, type Product } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useCartStore } from "@/zustand/cart/cartStore";
import Link from "next/link";
import { Check, CheckCheck } from "lucide-react";
import { deleteCartItem, getCartItemById } from "@/actions/cartAction";

type Props = {
  cartItemId: string;
  productId: string;
  isSelected: boolean;
  quantity: number;
  setProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
};

export default function CartItem(props: Props) {
  const { productId, isSelected, quantity, cartItemId, setProducts } = props;
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(product?.price);
  const [dialogOpen, setDialogOpen] = useState(false);

  //* Zustand
  const products_store = useCartStore((store) => store.products);
  const setProducts_store = useCartStore((store) => store.setProducts);
  const removeProductById_store = useCartStore((store) => store.removeProductById);

  const { toast } = useToast();

  //* Abstracted for linting purposes
  function setProduct_opt() {
    setProducts(products_store);
  }

  useEffect(() => {
    setProduct_opt()
  }, [products_store]);

  useEffect(() => {
    async function getCartItemInfo() {
      await getCartItemById({ id: productId }).then((data) => {
        if (data) setProduct(data.product);
      })
    }

    void getCartItemInfo();
  }, [productId]);

  async function handleRemove() {
    setIsLoading(true);
    const response = await deleteCartItem({ id: cartItemId }).finally(() => {
      setIsLoading(false);
      dialogOpen && setDialogOpen(!dialogOpen)
    });

    if (response.success === true) {
      removeProductById_store(productId);
      return toast({
        title: "Removed from cart",
        description: "Product successfully removed from cart",
      });
    }

    if (response.success === false) {
      return toast({
        variant: "destructive",
        title: "Failed to remove from cart",
        description: "Failed to remove product from cart",
      });
    }
  }

  function handleCheck() {
    setProducts_store(
      products_store.map((item) =>
        item.id !== cartItemId
          ? item
          : { ...item, isSelected: !item.isSelected },
      ),
    );
  }

  if (product === undefined) return <div className="mt-[5rem]">Loading...</div>;
  if (product === null) return null;

  return (
    <>
      <div
        className={cn(
          "rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6",
          isSelected ? "ring-2 ring-primary/90" : "",
        )}
      >
        <div className="space-y-4 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:space-y-0">
          <Link href={`/shop/${productId}`}>
            <div className="shrink-0 lg:order-1">
              <Image
                className="size-36 rounded-md"
                src={product.image ?? ""}
                alt={product.productTitle}
                height={300}
                width={300}
              />
            </div>
          </Link>

          <div className="flex sm:hidden lg:flex items-center justify-between lg:order-3 lg:justify-end">
            <div className="flex items-center">
              <UpdateQuantity
                price={product.price}
                setTotalPrice={setTotalPrice}
                cartItemId={cartItemId}
                quantity={quantity}
              />
            </div>

            <div className="text-end lg:order-4 lg:w-32">
              <p className="text-base font-bold text-gray-900 dark:text-white">
                ${totalPrice}
              </p>
            </div>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-4 lg:order-2 lg:max-w-md">
            <div className="space-y-2">
              <Link href={`/shop/${product.id}`}>
                <p className="line-clamp-2 text-base font-medium text-gray-900 hover:underline dark:text-white">
                  {product.productTitle}
                </p>
              </Link>
              <div className="flex items-center justify-start gap-2">
                {product.color ? <Chip text={product.color} /> : null}
                {product.category ? <Chip text={product.category} /> : null}
                {product.status ? <Chip text={product.status} /> : null}
                {product.tag ? <Chip text={product.tag} /> : null}
              </div>
              <p className="text-base font-bold text-gray-900 dark:text-white">
                ${product.price}
              </p>

              <div className="hidden sm:flex lg:hidden items-center justify-start gap-4">
                <div className="flex items-center">
                  <UpdateQuantity
                    price={product.price}
                    setTotalPrice={setTotalPrice}
                    cartItemId={cartItemId}
                    quantity={quantity}
                  />
                </div>

                <div className="text-end lg:order-4 lg:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    (${totalPrice})
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 px-2">
              <label className="flex items-center justify-between">
                <input
                  className="peer h-[2.5rem] w-[45vw] sm:w-[11rem] opacity-0"
                  type="checkbox"
                  checked={isSelected ?? false}
                  onChange={() => handleCheck()}
                />
                <Button
                  variant="outline"
                  className={cn(
                    "pointer-events-none w-[45%] sm:w-[11rem] h-[2.5rem] absolute text-sm font-medium peer-hover:bg-green-200 text-green-600 hover:underline",
                    {
                      "bg-green-200 peer-hover:bg-green-300/80": isSelected,
                    },
                  )}
                  size={"sm"}
                >
                  {isSelected ? (
                    <CheckCheck
                      size={30}
                      className={cn("pr-1",
                        isSelected
                          ? "bg-green-200 text-green-900 peer-hover:bg-green-300/80"
                          : "",
                      )}
                    />
                  ) : (
                    <Check className="pr-1" size={30} />
                  )}
                  {isSelected ? "Selected" : "Select"}
                </Button>
              </label>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant={"link"}
                    className="flex w-[45%] sm:w-[11rem] items-center justify-center gap-2 text-sm font-medium text-red-600 hover:underline hover:text-red-600 hover:bg-red-200"
                  >
                    <svg
                      className="me-1.5 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    Remove
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      Delete{" "}
                      <span className="font-semibold">
                        {product.productTitle}
                      </span>{" "}
                      from the cart.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <Button
                      type="submit"
                      variant="ghost"
                      onClick={() => handleRemove()}
                      className="flex-1 rounded-full bg-rose-300 p-0 shadow-sm hover:bg-rose-400"
                      size={"lg"}
                    >
                      {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
