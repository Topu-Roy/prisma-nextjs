import React from "react";
import BrandsWorkedWith from "./_components/brandsWorkedWith";
import CategoryCTA from "./_components/categoryCTA";
import HeroSection from "./_components/heroSection";
import HomeProductCarousel from "./_components/homeProductCarousel";
import NewArrivals from "./_components/newArrivals";
import OurBenefits from "./_components/ourBenefits";
import ReadBlogSection from "./_components/readBlogSection";
import SecondCTA from "./_components/secondCTA";
import { getAllProductResponseSchema } from "@/zod/getAllProducts";
import { BASE_URL } from "@/lib/utils";
import axios from "axios";

export default async function HomepagePage() {
  const req = await axios.get(`${BASE_URL}/api/product/getAllProducts`)
  const products = getAllProductResponseSchema.safeParse(req.data);

  if (!products.success) {
    console.error(products.error);
    return (
      <div className="">
        Products not found
      </div>
    )
  }

  return (
    <div className="bg-stone-200">
      <HeroSection />
      <BrandsWorkedWith />
      <CategoryCTA />
      <HomeProductCarousel products={products.data.products} />
      <SecondCTA />
      <NewArrivals products={products.data.products} />
      <OurBenefits />
      <ReadBlogSection />
    </div>
  );
}
