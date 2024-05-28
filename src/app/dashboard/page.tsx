"use client"
import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { Text } from '../_components/text'
import { getTotalProductCount } from '@/actions/productAction'
import { getTotalUsersCount } from '@/actions/userAction';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useRouter } from 'next/navigation'
import { PencilRuler, Shirt, UsersRound } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Dashboard() {
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const { getUser, isLoading } = useKindeBrowserClient();
    const user = getUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        async function getInfo() {
            const totalProducts = await getTotalProductCount();
            const totalUsers = await getTotalUsersCount({ authId: user?.id! });

            if (!totalUsers || totalUsers === null) return router.push('/api/auth/login?post_login_redirect_url=/home');

            setTotalProducts(totalProducts);
            setTotalUsers(totalUsers);
        }

        void getInfo();
    }, [isLoading])


    return (
        <main>
            <CardComponent
                title='Total products'
                count={totalProducts}
                icon={<Shirt />}
            />
            <CardComponent
                title='Total users'
                count={totalUsers}
                icon={<UsersRound />}
            />
            <CardComponent
                title='Updated needed'
                count={totalUsers}
                icon={<PencilRuler />}
            />
        </main>
    )
}

type CardComponentPropsType = {
    count: number,
    title: string,
    icon: React.ReactElement,
    iconClassName?: string
}

function CardComponent({ count, title, icon, iconClassName }: CardComponentPropsType) {
    return (
        <Card className='max-w-[15rem] p-4 text-left space-y-3'>
            <div className="flex justify-between items-center">
                <Text muted size='md' className='font-bold'>
                    {title}
                </Text>
                <span className={cn('text-black/40', iconClassName)}>
                    {icon}
                </span>
            </div>
            <Text size='max' className='font-bold text-black/90'>
                {count}
            </Text>
        </Card>
    )
}
