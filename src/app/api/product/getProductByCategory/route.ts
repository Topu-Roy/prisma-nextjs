import { db } from "@/server/db";
import { getProductsByCategoryBodySchema } from "@/zod/getProductsByCategory";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body: unknown = await req.json();

    if (!body) NextResponse.json({ message: "Bad Request" }, { status: 401 })

    const result = getProductsByCategoryBodySchema.safeParse(body)
    console.log("Parsed: ", result)

    if (!result.success) return NextResponse.json({ message: "Parse Error" }, { status: 500 })

    const products = await db.product.findMany({
        where: {
            category: result.data.category
        }
    })

    return NextResponse.json({ products }, { status: 200 })
}