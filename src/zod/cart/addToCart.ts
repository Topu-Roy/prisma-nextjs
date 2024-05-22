import { z } from "zod"

const product = z.object({
    id: z.string(),
    quantity: z.number(),
    price: z.number(),
    productTitle: z.string(),
    isSelected: z.boolean(),
    productId: z.string(),
    userId: z.string()
})

export const addToCartBodySchema = z.object({
    productId: z.string(),
    authId: z.string(),
    productTitle: z.string(),
    price: z.number(),
    quantity: z.number()
})

export type addToCartBodyType = z.infer<typeof addToCartBodySchema>

export const addToCartResponseSchema = z.object({
    action: z.enum(["updated", "created", "alreadyInCart"]),
    product,
})