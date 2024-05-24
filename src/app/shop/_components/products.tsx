"use client";
import React, { useState } from "react";
import ProductHeader from "./productHeader";
import RenderProducts from "./renderProducts";
import { type Product } from "@prisma/client";

type Props = {
  products: Product[];
};

export default function Products(props: Props) {
  //* This state is for the filter sheet to close it if any filtering is done
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <div className="flex w-full flex-col items-center justify-start gap-8 px-2">
      <ProductHeader sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />
      <RenderProducts products={props.products} setSheetOpen={setSheetOpen} />
    </div>
  );
}
