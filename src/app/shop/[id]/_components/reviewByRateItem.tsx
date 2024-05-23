import React from 'react'

type Props = {
    rate: number;
    totalReviews: number;
    count: number;
}

export default function ReviewByRateItem({ count, rate, totalReviews }: Props) {
    const percentage = (count / totalReviews) * 100
    return (
        <div className="flex items-center gap-2">
            <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                {rate}
            </p>
            <svg
                className="h-4 w-4 shrink-0 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
            </svg>
            <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                    className="h-1.5 rounded-full bg-yellow-300"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <p
                className="w-8 shrink-0 text-right text-sm font-medium leading-none sm:w-auto sm:text-left"
            >
                {count} <span className="hidden sm:inline">reviews</span>
            </p>
        </div>
    )
}
