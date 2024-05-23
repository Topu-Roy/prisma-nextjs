"use server"

import { db } from "@/server/db"


export async function getAllProducts() {
    const products = await db.product.findMany()

    return products;
}
