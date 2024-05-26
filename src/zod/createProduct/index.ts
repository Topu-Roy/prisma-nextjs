import { z } from "zod";

export const color = ["Black", "White", "Red", "Brown", "Green"] as const;
export const category = ["Chair", "Table", "Lamp", "Drawer", "Bed", "Bookshelf", "Sofa"] as const;
export const tag = ["Minimalistic", "Modern", "Stylish", "Elegant", "Ambient", "Luxurious"] as const;
export const status = ["Regular", "New", "Popular", "Out_of_stock"] as const;

export const createProductPostBodySchema = z.object({
    productTitle: z.string().min(1, { message: "Please provide a title" }),
    price: z.number({ message: "Please provide a price" }).min(5, { message: "Minimum price is $5" }),
    description: z.string({ message: "Please provide a description" }).min(20, { message: "Please provide a description" }),
    createdBy: z.string({ message: "Must provide a admin user id" }),
    status: z.enum(status, { message: "Please select Status" }),
    color: z.enum(color, { message: "Please select a color" }),
    category: z.enum(category, { message: "Please select a category" }),
    tag: z.enum(tag, { message: "Please select a tag" }),
})

export type createProductPostBodyType = z.infer<typeof createProductPostBodySchema>

export const updateProductImagePatchBodySchema = z.object({
    id: z.string(),
    image: z.string().url()
})