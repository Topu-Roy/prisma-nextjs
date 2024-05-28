"use server"

import { db } from "@/server/db";
import { type Product, type Category } from "@prisma/client";

export async function getAllProducts() {
    const products = await db.product.findMany()

    return products;
}

export async function getPaginatedProducts({ currentPage, perPage }: { currentPage: number, perPage: number }) {
    const products = await db.product.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage
    })

    return products;
}

export async function getTotalProductCount() {
    const total = await db.product.count();

    return total;
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

type ReturnTypeForCreateProduct = Promise<{
    status: "NOT_FOUND" | "NOT_ADMIN" | "FAILED" | "SUCCESS";
    product: Product | null;
}>

export async function createProduct(productDetails: Omit<Omit<Product, 'id'>, 'image'>): ReturnTypeForCreateProduct {

    //* First check if the user exists
    const user = await db.user.findFirst({
        where: {
            authId: productDetails.createdBy
        }
    })

    if (!user) return { status: 'NOT_FOUND', product: null };
    if (user.role !== 'ADMIN') return { status: 'NOT_ADMIN', product: null };

    //* Then create the product
    const createNewProduct = await db.product.create({
        data: {
            ...productDetails
        }
    })

    if (!createNewProduct) return { status: 'FAILED', product: null };

    return { status: 'SUCCESS', product: createNewProduct };
}

type ReturnTypeForUpdateImageUrl = Promise<{
    status: "NOT_FOUND" | "FAILED" | "SUCCESS";
    product: Product | null;
}>

export async function updateImageUrl({ imageUrl, productId }: { imageUrl: string, productId: string }): ReturnTypeForUpdateImageUrl {

    const product = await db.product.findFirst({
        where: {
            id: productId
        }
    })

    if (!product) return { status: "NOT_FOUND", product: null };

    const updatedProduct = await db.product.update({
        where: {
            id: productId
        },
        data: {
            image: imageUrl
        }
    })

    if (!updatedProduct) return { status: 'FAILED', product: null }

    return { status: "SUCCESS", product: updatedProduct };
}

export async function getProductNeedUpdate_description() {
    //* If description is empty
    const products = await db.product.findMany({
        where: {
            description: ""
        }
    })

    return products;
}