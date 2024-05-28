"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { Product } from '@prisma/client';
import { getPaginatedProducts, getTotalProductCount } from '@/actions/productAction';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductDashboard() {
    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const searchParams = useSearchParams();

    // Pagination
    const perPage = parseInt(searchParams.get('perPage') ?? "10");
    const currentPage = parseInt(searchParams.get('currentPage') ?? "1");
    const totalPages = Math.ceil(totalProducts / perPage);

    const PaginationButtons: React.ReactElement[] = [];

    for (let i = 1; i <= totalPages; i++) {
        PaginationButtons.push(
            <Link
                href={`/dashboard/products?perPage=${perPage}&currentPage=${i}`}
                key={i}
            >
                <Button
                    variant={currentPage === i ? "default" : "outline"}
                >
                    {i}
                </Button>
            </Link>
        );
    }

    //* Get total number of products on mount
    useEffect(() => {
        async function totalProductsCount() {
            const total = await getTotalProductCount();
            setTotalProducts(total);
        }

        void totalProductsCount();
    }, [])

    //* Fill products if searchParams is changed
    useEffect(() => {
        const getProducts = async () => {
            const response = await getPaginatedProducts({
                currentPage,
                perPage
            })

            if (response) {
                setProducts(response)
            }
        }

        void getProducts();
    }, [currentPage, perPage])

    return (
        <main className='max-w-5xl mx-auto'>
            <div className="space-y-3 divide-y">
                {products.map((product, index) => (
                    <div key={product.id} className="">
                        <ol>
                            <span>{index + 1}</span>
                            <li>{product.productTitle}</li>
                            <span>{product.price}</span>
                        </ol>
                    </div>
                ))}
                <div className="flex justify-center items-center gap-2">{PaginationButtons}</div>
            </div>
        </main>
    )
}
