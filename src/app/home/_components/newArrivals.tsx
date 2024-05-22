import React from "react";
import Link from "next/link";
import Product from "@/app/_components/product/productCard";
import { Button } from "@/components/ui/button";
import { Heading } from "@/app/_components/heading";
import { type Product as ProductType } from "@prisma/client";

type Props = {
  products: ProductType[];
};

export default function NewArrivals({ products }: Props) {
  let filteredProducts = {
    mobile: [] as ProductType[],
    tablet: [] as ProductType[],
    desktop: [] as ProductType[],
    widescreen: [] as ProductType[],
  };

  const AllNewProducts = products.filter((item) => item.status === "New");

  filteredProducts = {
    mobile: AllNewProducts.slice(0, 4),
    tablet: AllNewProducts.slice(0, 6),
    desktop: AllNewProducts.slice(0, 9),
    widescreen: AllNewProducts.slice(0, 8),
  };

  return (
    <div className="flex w-full items-center justify-center bg-white py-10 lg:py-16">
      <div className="flex max-w-7xl flex-row justify-center">
        <div className="flex w-full flex-col items-center justify-start gap-[67px]">
          <Heading className="!text-blue_gray-900_01 text-center tracking-[-0.50px]">
            New Arrival
          </Heading>

          <div className="relative flex w-full flex-col gap-7">
            <Link
              href={`/shop`}
              className="absolute -top-14 right-4 z-40 md:right-0"
            >
              <Button variant={"ghost"}>View All</Button>
            </Link>
            <div className="flex w-full flex-row flex-wrap justify-center gap-4 md:hidden">
              {filteredProducts.mobile.map((item) => (
                <div className="w-[95%] sm:w-[43%]" key={item.id}>
                  <Product product={item} />
                </div>
              ))}
            </div>
            <div className="hidden w-full flex-row flex-wrap justify-center gap-4 md:flex lg:hidden">
              {filteredProducts.tablet.map((item) => (
                <div className="w-[40%]" key={item.id}>
                  <Product product={item} />
                </div>
              ))}
            </div>
            <div className="hidden w-full flex-row flex-wrap justify-center gap-4 lg:flex xl:hidden">
              {filteredProducts.desktop.map((item) => (
                <div className="w-[31%] xl:w-[18rem]" key={item.id}>
                  <Product product={item} />
                </div>
              ))}
            </div>
            <div className="hidden w-full flex-row flex-wrap justify-center gap-4 xl:flex">
              {filteredProducts.widescreen.map((item) => (
                <div className="w-[18rem]" key={item.id}>
                  <Product product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
