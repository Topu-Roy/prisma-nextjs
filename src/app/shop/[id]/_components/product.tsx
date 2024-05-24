import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToCartButtonForRelated from './addToCartButtonForRelated'
import { Button } from '@/components/ui/button'


type ProductProps = {
    productTitle: string,
    description: string,
    price: number,
    productImage: string,
    productId: string,
    userId: string | null,
}

export default function Product({ price, productTitle, productImage, productId, userId }: ProductProps) {
    return (
        <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <Link href={`/shop/${productId}`} className="overflow-hidden rounded">
                <Image
                    className="mx-auto rounded-md"
                    src={productImage}
                    alt={productTitle}
                    height={600}
                    width={600}
                />
            </Link>
            <div>
                <Link href={`/shop/${productId}`} className="text-lg line-clamp-1 font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{productTitle}</Link>
                {/* //*TODO: add description */}
                <p className="mt-2 text-base line-clamp-2 font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
            </div>
            <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${price}
                </p>
            </div>
            <div className="mt-6 flex items-center justify-between gap-2.5">
                <Link href={`/shop/${productId}`}>
                    <Button variant={'outline'} className="flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium  text-black">
                        <svg className="-ms-2 me-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="#000000" version="1.1" id="Ebene_1" width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
                            <g>
                                <path d="M32,15C11.169,15,0.769,30.242,0.336,30.891c-0.448,0.672-0.448,1.547,0,2.219C0.769,33.758,11.169,49,32,49   s31.231-15.242,31.664-15.891c0.448-0.672,0.448-1.547,0-2.219C63.231,30.242,52.831,15,32,15z M32,45   C16.493,45,7.234,35.322,4.512,31.996C7.225,28.663,16.436,19,32,19c15.507,0,24.766,9.678,27.488,13.004   C56.775,35.337,47.564,45,32,45z" />
                                <path d="M32,23c-4.963,0-9,4.038-9,9s4.037,9,9,9s9-4.038,9-9S36.963,23,32,23z M32,37c-2.757,0-5-2.243-5-5s2.243-5,5-5   s5,2.243,5,5S34.757,37,32,37z" />
                            </g>
                        </svg>
                        View
                    </Button>
                </Link>
                <AddToCartButtonForRelated
                    authId={userId}
                    price={price}
                    productId={productId}
                    productTitle={productTitle}
                />
            </div>
        </div>
    )
}
