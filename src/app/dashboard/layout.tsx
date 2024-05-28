"use client"
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();
    return (
        <div className='mt-[5rem] max-w-[100rem] mx-auto py-20'>
            <div className="flex">
                <aside className='w-[15rem] bg-slate-700 rounded-md p-4 flex flex-col justify-start items-start gap-3'>
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
                    <Link className='w-full' href={'/dashboard/create'}>
                        <Button variant={'link'} className='text-white font-semibold'>
                            Sales
                        </Button>
                    </Link>
                    <Link className='w-full' href={'/dashboard/create'}>
                        <Button variant={'link'} className='text-white font-semibold'>
                            Orders
                        </Button>
                    </Link>
                    {path}
                </aside>
                <div className="flex-1 mx-auto">
                    {children}
                </div>
            </div>

        </div>
    );
}
