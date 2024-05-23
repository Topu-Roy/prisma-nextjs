"use client"
import React, { useEffect, useState } from "react";
import useDebounce from "@/hooks/debounce";
import { cn } from "@/lib/utils";
import ColorSelector from "./colorSelector";
import FilterByPrice from "./filterByPrice";
import Catagories from "./catagories";
import ProductTag from "./productTag";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useShopStore } from "@/zustand/shop/shopStore";
import { Filter, X } from "lucide-react";

type SortingMethodType = "default" | "price";

type Props = {
  sheetOpen: boolean;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductHeader({ sheetOpen, setSheetOpen }: Props) {
  const { searchInputText, setSearchInputText, setSelectedSorting, } = useShopStore((store) => store);

  // * States
  const [searchText, setSearchText] = useState("");
  const [sortingMethod, setSortingMethod] = useState<SortingMethodType>("default");
  const debouncedText = useDebounce(searchText);

  const sortingOptions: SortingMethodType[] = ["default", "price"];

  useEffect(() => {
    setSearchInputText(debouncedText);
  }, [debouncedText]);

  useEffect(() => {
    setSearchText(searchInputText);
  }, [searchInputText]);

  useEffect(() => {
    setSelectedSorting(sortingMethod);
  }, [sortingMethod]);

  return (
    <>
      <div className="flex w-full flex-row items-center justify-between gap-1">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              className="w-24 space-x-2 text-gray-900/70 lg:hidden"
            >
              <span>Filter</span>
              <Filter />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[80%]" side={"left"}>
            <div className="w-full flex-col items-center justify-start gap-5 space-y-4 pt-8 lg:hidden">
              <ColorSelector />
              <FilterByPrice />
              <Catagories />
              <ProductTag />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex max-w-md flex-1 flex-row justify-center rounded-full border border-input bg-white">
          <div className="flex w-full flex-row justify-center gap-2 pl-1">
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Office Chair"
              className="h-10 rounded-md border-0 bg-transparent bg-white px-3 text-sm"
            />
            <Button
              onClick={() => setSearchText("")}
              variant={"outline"}
              className="h-10 rounded-full  p-2.5"
            >
              <X
                className={cn("text-gray-900/70", {
                  "text-gray-900": searchText.length > 0,
                })}
              />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 sm:w-20 lg:w-28">
          <Select
            onValueChange={(value: SortingMethodType) =>
              setSortingMethod(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortingOptions.map((opt) => (
                  <SelectItem key={`${opt}-sort`} value={opt}>
                    {opt.slice(0, 1).toUpperCase() + opt.slice(1, opt.length)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
