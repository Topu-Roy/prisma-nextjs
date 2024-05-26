import { z } from "zod";
import { category, color, status, tag } from "../common";

export const CreateProductPostBodySchema = z.object({
    productTitle: z.string({ message: "Product must have a title" }).min(1, { message: "Please provide a title" }),
    description: z.string({ message: "Please provide a description" }).min(20, { message: "Description needs to be longer" }),
    price: z.number({ message: "Product must have a price" }).min(5, { message: "Minimum price is $5" }),
    status: z.enum(status, { message: "Product must contain a Tag Status" }),
    color: z.enum(color, { message: "Product must contain a Tag a color" }),
    category: z.enum(category, { message: "Product must contain a Tag a category" }),
    tag: z.enum(tag, { message: "Product must contain a Tag" }),
})

export type CreateProductPostBodyType = z.infer<typeof CreateProductPostBodySchema>