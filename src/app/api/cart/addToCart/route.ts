import { db } from "@/server/db";
import { addToCartBodySchema } from "@/zod/cart/addToCart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    if (!body) return NextResponse.json({ message: "Body not found" }, { status: 401 })
    const validatedBody = addToCartBodySchema.safeParse(body);

    if (!validatedBody.success) return NextResponse.json({ message: validatedBody.error }, { status: 500 });

    type ActionType = "updated" | "created" | "alreadyInCart";
    type Action = { updated: ActionType; created: ActionType; alreadyInCart: ActionType };
    const action: Action = { updated: "updated", created: "created", alreadyInCart: "alreadyInCart" };

    const user = await db.user.findFirst({
        where: {
            id: validatedBody.data.authId
        }
    })

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isExist = await db.cartProduct.findFirst({
        where: {
            productId: validatedBody.data.productId,
            userId: user.id,
        }
    })

    if (isExist) {
        if (validatedBody.data.quantity !== isExist.quantity) {
            const updatedCartProduct = await db.cartProduct.update({
                where: {
                    id: isExist.id,
                },
                data: {
                    quantity: validatedBody.data.quantity,
                }
            })

            return NextResponse.json({ action: action.updated, product: updatedCartProduct }, { status: 200 });
        }

        if (validatedBody.data.quantity === isExist.quantity) {
            return NextResponse.json({ action: action.alreadyInCart, product: isExist }, { status: 200 });
        }
    }

    const createdCartProduct = await db.cartProduct.create({
        data: {
            quantity: validatedBody.data.quantity || 1,
            productTitle: validatedBody.data.productTitle,
            price: validatedBody.data.price,
            userId: user.id,
            productId: validatedBody.data.productId,
        }
    })

    return NextResponse.json({ action: action.created, product: createdCartProduct }, { status: 200 });
}

