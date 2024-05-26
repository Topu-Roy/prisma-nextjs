"use client";
import React from "react";
import { type FieldErrors } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectFieldItemProps = {
  onChange: (...event: unknown[]) => void;
  errors: FieldErrors<{
    productTitle: string;
    price: number;
    description: string;
    color: "Black" | "White" | "Red" | "Brown" | "Green";
    category: "Chair" | "Table" | "Lamp" | "Drawer" | "Bed" | "Bookshelf" | "Sofa";
    tag: "Minimalistic" | "Modern" | "Stylish" | "Elegant" | "Ambient" | "Luxurious";
  }>;
  options: readonly string[];
  placeholder: string;
};

export default function SelectFieldItem({
  onChange,
  errors,
  options,
  placeholder,
}: SelectFieldItemProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-full",
          errors.color !== undefined ? "border-rose-600 text-rose-600" : "",
        )}
      >
        <SelectValue placeholder={`Select ${placeholder}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"Color"}</SelectLabel>
          {options.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
