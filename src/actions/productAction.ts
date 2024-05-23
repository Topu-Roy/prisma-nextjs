"use server"

import { db } from "@/server/db";
import { type Category } from "@prisma/client";

export async function getAllProducts() {
    const products = await db.product.findMany()

    return products;
}

export async function getProductById({ id }: { id: string }) {
    const product = await db.product.findFirst({
        where: {
            id
        }
    })

    return product;
}

export async function getProductByIdWithReviews({ id }: { id: string }) {
    const product = await db.product.findFirst({
        where: {
            id
        },
        include: {
            review: true
        }
    })

    return product;
}

export async function getProductsByCategory({ category }: { category: Category }) {
    const products = await db.product.findMany({
        where: {
            category
        }
    })

    return products;
}

export async function getProductReviewCountByRating({ productId, rate }: { productId: string, rate: number }) {
    const count = await db.review.count({
        where: {
            productId,
            rate
        }
    })

    return count;
}