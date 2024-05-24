import React from "react";
import Link from "next/link";
import Image from "next/image";
import { poppins } from "@/styles/font";
import { Button } from "@/components/ui/button";
import { Text } from "@/app/_components/text";
import { ShoppingBag } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="mt-[4rem] w-full py-8 md:pt-16 md:px-2 lg:px-4">
      <div className="mx-auto w-full max-w-7xl">
        <div className="my-[5px] flex w-full max-w-[1290px] flex-col-reverse items-center justify-between px-2 md:flex-row">
          <div className="flex w-full flex-col items-center justify-start gap-[30px] sm:px-4 md:w-[50%] md:items-start md:px-0">
            <div className="flex w-full flex-col items-center justify-start gap-2 pt-6 md:items-start md:justify-start">
              <Text
                size="s"
                className={`${poppins.className} rounded-full bg-secondary p-1 px-2 tracking-[-0.50px] shadow-md ring-[3px] ring-secondary sm:mb-4`}
              >
                Interior Needs
              </Text>
              <h1
                className={`${poppins.className} text-center text-3xl tracking-normal text-gray-900/80 
                md:pr-1 md:text-left md:text-4xl lg:pr-3 xl:pr-14 xl:text-5xl`}
              >
                Various new collections of furniture to decorate the corner of
                your house.
              </h1>
            </div>
            <Link href={"/shop"}>
              <Button
                size="9xl"
                className="flex items-center justify-center gap-2 border-2 border-solid font-medium tracking-[-0.50px]"
              >
                <p>Shop Now</p>
                <ShoppingBag />
              </Button>
            </Link>
          </div>
          <div className="lg:w-[26rem relative h-[80dvw] w-[95dvw] rounded-lg sm:mb-8 sm:h-[23rem] sm:w-[30rem] md:h-[25rem] md:w-[25rem] lg:h-[30rem] lg:w-[30rem]">
            <Image
              height={1000}
              width={1000}
              src="/hero/Lamp - Black - Vintage Desk Lamp (1).jpg"
              alt=""
              className="absolute left-0 top-0 w-[60%] rounded-lg object-cover"
            />
            <Image
              height={1000}
              width={1000}
              src="/hero/Bed - Brown - Four Poster Canopy Bed (2).jpg"
              alt=""
              className="absolute bottom-0 right-0 w-[60%] rounded-lg object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
