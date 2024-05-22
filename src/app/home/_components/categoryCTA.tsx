import React from "react";
import ThreeDCard from "@/components/aceternity/3d/threeDCard";
import { Heading } from "@/app/_components/heading";
import { getProductsByCategoryBodySchema, getProductsByCategoryResponseSchema } from "@/zod/getProductsByCategory";
import { TypeOf } from "zod";
import axios from "axios";

export default async function CategoryCTA() {
  const chairsRes = await axios.post(
    "http://localhost:3000/api/product/getProductByCategory",
    {
      category: "Chair",
    } satisfies TypeOf<typeof getProductsByCategoryBodySchema>,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const lampsRes = await axios.post(
    "http://localhost:3000/api/product/getProductByCategory",
    {
      category: "Lamp",
    } satisfies TypeOf<typeof getProductsByCategoryBodySchema>,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (chairsRes.status !== 200 || lampsRes.status !== 200) return null;
  const chairs = getProductsByCategoryResponseSchema.safeParse(chairsRes.data);

  if (!chairs.success) {
    console.log(chairs.error);
  }

  const lamps = getProductsByCategoryResponseSchema.safeParse(lampsRes.data);
  if (!lamps.success) {
    console.log(lamps.error);
  }

  if (!chairs || !lamps) {
    console.log("data not found");
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl py-10 lg:py-16">
      <Heading className={"px-8 text-center"}>
        Find a variety of <br className="hidden md:block lg:hidden" /> home
        furniture&apos;s
      </Heading>
      <div className="flex w-full flex-col items-center justify-center gap-2 px-3 py-8 sm:px-0 md:flex-row lg:gap-4">
        <ThreeDCard
          heading="Try new our chairs"
          subHeading="Brand new collection of chairs and modern design."
          imageURL={chairs.data?.products[4]?.image || ""}
          imageAlt={chairs.data?.products[4]?.productTitle || ""}
          link="/shop"
          linkName="Shop Now"
        />
        <ThreeDCard
          heading="Check out our new Lamps"
          subHeading="Brand new collection of Lamps with minimal design."
          imageURL={lamps.data?.products[2]?.image || ""}
          imageAlt={lamps.data?.products[2]?.productTitle || ""}
          link="/shop"
          linkName="Shop Now"
        />
      </div>
    </div>
  );
}
