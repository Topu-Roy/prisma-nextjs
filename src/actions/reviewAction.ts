"use server"

import { db } from "@/server/db";

type CreateReviewPropsType = {
    authId: string,
    productId: string,
    name: string,
    rate: number,
    description: string,
}

export async function createRevive({ authId, description, name, productId, rate }: CreateReviewPropsType) {
    const user = await db.user.findFirst({
        where: {
            authId,
        },
    })

    if (!user) return null;

    const createdReview = await db.review.create({
        data: {
            text: description,
            userId: user.id,
            productId: productId,
            name: name,
            rate: rate,
        }
    })

    return createdReview;
}