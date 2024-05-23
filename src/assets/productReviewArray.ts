export type ProductReviewsType = {
    id: number;
    text: string;
    name: string;
    date: string;
    imageURL: string;
}

export const productReviews: ProductReviewsType[] = [
    {
        id: 1,
        text: "Great chair, very comfortable!",
        name: "John Doe",
        date: "2024-03-20",
        imageURL: "/reviews/John Doe.png"
    },
    {
        id: 2,
        text: "This table exceeded my expectations. Very sturdy and looks fantastic!",
        name: "Jane Smith",
        date: "2024-03-18",
        imageURL: "/reviews/Jane Smith.png"
    },
    {
        id: 3,
        text: "The lamp is perfect for my living room. It provides just the right amount of light!",
        name: "Alice Johnson",
        date: "2024-03-16",
        imageURL: "/reviews/Alice Johnson.png"
    },
    {
        id: 4,
        text: "The nightstand is exactly what I was looking for. It fits perfectly in my bedroom!",
        name: "Michael Brown",
        date: "2024-03-14",
        imageURL: "/reviews/Michael Brown.png"
    },
    {
        id: 5,
        text: "This bed is amazing! It's very comfortable and looks beautiful in my room.",
        name: "Emily Wilson",
        date: "2024-03-12",
        imageURL: "/reviews/Emily Wilson.png"
    }
];
