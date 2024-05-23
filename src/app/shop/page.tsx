import React from "react";
import Catagories from "./_components/catagories";
import ColorSelector from "./_components/colorSelector";
import FilterByPrice from "./_components/filterByPrice";
import ProductTag from "./_components/productTag";
import Products from "./_components/products";
import { getAllProducts } from "@/actions/productAction";

export default async function ShopPage() {
  const products = await getAllProducts();

  if (!products) {
    return <p className="mt-[5rem]">Opps...! Something went wrong. (V)</p>;
  }

  return (
    <>
      <div className="mt-[5rem] flex w-full flex-col items-center justify-start gap-[100px] bg-stone-200 pb-14 pt-4">
        <div className="flex w-full flex-col items-center justify-start">
          <div className="relative flex w-full max-w-7xl flex-row items-start justify-start gap-5 px-2 lg:pl-4 2xl:px-0 2xl:pl-0">
            {/* 
              // * The filters sidebar is hidden in the mobile or smaller screens
              // * it will be controlled by a sheet component from the ProductHeader component
            
            */}
            <div className="sticky top-[5rem] hidden w-[30%] flex-col items-center justify-start gap-10 lg:flex">
              <ColorSelector />
              <FilterByPrice />
              <Catagories />
              <ProductTag />
            </div>

            <Products products={products} />
          </div>
        </div>
      </div>
    </>
  );
}
