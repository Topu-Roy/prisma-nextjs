"use client";
import React, { useEffect, useState } from "react";
import { cn, scrollToTop } from "@/lib/utils";
import HeadingAndReset from "./headingAndReset";
import { Button } from "@/components/ui/button";
import { Text } from "@/app/_components/text";
import { Category } from "@prisma/client";
import { useShopStore } from "@/zustand/shop/shopStore";

type ProductCatagoriesType = {
  productName: Category;
  quantity: number;
}[];

export default function Catagories() {
  const { productsBackup, selectedCategory, setSelectedCategory } =
    useShopStore((store) => store);

  const [productCategories, setProductCategories] =
    useState<ProductCatagoriesType>([]);

  useEffect(() => {
    const categories: ProductCatagoriesType = [
      {
        // @ts-ignore
        productName: "All",
        quantity: productsBackup.length,
      },
      {
        productName: "Chair",
        quantity: productsBackup.filter((item) => item.category === "Chair")
          .length,
      },
      {
        productName: "Table",
        quantity: productsBackup.filter((item) => item.category === "Table")
          .length,
      },
      {
        productName: "Lamp",
        quantity: productsBackup.filter((item) => item.category === "Lamp")
          .length,
      },
      {
        productName: "Drawer",
        quantity: productsBackup.filter((item) => item.category === "Drawer")
          .length,
      },
      {
        productName: "Bed",
        quantity: productsBackup.filter((item) => item.category === "Bed")
          .length,
      },
      {
        productName: "Bookshelf",
        quantity: productsBackup.filter((item) => item.category === "Bookshelf")
          .length,
      },
      {
        productName: "Sofa",
        quantity: productsBackup.filter((item) => item.category === "Sofa")
          .length,
      },
    ];

    setProductCategories(categories);
  }, [productsBackup]);

  function handleCategory(category: Category) {
    setSelectedCategory(category);

    scrollToTop();
  }

  function handleReset() {
    setSelectedCategory("All");

    scrollToTop();
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <HeadingAndReset handleReset={handleReset} title={"Product Categories"} />
      <div className="flex w-full flex-row flex-wrap items-start gap-2">
        {productCategories.map((category) => (
          <Button
            key={category.productName}
            asChild
            onClick={() => handleCategory(category.productName)}
            variant={"link"}
            className={cn(
              "min-w-[3rem] cursor-pointer rounded-full bg-slate-200/90 px-3 py-1 tracking-[-0.50px]",
              {
                "ring-[2px] ring-black/20":
                  selectedCategory === category.productName,
              },
            )}
          >
            <Text
              size="s"
              className={cn("tracking-[-0.50px] !text-gray-700/90", {
                "!text-black": selectedCategory === category.productName,
              })}
            >
              {category.productName} ({category.quantity})
            </Text>
          </Button>
        ))}
      </div>
    </div>
  );
}
