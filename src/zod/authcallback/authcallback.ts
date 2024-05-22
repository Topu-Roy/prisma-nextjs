import { z } from "zod";

export const authCallbackBodySchema = z.object({
    authId: z.string(),
    role: z.enum(["USER", "ADMIN"]),
    imageUrl: z.string().url(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    email: z.string().email().nullable()
})



const userSchema = z.object({
    id: z.string(),
    authId: z.string(),
    role: z.enum(["USER", "ADMIN"]),
    email: z.string().email().nullable(),
    imageUrl: z.string().url().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
});

export const authCallbackResponseSchema = z.object({
    user: userSchema
})

export type authCallbackBodyType = z.infer<typeof authCallbackBodySchema>