"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn, scrollToTop } from "@/lib/utils";
import HeadingAndReset from "./headingAndReset";
import { type Tag } from "@prisma/client";
import { useShopStore } from "@/zustand/shop/shopStore";


type ProductTagsType = {
  tag: Tag | 'All';
  quantity: number;
};

export default function ProductTag() {
  const { selectedTag, productsBackup, setSelectedTag } = useShopStore(
    (store) => store,
  );
  const [productTags, setProductTags] = useState<ProductTagsType[]>([]);

  useEffect(() => {
    const tags: ProductTagsType[] = [
      {
        tag: "All",
        quantity: productsBackup.length,
      },
      {
        tag: "Minimalistic",
        quantity: productsBackup.filter((item) => item.tag === "Minimalistic")
          .length,
      },
      {
        tag: "Modern",
        quantity: productsBackup.filter((item) => item.tag === "Modern").length,
      },
      {
        tag: "Stylish",
        quantity: productsBackup.filter((item) => item.tag === "Stylish")
          .length,
      },
      {
        tag: "Elegant",
        quantity: productsBackup.filter((item) => item.tag === "Elegant")
          .length,
      },
      {
        tag: "Ambient",
        quantity: productsBackup.filter((item) => item.tag === "Ambient")
          .length,
      },
      {
        tag: "Luxurious",
        quantity: productsBackup.filter((item) => item.tag === "Luxurious")
          .length,
      },
    ];

    setProductTags(tags);
  }, [productsBackup]);

  function handleClick(tag: Tag | "All") {
    setSelectedTag(tag);

    scrollToTop();
  }

  function handleReset() {
    setSelectedTag("All");

    scrollToTop();
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <HeadingAndReset title="Filter By Tag" handleReset={handleReset} />
      <div className="flex w-full flex-col items-start justify-start gap-4">
        <div className="flex flex-row flex-wrap justify-start gap-2">
          {productTags.map((item) => (
            <Button
              onClick={() => handleClick(item.tag)}
              size="lg"
              variant={"link"}
              className={cn(
                "min-w-[3rem] cursor-pointer rounded-full bg-slate-200/90 px-3 py-1 tracking-[-0.50px] text-gray-700/90",
                {
                  "text-black ring-[2px] ring-black/20":
                    item.tag === selectedTag,
                },
              )}
              key={item.tag}
            >
              {item.tag} ({item.quantity})
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
