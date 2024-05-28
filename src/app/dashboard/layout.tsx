"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { getUserDetailsByAuthId } from '@/actions/userAction';
import { Heading } from '../_components/heading';

function LinkItem({ url, className, name }: { url: string, className?: string, name: string }) {
    return (
        <Link className='w-full' href={url}>
            <Button
                variant={'ghost'}
                className={cn('text-white font-semibold w-full', className)}
            >
                {name}
            </Button>
        </Link >
    )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const path = usePathname();
    const { getUser, isLoading: isUserInfoLoading } = useKindeBrowserClient();
    const user = getUser();
    const router = useRouter();

    useEffect(() => {
        if (isUserInfoLoading === true) return;

        async function checkAdmin() {
            if (!user) return router.push('/api/auth/login?post_login_redirect_url=/home');

            const isAdmin = await getUserDetailsByAuthId({ authId: user?.id });

            if (isAdmin?.role !== 'ADMIN') return router.push('/api/auth/login?post_login_redirect_url=/home');
            setIsLoading(false);
        }

        void checkAdmin();
    }, [isUserInfoLoading])

    if (isLoading) {
        return (
            <div className="mt-[5rem] max-w-[100rem] mx-auto py-20">
                <Heading>
                    Loading...
                </Heading>
            </div>
        )
    }


    return (
        <div className='mt-[5rem] max-w-[100rem] mx-auto py-20'>
            <div className="flex">
                <aside className='w-[15rem] min-h-[60vh] bg-slate-700 rounded-md p-4 flex flex-col justify-start items-start gap-3'>
                    <LinkItem
                        url='/dashboard'
                        className={path.length < 11 ? "bg-white text-black" : ""}
                        name='Dashboard'
                    />
                    <LinkItem
                        url='/dashboard/create'
                        className={path.includes("create") ? "text-black bg-white" : ""}
                        name='Create'
                    />
                    <LinkItem
                        url='/dashboard/products'
                        className={path.includes("products") ? "text-black bg-white" : ""}
                        name='Products'
                    />
                    <LinkItem
                        url='/dashboard/customers'
                        className={path.includes("customers") ? "text-black bg-white" : ""}
                        name='Customers'
                    />
                    <LinkItem
                        url='/dashboard/updates'
                        className={path.includes("updates") ? "text-black bg-white" : ""}
                        name='Edit Products'
                    />
                </aside>
                <div className="flex-1 mx-auto">
                    {children}
                </div>
            </div>

        </div>
    );
}
