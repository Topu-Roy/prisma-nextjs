import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heading } from "@/app/_components/heading";

export default function promoCTA() {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-[75px]">
      <div className="flex w-full flex-row justify-center">
        <div className="flex w-full max-w-[1290px] flex-row justify-center">
          <div className="flex w-full flex-row justify-center">
            <div className="relative h-[450px] w-full">
              <Image
                height={1024}
                width={1024}
                src="images/img_rectangle_28.png"
                alt="image_one"
                className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[450px] w-full justify-center object-cover"
              />
              <div className="absolute bottom-0 left-[5%] top-0 m-auto flex h-max w-[37%] flex-col items-start justify-start gap-[30px]">
                <div className="flex w-full flex-col items-start justify-start gap-[15px]">
                  <Heading
                    className="tracking-[-0.50px] !text-yellow-100"
                  >
                    Best Room Decor Items
                  </Heading>
                  <Heading
                    className="!text-white-A700 leading-[60px] tracking-[-0.50px]"
                  >
                    Our goods have the best quality and materials in the world
                  </Heading>
                </div>
                <Button
                  color="yellow_100"
                  size="9xl"
                  className="min-w-[170px] font-bold tracking-[-0.50px]"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
