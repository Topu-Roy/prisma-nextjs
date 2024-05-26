'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function UpdateImage() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    return (
        <div className='mt-[4rem] py-20 max-w-7xl mx-auto'>{id}</div>
    )
}
