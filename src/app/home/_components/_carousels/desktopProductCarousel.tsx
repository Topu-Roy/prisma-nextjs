"use client";
import React, { useEffect, useState } from "react";
import Product from "@/app/_components/product/productCard";
import { cn } from "@/lib/utils";
import { type Product as ProductType } from "@prisma/client";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

type props = {
  products: ProductType[];
};

export default function DesktopProductCarousel(props: props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [productsListOne, setProductsListOne] = useState<ProductType[]>([]);
  const [productsListTwo, setProductsListTwo] = useState<ProductType[]>([]);
  const [productsListThree, setProductsListThree] = useState<ProductType[]>([]);
  const [productsListFour, setProductsListFour] = useState<ProductType[]>([]);
  const [productsListFive, setProductsListFive] = useState<ProductType[]>([]);
  const [productsListSix, setProductsListSix] = useState<ProductType[]>([]);

  useEffect(() => {
    setProductsListOne(props.products.slice(1, 4));
    setProductsListTwo(props.products.slice(5, 8));
    setProductsListThree(props.products.slice(9, 12));
    setProductsListFour(props.products.slice(15, 18));
    setProductsListFive(props.products.slice(19, 22));
    setProductsListSix(props.products.slice(23, 26));
  }, [props.products]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const pageNumbers = Array.from({ length: count }, (_, i) => (
    <Button
      variant={i === current - 1 ? "default" : "ghost"}
      key={i}
      className={cn("h-8 w-8 cursor-pointer rounded-full text-sm")}
      onClick={() => api?.scrollTo(i)}
    >
      {i + 1}
    </Button>
  ));

  return (
    <Carousel
      setApi={setApi}
      className="mx-auto w-[85dvw]"
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
    >
      <CarouselContent className="mx-auto">
        <CarouselItem>
          <div className="flex w-full flex-col justify-center gap-4">
            <div className="flex w-full flex-row items-center justify-center gap-4">
              {productsListOne.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center gap-4"
                >
                  <Product product={item} className="w-[17rem]" />
                </div>
              ))}
            </div>
            <div className="flex w-full flex-row justify-center gap-4">
              {productsListTwo.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center gap-4"
                >
                  <Product product={item} className="w-[17rem]" />
                </div>
              ))}
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex w-full flex-col justify-center gap-4">
            <div className="flex w-full flex-row justify-center gap-4">
              {productsListThree.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center gap-4"
                >
                  <Product product={item} className="w-[17rem]" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              {productsListFour.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center gap-4"
                >
                  <Product product={item} className="w-[17rem]" />
                </div>
              ))}
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex w-full flex-col justify-center gap-4">
            <div className="flex w-full flex-row justify-center gap-4">
              {productsListFive.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center gap-4"
                >
                  <Product product={item} className="w-[17rem]" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              {productsListSix.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center gap-4"
                >
                  <Product product={item} className="w-[17rem]" />
                </div>
              ))}
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className="flex items-center justify-center gap-2 py-4">
        <div className="flex items-center justify-center gap-2 py-2 text-center text-sm text-muted-foreground">
          {pageNumbers}
        </div>
      </div>
    </Carousel>
  );
}
