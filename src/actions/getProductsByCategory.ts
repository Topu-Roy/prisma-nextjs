"use server"

import { db } from "@/server/db"
import { type Category } from "@prisma/client";


export async function getProductsByCategory({ category }: { category: Category }) {
    const products = await db.product.findMany({
        where: {
            category
        }
    })

    return products;
}
