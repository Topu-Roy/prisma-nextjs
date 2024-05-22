import React from "react";
import Image from "next/image";
import { poppins } from "@/styles/font";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Text } from "@/app/_components/text";
import { Heading } from "@/app/_components/heading";

export default function SecondCTA() {
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center">
        <div className="m-auto flex w-full flex-col justify-between p-4 md:flex-row">
          <div className="mx-auto flex h-full w-[70%] flex-col items-center justify-start md:my-auto md:w-[40%]">
            <Image
              src="/images/white-sofa.png"
              height={1380}
              width={1230}
              alt="white sofa"
              className="object-cover"
            />
          </div>
          <div className="my-auto flex w-full flex-col items-start justify-center gap-4 pt-8 md:w-[60%] md:px-8 md:pt-0 lg:w-[45%]">
            <div className="flex w-full flex-col items-center justify-start gap-4 md:items-start">
              <Text
                size="s"
                className={cn(
                  "rounded-full bg-secondary/40 p-1 px-2 tracking-[-0.50px] shadow-md sm:mb-4",
                  poppins.className,
                )}
              >
                Interior Modern
              </Text>
              <Heading className="hidden md:block">
                Arrange your home in such a way with our modern interiors
              </Heading>
              <Heading className="w-full px-4 text-center sm:px-20 md:hidden">
                Arrange your home in such a way with our modern interiors
              </Heading>
            </div>
            <Button
              size="6xl"
              className="mx-auto font-medium transition-all duration-100 hover:scale-105 md:mx-0 lg:hidden"
            >
              Shop Now
            </Button>
            <Button
              size="9xl"
              className="hidden font-medium transition-all duration-100 hover:scale-105 lg:block"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
