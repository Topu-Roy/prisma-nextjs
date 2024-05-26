import Link from 'next/link'
import React from 'react'

export default function Dashboard() {
    return (
        <div className='mt-[5rem] max-w-7xl mx-auto py-20'>
            <Link href={'/dashboard/create'}>
                Create
            </Link>
        </div>
    )
}
