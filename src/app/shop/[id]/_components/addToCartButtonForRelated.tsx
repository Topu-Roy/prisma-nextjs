"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/zustand/cart/cartStore';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { addToCart } from '@/actions/cartAction';

type Props = {
    authId: string | null;
    productId: string;
    productTitle: string;
    price: number;
};

export default function AddToCartButtonForRelated(props: Props) {
    const { productId, price, productTitle } = props;
    const [isLoading, setIsLoading] = useState(false);

    const { getUser } = useKindeBrowserClient();
    const user = getUser()
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

        setIsLoading(true);

        const response = await addToCart({
            authId: user?.id,
            price: price,
            productId: productId,
            productTitle: productTitle,
            quantity: 1,
        }).finally(() => {
            router.refresh();
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
            className={cn(
                "w-full flex-1 flex items-center justify-center rounded-lg py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4",
                isLoading ? "opacity-90" : "",
            )}
        >
            <svg
                className="-ms-2 me-2 h-5 w-5"
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
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
            </svg>
            Add to cart
        </Button>
    )
}
