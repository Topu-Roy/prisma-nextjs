import { z } from "zod";

const StatusEnum = z.enum(["Regular", "New", "Popular", "Out_of_stock"]);
const CategoryEnum = z.enum(["Chair", "Table", "Lamp", "Drawer", "Bed", "Bookshelf", "Sofa"]);
const ColorEnum = z.enum(["Black", "White", "Red", "Brown", "Green"]);
const TagEnum = z.enum(["Minimalistic", "Modern", "Stylish", "Elegant", "Ambient", "Luxurious"]);

const productSchema = z.object({
    id: z.string(),
    createdBy: z.string(),
    productTitle: z.string(),
    description: z.string(),
    image: z.string().nullable(),
    price: z.number(),
    status: StatusEnum.nullable(),
    category: CategoryEnum,
    tag: TagEnum,
    color: ColorEnum
})

export const getAllProductResponseSchema = z.object({
    products: z.array(productSchema),
});