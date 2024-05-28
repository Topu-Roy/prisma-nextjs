"use client"

import React, { useEffect, useState } from 'react'
import { getAllProducts, getTotalProductCount } from '@/actions/productAction'
import { getTotalUsersCount } from '@/actions/userAction';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useRouter } from 'next/navigation'
import { PencilRuler, Shirt, UsersRound } from 'lucide-react'
import CardComponent from './_components/cardComponent'
import { Product } from '@prisma/client';
import { z } from 'zod';
import Link from 'next/link';

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [needChangeCount, setNeedChangeCount] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const { getUser, isLoading } = useKindeBrowserClient();
    const user = getUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        async function getInfo() {
            const allProducts = await getAllProducts();
            const totalProducts = await getTotalProductCount();
            const totalUsers = await getTotalUsersCount({ authId: user?.id! });

            if (!totalUsers || totalUsers === null) return router.push('/api/auth/login?post_login_redirect_url=/home');

            setTotalProducts(totalProducts);
            setTotalUsers(totalUsers);
            setProducts(allProducts);
        }

        void getInfo();
    }, [isLoading])

    useEffect(() => {
        if (isLoading) return;

        const imageUrlSchema = z.object({
            imageUrl: z.string().url()
        })

        //* Check if product description is empty
        const productsWithEmptyDescription = products.map((product) => {
            if (product.description === '') return product;
        })

        //* Check if product ImageUrl is not a valid URL
        const productsWithInvalidImageUrl = products.map((product) => {
            const parsedUrl = imageUrlSchema.safeParse(product.image);

            if (parsedUrl.error) return product;
        })

        setNeedChangeCount(productsWithEmptyDescription.length + productsWithInvalidImageUrl.length);
    }, [products, isLoading])

    return (
        <main className='max-w-5xl mx-auto flex justify-between items-center gap-4'>
            <CardComponent
                link='/dashboard/products'
                title='Total products'
                count={totalProducts}
                icon={<Shirt />}
            />
            <CardComponent
                link='/dashboard/users'
                title='Total users'
                count={totalUsers}
                icon={<UsersRound />}
            />
            <CardComponent
                link='/dashboard/updates'
                title='Need updates'
                count={needChangeCount}
                icon={<PencilRuler />}
            />
        </main>
    )
}
