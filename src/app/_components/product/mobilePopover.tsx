"use state";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AddButton from "./addButton";
import Link from "next/link";
import { GripHorizontal } from "lucide-react";

type Props = {
  productId: string;
  productTitle: string;
  price: number;
};

export default function MobilePopover({
  productId,
  price,
  productTitle,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Ensure this component only renders on the client
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "flex aspect-square items-center justify-center rounded-full bg-secondary p-0.5",
            {
              "bg-primary": open,
            },
          )}
        >
          <GripHorizontal
            className={cn("text-primary hover:text-secondary", {
              "text-secondary": open,
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[15rem] -translate-x-10">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <div className="w-full">
            <Link href={`/shop/${productId}`}>
              <Button size={"lg"} variant={"outline"} className="w-full">
                View product
              </Button>
            </Link>
          </div>
          <div className="w-full">
            <Link href={`#`}>
              <Button size={"lg"} variant={"outline"} className="w-full">
                Add favorite
              </Button>
            </Link>
          </div>
          <AddButton
            price={price}
            productTitle={productTitle}
            className="w-full"
            productId={productId}
            quantity={1}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
